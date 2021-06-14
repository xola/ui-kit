import clsx from "clsx";
import { useCombobox } from "downshift";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import React, { Fragment, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { isOSX } from "../helpers/browser";
import { SearchIcon } from "../icons/SearchIcon";
import { Key } from "./Key";
import { Spinner } from "./Spinner";

const callDebounced = debounce((function_, value) => function_(value), 500);

/**
 * @param {string?}     props.className     Class name to apply to the input.
 * @param {any[]?}      props.items         Items to display in the dropdown menu.
 * @param {Function?}   props.itemToString  Convert item to string for showing it in the input.
 * @param {string?}     props.defaultValue  Search input default value.
 * @param {Function?}   props.onChange      Debounced callback when search input is changed.
 * @param {Function}    props.onSubmit      Called when search input value is selected.
 * @param {Function?}   props.onSelect      Called when item is selected.
 * @param {Function?}   props.children      Render prop for items.
 * @param {boolean?}    props.loading       Show loading indicator.
 */
export const Search = ({
    className,
    items = [],
    defaultValue,
    onChange,
    onSubmit,
    onSelect,
    children,
    isLoading = false,
    ...rest
}) => {
    const [showShortcutKey, setShowShortcutKey] = useState(true);
    const [inputValue, setInputValue] = useState(defaultValue ?? "");
    const inputReference = useRef();

    // Placeholder item for the current search input value.
    // Will be added to the list only if not empty.
    const submitValueItem = { value: inputValue };

    // List of all items, including the submit value item.
    const itemList = inputValue ? [submitValueItem, ...items] : [];

    const handleSelectedItemChange = ({ selectedItem, type }) => {
        // Blur event also triggers `onSelectedItemChange`.
        // Maybe there's a better way to do this, but this will
        // prevent calling `onSubmit` or `onSelect` when we loose focus.
        if (type === "__input_blur__") {
            return;
        }

        if (selectedItem === submitValueItem) {
            onSubmit?.(inputValue);
            inputReference.current.blur(); // Remove focus so that focusing away and coming doesn't open the search box
        } else if (selectedItem) {
            onSelect?.(selectedItem);
            inputReference.current.blur(); // Remove focus so that focusing away and coming doesn't open the search box
        }

        // Always close the menu after an item is selected.
        closeMenu();
    };

    const handleInputChange = ({ inputValue }) => {
        setInputValue(inputValue);
        if (onChange) {
            callDebounced(onChange, inputValue);
        }
    };

    const {
        isOpen,
        openMenu,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
        closeMenu,
    } = useCombobox({
        items: itemList,
        inputValue,
        onInputValueChange: handleInputChange,
        itemToString: () => inputValue, // We will not change the search input after an item is selected.
        defaultHighlightedIndex: 0,
        onSelectedItemChange: handleSelectedItemChange,
    });

    const handleInputFocus = () => {
        setShowShortcutKey(false);
        openMenu();
    };

    // Show dropdown only when `isOpen` is set to `true` and there are items in the list.
    const open = isOpen && itemList.length > 0;
    const noResultFound = isOpen && inputValue.length > 0 && !isLoading && itemList.length <= 1;

    // Keyboard shortcuts.
    const jumpToSearchShortcut = isOSX ? "cmd+k" : "ctrl+k";
    useHotkeys(jumpToSearchShortcut, (event_) => {
        event_.preventDefault(); // So in Firefox we don't jump to it's search bar
        inputReference.current.focus();
    });
    // When `esc` is used inside the search box we should escape ot
    useHotkeys("esc", () => inputReference.current.blur(), { enableOnTags: ["INPUT"] });

    return (
        <div className="relative w-full">
            <div {...getComboboxProps({ className: "w-full relative rounded-md" })}>
                <div className="absolute inset-y-0 top-[-2px] left-0 hidden md:flex items-center pointer-events-none">
                    <SearchIcon className="w-4 h-4 text-gray-darker" />
                </div>

                <input
                    {...getInputProps({
                        type: "text",
                        className: clsx(
                            "block w-full border-none pl-0 md:pl-7 text-base md:text-md text-gray-darker leading-p2 focus:ring-0",
                            className,
                        ),
                        ref: inputReference,
                        onFocus: handleInputFocus,
                        onBlur: () => setShowShortcutKey(true),
                        ...rest,
                    })}
                />

                <div className="hidden absolute inset-y-0 right-0 items-center pr-3 space-x-1 pointer-events-none lg:flex">
                    {showShortcutKey ? (
                        <>
                            <Key char="cmd" /> <Key char="K" />
                        </>
                    ) : null}
                </div>
            </div>

            <ul
                {...getMenuProps({
                    className: clsx(
                        "absolute top-10 divide-y divide-gray-light w-full xl:w-2/3 max-h-[75vh] border border-blue-light mt-1 rounded overflow-auto z-50 bg-white",
                        { hidden: !open },
                    ),
                })}
            >
                {open
                    ? itemList.map((item, index) => (
                          <li key={item} {...getItemProps({ key: index, item, index })}>
                              {item === submitValueItem ? (
                                  <>
                                      <div
                                          className={clsx(
                                              "p-2 cursor-pointer",
                                              highlightedIndex === index ? "bg-blue-light text-white" : "",
                                          )}
                                      >
                                          Show all results for <strong>{inputValue}</strong>
                                      </div>

                                      {isLoading ? (
                                          <div className="p-3 text-center">
                                              <Spinner size="small" />
                                          </div>
                                      ) : null}
                                  </>
                              ) : (
                                  children?.(item, highlightedIndex === index)
                              )}
                          </li>
                      ))
                    : null}

                {open && noResultFound ? <li className="p-2 cursor-not-allowed">No results found</li> : null}

                {open && itemList.length < 5 && (
                    <li className="flex sticky bottom-0 p-2 space-x-5 text-sm search-footer text-gray-dark pointer-events">
                        <span className="flex items-center">
                            <Key char="up" className="mr-0.5" />
                            <Key char="down" className="mr-2" /> to navigate
                        </span>
                        <span className="flex items-center">
                            <Key char="enter" className="mr-2" /> to submit
                        </span>
                        <span className="flex items-center">
                            <Key char="esc" className="mr-2" /> to close
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
};

Search.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.any),
    itemToString: PropTypes.func,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onSelect: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.func]),
    isLoading: PropTypes.bool,
};

import clsx from "clsx";
import { useCombobox } from "downshift";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import React, { Fragment, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { SearchIcon } from "../icons/SearchIcon";
import { Spinner } from "./Spinner";

const isOSX = navigator.userAgent.includes("Macintosh");

const ShortcutKey = ({ char, special = false, className }) => {
    const str = (special ? (isOSX ? "⌘ " : "Ctrl ") : "") + char;
    return (
        <div
            className={clsx(
                "shortcut-key opacity-70 px-2 py-0.5 text-sm text-gray bg-gray-lighter rounded-md",
                className,
            )}
        >
            {str}
        </div>
    );
};

const callDebounced = debounce((fn, value) => fn(value), 500);

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
    loading = false,
    ...rest
}) => {
    const [showShortcutKey, setShowShortcutKey] = useState(true);
    const [inputValue, setInputValue] = useState(defaultValue ?? "");
    const inputRef = useRef();

    // Placeholder item for the current search input value.
    // Will be added to the list only if not empty.
    const submitValueItem = { value: inputValue };

    // List of all items, including the submit value item.
    const itemList = inputValue ? [submitValueItem, ...items] : [];

    const handleSelectedItemChange = ({ selectedItem }) => {
        if (selectedItem === submitValueItem) {
            onSubmit?.(inputValue);
        } else if (selectedItem) {
            onSelect?.(selectedItem);
        }

        // Always close the menu after an item is selected.
        closeMenu();
    };

    const handleInputChange = ({ inputValue }) => {
        setInputValue(inputValue);
        onChange && callDebounced(onChange, inputValue);
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
    const noResultFound = isOpen && inputValue.length > 0 && !loading && itemList.length <= 1;

    // Keyboard shortcuts.
    useHotkeys("ctrl+k", () => inputRef.current.focus());
    useHotkeys("cmd+k", () => inputRef.current.focus());

    return (
        <div className="w-full relative">
            <div {...getComboboxProps({ className: "w-full relative rounded-md" })}>
                <div className="absolute inset-y-0 top-[-2px] left-0 hidden md:flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-gray-darker" />
                </div>

                <input
                    {...getInputProps({
                        type: "text",
                        className: clsx(
                            className,
                            "block w-full border-none pl-0 md:pl-7 text-base md:text-md text-gray-darker leading-p2 focus:ring-0",
                        ),
                        ref: inputRef,
                        onFocus: handleInputFocus,
                        onBlur: () => setShowShortcutKey(true),
                        ...rest,
                    })}
                />

                <div className="hidden lg:flex items-center absolute inset-y-0 right-0 pr-3 pointer-events-none">
                    {showShortcutKey ? <ShortcutKey char="K" special={true} /> : null}
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
                          <li {...getItemProps({ key: index, item, index })}>
                              {item === submitValueItem ? (
                                  <Fragment>
                                      <div
                                          className={clsx(
                                              "p-2 cursor-pointer",
                                              highlightedIndex === index ? "bg-blue-light text-white" : "",
                                          )}
                                      >
                                          Show all results for <strong>{inputValue}</strong>
                                      </div>

                                      {loading ? (
                                          <div className="p-3 text-center">
                                              <Spinner size="small" />
                                          </div>
                                      ) : null}
                                  </Fragment>
                              ) : (
                                  children?.(item, highlightedIndex === index)
                              )}
                          </li>
                      ))
                    : null}

                {open && noResultFound ? <li className="p-2 cursor-not-allowed">No results found</li> : null}

                {open && itemList.length < 5 && (
                    <li className="search-footer text-gray-dark sticky bottom-0 flex p-2 space-x-5 pointer-events">
                        <span className="flex items-center">
                            <ShortcutKey char="↑↓" className="px-1 mr-2" /> to navigate
                        </span>
                        <span className="flex items-center">
                            <ShortcutKey char="⮐" className="px-1 mr-2" /> to submit
                        </span>
                        <span className="flex items-center">
                            <ShortcutKey char="ESC" className="text-xs px-1 mr-2" /> to close
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
    children: PropTypes.func,
    loading: PropTypes.bool,
};

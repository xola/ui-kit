import clsx from "clsx";
import { useCombobox } from "downshift";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { isOSX } from "../helpers/browser";
import { SearchIcon } from "../icons/SearchIcon";
import { Key } from "./Key";
import { Spinner } from "./Spinner";

const callDebounced = debounce((function_, value) => function_(value), 500);

/**
 * @param {string?}     props.className             Class name to apply to the input.
 * @param {any[]?}      props.items                 Items to display in the dropdown menu.
 * @param {string?}     props.defaultValue          Search input default value.
 * @param {Function?}   props.onChange              Debounced callback when search input is changed.
 * @param {Function}    props.onSubmit              Called when search input value is selected.
 * @param {Function?}   props.onSelect              Called when item is selected.
 * @param {Function?}   props.children              Render prop for items.
 * @param {boolean?}    props.isLoading             Show loading indicator.
 * @param {boolean?}    props.shouldStayOpen        Force open the menu.
 * @param {boolean?}    props.shouldDestroyOnClose  Control if the menu should be hidden on destroyed when closed.
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
    shouldStayOpen = false,
    shouldDestroyOnClose = true,
    shouldHideMenu = false,
    ...rest
}) => {
    const [showShortcutKey, setShowShortcutKey] = useState(true);
    const [inputValue, setInputValue] = useState(defaultValue ?? "");
    const inputReference = useRef();

    // Flag for controlling the delay before actually closing the menu.
    const [canClose, setCanClose] = useState(true);

    // Placeholder item for the current search input value.
    // Will be added to the list only if not empty.
    const submitValueItem = { value: inputValue };

    // List of all items, including the submit value item.
    const itemList = inputValue ? [submitValueItem, ...items] : [];

    const handleSelectedItemChange = ({ selectedItem, type }) => {
        // Blur event also triggers `onSelectedItemChange`.
        // Maybe there's a better way to do this, but this will
        // prevent calling `onSubmit` or `onSelect` when we loose focus.
        if (type === useCombobox.stateChangeTypes.InputBlur) {
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

    // Introduce a slight delay before actually closing the menu and destroying all child components from it.
    // This ensures that all children events are processed before they are destroyed.
    useEffect(() => {
        if (isOpen) {
            setCanClose(false);
        } else {
            setTimeout(() => setCanClose(true), 1);
        }
    }, [isOpen, setCanClose]);

    const handleInputFocus = () => {
        setShowShortcutKey(false);
        openMenu();
    };

    // Show dropdown only when `isOpen` is set to `true` and there are items in the list.
    const open = (isOpen || !canClose || shouldStayOpen) && itemList.length > 0 && !shouldHideMenu;
    const noResultFound = open && !isLoading && itemList.length <= 1;

    // Keyboard shortcuts.
    useHotkeys(isOSX ? "cmd+k" : "ctrl+k", (event) => {
        event.preventDefault(); // So in Firefox we don't jump to it's search bar
        inputReference.current.focus();
    });

    // When `esc` is used inside the search box we should escape ot
    useHotkeys("esc", () => inputReference.current.blur(), { enableOnTags: ["INPUT"] });

    const isVisible = open || !shouldDestroyOnClose;

    return (
        <div className="ui-search relative w-full">
            <div {...getComboboxProps({ className: "w-full relative rounded-md" })}>
                <div className="pointer-events-none absolute inset-y-0 top-[-2px] left-0 hidden items-center md:flex">
                    <SearchIcon className="h-4 w-4 text-gray-darker" />
                </div>

                <input
                    {...getInputProps({
                        type: "text",
                        className: clsx(
                            "ui-search-input",
                            "block w-full border-none pl-0 md:pl-7 text-base md:text-md text-gray-darker leading-p2 focus:ring-0",
                            className,
                        ),
                        ref: inputReference,
                        onFocus: handleInputFocus,
                        onBlur: () => setShowShortcutKey(true),
                        ...rest,
                    })}
                />

                <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center space-x-1 pr-3 lg:flex">
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
                        "ui-search-menu",
                        "absolute top-10 divide-y divide-gray-light w-full xl:w-2/3 max-h-[75vh] border border-blue-light mt-1 rounded overflow-auto z-10 bg-white",
                        { hidden: !open },
                    ),
                })}
            >
                {isVisible
                    ? itemList.map((item, index) => (
                          <li key={item} {...getItemProps({ key: index, item, index, className: "ui-search-item" })}>
                              {item === submitValueItem ? (
                                  <>
                                      <div
                                          className={clsx(
                                              "cursor-pointer p-2",
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

                {isVisible && noResultFound ? <li className="cursor-not-allowed p-2">No results found</li> : null}

                {isVisible && itemList.length < 5 ? (
                    <li className="search-footer pointer-events sticky bottom-0 flex space-x-5 p-2 text-sm text-gray-dark">
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
                ) : null}
            </ul>
        </div>
    );
};

Search.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.any),
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onSelect: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.func]),
    isLoading: PropTypes.bool,
    shouldStayOpen: PropTypes.bool,
    shouldDestroyOnClose: PropTypes.bool,
    shouldHideMenu: PropTypes.bool,
};

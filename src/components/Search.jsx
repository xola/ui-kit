import clsx from "clsx";
import { useCombobox } from "downshift";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { SearchIcon } from "../icons/SearchIcon";
import { Spinner } from "./Spinner";

const isOSX = navigator.userAgent.includes("Macintosh");

const ShortcutKey = () => {
    return (
        <div className="shortcut-key opacity-70 px-2 py-0.5 text-sm text-gray bg-gray-lighter rounded-md">
            {isOSX ? "⌘ K" : "Ctrl K"}
        </div>
    );
};

const callDebounced = debounce((fn, value) => fn(value), 500);

const pickFirstValueFromObject = (object) => {
    const [firstKey] = Object.keys(object);
    return object[firstKey];
};

/**
 * @param {string?}     props.className     Class name to apply to the input.
 * @param {any[]?}      props.items         Items to display in the dropdown menu.
 * @param {Function?}   props.itemToString  Convert item to string for showing it in the input.
 * @param {string?}     props.value         Search input default value.
 * @param {Function?}   props.onChange      Called when search input value is changed.
 * @param {Function}    props.onSubmit      Called when search input value is selected.
 * @param {Function?}   props.onSelect      Called when item is selected.
 * @param {Function?}   props.children      Render prop for items.
 * @param {boolean?}    props.loading       Show loading indicator.
 */
export const Search = ({
    className,
    items = [],
    itemToString = pickFirstValueFromObject,
    value = "",
    onChange,
    onType,
    onSubmit,
    onSelect,
    children,
    loading = false,
    ...rest
}) => {
    const [showShortcutKey, setShowShortcutKey] = useState(true);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef();

    // Placeholder item for the current search input value.
    // Will be added to the list only if not empty.
    const submitValueItem = { value: inputValue };

    // List of all items, including the submit value item.
    const itemList = inputValue ? [submitValueItem, ...items] : items;

    const handleSelectedItemChange = ({ selectedItem }) => {
        if (selectedItem === submitValueItem) {
            onSubmit?.(inputValue);
        } else {
            onSelect?.(selectedItem);
        }
    };

    const handleInputChange = ({ inputValue }) => {
        setInputValue(inputValue);
        onChange && onChange(inputValue);
        onType && callDebounced(onType, inputValue);
    };

    const {
        isOpen,
        openMenu,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
    } = useCombobox({
        items: itemList,
        inputValue,
        onInputValueChange: handleInputChange,
        itemToString,
        defaultHighlightedIndex: 0,
        onSelectedItemChange: handleSelectedItemChange,
    });

    // Items should not be selectable when loading is in progress.
    // Exception is the submit value item.
    const isDisabled = (item) => {
        return loading && item === submitValueItem;
    };

    const handleInputFocus = () => {
        setShowShortcutKey(false);
        openMenu();
    };

    // Show dropdown only when `isOpen` is set to `true` and there are items in the list.
    const open = isOpen && itemList.length > 0;

    // Keyboard shortcuts
    useHotkeys("ctrl+k", () => inputRef.current.focus());
    useHotkeys("cmd+k", () => inputRef.current.focus());

    return (
        <div className="w-full relative">
            <div {...getComboboxProps({ className: "w-full mt-1 relative rounded-md" })}>
                <div className="absolute inset-y-0 top-[-2px] left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-gray-darker" />
                </div>

                <input
                    {...getInputProps({
                        type: "text",
                        className: clsx(className, "block w-full border-none pl-10 text-gray-darker leading-p2 focus:ring-0"),
                        ref: inputRef,
                        onFocus: handleInputFocus,
                        onBlur: () => setShowShortcutKey(true),
                        ...rest,
                    })}
                />

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {showShortcutKey ? <ShortcutKey /> : null}
                    {loading ? <Spinner size="small" /> : null}
                </div>
            </div>

            {/* Here */}
            <ul
                {...getMenuProps({
                    className: clsx(
                        "absolute top-10 left-10 divide-y divide-gray-light w-3/6 border border-blue-light mt-1 rounded overflow-hidden z-50",
                        { hidden: !open },
                    ),
                })}
            >
                {open
                    ? itemList.map((item, index) => (
                          <li {...getItemProps({ key: index, item, index, disabled: isDisabled(item) })}>
                              {item === submitValueItem ? (
                                  <div
                                      className={clsx(
                                          "p-2 cursor-pointer",
                                          highlightedIndex === index ? "bg-blue-light text-white" : "",
                                      )}
                                  >
                                      Show all results for <strong>{inputValue}</strong>
                                  </div>
                              ) : (
                                  children?.(item, highlightedIndex === index)
                              )}
                          </li>
                      ))
                    : null}
            </ul>
        </div>
    );
};

Search.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.any),
    itemToString: PropTypes.func,
    value: PropTypes.string,
    onType: PropTypes.func,
    onSubmit: PropTypes.func,
    onSelect: PropTypes.func,
    children: PropTypes.func,
    loading: PropTypes.bool,
};

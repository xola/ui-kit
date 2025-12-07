import clsx from "clsx";
import { useCombobox } from "downshift";
import debounce from "lodash-es/debounce";
import React, { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { isOSX } from "../helpers/browser";
import { useId } from "../hooks/useId";
import { useIsClient } from "../hooks/useIsClient";
import { SearchIcon } from "../icons";
import { Key } from "./Key";
import { Spinner } from "./Spinner";

const callDebounced = debounce((function_: (value: string) => void, value: string) => function_(value), 500);

export interface SearchProps<T = any>
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onSelect" | "onSubmit" | "children"> {
    className?: string;
    items?: T[];
    defaultValue?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    onSelect?: (item: T) => void;
    children?: (item: T, isHighlighted: boolean) => React.ReactNode;
    isLoading?: boolean;
    shouldStayOpen?: boolean;
    shouldDestroyOnClose?: boolean;
    shouldHideMenu?: boolean;
    minChars?: number;
}

export const Search = <T = any,>({
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
    minChars = 0,
    ...rest
}: SearchProps<T>) => {
    const [showShortcutKey, setShowShortcutKey] = useState(true);
    const [inputValue, setInputValue] = useState(defaultValue ?? "");
    const [showClearText, setShowClearText] = useState(false);
    const inputReference = useRef<HTMLInputElement>(null);
    const inputId = useId("search-input");
    const menuId = useId("search-menu");
    const isClient = useIsClient();
    const clearTextRef = useRef<HTMLDivElement>(null);

    // Flag for controlling the delay before actually closing the menu.
    const [canClose, setCanClose] = useState(true);

    useEffect(() => {
        if (inputValue.length > 0) {
            setShowClearText(true);
        } else {
            setShowClearText(false);
        }
    }, [inputValue]);

    // Placeholder item for the current search input value.
    // Will be added to the list only if not empty.

    const submitValueItem = { value: inputValue } as unknown as T;

    // List of all items, including the submit value item.
    const itemList = inputValue ? [submitValueItem, ...items] : [];

    const handleSelectedItemChange = ({ selectedItem, type }: any) => {
        if (type === useCombobox.stateChangeTypes.InputBlur) {
            return;
        }

        if (type === useCombobox.stateChangeTypes.FunctionCloseMenu) {
            return;
        }

        if (selectedItem === submitValueItem) {
            onSubmit?.(inputValue);
            inputReference.current?.blur(); // Remove focus so that focusing away and coming doesn't open the search box
        } else if (selectedItem) {
            onSelect?.(selectedItem);
            inputReference.current?.blur(); // Remove focus so that focusing away and coming doesn't open the search box
        }

        // Always close the menu after an item is selected.
        closeMenu();
    };

    const handleInputChange = ({ inputValue }: { inputValue?: string }) => {
        const value = inputValue ?? "";
        setInputValue(value);
        if (onChange) {
            callDebounced(onChange, value);
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

    const handleClearSearch = () => {
        setInputValue("");
        if (onChange) {
            onChange("");
        }

        inputReference.current?.focus();
    };

    // Combined keyboard shortcuts
    useHotkeys(
        isOSX ? "cmd+k" : "ctrl+k",
        (event) => {
            event.preventDefault(); // Prevent Firefox from jumping to its search bar
            inputReference.current?.focus();
        },
        { enableOnTags: ["INPUT"] },
    );

    // Combined ESC key handler
    useHotkeys(
        "esc",
        (event) => {
            if (document?.activeElement === inputReference.current) {
                event.preventDefault();

                // If there's text, clear it
                if (inputValue.length > 0) {
                    handleClearSearch();
                }
                // If no text, blur the input
                else {
                    inputReference.current?.blur();
                }
            }
        },
        { enableOnTags: ["INPUT"] },
    );

    // Show dropdown only when `isOpen` is set to `true` and there are items in the list.
    const open = (isOpen || !canClose || shouldStayOpen) && itemList.length > 0 && !shouldHideMenu;
    const noResultFound = open && !isLoading && itemList.length <= 1 && inputValue.length >= minChars;
    const isVisible = open || !shouldDestroyOnClose;

    return (
        <div className="ui-search relative w-full">
            <div {...getComboboxProps({ className: "w-full relative rounded-md" })}>
                <div className="pointer-events-none absolute inset-y-0 -top-0.5 left-0 hidden items-center md:flex">
                    <SearchIcon className="h-4 w-4 text-gray-darker" />
                </div>

                <input
                    {...getInputProps({
                        id: inputId,
                        type: "text",
                        className: clsx(
                            "ui-search-input",
                            "block w-full border-none pl-0 md:pl-7 text-base md:text-md text-gray-darker leading-p2 focus:ring-0",
                            className,
                        ),
                        ref: inputReference,
                        onFocus: handleInputFocus,
                        onBlur: () => setShowShortcutKey(true),
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
                        ...rest,
                    })}
                />

                <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center space-x-1 pr-3 lg:flex">
                    {isClient && showShortcutKey ? (
                        <>
                            <Key char="cmd" /> <Key char="K" />
                        </>
                    ) : null}
                </div>
            </div>

            <div className="relative">
                {shouldHideMenu && (
                    <div
                        ref={clearTextRef}
                        className={`text-gray-500 absolute left-0 top-full transform
                       text-xs transition-all duration-200
                       ease-in-out ${showClearText ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
                    >
                        <span className="inline-flex items-center gap-1">
                            <Key char="Esc" />
                            <span>Clear search</span>
                        </span>
                    </div>
                )}
            </div>

            <ul
                {...getMenuProps({
                    id: menuId,
                    className: clsx(
                        "ui-search-menu",
                        "absolute top-10 divide-y divide-gray-light w-full xl:w-[590px] max-h-[75vh] border border-secondary-lighter shadow-xl mt-1 rounded overflow-auto z-20 bg-white",
                        { hidden: !open },
                    ),
                })}
            >
                {isVisible
                    ? itemList.map((item, index) => (
                          <li
                              key={item === submitValueItem ? "submit-value" : `search-item-${index}`}
                              {...getItemProps({ key: index, item, index, className: "ui-search-item" })}
                          >
                              {item === submitValueItem ? (
                                  isLoading ? (
                                      <div className="p-3 text-center">
                                          <Spinner size="small" />
                                      </div>
                                  ) : inputValue.length < minChars ? (
                                      <div
                                          className={clsx(
                                              "cursor-pointer p-2",
                                              highlightedIndex === index ? "bg-blue-light text-white" : "",
                                          )}
                                      >
                                          {`Enter at least ${minChars} characters to begin search`}
                                      </div>
                                  ) : null
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
                            <Key char="down" className="mr-2" /> navigate results
                        </span>

                        <span className="flex items-center">
                            <Key char="enter" className="mr-2" /> submit
                        </span>

                        <span className="flex items-center">
                            <Key char="esc" className="mr-2" /> close search
                        </span>
                    </li>
                ) : null}
            </ul>
        </div>
    );
};

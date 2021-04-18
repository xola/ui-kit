import _ from "lodash";
import clsx from "clsx";
import { Spinner } from "./Spinner";
import { useHotkeys } from "react-hotkeys-hook";
import React, { useState, useEffect } from "react";

const sizes = {
    small: "w-32",
    medium: "w-64",
    large: "w-72",
    xlarge: "w-96",
    full: "w-full",
};

const keys = {
    ENTER: 13,
    UP: 38,
    DOWN: 40,
};

const linkRefs = [];

const initialState = {
    searchTerm: false,
    searchResults: [],
    hideResults: false,
    focusIndex: 0,
};

const isOSX = () => navigator.userAgent.indexOf("Macintosh") >= 0;

const focusSearchField = () => {
    document.querySelector("input[type=text]").focus();
};

const blurSearchField = () => {
    document.querySelector("input[type=text]").blur();
};

export const Search = ({
    size = "full", // TODO: I'm not sure
    placeholder = "Customer Name or tag",
    idLength = 24,
    previewEnabled = true,
    searchFn,
    onClear,
    resultItem,
    onSelect,
}) => {
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialState.searchTerm);
    const [searchResults, setSearchResults] = useState(initialState.searchResults);
    const [hideResults, setHideResults] = useState(initialState.hideResults);
    const [focusIndex, setFocusIndex] = useState(initialState.focusIndex);

    useHotkeys("ctrl+k", focusSearchField);
    useHotkeys("cmd+k", focusSearchField);
    useHotkeys("esc", blurSearchField, {enableOnTags: ['INPUT'] } );

    let isMongoID = searchTerm.length === idLength;

    const reset = () => {
        console.log("Resetting");
        hideAutoSuggest();
        setSearchResults(initialState.searchResults);
        setHideResults(initialState.hideResults);
        setFocusIndex(initialState.focusIndex);
    };

    useEffect(() => {
        if (searchTerm.length === 0) {
            reset();
            return () => {
                onClear && onClear();
            };
        }
    }, [searchTerm]);

    const search = async (evt) => {
        const term = evt.target.value.trim();
        setSearchTerm(term);
        isMongoID = term.length === idLength;
        if (term.length === 0) {
            return;
        }

        setSearching(true);
        const results = await searchFn(term);

        if (evt.target.value.trim().length > 0) {
            setSearchResults(results);
            // 5aZRSdkcBOM6j3lkWEoP 8YL1aG0vwRBXTzeZ0jRC
            if (isMongoID) {
                onSelect(getResults(term, results));
                hideAutoSuggest();
            } else if (!previewEnabled) {
                onSelect(results);
                hideAutoSuggest();
            }
        }

        setSearching(false);
    };

    const hideAutoSuggest = (e) => {
        const shortcutKey = document.querySelector(".shortcut-key");
        if (shortcutKey) {
            setHideResults(true);
            setFocusIndex(0);
            shortcutKey.classList.remove("hidden");
        }
    };

    const showAutoSuggest = () => {
        setHideResults(false);
        const shortcutKey = document.querySelector(".shortcut-key");
        shortcutKey && shortcutKey.classList.add("hidden");
    };

    const getResults = (key, results = []) => {
        results = results.length > 0 ? results : searchResults;
        if (key === "all") {
            return results;
        } else {
            return results.filter((result) => result.id === key);
        }
    };

    const handleNavigation = async (e) => {
        switch (e.keyCode) {
            case keys.ENTER:
                if (focusIndex >= 0) {
                    // User has selected a result invoke the callback and pass in the results
                    try {
                        const resultId = linkRefs[focusIndex].current.getAttribute("data-id");
                        const results = getResults(resultId);
                        if (results.length > 0) {
                            onSelect(results);
                        }
                    } catch (err) {
                        console.error("Error fetching results. Something went wrong", err.message);
                    }
                }

                hideAutoSuggest();
                break;
            case keys.UP:
                if (focusIndex > 0) {
                    setFocusIndex(focusIndex - 1);
                }
                break;
            case keys.DOWN:
                if (focusIndex < dropdownLength - 1) {
                    setFocusIndex(focusIndex + 1);
                }
                break;
        }
    };

    const initialFocusIndex = isMongoID ? 1 : 0;
    const dropdownLength = searchResults.length + initialFocusIndex + 1;
    const showResultList = previewEnabled && !hideResults && searchTerm.length > 0;

    let SearchElements = React.Fragment;
    if (!hideResults && searchResults.length > 0) {
        let index = initialFocusIndex;
        SearchElements = searchResults.map((result) => {
            index++;
            const isActive = focusIndex === index;
            linkRefs[index] = React.createRef();
            return resultItem(index, linkRefs[index], result, isActive);
        });
    }

    return (
        <section className="">
            <div className="w-full flex">
                <input
                    type="text"
                    placeholder={placeholder}
                    onKeyDown={handleNavigation}
                    onBlur={_.debounce(hideAutoSuggest, 300)}
                    onFocus={showAutoSuggest}
                    onChange={_.debounce(search, 1000)}
                    className={clsx("border-gray rounded-sm flex-initial w-full focus:ring-0")}
                />

                {searching && <Spinner className="absolute top-[20px] right-7" />}

                <div className="shortcut-key absolute text-gray-dark border border-gray-light bg-gray-lighter rounded-md p-0.5 px-1 mt-1.5 right-7">
                    {isOSX ? "⌘ K" : "Ctrl K"}
                </div>
            </div>
            <ul
                className={clsx("divide-y divide-gray-light w-3/6 table mt-1 rounded-sm shadow-md z-50", {
                    "border border-blue-light": showResultList,
                })}
            >
                {showResultList && isMongoID && (
                    <li
                        key={0}
                        data-id={searchTerm}
                        className={clsx("text-black p-2", { "bg-blue-light text-white": focusIndex === 0 })}
                        ref={(link) => (linkRefs[0] = { current: link })}
                    >
                        Jump to MongoID: <b>{searchTerm}</b>
                    </li>
                )}

                {showResultList && (
                    <li
                        key={initialFocusIndex}
                        className={clsx("p-2", { "bg-blue-light  text-white": focusIndex === initialFocusIndex })}
                        data-id="all"
                        ref={(link) => (linkRefs[initialFocusIndex] = { current: link })}
                    >
                        Show all results for <b>{searchTerm}</b>
                    </li>
                )}

                {previewEnabled && SearchElements}
            </ul>
        </section>
    );
};

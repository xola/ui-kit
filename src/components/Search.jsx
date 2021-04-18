import React, { useState, useEffect } from "react";
import clsx from "clsx";
import _ from "lodash";

//
// ASSUME THIS IS USER SEARCH
//

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
    searchTerm: "",
    searchResults: [],
    hideResults: false,
    focusIndex: 0,
};

export const Search = ({ size = "full", placeholder = "Customer Name or tag", idLength = 24, searchFn, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState(initialState.searchTerm);
    const [searchResults, setSearchResults] = useState(initialState.searchResults);
    const [hideResults, setHideResults] = useState(initialState.hideResults);
    const [focusIndex, setFocusIndex] = useState(initialState.focusIndex);

    const reset = () => {
        hideAutoSuggest();
        setSearchResults(initialState.searchResults);
        setHideResults(initialState.hideResults);
        setFocusIndex(initialState.focusIndex);
    };

    useEffect(() => {
        if (searchTerm.length === 0) {
            reset();
        }
    }, [searchTerm]);

    const search = async (evt) => {
        const term = evt.target.value.trim();
        setSearchTerm(term);
        if (term.length === 0) {
            return;
        }

        reset();
        const results = await searchFn(term);

        if (evt.target.value.trim().length > 0) {
            setSearchResults(results);
        }
    };

    const hideAutoSuggest = () => {
        setHideResults(true);
        setFocusIndex(0);
    };

    const showAutoSuggest = () => {
        setHideResults(false);
    };

    const handleNavigation = (e) => {
        switch (e.keyCode) {
            case keys.ENTER:
                if (focusIndex >= 0) {
                    // User has selected a result, perform whatever action is required
                    // Callback
                    try {
                        const selectedItem = linkRefs[focusIndex].current;
                        const id = selectedItem.getAttribute("data-id");
                        console.log("Selected", id);
                        onSelect(id);
                    } catch (err) {
                        console.error("Error fetching results. Something went wrong", err.message);
                    }
                }

                hideAutoSuggest(e);
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

    const isMongoID = searchTerm.length === idLength;
    const initialFocusIndex = isMongoID ? 1 : 0;
    const dropdownLength = searchResults.length + initialFocusIndex + 1;

    let SearchElements = React.Fragment;
    if (!hideResults && searchResults.length > 0) {
        let index = initialFocusIndex;
        SearchElements = searchResults.map((result) => {
            index++;
            const isActive = focusIndex === index;
            linkRefs[index] = React.createRef();
            return searchItem(index, result, isActive);
        });
    }

    return (
        <section>
            <input
                type="search"
                placeholder={placeholder}
                onKeyDown={handleNavigation}
                onBlur={hideAutoSuggest}
                onFocus={showAutoSuggest}
                onChange={_.debounce(search, 500)}
                className={clsx(sizes[size], "focus:ring-0")}
            />
            <ul
                className={clsx("divide-y divide-gray-light w-96 table", {
                    "border border-blue-light border-t-0": !hideResults && searchTerm,
                })}
            >
                {!hideResults && searchTerm && isMongoID && (
                    <li
                        key={0}
                        data-id={searchTerm}
                        className={clsx("text-black p-2", { "bg-blue-light text-white": focusIndex === 0 })}
                        ref={(link) => {
                            linkRefs[0] = { current: link };
                        }}
                    >
                        Jump to MongoID: <b>{searchTerm}</b>
                    </li>
                )}

                {!hideResults && searchTerm.length > 0 && (
                    <li
                        key={initialFocusIndex}
                        className={clsx("p-2", { "bg-blue-light  text-white": focusIndex === initialFocusIndex })}
                        data-id="all"
                        ref={(link) => {
                            linkRefs[initialFocusIndex] = { current: link };
                        }}
                    >
                        Show all results for <b>{searchTerm}</b>
                    </li>
                )}

                {SearchElements}
            </ul>
        </section>
    );
};

const searchItem = (index, result, isActive) => {
    return (
        <li
            key={index}
            data-id={result.id}
            className={clsx("p-2 flex", { "bg-blue-light text-white p-2": isActive })}
            ref={linkRefs[index]}
        >
            <div className="flex">
                <img className="rounded-full w-12 h-12" src={result.picture} />
                <div className="pl-3">
                    <div className={clsx("text-black", { "text-white": isActive })}>
                        {result.firstName} {result.lastName}
                    </div>
                    <div className={clsx("text-sm text-black", { "text-white": isActive })}>{result.email}</div>
                </div>
            </div>
        </li>
    );
};

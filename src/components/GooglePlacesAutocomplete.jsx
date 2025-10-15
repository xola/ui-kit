import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { startCase, debounce } from "lodash";
import { Input } from "./Forms/Input";
import { Badge } from "./Badge";

const POINT_OF_INTEREST = "point_of_interest";

export const GooglePlacesAutocomplete = ({ initialValue, onSelect, urlConfig }) => {
    const [inputValue, setInputValue] = useState(initialValue || "");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userTyping, setUserTyping] = useState(false);

    const dropdownRef = useRef(null);
    const initialFetchDoneRef = useRef(false);

    const handleSelect = useCallback(
        (sug) => {
            setInputValue(sug.description || sug.name || "");
            setUserTyping(false);
            setShowDropdown(false);
            onSelect?.(sug);
        },
        [onSelect],
    );

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setUserTyping(true);
    };

    const handleBlur = () => {
        setUserTyping(false);
        setShowDropdown(false);
    };

    const fetchSuggestions = useMemo(
        () =>
            debounce(async (query, selectFirst = false) => {
                if (!query.trim()) {
                    setSuggestions([]);
                    return;
                }

                setIsLoading(true);
                try {
                    const response = await fetch(`${urlConfig}/searchGooglePlaces?input=${encodeURIComponent(query)}`);
                    const data = await response.json();
                    const results = Array.isArray(data) ? data : data.predictions || [];
                    setSuggestions(results);

                    if (selectFirst && results.length > 0) {
                        handleSelect(results[0]);
                    }
                } catch (error) {
                    console.error("Error occurred:", error);
                    setSuggestions([]);
                } finally {
                    setIsLoading(false);
                }
            }, 300),
        [urlConfig, handleSelect],
    );

    useEffect(() => {
        if (initialValue && !initialFetchDoneRef.current) {
            initialFetchDoneRef.current = true;
            fetchSuggestions(initialValue, true);
        }
    }, [initialValue, fetchSuggestions]);

    useEffect(() => {
        if (userTyping && inputValue) {
            fetchSuggestions(inputValue);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }, [inputValue, userTyping, fetchSuggestions]);

    /* eslint-disable no-undef */
    useEffect(() => {
        if (typeof document === "undefined") return;

        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    /* eslint-enable no-undef */

    return (
        <div ref={dropdownRef} className="relative">
            <Input
                type="text"
                value={inputValue}
                placeholder="Search place..."
                onChange={handleInputChange}
                onBlur={handleBlur}
            />
            {showDropdown && (
                <div className="absolute z-10 max-h-65 w-full overflow-y-auto rounded-md border border-gray bg-white shadow-lg">
                    {isLoading && <div className="text-gray-500 px-3 py-2">Loading...</div>}
                    {!isLoading && suggestions.length === 0 && (
                        <div className="text-gray-500 px-3 py-2">No results</div>
                    )}
                    {!isLoading &&
                        suggestions.map((sug) => (
                            <div
                                key={sug.place_id}
                                className="flex cursor-pointer flex-col gap-2 border-b border-gray bg-white px-3 py-2 hover:bg-gray-light hover:text-blue-light"
                                onClick={() => handleSelect(sug)}
                            >
                                <div className="flex flex-wrap items-center gap-1">
                                    <p className="mr-2 whitespace-nowrap text-md">{sug.description || sug.name}</p>
                                    {(sug.types || []).slice(0, 4).map((type) => (
                                        <Badge key={type} color={POINT_OF_INTEREST === type ? "primary" : "secondary"}>
                                            {startCase(type)}
                                        </Badge>
                                    ))}
                                </div>
                                {sug.formatted_address && <p>{sug.formatted_address}</p>}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

GooglePlacesAutocomplete.propTypes = {
    initialValue: PropTypes.string,
    onSelect: PropTypes.func,
    urlConfig: PropTypes.string,
};

GooglePlacesAutocomplete.defaultProps = {
    initialValue: "",
    onSelect: null,
    urlConfig: "",
};

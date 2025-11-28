import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { startCase } from "lodash";
import { Input } from "./Forms/Input";
import { Badge } from "./Badge";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";

export const GooglePlacesAutocomplete = ({ initialValue, onSelect, urlConfig }) => {
    const [inputValue, setInputValue] = useState(initialValue || "");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState("");

    const dropdownRef = useRef(null);
    const initialFetchDoneRef = useRef(false);

    const handleSelect = useCallback(
        (suggestion) => {
            setInputValue(suggestion.description || suggestion.name || "");
            setShowDropdown(false);
            onSelect?.(suggestion);
        },
        [onSelect],
    );

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setShowDropdown(true);
        fetchSuggestions(e.target.value);
    };

    const fetchSuggestions = useDebouncedCallback(
        async (query, selectFirst = false) => {
            if (!query.trim()) {
                setSuggestions([]);
                setError("");
                return;
            }

            setIsLoading(true);
            setError("");

            try {
                const { data } = await axios.get(`${urlConfig}/searchGooglePlaces`, {
                    params: { input: query },
                });

                const results = Array.isArray(data) ? data : data.predictions || [];

                setSuggestions(results);

                if (selectFirst && results.length > 0) {
                    handleSelect(results[0]);
                }
            } catch (error) {
                console.error("Google Places error:", error);
                setSuggestions([]);
                setError("Failed to load suggestions. Please try again.");
            } finally {
                setIsLoading(false);
            }
        },
        300,
        [urlConfig, handleSelect],
    );

    useEffect(() => {
        if (initialValue && !initialFetchDoneRef.current) {
            initialFetchDoneRef.current = true;
            fetchSuggestions(initialValue, true);
        }
    }, [initialValue, fetchSuggestions]);

    useClickAway(() => {
        setShowDropdown(false);
    }, dropdownRef);

    return (
        <div ref={dropdownRef} className="relative">
            <Input type="text" value={inputValue} placeholder="Search place..." onChange={handleInputChange} />
            {showDropdown && (
                <div className="absolute z-10 max-h-65 w-full overflow-y-auto rounded-md border border-gray bg-white shadow-lg">
                    {isLoading && <div className="text-gray-dark px-3 py-2">Loading...</div>}
                    {!isLoading && suggestions.length === 0 && (
                        <div className="text-gray-dark px-3 py-2">No results</div>
                    )}
                    {!isLoading &&
                        suggestions.map((suggestion) => (
                            <div
                                key={suggestion.place_id}
                                className="flex cursor-pointer flex-col gap-2 border-b border-gray bg-white px-3 py-2 hover:bg-gray-light hover:text-blue-light"
                                onClick={() => handleSelect(suggestion)}
                            >
                                <div className="flex flex-wrap items-center gap-1">
                                    <p className="mr-2 whitespace-nowrap text-md">{suggestion.description || suggestion.name}</p>
                                    {(suggestion.types || []).slice(0, 4).map((type) => (
                                        <Badge key={type} color="secondary">
                                            {startCase(type)}
                                        </Badge>
                                    ))}
                                </div>
                                {suggestion.formatted_address && <p>{suggestion.formatted_address}</p>}
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
    urlConfig: PropTypes.string.isRequired,
};

GooglePlacesAutocomplete.defaultProps = {
    initialValue: "",
    onSelect: null,
};

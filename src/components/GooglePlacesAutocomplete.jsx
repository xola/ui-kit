import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { startCase } from "lodash";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { useClickAway } from "ahooks";
import { Input } from "./Forms/Input";
import { Badge } from "./Badge";

export const GooglePlacesAutocomplete = ({ initialValue, onSelect, apiBaseUrl, remoteId }) => {
    const [inputValue, setInputValue] = useState(initialValue || "");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState("");
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const activeSuggestionId = suggestions[activeSuggestionIndex]?.place_id
        ? `autocomplete-item-${activeSuggestionIndex}`
        : undefined;

    const dropdownRef = useRef(null);
    const initialFetchDoneRef = useRef(false);
    const remoteIdRef = useRef(remoteId);

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

    const handleKeyDown = (e) => {
        if (!showDropdown || suggestions.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveSuggestionIndex((previous) => (previous + 1) % suggestions.length);
                break;

            case "ArrowUp":
                e.preventDefault();
                setActiveSuggestionIndex((previous) => (previous - 1 + suggestions.length) % suggestions.length);
                break;

            case "Enter":
                e.preventDefault();
                handleSelect(suggestions[activeSuggestionIndex]);
                break;

            case "Escape":
                setShowDropdown(false);
                break;

            default:
                break;
        }
    };

    const fetchSuggestions = useDebouncedCallback(
        async (query, selectMatchingId = null) => {
            if (!query.trim()) {
                setSuggestions([]);
                setError("");
                return;
            }

            setIsLoading(true);
            setError("");

            try {
                const { data } = await axios.get(`${apiBaseUrl}/searchGooglePlaces`, {
                    params: { input: query },
                });

                const results = Array.isArray(data) ? data : data.predictions || [];

                setSuggestions(results);

                if (selectMatchingId) {
                    const matchingIndex = results.findIndex(
                        (result) => result.place_id === selectMatchingId,
                    );
                    if (matchingIndex !== -1) {
                        setActiveSuggestionIndex(matchingIndex);
                        handleSelect(results[matchingIndex]);
                    }
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
        [apiBaseUrl],
    );

    useEffect(() => {
        if (initialValue && !initialFetchDoneRef.current) {
            initialFetchDoneRef.current = true;
            fetchSuggestions(initialValue, remoteIdRef.current);
        }
    }, [initialValue, fetchSuggestions]);

    useClickAway(() => {
        setShowDropdown(false);
    }, dropdownRef);

    return (
        <div ref={dropdownRef} className="relative">
            <Input
                type="text"
                role="combobox"
                aria-expanded={showDropdown}
                aria-controls="autocomplete-list"
                aria-activedescendant={activeSuggestionId || undefined}
                aria-autocomplete="list"
                value={inputValue}
                placeholder="Search place..."
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            {showDropdown && (
                <div
                    className="absolute z-10 max-h-65 w-full overflow-y-auto rounded-md border border-gray bg-white shadow-lg"
                    role="listbox"
                >
                    {isLoading ? (
                        <div className="px-3 py-2 text-gray-dark">Loading...</div>
                    ) : error ? (
                        <div className="px-3 py-2 text-gray-dark">{error}</div>
                    ) : suggestions.length === 0 ? (
                        <div className="px-3 py-2 text-gray-dark">No results</div>
                    ) : (
                        suggestions.map((suggestion, index) => (
                            <div
                                key={suggestion.place_id}
                                className="flex cursor-pointer flex-col gap-2 border-b border-gray bg-white px-3 py-2 hover:bg-gray-light hover:text-blue-light"
                                onClick={() => handleSelect(suggestion)}
                                onMouseEnter={() => setActiveSuggestionIndex(index)}
                            >
                                <div className="flex flex-wrap items-center gap-1">
                                    <p className="mr-2 whitespace-nowrap text-md">
                                        {suggestion.description || suggestion.name}
                                    </p>
                                    {(suggestion.types || []).slice(0, 4).map((type) => (
                                        <Badge key={type} color="secondary">
                                            {startCase(type)}
                                        </Badge>
                                    ))}
                                </div>
                                {suggestion.formatted_address && <p>{suggestion.formatted_address}</p>}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

GooglePlacesAutocomplete.propTypes = {
    initialValue: PropTypes.string,
    onSelect: PropTypes.func,
    apiBaseUrl: PropTypes.string.isRequired,
    remoteId: PropTypes.string,
};

GooglePlacesAutocomplete.defaultProps = {
    initialValue: "",
    onSelect: null,
    remoteId: null,
};

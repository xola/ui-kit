// PlaceAutocomplete.jsx

import React, { useEffect, useRef } from "react";

export function PlaceAutocomplete({
    apiKey,
    placeholder = "...",
    onPlaceSelect = (place) => console.log(place),
    className = "",
    style = {},
}) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            return;
        }

        if (!inputRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            fields: ["place_id", "geometry", "formatted_address", "name"],
            types: ["geocode"],
        });

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place) {
                onPlaceSelect(place);
            }
        });
    }, [apiKey]);

    return <input ref={inputRef} type="text" placeholder={placeholder} className={className} style={style} />;
}

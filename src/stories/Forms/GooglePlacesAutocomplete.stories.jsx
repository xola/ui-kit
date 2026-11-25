import React from "react";
import { expect } from "storybook/test";
import { GooglePlacesAutocomplete } from "../..";

const GooglePlacesAutocompleteStories = {
    title: "Forms & Fields/GooglePlacesAutocomplete",
    component: GooglePlacesAutocomplete,
    parameters: {
        docs: {
            description: {
                component:
                    "Place search input backed by the Xola API `searchGooglePlaces` endpoint. Stories never type or pass an initial value, so no request is made.",
            },
        },
    },
};

export const NoOptionalProps = () => {
    return <GooglePlacesAutocomplete apiBaseUrl="http://localhost" />;
};

NoOptionalProps.play = async ({ canvas }) => {
    const input = canvas.getByRole("combobox");
    await expect(input).toHaveValue("");
    await expect(input).toHaveAttribute("placeholder", "Search place...");
    await expect(input).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByRole("listbox")).not.toBeInTheDocument();
};

export default GooglePlacesAutocompleteStories;

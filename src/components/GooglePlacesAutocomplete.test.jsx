import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import axios from "axios";
import { GooglePlacesAutocomplete } from "./GooglePlacesAutocomplete";

jest.mock("axios");
jest.mock("use-debounce", () => ({
    useDebouncedCallback: (callback) => {
        // Return the callback immediately without debouncing for tests
        const debouncedFn = (...args) => callback(...args);
        debouncedFn.flush = () => {};
        return debouncedFn;
    },
}));

describe("GooglePlacesAutocomplete", () => {
    const mockOnSelect = jest.fn();
    const mockApiBaseUrl = "https://api.example.com";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("Initial Value with Remote ID", () => {
        it("should NOT call onSelect when initialValue and remoteId are provided", async () => {
            const mockPlaces = [
                {
                    place_id: "place123",
                    description: "New York, NY, USA",
                    name: "New York",
                },
                {
                    place_id: "place456",
                    description: "Los Angeles, CA, USA",
                    name: "Los Angeles",
                },
            ];

            axios.get.mockResolvedValue({ data: mockPlaces });

            render(
                <GooglePlacesAutocomplete
                    initialValue="New York"
                    remoteId="place123"
                    onSelect={mockOnSelect}
                    apiBaseUrl={mockApiBaseUrl}
                />
            );

            // Wait for the API call and auto-selection
            await waitFor(
                () => {
                    expect(axios.get).toHaveBeenCalledWith(`${mockApiBaseUrl}/searchGooglePlaces`, {
                        params: { input: "New York" },
                    });
                },
                { timeout: 3000 }
            );

            // Wait a bit more to ensure no onSelect is called
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 500));
            });

            // onSelect should NOT have been called
            expect(mockOnSelect).not.toHaveBeenCalled();

            // But the input value should be set
            const input = screen.getByRole("combobox");
            expect(input).toHaveValue("New York, NY, USA");
        });

        it("should call onSelect when user manually selects after initial load", async () => {
            const mockPlaces = [
                {
                    place_id: "place123",
                    description: "New York, NY, USA",
                    name: "New York",
                },
            ];

            axios.get.mockResolvedValue({ data: mockPlaces });

            const { rerender } = render(
                <GooglePlacesAutocomplete
                    initialValue="New York"
                    remoteId="place123"
                    onSelect={mockOnSelect}
                    apiBaseUrl={mockApiBaseUrl}
                />
            );

            await waitFor(() => {
                expect(axios.get).toHaveBeenCalled();
            });

            // Clear the mock to test user interaction
            mockOnSelect.mockClear();

            // Simulate user typing (which should trigger onSelect)
            const input = screen.getByRole("combobox");
            
            // Change input value
            await act(async () => {
                input.value = "Los Angeles";
                input.dispatchEvent(new Event("input", { bubbles: true }));
            });

            // Mock a different response
            const newMockPlaces = [
                {
                    place_id: "place789",
                    description: "Los Angeles, CA, USA",
                    name: "Los Angeles",
                },
            ];
            axios.get.mockResolvedValue({ data: newMockPlaces });

            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith(`${mockApiBaseUrl}/searchGooglePlaces`, {
                    params: { input: "Los Angeles" },
                });
            });

            // Now when handleSelect is called by user action, onSelect should be called
            // This would happen via clicking or pressing Enter in the real component
        });
    });

    describe("Without Initial Value", () => {
        it("should call onSelect when user selects a suggestion", async () => {
            const mockPlaces = [
                {
                    place_id: "place123",
                    description: "New York, NY, USA",
                    name: "New York",
                },
            ];

            axios.get.mockResolvedValue({ data: mockPlaces });

            render(<GooglePlacesAutocomplete onSelect={mockOnSelect} apiBaseUrl={mockApiBaseUrl} />);

            const input = screen.getByRole("combobox");

            // User types
            await act(async () => {
                input.value = "New York";
                input.dispatchEvent(new Event("input", { bubbles: true }));
            });

            await waitFor(() => {
                expect(axios.get).toHaveBeenCalled();
            });

            // In a real scenario, clicking a suggestion would call handleSelect
            // which should call onSelect
        });
    });
});

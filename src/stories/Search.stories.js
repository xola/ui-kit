import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { Search } from "..";

export default {
    title: "Search",
    component: Search,
    parameters: {
        docs: {
            description: {
                component: "The ultimate search box with a lot of flexibility",
            },
        },
    },
    argTypes: {
        idLength: {
            description: "Describe the length of the ID that will allow the search to auto-dump",
            defaultValue: 24,
            control: { type: "number" },
            table: {
                type: { summary: null },
                defaultValue: { summary: 24 },
            },
        },
        size: {
            description: "The size of the search box",
            defaultValue: "full",
            control: { type: "select" },
            options: ["small", "medium", "large", "full"],
            table: {
                type: { summary: null },
                defaultValue: { summary: "full" },
            },
        },
        placeholder: {
            description: "The placeholder text for the search box",
            defaultValue: "Customer name or tag",
            control: { type: "text" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "Customer name or tag" },
            },
        },
        previewEnabled: {
            description: "If a preview of the search results should be shown",
            control: { type: "boolean" },
            defaultValue: true,
            table: {
                type: { summary: null },
                defaultValue: { summary: true },
            },
        },
        searchFn: {
            description: "This function is required to make an API call and return the results to the search component",
            type: { required: true },
            control: { type: "function" },
        },
        onClear: {
            description: "Callback invoked when the text field is cleared",
            control: { type: "function" },
        },
        onSelect: {
            description: "Callback invoked when with the results of the search",
            type: { required: true },
            control: { type: "function" },
        },
        resultItem: {
            description:
                "This function should return React elements to describe the elements of search results in the preview dropdown. Not required if `previewEnabled` is `false`",
            type: { required: true },
            control: { type: "function" },
        },
    },
};

export const Default = ({ idLength = 20, previewEnabled = true, size = "full" }) => {
    const [matchingRecords, setMatchingRecord] = useState([]);

    const searchFn = async (term) => {
        setMatchingRecord([]);
        const results = await fetch("https://dummyapi.io/data/api/user?limit=10", {
            headers: { "app-id": "lTE5abbDxdjGplutvTuc" }, // Some random dude's API key
        });

        const resp = await results.json();
        setMatchingRecord(resp.data);
        return resp.data;
    };

    const resultItem = (key, ref, result, isActive) => {
        const onClickItem = (e) => {
            const resultId = e.target.getAttribute("data-id");
            const record = matchingRecords.filter((r) => r.id === resultId);
            setMatchingRecord(record);
        };

        return (
            <li
                key={key}
                data-id={result.id}
                onClick={onClickItem}
                className={clsx("group p-2 text-black hover:text-white hover:bg-blue-light flex hover:cursor-pointer", {
                    "bg-blue-light text-white p-2": isActive,
                })}
                ref={ref}
            >
                <div className="flex">
                    <img className="rounded-full w-12 h-12" src={result.picture} />
                    <div className="pl-3">
                        <div>
                            {result.firstName} {result.lastName}
                        </div>
                        <div
                            className={clsx(
                                "text-sm",
                                isActive ? "text-white" : "text-gray-dark",
                                "group-hover:text-white",
                            )}
                        >
                            {result.email}
                        </div>
                    </div>
                </div>
            </li>
        );
    };

    const onSelect = (selectedItem) => {
        // console.log('onSelect', selectedItem);
        if (previewEnabled && selectedItem && selectedItem !== "all") {
            setMatchingRecord(selectedItem);
        }
    };

    const onClear = () => console.info("Search term cleared");

    return (
        <>
            <Search
                size={size}
                searchFn={searchFn}
                idLength={idLength}
                previewEnabled={previewEnabled}
                resultItem={resultItem}
                onSelect={onSelect}
                onClear={onClear}
            />
            <div className="my-5 search-results">
                <div className="text-xl pb-2">Search Results ({matchingRecords.length})</div>
                <div className="search-data whitespace-pre font-mono">
                    {matchingRecords && matchingRecords.length > 0 && JSON.stringify(matchingRecords, null, 4)}
                </div>
            </div>
        </>
    );
};

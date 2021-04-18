import React, { useState, useEffect } from "react";
import { Search } from "..";

export default {
    title: "Search",
    component: Search,
    parameters: {
        docs: {
            description: {
                component: "The ultimate search box",
            },
        },
    },
};

export const Default = () => {
    const [matchingRecords, setMatchingRecord] = useState([]);
    const previewEnabled = true;

    const searchFn = async (term) => {
        setMatchingRecord([]);
        const results = await fetch("https://dummyapi.io/data/api/user?limit=50", {
            headers: { "app-id": "lTE5abbDxdjGplutvTuc" },
        });

        const resp = await results.json();
        setMatchingRecord(resp.data);
        return resp.data;
    };

    const onSelect = (selectedItem) => {
        // console.log('onSelect', selectedItem);
        if (previewEnabled && selectedItem && selectedItem !== "all") {
            setMatchingRecord(selectedItem);
        }
    };

    const onClear = () => console.info("Search term cleared");

    // TODO: Story should specify the way to format a record (give a component)
    // TODO: Shortcut key display & binding

    return (
        <>
            <Search searchFn={searchFn} idLength={20} previewEnabled={true} onSelect={onSelect} onClear={onClear} />
            <div className="my-5 search-results">
                <div className="text-xl pb-2">Search Results ({matchingRecords.length})</div>
                <div className="search-data whitespace-pre font-mono">
                    {matchingRecords && matchingRecords.length > 0 && JSON.stringify(matchingRecords, null, 4)}
                </div>
            </div>
        </>
    );
};

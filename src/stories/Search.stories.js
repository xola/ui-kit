import { result } from "lodash";
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
    const [searchResults, setSearchResults] = useState([]); // The results of your search
    const [matchingRecord, setMatchingRecord] = useState(null); // The one item you selected from your search
    const previewEnabled = false;

    const searchFn = async (term) => {
        console.log("searchFn Searching for", term);
        setSearchResults([]);
        const results = await fetch("https://dummyapi.io/data/api/user?limit=50", {
            headers: { "app-id": "lTE5abbDxdjGplutvTuc" },
        });

        const resp = await results.json();
        setSearchResults(resp.data);
        return resp.data;
    };

    const getSearchItem = (id) => searchResults.filter((e) => e.id == id);

    useEffect(() => {
        if (matchingRecord && searchResults.length > 0) {
            setSearchResults([getSearchItem(matchingRecord)]);
            setMatchingRecord(null); // Prevent infinite loop inside useEffect
        }
    }, [searchResults, matchingRecord]);

    const onSelect = (selectedItem) => {
        if (previewEnabled && selectedItem !== "all") {
            setMatchingRecord(selectedItem);
            const searchResult = getSearchItem(selectedItem);
            if (searchResult) {
                setSearchResults(searchResult);
            }
        }
    };

    const onClear = () => console.info("Search term cleared");

    // TODO: Story should specify the way to format a record (give a component)
    // TODO: Shortcut key display & binding
    // TODO: Search spinner

    return (
        <>
            <Search searchFn={searchFn} idLength={20} previewEnabled={previewEnabled} onSelect={onSelect} onClear={onClear} />
            <div className="my-5 search-results">
                <div className="text-xl pb-2">Search Results</div>
                <div className="search-data whitespace-pre font-mono">
                    {searchResults && searchResults.length > 0 && JSON.stringify(searchResults, null, 4)}
                </div>
            </div>
        </>
    );
};

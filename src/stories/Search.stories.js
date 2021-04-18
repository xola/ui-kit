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
    const [searchResults, setSearchResults] = useState([]);
    const [matchingRecord, setMatchingRecord] = useState(null);

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

    const getSearchItem = (id) => searchResults.find((e) => e.id == id);

    useEffect(() => {
        if (matchingRecord && searchResults.length > 0) {
            setSearchResults([getSearchItem(matchingRecord)]);
            setMatchingRecord(null); // Prevent infinite loop inside useEffect
        }
    }, [searchResults, matchingRecord]);

    const onSelect = (selectedItem) => {
        if (selectedItem !== "all") {
            setMatchingRecord(selectedItem);
            const searchResult = searchResults && getSearchItem(selectedItem);
            if (searchResult) {
                setSearchResults([searchResult]);
            }
        }
    };

    // TODO: Search without the drop down - old school Xola.
    // TODO: Story should specify the way to format a record (give a component)
    // TODO: Shortcut key display & binding
    // TODO: Search spinner

    return (
        <>
            <Search searchFn={searchFn} idLength={20} onSelect={onSelect} />
            <div className="my-5 search-results">
                <div className="text-xl pb-2">Search Results</div>
                <div className="search-data whitespace-pre font-mono">
                    {searchResults && searchResults.length > 0 && JSON.stringify(searchResults, null, 4)}
                </div>
            </div>
        </>
    );
};

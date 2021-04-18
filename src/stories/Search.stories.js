import clsx from "clsx";
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
            const record = matchingRecords.filter(r => r.id === resultId);
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

    // TODO: Shortcut key display & binding

    return (
        <>
            <Search
                searchFn={searchFn}
                idLength={20}
                previewEnabled={true}
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

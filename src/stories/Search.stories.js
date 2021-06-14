import clsx from "clsx";
import React, { useState } from "react";
import { Search } from "..";

const SearchStories = {
    title: "Components/Search",
};

const fetchUsers = async (search) => {
    const results = await fetch("https://dummyapi.io/data/api/user?limit=100", {
        headers: { "app-id": "lTE5abbDxdjGplutvTuc" }, // Some random dude's API key.
    });

    const response = await results.json();
    return response.data.filter((user) => JSON.stringify(user).toLowerCase().includes(search.toLowerCase()));
};

export const Default = () => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    const handleSelect = (item) => {
        console.log(`You selected "${item.firstName}"`);
    };

    const handleSubmit = (inputValue) => {
        console.log(`You submitted "${inputValue}"`);
    };

    const handleType = async (inputValue) => {
        setLoading(true);
        setItems([]);
        const items = await fetchUsers(inputValue);
        setItems(items);
        setLoading(false);
    };

    return (
        <Search
            className="!border !border-gray-lighter"
            items={items}
            loading={loading}
            onChange={handleType}
            onSubmit={handleSubmit}
            onSelect={handleSelect}
        >
            {(item, active) => (
                <div
                    className={clsx(
                        "group p-2 flex cursor-pointer",
                        active ? "bg-blue-light text-white p-2" : "text-black",
                    )}
                >
                    <img className="w-12 h-12 rounded-full" src={item.picture} />

                    <div className="pl-3">
                        <div>
                            {item.firstName} {item.lastName}
                        </div>

                        <div
                            className={clsx(
                                "text-sm",
                                active ? "text-white" : "text-gray-dark",
                                "group-hover:text-white",
                            )}
                        >
                            {item.email}
                        </div>
                    </div>
                </div>
            )}
        </Search>
    );
};

export const Simple = () => {
    const handleSubmit = (inputValue) => {
        console.log(`You submitted "${inputValue}"`);
    };

    return <Search onSubmit={handleSubmit} />;
};

export default SearchStories;

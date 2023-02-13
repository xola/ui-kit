import clsx from "clsx";
import React, { useState } from "react";
import { Search } from "../..";

const SearchStories = {
    title: "Other/Search",
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7839%3A479666&viewport=6893%2C-4568%2C0.71",
        },
    },
};

const fetchUsers = async (search) => {
    const results = await fetch("https://xola.com/api/sellers", {
        headers: { "X-API-KEY": "" }, // Some random dude's API key.
    });

    const response = await results.json();
    return response.data.filter((user) => JSON.stringify(user).toLowerCase().includes(search.toLowerCase()));
};

export const Default = () => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    const handleSelect = (item) => {
        console.log(`You selected "${item.name}"`);
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
            isLoading={loading}
            onChange={handleType}
            onSubmit={handleSubmit}
            onSelect={handleSelect}
        >
            {(item, active) => (
                <div
                    className={clsx(
                        "group flex cursor-pointer p-2",
                        active ? "bg-blue-light p-2 text-white" : "text-black",
                    )}
                >
                    <img className="h-12 w-12 rounded-full" src={item.picture} />

                    <div className="pl-3">
                        <div>{item.name}</div>

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

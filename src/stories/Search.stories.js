import React from "react";
import employees from "./data.json";
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

const getEmployee = (id) => employees.find((e) => e.id == id);

export const Default = () => {
    const onSelect = (results) => {
        // console.log("Got results", results);
        if (results == "all") {
            document.querySelector(".search-data").innerHTML = JSON.stringify(employees, null, 4);
        } else {
            const employee = getEmployee(results);
            document.querySelector(".search-data").innerHTML = JSON.stringify(employee, null, 4);
        }
    };

    const searchFn = (term) => {
        console.log("Searching for", term);
        return new Promise((resolve) => setTimeout(() => resolve(employees), 2000));
    };

    return (
        <>
            <Search searchFn={searchFn} idLength={4} onSelect={onSelect} />
            <div className="my-5 search-results">
                <div className="text-xl">Search Results</div>
                <div className="search-data whitespace-pre font-mono">
                    <span className="font-sans text-sm">The result will come here</span>
                </div>
            </div>
        </>
    );
};

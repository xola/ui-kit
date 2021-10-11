import React from "react";
import clsx from "clsx";
import { Select, Label, FormGroup, Currency } from "../..";

const SelectStories = {
    primary: true,
    title: "Forms & Fields/Select",
    parameters: {
        docs: {
            description: {
                component:
                    "Re-export of React Select library with Xola styles applied. Check React Select documentation for more info: https://react-select.com",
            },
        },
    },
};

export const Default = () => {
    const options = [
        { value: 1, label: "5% OFF" },
        { value: 2, label: "10% OFF" },
    ];

    return (
        <div className="h-40">
            <FormGroup>
                <Label>Apply Coupon</Label>
                <Select options={options} />
            </FormGroup>
        </div>
    );
};

export const Searchable = () => {
    const options = [
        { value: 1, label: "5% OFF" },
        { value: 2, label: "10% OFF" },
    ];

    return (
        <div className="h-40">
            <FormGroup>
                <Label>Apply Coupon</Label>
                <Select isSearchable options={options} />
            </FormGroup>
        </div>
    );
};

export const UseCustomSchemaAsOptions = () => {
    const options = [
        { id: 1, name: "Experience 1" },
        { id: 2, name: "Experience 2" },
    ];

    return (
        <div className="h-40">
            <FormGroup>
                <Label>Select Experience</Label>

                <Select
                    isSearchable
                    options={options}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                />
            </FormGroup>
        </div>
    );
};

export const RenderCustomOptionItems = () => {
    const options = [
        { id: 1, name: "Experience 1", description: "Lorem ipsum", price: 123.45 },
        { id: 2, name: "Experience 2", description: "Dolor sit amet", price: 456.78 },
    ];

    const Option = ({ innerProps, innerRef, label, data, isSelected, isFocused }) => (
        <div
            ref={innerRef}
            className={clsx(
                "flex items-center p-4 border-b border-gray-light",
                isSelected && "text-white bg-success-dark",
                !isSelected && isFocused && "bg-success-lighter",
            )}
            {...innerProps}
        >
            <div className="mr-auto">
                <p className="font-bold">{label}</p>
                <span className="text-sm text-gray">{data.description}</span>
            </div>

            <Currency currency={data.currency}>{data.price}</Currency>
        </div>
    );

    return (
        <div className="h-60">
            <FormGroup>
                <Label>Select Experience</Label>

                <Select
                    isSearchable
                    options={options}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    components={{ Option }}
                />
            </FormGroup>
        </div>
    );
};

export default SelectStories;

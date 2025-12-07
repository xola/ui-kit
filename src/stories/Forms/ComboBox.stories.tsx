// @ts-nocheck
import clsx from "clsx";
import React from "react";
import { ComboBox, Currency, FormGroup, Label } from "../..";

const ComboBoxStories = {
    primary: true,
    title: "Forms & Fields/ComboBox",
    args: {
        isCreatable: "boolean",
        isMulti: "boolean",
        closeMenuOnSelect: "boolean",
    },
    argTypes: {
        isCreatable: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: false },
            },
        },
        isMulti: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: false },
            },
        },
        closeMenuOnSelect: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: false },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Re-export of React Select library with Xola styles applied. Check React Select documentation for more info: https://react-select.com",
            },
        },
    },
};

export const Default = ({ isCreatable = false, isMulti = false }) => {
    const options = [
        { value: 1, label: "5% OFF" },
        { value: 2, label: "10% OFF" },
    ];

    return (
        <div className="h-40">
            <FormGroup>
                <Label>Apply Coupon</Label>
                <ComboBox isCreatable={isCreatable} isMulti={isMulti} options={options} />
            </FormGroup>
        </div>
    );
};

export const TagsCreator = () => {
    const tags = [
        { value: 1, label: "5% OFF" },
        { value: 2, label: "10% OFF" },
    ];

    return (
        <div className="h-40">
            <FormGroup>
                <Label>Booking Tags</Label>
                <ComboBox
                    isCreatable
                    isMulti
                    closeMenuOnSelect
                    options={tags}
                    defaultValue={tags}
                    placeholder="Add tag"
                />
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

                <ComboBox
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
                "flex items-center border-b border-gray-light p-4",
                isSelected && "bg-success-dark text-white",
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

                <ComboBox
                    options={options}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    components={{ Option }}
                />
            </FormGroup>
        </div>
    );
};

export default ComboBoxStories;

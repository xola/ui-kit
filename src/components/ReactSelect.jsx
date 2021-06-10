import React, { Fragment } from "react";
import clsx from "clsx";
import _ from "lodash";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";
import { data } from "autoprefixer";

const sizes = {
    small: "w-32",
    medium: "w-64",
    large: "w-72",
    xlarge: "w-96",
    full: "w-full",
};

// export const Search = ({ className, placeholder = "Order ID, Name or tag", size = "full" }) => {
//     return (
//         <input
//             type="search"
//             placeholder={placeholder}
//             className={clsx(className, sizes[size], "rounded border border-gray placeholder-gray")}
//         />
//     );
// };

// const loadOptions = (inputValue) => {
//     // console.log("Searching for", inputValue, new Date());
//     if (inputValue.length === 3) {
//     }
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(options);
//             resolve(options);
//         }, 2000);
//     });
// };

const DropdownIndicatorStyles = (base, state) => ({
    ...base,
    display: "none",
});

const IndicatorSeparatorStyles = (base, state) => ({
    ...base,
    display: "none",
});

const ValueContainerStyles = (base, state) => ({
    ...base,
    // color: 'green',
    // border: '2px solid red'
});

const ClearIndicatorStyles = (base, state) => ({
    ...base,
    cursor: "pointer",
});

const Input = (props) => {
    if (props.isHidden) {
        return <components.Input {...props} />;
    }

    return (
        <div className="">
            <components.Input {...props} className="focus:ring-transparent" />
        </div>
    );
};

function getLength(options) {
    return options.reduce((accumulator, current) => {
        if (current.options) return accumulator + getLength(current.options);
        return accumulator + 1;
    }, 0);
}

const menuHeaderStyle = {
    padding: "8px 12px",
};

const Menu = (props) => {
    const optionsLength = getLength(props.options);
    if (optionsLength === 0) {
        return <></>;
    }

    return (
        <>
            {/* <div style={menuHeaderStyle}>Custom Menu with {optionsLength} options</div> */}
            <components.Menu {...props}>{props.children}</components.Menu>
        </>
    );
};

const menuItemHeaderStyle = {
    padding: "8px 12px",
    background: "blue",
    color: "white",
};

const MenuList = (props) => {
    return (
        <components.MenuList {...props}>
            <div style={menuItemHeaderStyle}>Custom Menu List</div>
            {props.children}
        </components.MenuList>
    );
};

const controlStyles = {
    border: 0,
    boxShadow: "none",
    // padding: "5px",
    // background: "blue",
    // color: "white",
};

const ControlComponent = (props) => (
    <div style={controlStyles}>
        {/* {<p>Custom Control</p>} */}
        <components.Control {...props} />
    </div>
);

const handleInputChange = _.debounce((newValue) => {
    console.log("handle input change", newValue);
}, 500);

const onChange = (selected) => {
    console.log("Selected", selected);
};

export const Search = () => {
    return (
        <AsyncSelect
            closeMenuOnSelect
            // components={{ ClearIndicator }}
            isClearable
            // components={{ Menu, Control: ControlComponent }}
            // styles={{ clearIndicator: ClearIndicatorStyles }}
            components={{ Input, Menu }}
            placeholder="Customer name or tag"
            // styles={customStyles}
            // defaultValue={[options[1]]}
            styles={{
                dropdownIndicator: DropdownIndicatorStyles,
                indicatorSeparator: IndicatorSeparatorStyles,
                valueContainer: ValueContainerStyles,
                clearIndicator: ClearIndicatorStyles,
            }}
            loadOptions={loadOptions}
            formatOptionLabel={formatOptionLabel}
            onInputChange={handleInputChange}
            onChange={onChange}
        />
    );
};

const options = [
    { value: "chocolate", label: "Chocolate <b>Cake</b> <br>Foo" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const loadOptions = _.debounce((inputValue, callback) => {
    setTimeout(() => {
        console.log("calling back", inputValue, options);
        callback(options);
    }, 1000);
}, 500);

const formatOptionLabel = (option) => {
    return <span className="" dangerouslySetInnerHTML={{ __html: option.label }} />;
};

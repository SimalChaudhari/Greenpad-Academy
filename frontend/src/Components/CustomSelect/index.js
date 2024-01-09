import React from "react";
import Select, { OptionsType, ValueType } from "react-select";

const CustomSelect = ({
    name,
    options,
    value,
    onChange,
    placeholder,
    isMulti = false
}) => {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: "4px",
            border: "1px solid #cccccc",
            boxShadow: "none",
            "&:hover": {
                border: "1px solid #cccccc",
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#007bff" : "white",
            color: state.isSelected ? "white" : "black",
            "&:hover": {
                backgroundColor: state.isSelected ? "#007bff" : "#f8f9fa",
                color: state.isSelected ? "white" : "black",
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#007bff",
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "white",
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "white",
            "&:hover": {
                backgroundColor: "#0056b3",
            },
        }),
    };

    return (
        <Select
            name={name}
            options={options}
            value={value}
            onChange={onChange}
            isMulti={isMulti}
            styles={customStyles}
            placeholder={placeholder}
        />
    );
};

export default CustomSelect;

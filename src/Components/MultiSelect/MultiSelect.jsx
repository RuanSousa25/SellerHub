import React, { useRef } from "react";
import "./MultiSelect.css";

import Select from "react-select";
export default function MultiSelect({
  placeholder,
  options,
  value,
  onChange,
  isDisabled,
}) {
  const valueRef = useRef(value);
  valueRef.current = value;

  const selectAllOption = {
    value: "SELECT_ALL",
    label: "Selecionar todos os sellers",
  };
  const manyValues = {
    value: "MANY_VALUES",
    label: "...",
  };
  const getOptions = () => [selectAllOption, ...options];
  const getValue = () =>
    isDisabled
      ? []
      : isSelectAllSelected()
      ? [selectAllOption]
      : value.length > 7
      ? [manyValues]
      : value;
  const isSelectAllSelected = () => valueRef.current.length === options.length;
  const isOptionSelected = (option) =>
    valueRef.current.some(({ value }) => value === option.value) ||
    isSelectAllSelected();
  function handleSelect(newValue, actionMeta) {
    const { action, option, removedValue } = actionMeta;

    if (action === "select-option" && option.value === selectAllOption.value) {
      onChange(options, actionMeta);
    } else if (
      (action === "deselect-option" &&
        (option.value === selectAllOption.value ||
          option.value === manyValues.value)) ||
      (action === "remove-option" &&
        (removedValue.value === selectAllOption.value ||
          option.value === manyValues.value))
    ) {
      onChange([], actionMeta);
    } else if (action === "deselect-option" && isSelectAllSelected()) {
      onChange(
        options.filter(({ value }) => value !== option.value),
        actionMeta
      );
    } else {
      onChange(newValue || [], actionMeta);
    }
  }

  return (
    <Select
      placeholder={placeholder}
      isOptionSelected={isOptionSelected}
      options={getOptions()}
      value={getValue()}
      onChange={handleSelect}
      isMulti={true}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isDisabled={isDisabled}
      className="select"
      styles={{
        control: (styles) => ({
          ...styles,
        }),
        valueContainer: (styles, state) => ({
          ...styles,
          height: 30,
          padding: "0 6px",
        }),
        input: (styles, state) => ({
          ...styles,
          margin: 0,
        }),
        indicatorSeparator: (styles, state) => ({
          ...styles,
          height: 30,
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
          ...styles,
          backgroundColor: isSelected || isFocused ? "silver" : undefined,
          color: isSelected || isFocused ? "black" : undefined,
        }),
      }}
    />
  );
}

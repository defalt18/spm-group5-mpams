import React, { useCallback, useState } from "react";
import { default as ReactSelect } from "react-select";
import colors from "tailwindcss/colors";
import c from "classnames";

function Select(props) {
  const {
    borderRadius = "1.5rem",
    className,
    handleChange,
    name,
    backgroundColor = colors.gray["200"],
    showCaption = true,
    prefix = "Profession : ",
  } = props;

  const [selectValue, setValue] = useState();
  const handleChangeSelect = useCallback(
    (selectVal) => {
      setValue(selectVal);
      const { value } = selectVal;
      handleChange({ target: { name, value } });
    },
    [handleChange, setValue, name]
  );

  const options = React.useMemo(
    () => [
      { value: "Doctor", label: prefix + "Doctor" },
      { value: "Engineer", label: prefix + "Engineer" },
      { value: "Lawyer", label: prefix + "Lawyer" },
      { value: "Woodwork", label: prefix + "Woodwork" },
      { value: "Finance", label: prefix + "Finance" },
      { value: "Musician", label: prefix + "Musician" },
      { value: "Artist", label: prefix + "Artist" },
    ],
    [prefix]
  );

  const colourStyles = React.useMemo(
    () => ({
      container: (styles) => ({
        ...styles,
        backgroundColor: "transparent",
      }),
      control: (styles) => ({
        ...styles,
        backgroundColor: backgroundColor,
        border: "none",
        borderRadius: borderRadius,
        width: "100%",
      }),
      option: (styles, { isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isSelected
            ? colors.gray["800"]
            : !isFocused
            ? "white"
            : colors.gray["100"],
          color: isDisabled ? "#ccc" : isSelected ? "white" : "black",
          cursor: isDisabled ? "not-allowed" : "default",

          ":active": {
            ...styles[":active"],
            backgroundColor: !isDisabled
              ? isSelected
                ? colors.gray["800"]
                : "white"
              : undefined,
          },
        };
      },
      placeholder: (styles) => ({ ...styles, colors: colors.gray["800"] }),
    }),
    [borderRadius, backgroundColor]
  );
  return (
    <div className={c("flex gap-x-2 items-center", className)}>
      <p className={c("text-lg w-16", showCaption ? "" : "hidden")}>
        Filter by
      </p>
      <ReactSelect
        className="bg-gray-200 flex-1"
        options={options}
        placeholder="Profession"
        styles={colourStyles}
        value={selectValue}
        onChange={handleChangeSelect}
      />
    </div>
  );
}

export default Select;

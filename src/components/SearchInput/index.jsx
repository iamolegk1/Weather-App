import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";

const SearchInput = ({ onChangeHandler, onClickEnter, isClearValue }) => {
  const [inputValue, setInputValue] = useState("");

  const onChangeInputValue = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;

    const formattedValue = value.toString().toLowerCase().trim();
    setInputValue(formattedValue);
  };

  const onPressEnter = (event) => {
    if (event.key === "Enter") {
      onClickEnter();
    }
  };

  useEffect(() => {
    onChangeHandler(inputValue);
    // eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    if (!isClearValue) return;
    setInputValue("");
  }, [isClearValue]);

  return (
    <Input
      type="text"
      value={inputValue}
      onChange={onChangeInputValue}
      onKeyDown={onPressEnter}
      placeholder="Enter the name of the city"
      autoFocus={true}
    />
  );
};

export default SearchInput;

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const SearchButton = ({ onClickHandler, isDisabled }) => {
  return (
    <Box ml={1}>
      <Button
        variant="contained"
        onClick={onClickHandler}
        disabled={isDisabled}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchButton;

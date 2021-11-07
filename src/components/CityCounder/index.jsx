import React from "react";

import Badge from "@mui/material/Badge";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import styles from "./index.module.css";

const CityCounter = ({ value, maxValue = 100 }) => {
  return (
    <Badge
      className={styles.wrapper}
      color="secondary"
      badgeContent={value}
      max={maxValue}
    >
      <LocationCityIcon />
    </Badge>
  );
};
export default CityCounter;

import React, { memo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";

import styles from "./index.module.css";

const CityWeatherCard = ({
  cityName,
  mainWeather,
  weatherDescription,
  wetherIconUrl,
  index,
  onDelete,
  onUpdate,
}) => {
  return (
    <Card sx={{ display: "flex", marginBottom: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
        <CardContent>
          <Typography component="div" variant="h5">
            {cityName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {mainWeather}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {weatherDescription}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia component="img" sx={{ width: "25%" }} image={wetherIconUrl} />
      <Box sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
        <HighlightOffIcon
          className={styles.deleteButton}
          onClick={(event) => onDelete(index, event)}
        />
        <Button
          id={styles.updateButton}
          size="small"
          variant="contained"
          color="primary"
          onClick={(event) => onUpdate(cityName, event)}
        >
          update
        </Button>
      </Box>
    </Card>
  );
};

export default memo(CityWeatherCard);

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const CityWeatherCard = ({
  cityName,
  mainWeather,
  weatherDescription,
  wetherIconUrl,
}) => {
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
      <CardMedia component="img" sx={{ width: 151 }} image={wetherIconUrl} />
    </Card>
  );
};

export default CityWeatherCard;

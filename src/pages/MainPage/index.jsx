import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

import SearchInput from "../../components/SearchInput";
import SearchButton from "../../components/SearchButton";
import CityWeatherCard from "../../components/CityWeaterCard";

import useLocalStorage from "../../hooks/useLocalStorage";

import API from "../../api";

import styles from "./index.module.css";

const MainPage = () => {
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [storage, setStorage] = useLocalStorage("weather", []);

  const onSearch = async () => {
    try {
      const { data } = await API.get(`/data/2.5/weather?q=${cityName}`);
      setStorage([data, ...storage]);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = (index, event) => {
    event.preventDefault();

    const cities = [...storage];
    cities.splice(index, 1);

    setStorage(cities);
  };

  const onUpdate = async (cityName, event) => {
    event.preventDefault();

    try {
      const { data } = await API.get(`/data/2.5/weather?q=${cityName}`);
      const cities = [...storage];
      const cityIndex = cities.findIndex((city) => city.name === cityName);
      cities[cityIndex] = data;

      setStorage(cities);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateAll = async () => {
    try {
      setIsLoading(true);

      const updatedCitiesPromises = storage.map((city) => {
        return API.get(`/data/2.5/weather?q=${city.name}`);
      });
      await Promise.all([...updatedCitiesPromises]).then((result) => {
        const formattedData = result.map((resultItem) => resultItem.data);
        setStorage(formattedData);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteAll = () => {
    setStorage([]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <SearchInput onChangeHandler={setCityName} onClickEnter={onSearch} />
        <SearchButton onClickHandler={onSearch} isDisabled={!cityName} />
      </div>
      <Stack direction="row" spacing={2}>
        <LoadingButton
          onClick={onUpdateAll}
          loading={isLoading}
          loadingIndicator="Loading..."
          variant="outlined"
        >
          update all
        </LoadingButton>
        <Button onClick={onDeleteAll} variant="outlined" color="error">
          delete all
        </Button>
      </Stack>
      <div className={styles.cityWeatherCard}>
        {storage &&
          storage.map((city, index) => {
            return (
              <CityWeatherCard
                cityName={city.name}
                mainWeather={city.weather[0].main}
                weatherDescription={city.weather[0].description}
                wetherIconUrl={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                index={index}
                onDelete={onDelete}
                onUpdate={onUpdate}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MainPage;

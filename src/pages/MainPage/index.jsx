import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

import SearchInput from "../../components/SearchInput";
import SearchButton from "../../components/SearchButton";
import CityWeatherCard from "../../components/CityWeaterCard";
import CityCounter from "../../components/CityCounder";

import useLocalStorage from "../../hooks/useLocalStorage";

import API from "../../api";

import styles from "./index.module.css";

const MainPage = () => {
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClearValue, setIsClearValue] = useState(false);

  const [storage, setStorage] = useLocalStorage("weather", []);

  const onSearch = async () => {
    try {
      const { data } = await API.get(`/data/2.5/weather?q=${cityName}`);
      setStorage([data, ...storage]);
      setIsClearValue(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsClearValue(false);
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

  const asyncFunction = async () => {
    try {
      return await API.get(`/data/2.5/weather?q=${"London"}`);
    } catch (error) {}

    // return new Promise((resolve) => {
    //   const data = API.get(`/data/2.5/weather?q=${"London"}`);
    //   resolve(data);
    // })
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    asyncFunction();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <SearchInput
          onChangeHandler={setCityName}
          onClickEnter={onSearch}
          isClearValue={isClearValue}
        />
        <SearchButton onClickHandler={onSearch} isDisabled={!cityName} />
      </div>
      <Stack direction="row" spacing={2}>
        <CityCounter value={storage.length} />
        <LoadingButton
          onClick={onUpdateAll}
          loading={isLoading}
          loadingIndicator="Loading..."
          variant="outlined"
          disabled={isLoading || !storage.length}
        >
          update all
        </LoadingButton>
        <Button
          onClick={onDeleteAll}
          variant="outlined"
          color="error"
          disabled={isLoading || !storage.length}
        >
          delete all
        </Button>
      </Stack>
      <div className={styles.cityWeatherCard}>
        {storage &&
          storage.map((city, index) => {
            return (
              <CityWeatherCard
                cityName={city.name}
                cityTemp={`${Math.round(city.main.temp)}°`}
                mainWeather={city.weather[0].main}
                weatherDescription={city.weather[0].description}
                weatherIconUrl={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
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

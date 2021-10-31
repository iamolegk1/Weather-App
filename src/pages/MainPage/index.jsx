import React, { useState } from "react";

import SearchInput from "../../components/SearchInput";
import SearchButton from "../../components/SearchButton";
import CityWeatherCard from "../../components/CityWeaterCard";

import API from "../../api";

import styles from "./index.module.css";

const MainPage = () => {
  const [cityName, setCityName] = useState("");
  const [cityWeather, setCityWeather] = useState(null);

  const onSearch = async () => {
    try {
      const { data } = await API.get(`/data/2.5/weather?q=${cityName}`);
      setCityWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <SearchInput onChangeHandler={setCityName} onClickEnter={onSearch} />
        <SearchButton onClickHandler={onSearch} isDisabled={!cityName} />
      </div>
      <div className={styles.cityWeatherCard}>
        {cityWeather && (
          <CityWeatherCard
            cityName={cityWeather.name}
            mainWeather={cityWeather.weather[0].main}
            weatherDescription={cityWeather.weather[0].description}
            wetherIconUrl={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;

import React, { useState } from "react";

import SearchInput from "../../components/SearchInput";
import SearchButton from "../../components/SearchButton";
import CityWeatherCard from "../../components/CityWeaterCard";

import useLocalStorage from "../../hooks/useLocalStorage";

import API from "../../api";

import styles from "./index.module.css";

const MainPage = () => {
  const [cityName, setCityName] = useState("");

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <SearchInput onChangeHandler={setCityName} onClickEnter={onSearch} />
        <SearchButton onClickHandler={onSearch} isDisabled={!cityName} />
      </div>
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
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MainPage;

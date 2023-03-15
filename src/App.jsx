import "./App.css";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";
// import SwitchThemeBtn from "./Components/SwitchThemeBtn";
import { getMoment, findLocation } from "./utils/helpers";
import WeatherCard from "./Views/WeatherCard";
import useWeatherAPI from "./Hooks/useWeather";
import WeatherSettings from "./Views/WeatherSettings";

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282",
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc",
  },
};

const AUTHORIZATION_KEY = "CWB-689BD5E1-14FC-4A67-821A-1B1CF08E5979";

function App() {
  const storageCity = localStorage.getItem("cityName") || "臺北市";

  const [currentCity, setCurrentCity] = useState(storageCity);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [currentPage, setCurrentPage] = useState("WeatherCard");

  const handleCurrentPageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };
  const handleCurrentCityChange = (currentCity) => {
    setCurrentCity(currentCity);
  };

  const currentLocation = useMemo(
    () => findLocation(currentCity),
    [currentCity]
  );

  const { cityName, locationName, sunriseCityName } = currentLocation;

  const [weatherElement, fetchData] = useWeatherAPI({
    locationName,
    cityName,
    authorizationKey: AUTHORIZATION_KEY,
  });

  const moment = useMemo(() => getMoment(sunriseCityName), [sunriseCityName]);

  useEffect(() => {
    setCurrentTheme(moment === "day" ? "light" : "dark");
  }, [moment]); //根據天氣更換主題

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === "WeatherCard" && (
          <WeatherCard
            cityName={cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            handleCurrentPageChange={handleCurrentPageChange}
          />
        )}
        {currentPage === "WeatherSetting" && (
          <WeatherSettings
            cityName={cityName}
            handleCurrentCityChange={handleCurrentCityChange}
            handleCurrentPageChange={handleCurrentPageChange}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;

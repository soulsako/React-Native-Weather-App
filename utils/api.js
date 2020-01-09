import axios from "axios";

export const fetchWOEID = async city => {
  const response = await axios.get(
    `https://www.metaweather.com/api/location/search/?query=${city}`
  );
  return response.data[0].woeid;
};

export const fetchWeatherDetails = async woeid => {
  const response = await axios.get(
    `https://www.metaweather.com/api/location/${woeid}/`
  );
  const { title, consolidated_weather } = response.data;
  const { weather_state_name, the_temp } = consolidated_weather[0];

  return {
    location: title,
    weather: weather_state_name,
    temperature: the_temp
  };
};

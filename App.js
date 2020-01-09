import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar
} from "react-native";
import SearchInput from "./components/SearchInput";
import getImageForWeather from "./utils/getImageForWeather";
import { fetchWOEID, fetchWeatherDetails } from "./utils/api";

export default class App extends Component {
  state = {
    loading: false,
    weather: "",
    location: "",
    temperature: 0,
    error: false
  };

  componentDidMount() {
    this.locationChangedHandler("San Francisco");
  }

  locationChangedHandler = async city => {
    if (!city) return;
    this.setState({ loading: true, error: false }, async () => {
      try {
        const woeid = await fetchWOEID(city);
        const { location, weather, temperature } = await fetchWeatherDetails(
          woeid
        );
        this.setState({
          loading: false,
          weather,
          temperature,
          location
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  };

  renderWeatherDetails = () => {
    const { location, weather, temperature } = this.state;
    return (
      <View>
        <Text style={[styles.textStyle, styles.largeText]}>{location}</Text>
        <Text style={[styles.textStyle, styles.smallText]}>{weather}</Text>
        <Text style={[styles.textStyle, styles.largeText]}>{`${Math.round(
          temperature
        )}°`}</Text>
        <SearchInput
          placeholder="Search a city.."
          onSubmit={city => this.locationChangedHandler(city)}
        />
      </View>
    );
  };

  renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={[styles.textStyle, styles.smallText]}>
        Couldn't find weather details. Please check location and try agan.
      </Text>
    </View>
  );

  render() {
    const { error, loading, weather } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.imageBackground}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && this.renderWeatherDetails()}
            {error && this.renderError()}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495e"
  },
  textStyle: {
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    textAlign: "center",
    color: "white"
  },
  smallText: {
    fontSize: 18
  },
  largeText: {
    fontSize: 44
  },
  imageContainer: {
    flex: 1
  },
  imageBackground: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover"
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .2)",
    paddingHorizontal: 20
  },
  errorContainer: {
    marginTop: 20
  }
});

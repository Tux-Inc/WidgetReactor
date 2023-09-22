import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import snowIcon from "../../assets/lottie/weather/fill/snow.json";
import rainIcon from "../../assets/lottie/weather/fill/rain.json";
import cloudyIcon from "../../assets/lottie/weather/fill/cloudy.json";
import fogDayIcon from "../../assets/lottie/weather/fill/fog-day.json";
import clearDayIcon from "../../assets/lottie/weather/fill/clear-day.json";
import partlyCloudyDayIcon from "../../assets/lottie/weather/fill/partly-cloudy-day.json";
import thunderstormsDayIcon from "../../assets/lottie/weather/fill/thunderstorms-day.json";
import { Colors } from "../../constants/Colors";
import { Text } from "react-native-paper";
import { useCustomColorScheme } from "../../hook/useColors";

const WeatherWidget: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const prnDt = new Date()
        .toLocaleDateString("en-US", { weekday: "long" })
        .split(",")[0];
    const colorScheme = useColorScheme();

    interface WeatherData {
        temperature: string;
        temperatureFarenheit: string;
        condition: string;
        location: string;
    }

    const mockWeatherData: WeatherData = {
        temperature: "25°C",
        temperatureFarenheit: "77°F",
        condition: "Sunny",
        location: "Nice",
    };

    const conditionToIcon: Record<string, any> = {
        "clear sky": clearDayIcon,
        "few clouds": partlyCloudyDayIcon,
        "scattered clouds": partlyCloudyDayIcon,
        "broken clouds": cloudyIcon,
        "shower rain": rainIcon,
        rain: rainIcon,
        thunderstorm: thunderstormsDayIcon,
        snow: snowIcon,
        mist: fogDayIcon,
    };

    useEffect(() => {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=Nice ,fr&APPID=58add3546e6a7935b517ec18b323c179"
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const condition = data.weather[0].description.toLowerCase();
                const weatherData: WeatherData = {
                    temperature: `${(data.main.temp - 273.15).toFixed(1)}°C`,
                    temperatureFarenheit: `${(
                        ((data.main.temp - 273.15) * 9) / 5 +
                        32
                    ).toFixed(1)}°F`,
                    condition,
                    location: data.name,
                };

                const idPrefix = data.weather[0].id.toString()[0];
                switch (idPrefix) {
                    case "2":
                        weatherData.condition = "thunderstorm";
                        break;
                    case "3":
                        weatherData.condition = "drizzle";
                        break;
                    case "5":
                        weatherData.condition = "rain";
                        break;
                    case "6":
                        weatherData.condition = "snow";
                        break;
                    case "7":
                        weatherData.condition = "mist";
                        break;
                    case "8":
                        if (data.weather[0].id === 800) {
                            weatherData.condition = "clear sky";
                        } else if (data.weather[0].id === 801) {
                            weatherData.condition = "few clouds";
                        } else if (data.weather[0].id === 802) {
                            weatherData.condition = "scattered clouds";
                        } else if (
                            data.weather[0].id === 803 ||
                            data.weather[0].id === 804
                        ) {
                            weatherData.condition = "broken clouds";
                        }
                        break;
                    default:
                        break;
                }

                setWeatherData(weatherData);
            })
            .catch((error) => {
                console.error("Error fetching the weather data:", error);
                setWeatherData(mockWeatherData);
            });
    }, []);

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                },
            ]}
        >
            {weatherData && (
                <>
                    <View style={styles.containerweatherleft}>
                        <AnimatedLottieView
                            autoPlay
                            loop
                            source={conditionToIcon[weatherData.condition]}
                            style={styles.icon}
                        />
                        <Text
                            style={[
                                styles.condition,
                                {
                                    color: Colors[colorScheme ?? "light"]
                                        .primary,
                                },
                            ]}
                        >
                            {weatherData.condition.charAt(0).toUpperCase() +
                                weatherData.condition.slice(1)}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.line,
                            {
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                            },
                            {
                                shadowColor:
                                    Colors[colorScheme ?? "light"].onBackground,
                            },
                        ]}
                    ></View>
                    <View style={styles.containerweatheright}>
                        <View style={styles.row}>
                            <MaterialIcons name="location-on" size={24} />
                            <Text
                                style={[
                                    styles.location,
                                    {
                                        color: Colors[colorScheme ?? "light"]
                                            .primary,
                                    },
                                ]}
                            >
                                {weatherData.location}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialIcons name="today" size={24} />
                            <Text
                                style={[
                                    styles.day,
                                    {
                                        color: Colors[colorScheme ?? "light"]
                                            .primary,
                                    },
                                ]}
                            >
                                {prnDt}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialIcons name="device-thermostat" size={24} />
                            <Text
                                style={[
                                    styles.temperature,
                                    {
                                        color: Colors[colorScheme ?? "light"]
                                            .primary,
                                    },
                                ]}
                            >
                                {weatherData.temperature}
                            </Text>
                        </View>
                        <Text
                            style={[
                                styles.farenheit,
                                {
                                    color: Colors[colorScheme ?? "light"]
                                        .primary,
                                },
                            ]}
                        >
                            {weatherData.temperatureFarenheit}
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "90%",
        flexDirection: "row",
        padding: 16,
        marginTop: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.27,
        shadowRadius: 2.62,
        elevation: 4,
        marginHorizontal: 10,
    },
    containerweatherleft: {
        width: "55%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    containerweatheright: {
        marginLeft: 10,
        display: "flex",
        justifyContent: "center",
    },
    row: {
        gap: 5,
        marginVertical: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        width: 3,
        height: "100%",
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.27,
        shadowRadius: 2.62,
        elevation: 4,
        marginHorizontal: 10,
    },
    icon: {
        width: 160,
        height: 110,
    },
    temperature: {
        fontSize: 16,
        marginTop: 2,
    },
    farenheit: {
        fontSize: 16,
        marginTop: 2,
        marginLeft: 20,
    },
    condition: {
        fontSize: 18,
    },
    location: {
        fontSize: 18,
        fontWeight: "bold",
    },
    day: {
        fontSize: 16,
        marginTop: 3,
        marginBottom: 2,
    },
});

export default WeatherWidget;

import React, { useEffect, useState } from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";

const Nasa = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.nasa.gov/planetary/apod?api_key=` +
                        process.env.EXPO_PUBLIC_API_NASA_KEY
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const json = await response.json();
                setImageURL(json.url);
                setIsLoading(false);
            } catch (e: any) {
                setError(e);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : imageURL ? (
                <Image
                    source={{ uri: imageURL }}
                    style={{ width: 300, height: 300 }}
                    resizeMode="contain"
                />
            ) : (
                <Text>No image available</Text>
            )}
        </View>
    );
};

export default Nasa;

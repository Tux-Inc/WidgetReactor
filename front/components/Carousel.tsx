import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react";

export default function Carousel({ images }: { images: string[] }) {
    const { user } = useAuth();
    const [scrollX, setScrollX] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollFactor = 0.05; // Ajustez ce facteur selon votre préférence

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: currentIndex * Dimensions.get("window").width * 0.5,
                animated: true,
            });
        }
    }, [currentIndex]);

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        if (offsetX > scrollX) {
            // Le défilement est de gauche à droite
            // Set the current index to the previous index
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        } else if (offsetX < scrollX) {
            // Le défilement est de droite à gauche
            // Set the current index to the next index
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
        }
        setScrollX(offsetX);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const isDisplay = (index: number) => {
        if (currentIndex === index) {
            return true;
        } else if (currentIndex === index - 1) {
            return true;
        } else if (currentIndex === index + 1) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <View style={styles.carousel}>
            <TouchableOpacity onPress={prevSlide}>
                <MaterialIcons
                    name="navigate-before"
                    size={35}
                    color="black"
                    style={styles.navButton}
                />
            </TouchableOpacity>
            <View style={styles.scrollViewContent}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    ref={scrollViewRef}
                    onMomentumScrollEnd={(event) => {
                        const contentOffset = event.nativeEvent.contentOffset.x;
                        const index = Math.round(
                            contentOffset /
                                (Dimensions.get("window").width * 0.5)
                        );
                        setCurrentIndex(index);
                    }}
                    onScroll={(event) => {
                        const offsetX = event.nativeEvent.contentOffset.x;
                        const scrollDifference = offsetX - scrollX;
                        handleScroll({
                            nativeEvent: {
                                contentOffset: {
                                    x:
                                        scrollX +
                                        scrollDifference * scrollFactor,
                                },
                            },
                        });
                    }}
                    decelerationRate={"fast"}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {currentIndex === 0 && (
                        <Image
                            source={{
                                uri: images[images.length - 1],
                                method: "GET",
                                headers: {
                                    Accept: "image/png",
                                    "X-Group-Authorization":
                                        "Bearer " +
                                        process.env
                                            .EXPO_PUBLIC_API_GROUP_AUTHORIZATION,
                                    Authorization:
                                        "Bearer " + user?.accessToken,
                                },
                            }}
                            style={styles.imageSide}
                        />
                    )}
                    {images.map((image, index) => (
                        <View key={index} style={styles.slide}>
                            {isDisplay(index) && (
                                <>
                                    <Image
                                        source={{
                                            uri: image,
                                            method: "GET",
                                            headers: {
                                                Accept: "image/png",
                                                "X-Group-Authorization":
                                                    "Bearer " +
                                                    process.env
                                                        .EXPO_PUBLIC_API_GROUP_AUTHORIZATION,
                                                Authorization:
                                                    "Bearer " +
                                                    user?.accessToken,
                                            },
                                        }}
                                        style={
                                            currentIndex === index
                                                ? styles.imageCenter
                                                : currentIndex === index - 1 ||
                                                  currentIndex === index + 1
                                                ? styles.imageSide
                                                : styles.imageHidden
                                        }
                                    />
                                </>
                            )}
                        </View>
                    ))}
                    {currentIndex === images.length - 1 && (
                        <Image
                            source={{
                                uri: images[0],
                                method: "GET",
                                headers: {
                                    Accept: "image/png",
                                    "X-Group-Authorization":
                                        "Bearer " +
                                        process.env
                                            .EXPO_PUBLIC_API_GROUP_AUTHORIZATION,
                                    Authorization:
                                        "Bearer " + user?.accessToken,
                                },
                            }}
                            style={styles.imageSide}
                        />
                    )}
                </ScrollView>
            </View>
            <View />
            <TouchableOpacity onPress={nextSlide}>
                <MaterialIcons
                    name="navigate-next"
                    size={35}
                    color="black"
                    style={styles.navButton}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    carousel: {
        borderWidth: 1,
        borderColor: "green",
        flexDirection: "row",
        justifyContent: "center",
        width: Dimensions.get("window").width * 0.8,
    },
    scrollViewContent: {
        width: Dimensions.get("window").width * 0.6,
        borderColor: "blue",
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    slide: {
        // borderColor: "red",
        // borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageCenter: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imageSide: {
        width: 50, // Adjust the size as needed for the side images
        height: 50, // Adjust the size as needed for the side images
        borderRadius: 25,
        opacity: 0.7,
    },
    imageHidden: {
        display: "none",
    },
    navButton: {
        fontWeight: "bold",
        marginTop: "auto",
        marginBottom: "auto",
    },
});

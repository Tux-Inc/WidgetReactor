import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
} from "react-native";
import WeatherWidget from "./widgets/Weather";
import Clock from "./widgets/Clock";
import { Colors } from "../constants/Colors";
import Profil from "./widgets/Profil";
import { ScrollView } from "react-native-gesture-handler";
import Nasa from "./widgets/Nasa";

const ButtonPlus: React.FC = () => {
    const [showList, setShowList] = useState<boolean>(false);
    const [components, setComponents] = useState<React.ReactNode[]>([]);
    const [selectedItemTitle, setSelectedItemTitle] = useState<string | null>(
        null
    );

    const colorScheme = useColorScheme();

    const mockData = [
        { title: "Weather" },
        { title: "Clock" },
        { title: "Profile" },
        { title: "Nasa" },
    ];

    const toggleList = () => {
        setShowList(!showList);
    };

    const handleItemClick = (itemTitle: string) => {
        setSelectedItemTitle(itemTitle);

        let newComponent: React.ReactNode;
        switch (itemTitle) {
            case "Weather":
                newComponent = <WeatherWidget />;
                break;
            case "Clock":
                newComponent = <Clock />;
                break;
            case "Profile":
                newComponent = <Profil />;
                break;
            case "Nasa":
                newComponent = <Nasa />;
                break;
            default:
                newComponent = <Profil />;
        }

        setComponents((prevComponents) => [...prevComponents, newComponent]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={toggleList}
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                Colors[colorScheme ?? "light"].primary,
                        },
                    ]}
                >
                    <Text style={styles.text}>{showList ? "-" : "+"}</Text>
                </TouchableOpacity>
            </View>

            {showList && (
                <FlatList
                    style={[
                        styles.list,
                        {
                            backgroundColor:
                                Colors[colorScheme ?? "light"].background,
                        },
                    ]}
                    data={mockData}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => handleItemClick(item.title)}
                                activeOpacity={1}
                            >
                                <Text
                                    style={[
                                        styles.listText,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].primary,
                                        },
                                    ]}
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}

            <ScrollView>
                {components.map((component, index) => (
                    <View style={styles.widgetContainer} key={index}>
                        {component}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        position: "absolute",
        right: 20,
        bottom: 30,
        display: "flex",
        zIndex: 1,
    },
    list: {
        position: "absolute",
        right: 20,
        bottom: 100,
        zIndex: 1,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.27,
        shadowRadius: 2.62,
        elevation: 4,
        padding: 20,
    },
    listText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginTop: 5,
    },
    button: {
        backgroundColor: "#2F4EFF",
        width: 58,
        height: 58,
        borderRadius: 29,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 34,
        marginBottom: 5,
    },
    widgetContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
});

export default ButtonPlus;

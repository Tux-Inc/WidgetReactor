import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Animated, Image, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import { useAuth } from "../../context/AuthProvider";
import { useEmployees } from "../../hook/useEmployee";
import { FlatList } from "react-native-gesture-handler";
import { ShortEmployee } from "../../types/MasuraoTypes";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function SearchPage() {
    const { user } = useAuth();
    const [loaded, setLoaded] = useState<boolean[]>([]);
    const animationProgress = useRef(new Animated.Value(0));
    const [searchQuery, setSearchQuery] = useState("");
    const [employees, setEmployees] = useState<ShortEmployee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<ShortEmployee[]>(
        []
    );
    const colorScheme = useColorScheme();
    styles.box.backgroundColor =
        Colors[colorScheme === "dark" ? "dark" : "light"].onBackground ??
        "#fff";

    useEffect(() => {
        useEmployees(user?.accessToken).then((data) => {
            setEmployees(data);
            setFilteredEmployees(data);
        });
        setLoaded(employees.map((_) => false));
    }, [user]);

    /**
     * The function onChangeSearch takes a query string as input, updates the search query state, and
     * filters a list of employees based on the query.
     * @param {string} query - A string representing the search query entered by the user.
     */
    const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = employees.filter(
            (employee) =>
                employee.surname.toLowerCase().includes(query.toLowerCase()) ||
                employee.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{
                    backgroundColor:
                        Colors[colorScheme === "dark" ? "dark" : "light"]
                            .surface,
                }}
            />
            <FlatList
                numColumns={3}
                data={filteredEmployees}
                contentContainerStyle={{ alignItems: "center" }}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: "/employe",
                            params: {
                                employeID: item.id,
                            },
                        }}
                        asChild
                    >
                        <Pressable>
                            {({ pressed }) => (
                                <View style={styles.container}>
                                    <Image
                                        style={styles.image}
                                        source={{
                                            uri:
                                                process.env
                                                    .EXPO_PUBLIC_API_URL +
                                                "/employees/" +
                                                item.id +
                                                "/image",
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
                                    />
                                    <View
                                        style={[
                                            styles.box,
                                            {
                                                backgroundColor:
                                                    Colors[
                                                        colorScheme ?? "light"
                                                    ].background,
                                            },
                                        ]}
                                    >
                                        <Text style={styles.title}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.subtitle}>
                                            {item.surname}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </Pressable>
                    </Link>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 3,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    image: {
        width: 50,
        position: "absolute",
        top: "-15%",
        left: "25%",
        margin: 6,
        height: 50,
        zIndex: 1,
        borderRadius: 40,
    },
    box: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginTop: 20,
        width: 120,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.27,
        shadowRadius: 2.62,
        elevation: 4,
    },
});

import Game from "../../games/SnakeGame";
import { StyleSheet, useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useEmployees } from "../../hook/useEmployee";
import { ShortEmployee } from "../../types/MasuraoTypes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Wordle from "../../games/Wordle";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import { View } from "../../components/Themed";
import SnakeGame from "../../games/SnakeGame";

export default function TabTwoScreen() {
    const colorScheme = useColorScheme();
    const [game, setGame] = useState<string>("wordle");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [employees, setEmployees] = useState<ShortEmployee[]>([]);
    const onChangeSearch = (search: string) => setSearchQuery(search);

    const { user } = useAuth();

    useEffect(() => {
        useEmployees(user?.accessToken).then((data) => setEmployees(data));
    }, []);

    return (
        <>
            <SafeAreaView>
                <View style={styles.separator} />
                <View style={styles.container}>
                    <Button
                        mode="contained"
                        style={{
                            backgroundColor:
                                Colors[
                                    colorScheme === "dark" ? "dark" : "light"
                                ].primary,
                        }}
                        onPress={() => setGame("wordle")}
                    >
                        WORDLE
                    </Button>
                    <View style={{ width: 10 }} />
                    <Button
                        mode="contained"
                        style={{
                            backgroundColor:
                                Colors[
                                    colorScheme === "dark" ? "dark" : "light"
                                ].primary,
                        }}
                        onPress={() => setGame("snake")}
                    >
                        SNAKE
                    </Button>
                </View>
            </SafeAreaView>
            <GestureHandlerRootView style={{ flex: 1 }}>
                {game === "snake" && <SnakeGame />}
                {game === "wordle" && <Wordle />}
            </GestureHandlerRootView>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        justifyContent: "center",
    },
    container: {
        flexDirection: "row",
        padding: 0,
        display: "flex",
        justifyContent: "center",
    },
    separator: {
        width: "80%",
        marginVertical: 15,
    },
});

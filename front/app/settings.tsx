import { Button, Text } from "react-native-paper";
import { useAuth } from "../context/AuthProvider";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Appearance, StyleSheet, View, useColorScheme } from "react-native";

export default function SettingsScreen() {
    const { setUser } = useAuth();
    const colorScheme = useColorScheme();

    const logout = () => {
        setUser(null);
    };

    return (
        <View style={styles.container}>
            {/* <Button
                mode="contained"
                style={styles.button}
                buttonColor={Colors[colorScheme ?? "light"].error}
                onPress={() => {
                    colorScheme === "dark"
                        ? Appearance.setColorScheme("dark")
                        : Appearance.setColorScheme("light");
                }}
            >
                <Text>Dark</Text>
            </Button>
            <View style={styles.separator} />
            <Button
                mode="contained"
                style={styles.button}
                buttonColor={Colors[colorScheme ?? "light"].primary}
                onPress={() => {
                    colorScheme === "dark"
                        ? Appearance.setColorScheme("light")
                        : Appearance.setColorScheme("dark");
                }}
            >
                <Text>Light</Text>
            </Button> */}
            <View style={styles.separator} />
            <Button onPress={logout} mode="contained" style={styles.button}>
                <Text>Logout</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    button: {
        width: "80%",
    },
});

import { View } from "react-native";
import { Text } from "react-native-paper";
import { StyleSheet, ScrollView } from "react-native";
import Clock from "../../components/widgets/Clock";
import Profil from "../../components/widgets/Profil";
import WeatherWidget from "../../components/widgets/Weather";
import ButtonPlus from "../../components/ButtonPlus";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
    return (
        <SafeAreaView style={styles.container}>
            <ButtonPlus />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    animationContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    center: {
        alignItems: "center",
    },
    buttonContainer: {
        paddingTop: 20,
    },
});

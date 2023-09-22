import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "../../components/Themed";
import { useAuth } from "../../context/AuthProvider";
import MasuraoTitle from "../../components/MasuraoTitle";
import { Button, Text, TextInput } from "react-native-paper";
import {
    BackHandler,
    Platform,
    StyleSheet,
    useColorScheme,
} from "react-native";
import { Colors } from "../../constants/Colors";

export default function LoginScreen() {
    const { setUser } = useAuth();
    const colorScheme = useColorScheme();
    const [password, setPassword] = useState("password");
    const [email, setEmail] = useState("oliver.lewis@masurao.jp");

    const login = async () => {
        await fetch(process.env.EXPO_PUBLIC_API_URL + "/employees/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Group-Authorization":
                    process.env.EXPO_PUBLIC_API_GROUP_AUTHORIZATION || "",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.access_token) {
                    setUser({
                        email: email,
                        password: password,
                        accessToken: data.access_token,
                    });
                    return;
                }
            })
            .catch((error) => {
                console.log("error login");
            });
    };

    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <MasuraoTitle />
            <View style={styles.separator} />
            <TextInput
                style={{
                    ...styles.text_input,
                    backgroundColor:
                        Colors[colorScheme === "dark" ? "dark" : "light"]
                            .surfaceVariant,
                }}
                placeholder="Email."
                onChangeText={(email) => setEmail(email)}
                defaultValue={email}
            />
            <View style={styles.separator} />
            <TextInput
                style={{
                    ...styles.text_input,
                    backgroundColor:
                        Colors[colorScheme === "dark" ? "dark" : "light"]
                            .surfaceVariant,
                }}
                placeholder="Password."
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                defaultValue={password}
            />
            <View style={styles.separator} />
            <Button
                mode="contained"
                onPress={login}
                style={{
                    backgroundColor:
                        Colors[colorScheme === "dark" ? "dark" : "light"]
                            .primary,
                }}
            >
                Login
            </Button>
            <View style={styles.separator} />
            <Text
                style={{
                    ...styles.no_account,
                    color: Colors[colorScheme === "dark" ? "dark" : "light"]
                        .tertiary,
                }}
            >
                Don't have an account ? Contact your ADM.
            </Text>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    separator: {
        margin: 33 / 2,
        height: 1,
        width: "80%",
    },
    title: {
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: "bold",
        margin: 30,
    },
    text_input: {
        width: 210,
    },
    no_account: {
        marginTop: 20,
        height: 30,
    },
    login_btn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        margin: 30,
        backgroundColor: "white",
    },
});

import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { Employee } from "../../types/MasuraoTypes";
import { useAuth } from "../../context/AuthProvider";
import { useEmployee } from "../../hook/useEmployee";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import TombinoscopeWidget from "../../components/widgets/ListItem";

export default function ProfileScreen() {
    const [employee, setEmployee] = useState<Employee>({
        id: 0,
        email: "",
        name: "",
        surname: "",
        birth_date: "",
        gender: "",
        work: "",
        subordinates: {
            Items: 1,
        },
    });

    const { user } = useAuth();

    useEffect(() => {
        useEmployee(user?.accessToken).then((data) => setEmployee(data));
    }, [user]);

    return (
        <View style={styles.container}>
            <Link
                href="/settings"
                asChild
                style={{ position: "absolute", top: 20, right: 10 }}
            >
                <Pressable>
                    {({ pressed }) => (
                        <MaterialIcons
                            name="settings"
                            size={25}
                            style={{
                                margin: 15,
                            }}
                        />
                    )}
                </Pressable>
            </Link>
            <Image
                source={{
                    uri:
                        process.env.EXPO_PUBLIC_API_URL +
                        "/employees/" +
                        employee.id +
                        "/image",
                    method: "GET",
                    headers: {
                        Accept: "image/png",
                        "X-Group-Authorization":
                            process.env.EXPO_PUBLIC_API_GROUP_AUTHORIZATION ??
                            "",
                        Authorization: "Bearer " + user?.accessToken,
                    },
                }}
                style={styles.image}
            />
            <View style={{ height: 226, marginVertical: 10 }}>
                <TombinoscopeWidget />
            </View>
            <Text style={styles.title}>{employee.name} </Text>
            <Text style={styles.subtitle}>{employee.surname} </Text>
            <Text style={styles.text}>{employee.email} </Text>
            <Text style={styles.text}>{employee.birth_date} </Text>
            <Text style={styles.text}>{employee.work}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        width: 226,
        height: 226,
        borderRadius: 113,
        shadowColor: "black",
    },
    text: {
        fontSize: 16,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});

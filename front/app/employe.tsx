import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { Employee } from "../types/MasuraoTypes";
import { useAuth } from "../context/AuthProvider";
import { useLocalSearchParams } from "expo-router";
import { useEmployeeID } from "../hook/useEmployee";
import { Image, StyleSheet, View, useColorScheme } from "react-native";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

type SettingsParameters = {
    title: string;
    icon: IconProps<string>;
};

export default function SettingsScreen() {
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
    const colorScheme = useColorScheme();
    const params = useLocalSearchParams();
    const { employeID } = params;

    useEffect(() => {
        useEmployeeID(user?.accessToken, employeID).then((data) =>
            setEmployee(data)
        );
    }, [user]);

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.box,
                    {
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                    },
                ]}
            >
                <Image
                    source={{
                        uri:
                            process.env.EXPO_PUBLIC_API_URL +
                            "/employees/" +
                            employeID +
                            "/image",
                        method: "GET",
                        headers: {
                            Accept: "image/png",
                            "X-Group-Authorization":
                                process.env
                                    .EXPO_PUBLIC_API_GROUP_AUTHORIZATION ?? "",
                            Authorization: "Bearer " + user?.accessToken,
                        },
                    }}
                    style={styles.image}
                />
                <Text style={styles.title}>
                    {employee.name} {employee.surname}{" "}
                </Text>
                <View style={styles.row}>
                    <MaterialIcons
                        name="email"
                        size={24}
                        color={Colors[colorScheme ?? "light"].onBackground}
                    />
                    <Text style={styles.text}>{employee.email}</Text>
                </View>
                <View style={styles.row}>
                    <MaterialIcons
                        name="cake"
                        size={24}
                        color={Colors[colorScheme ?? "light"].onBackground}
                    />
                    <Text style={styles.text}>{employee.birth_date}</Text>
                </View>
                <View style={styles.row}>
                    <MaterialIcons
                        name="work"
                        size={24}
                        color={Colors[colorScheme ?? "light"].onBackground}
                    />
                    <Text style={styles.text}>{employee.work}</Text>
                </View>
            </View>
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
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        width: 130,
        position: "absolute",
        top: "-55%",
        height: 130,
        borderRadius: 65,
        shadowColor: "black",
    },
    text: {
        fontSize: 16,
    },
    row: {
        flexDirection: "row",
        marginTop: 5,
        gap: 5,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    box: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginTop: 20,
        paddingHorizontal: 40,
        paddingVertical: 30,
        paddingTop: 80,
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

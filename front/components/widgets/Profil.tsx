import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Employee } from "../../types/MasuraoTypes";
import { useAuth } from "../../context/AuthProvider";
import { useEmployee } from "../../hook/useEmployee";
import { Text } from "react-native-paper";

const Profil: React.FC = () => {
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
        <View style={styles.row}>
            <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
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
            />
            <View>
                <Text style={styles.name}>{employee.name + ","} </Text>
                <Text>Welcome to Masurao</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginVertical: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Profil;

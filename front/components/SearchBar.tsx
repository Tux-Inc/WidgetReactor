import { View } from "./Themed";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet, TextInputProps } from "react-native";

export default function MySearchBar({
    childrenPosition = "right",
    ...props
}: TextInputProps & { childrenPosition?: "left" | "right" }) {
    const [search, setSearch] = useState<string>("");


    return (
        <View
            style={{
                backgroundColor: "transparent",
                flexDirection: "row",
            }}
        >
            <TextInput
                style={[styles.text_input, props.style]}
                placeholder={props?.placeholder}
                placeholderTextColor="white"
                onChangeText={(search) => setSearch(search)}
                defaultValue={search}
            />
            {childrenPosition === "right" && (
                <MaterialIcons
                    name="search"
                    size={20}
                    color="white"
                    style={styles.right_icon}
                />
            )}
            {childrenPosition === "left" && (
                <MaterialIcons
                    name="search"
                    size={20}
                    color="white"
                    style={styles.left_icon}
                />
            )}
            {childrenPosition === "right" && props.children && (
                <View style={styles.left_icon}>{props.children}</View>
            )}
            {childrenPosition === "left" && props.children && (
                <View style={styles.right_icon}>{props.children}</View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    text_input: {
        height: 50,
        width: 320,
        borderRadius: 15,
        textAlign: "center",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: "#728495",
    },
    right_icon: {
        position: "absolute",
        left: 25,
        top: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#728495",
    },
    left_icon: {
        position: "absolute",
        right: 25,
        top: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#728495",
    },
});

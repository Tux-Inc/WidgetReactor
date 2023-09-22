import { View } from "./Themed";
import { useState } from "react";
import { Text, StyleSheet, TextInputProps } from "react-native";

export default function MasuraoTitle({
    iconPosition = "left",
    ...props
}: TextInputProps & { iconPosition?: "left" | "right" }) {
    const [search, setSearch] = useState<string>("");

    return (
        <View
            style={{
                alignItems: "baseline",
                flexDirection: "row",
            }}
        >
            <Text
                style={{
                    color: "#9BCBFF",
                    fontSize: 57,
                    fontStyle: "italic",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                    lineHeight: 64,
                    letterSpacing: -0.25,
                }}
            >
                M
            </Text>
            <Text
                style={{
                    color: "#9BCBFF",
                    fontFamily: "Roboto",
                    fontSize: 45,
                    fontWeight: "400",
                    lineHeight: 52,
                }}
            >
                asurao
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text_input: {
        height: 40,
        borderRadius: 30,
        margin: 10,
        width: 300,
        textAlign: "center",
        backgroundColor: "#eee",
    },
});

import { View, Text, Pressable, StyleSheet } from "react-native";
import {
    CLEAR,
    ENTER,
    colors,
    keyHeight,
    keyWidth,
    keys,
} from "../constants/WordleAssets";

const Keyboard = ({
    onKeyPressed = () => {},
    greenCaps = [],
    yellowCaps = [],
    greyCaps = [],
}: {
    onKeyPressed?: (key: string) => void;
    greenCaps?: string[];
    yellowCaps?: string[];
    greyCaps?: string[];
}) => {
    const isLongButton = (key: string) => {
        return key === ENTER || key === CLEAR;
    };

    const getKeyBGColor = (key: string) => {
        if (greenCaps.includes(key)) {
            return colors.primary;
        }
        if (yellowCaps.includes(key)) {
            return colors.secondary;
        }
        if (greyCaps.includes(key)) {
            return colors.darkgrey;
        }
        return colors.grey;
    };

    return (
        <View style={styles.keyboard}>
            {keys.map((keyRow, i) => (
                <View style={styles.row} key={`row-${i}`}>
                    {keyRow.map((key) => (
                        <Pressable
                            onPress={() => onKeyPressed(key)}
                            disabled={greyCaps.includes(key)}
                            key={key}
                            style={[
                                styles.key,
                                isLongButton(key)
                                    ? { width: keyWidth * 1.4 }
                                    : {},
                                { backgroundColor: getKeyBGColor(key) },
                            ]}
                        >
                            <Text style={styles.keyText}>
                                {key.toUpperCase()}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            ))}
        </View>
    );
};

export default Keyboard;

const styles = StyleSheet.create({
    keyboard: {
        alignSelf: "stretch",
    },
    row: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "center",
    },
    key: {
        width: keyWidth - 4,
        height: keyHeight - 4,
        margin: 2,
        borderRadius: 5,
        backgroundColor: colors.grey,
        justifyContent: "center",
        alignItems: "center",
    },
    keyText: {
        color: colors.lightgrey,
        fontWeight: "bold",
    },
});

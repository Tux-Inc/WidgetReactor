import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { Colors } from "../constants/Colors";

interface HeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    children: JSX.Element;
    isPaused: boolean;
}

export default function Header({
    children,
    reloadGame,
    pauseGame,
    isPaused,
}: HeaderProps): JSX.Element {
    return (
        <View style={styles.container}>
            <IconButton
                icon="reload"
                size={35}
                iconColor={Colors.snake.primary}
                onPress={reloadGame}
            />
            <IconButton
                size={35}
                onPress={pauseGame}
                iconColor={Colors.snake.primary}
                icon={isPaused ? "play-circle" : "pause-circle"}
            />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: Colors.snake.primary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        padding: 15,
        backgroundColor: Colors.snake.background,
    },
});

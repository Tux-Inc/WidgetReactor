import { StyleSheet, Text } from "react-native";
import { Coordinate } from "../../../app/types/GestureEventType";

function getRandomFruitEmoji(): string {
    const fruits = ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈"];
    const randomIndex = Math.floor(Math.random() * fruits.length);
    return fruits[randomIndex];
}

export default function Food({ x, y }: Coordinate): JSX.Element {
    return <Text style={[{ left: x * 10, top: y * 10 }, styles.food]}>🍎</Text>;
}

const styles = StyleSheet.create({
    food: {
        width: 20,
        height: 20,
        borderRadius: 7,
        position: "absolute",
    },
});

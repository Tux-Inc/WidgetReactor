import { Fragment } from "react";
import { View } from "../../Themed";
import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Coordinate } from "../../../types/GestureEventType";

interface SnakeProps {
    snake: Coordinate[];
}

export default function Snake({ snake }: SnakeProps): JSX.Element {
    return (
        <Fragment>
            {snake.map((segment: Coordinate, index: number) => {
                const segmentSyle = {
                    left: segment.x * 10,
                    top: segment.y * 10,
                };
                return <View key={index} style={[styles.snake, segmentSyle]} />;
            })}
        </Fragment>
    );
}

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        borderRadius: 7,
        backgroundColor: Colors.snake.primary,
        position: "absolute",
    },
});

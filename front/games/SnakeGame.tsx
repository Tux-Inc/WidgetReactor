import {
    Coordinate,
    Direction,
    GestureEventType,
} from "../types/GestureEventType";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import Food from "../components/games/snake/Food";
import Snake from "../components/games/snake/Snake";
import { checkGameOver } from "../utils/checkGameOver";
import { checkEatsFood } from "../utils/checkEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const GAME_BOUNDS = { xMin: 1, xMax: 33, yMin: 1, yMax: 54 };

export default function SnakeGame(): JSX.Element {
    const [score, setScore] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);

    useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [snake, isGameOver, isPaused]);

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead };

        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev);
            return;
        }

        switch (direction) {
            case Direction.Right:
                newHead.x += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            default:
                break;
        }

        if (checkEatsFood(newHead, food, 2)) {
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
            setSnake([newHead, ...snake]);
            setScore(score + SCORE_INCREMENT);
        } else {
            setSnake([newHead, ...snake.slice(0, -1)]);
        }
    };

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent;
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setDirection(Direction.Right);
            } else {
                setDirection(Direction.Left);
            }
        } else {
            if (translationY > 0) {
                setDirection(Direction.Down);
            } else {
                setDirection(Direction.Up);
            }
        }
    };

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.Right);
        setIsPaused(false);
    };

    const pauseGame = () => {
        setIsPaused((prev) => !prev);
    };

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <Header
                    isPaused={isPaused}
                    pauseGame={pauseGame}
                    reloadGame={reloadGame}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: Colors.snake.primary,
                        }}
                    >
                        {score}
                    </Text>
                </Header>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
    },
    boundaries: {
        flex: 1,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: Colors.snake.secondary,
        backgroundColor: Colors.snake.background,
    },
});

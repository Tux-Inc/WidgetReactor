import { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Alert,
    useColorScheme,
} from "react-native";
import Keyboard from "./Keyboard";
import { Text } from "react-native-paper";
import { setString } from "expo-clipboard";
import { Colors } from "../constants/Colors";
import { WordleWords } from "../constants/WordleWords";
import { CLEAR, ENTER, colors, colorsToEmoji } from "../constants/WordleAssets";

const NUMBER_OF_TRIES = 6;

const copyArray = (arr = []) => {
    return [...arr.map((rows) => [...rows])];
};

const getDayOfTheYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
};
const dayOfTheYear = getDayOfTheYear();

export default function Wordle() {
    const colorScheme = useColorScheme();
    const [curRow, setCurRow] = useState(0);
    const [curCol, setCurCol] = useState(0);
    const [gameState, setGameState] = useState("playing"); // won, lost, playing
    const word: string = WordleWords[dayOfTheYear % WordleWords.length];
    const letters: string[] = word.split("");
    const [rows, setRows] = useState<string[][]>(
        new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""))
    );

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            color: Colors[colorScheme === "dark" ? "dark" : "light"].primary,
        },
        title: {
            fontSize: 32,
            fontWeight: "bold",
            letterSpacing: 7,
        },
        map: {
            alignSelf: "stretch",
        },
        row: {
            alignSelf: "stretch",
            flexDirection: "row",
            justifyContent: "center",
        },
        cell: {
            borderWidth: 3,
            borderColor: "red",
            flex: 1,
            maxWidth: 70,
            aspectRatio: 1,
            margin: 3,
            justifyContent: "center",
            alignItems: "center",
        },
        cellText: {
            color: Colors[colorScheme === "dark" ? "dark" : "light"].primary,
            fontWeight: "bold",
            fontSize: 28,
        },
    });

    useEffect(() => {
        if (curRow > 0) {
            checkGameState();
        }
    }, [curRow]);

    const checkGameState = () => {
        if (checkIfWon() && gameState !== "won") {
            Alert.alert("Huraaay", "You won!", [
                { text: "Share", onPress: shareScore },
            ]);
            setGameState("won");
        } else if (checkIfLost() && gameState !== "lost") {
            Alert.alert("Meh", "Try again tomorrow!");
            setGameState("lost");
        }
    };

    const shareScore = () => {
        const textMap = rows
            .map((row, i) =>
                row
                    .map(
                        (cell: string, j: number) =>
                            colorsToEmoji[getCellBGColor(i, j)]
                    )
                    .join("")
            )
            .filter((row) => row)
            .join("\n");
        const textToShare = `Wordle \n${textMap}`;
        setString(textToShare);
        Alert.alert(
            "Copied successfully",
            "Share your score on you social media"
        );
    };

    const checkIfWon = () => {
        const row: any = rows[curRow - 1];

        return row.every((letter: string, i: number) => letter === letters[i]);
    };

    const checkIfLost = () => {
        return !checkIfWon() && curRow === rows.length;
    };

    const onKeyPressed = (key: string) => {
        if (gameState !== "playing") {
            return;
        }

        const updatedRows: string[][] = copyArray(rows);

        if (key === CLEAR) {
            const prevCol = curCol - 1;
            if (prevCol >= 0) {
                updatedRows[curRow][prevCol] = "";
                setRows(updatedRows);
                setCurCol(prevCol);
            }
            return;
        }

        if (key === ENTER) {
            if (curCol === rows[0].length) {
                setCurRow(curRow + 1);
                setCurCol(0);
            }

            return;
        }

        if (curCol < rows[0].length) {
            updatedRows[curRow][curCol] = key;
            setRows(updatedRows);
            setCurCol(curCol + 1);
        }
    };

    const isCellActive = (row: number, col: number) => {
        return row === curRow && col === curCol;
    };

    const getCellBGColor = (row: number, col: number) => {
        const letter = rows[row][col];
        if (row >= curRow) {
            return colors.black;
        }
        if (letter === letters[col]) {
            return colors.primary;
        }
        if (letters.includes(letter)) {
            return colors.secondary;
        }
        return colors.darkgrey;
    };

    const getAllLettersWithColor = (color: string) => {
        return rows.flatMap((row, i) =>
            row.filter((cell, j) => getCellBGColor(i, j) === color)
        );
    };

    const greenCaps = getAllLettersWithColor(colors.primary);
    const yellowCaps = getAllLettersWithColor(colors.secondary);
    const greyCaps = getAllLettersWithColor(colors.darkgrey);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>WORDLE</Text>
            {/* <Text>{word}</Text> */}
            <ScrollView style={styles.map}>
                {rows.map((row, i) => (
                    <View key={`row-${i}`} style={styles.row}>
                        {row.map((letter: string, j: number) => (
                            <View
                                key={`cell-${i}-${j}`}
                                style={[
                                    styles.cell,
                                    {
                                        borderColor: isCellActive(i, j)
                                            ? Colors[
                                                  colorScheme === "dark"
                                                      ? "dark"
                                                      : "light"
                                              ].primary
                                            : Colors[
                                                  colorScheme === "dark"
                                                      ? "dark"
                                                      : "light"
                                              ].onBackground,
                                        backgroundColor: getCellBGColor(i, j),
                                    },
                                ]}
                            >
                                <Text style={styles.cellText}>
                                    {letter.toUpperCase()}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <Keyboard
                onKeyPressed={onKeyPressed}
                greenCaps={greenCaps}
                yellowCaps={yellowCaps}
                greyCaps={greyCaps}
            />
        </View>
    );
}

import { Dimensions } from "react-native";

export const ENTER = "ENTER";
export const CLEAR = "CLEAR";

export const colors = {
    black: "#121214",
    darkgrey: "#3A3A3D",
    grey: "#818384",
    lightgrey: "#D7DADC",
    primary: "#538D4E",
    secondary: "#B59F3B",
};

export const colorsToEmoji = {
    [colors.darkgrey]: "⬛",
    [colors.primary]: "🟩",
    [colors.secondary]: "🟧",
};

export const keys = [
    ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
    [ENTER, "w", "x", "c", "v", "b", "n", CLEAR],
];

const screenWidth = Dimensions.get("window").width;
export const keyWidth = (screenWidth - 10) / keys[0].length;
export const keyHeight = keyWidth * 1.3;

import { useColorScheme } from "react-native";
import OriginalTheme from "../constants/OriginalTheme";
import { CustomColorScheme } from "../context/CustomColorProvider";
import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { Colors } from "../constants/Colors";

/**
 * The function `useCustomColorTheme` returns a theme based on the provided color
 * scheme, with a fallback to the original theme if no color scheme is specified.
 * @param {CustomColorScheme} colorScheme - The `colorScheme` parameter is a
 * string that represents the desired color scheme. It can have the following
 * values:
 * @returns a `Theme` object based on the `colorScheme` parameter. The possible
 * return values are `OriginalTheme`, `DarkTheme`, or `DefaultTheme`.
 */
export const useCustomColorTheme = (colorScheme: CustomColorScheme): Theme => {
    if (colorScheme === undefined) {
        return OriginalTheme;
    }
    switch (colorScheme) {
        case "system":
            const systemColor = useColorScheme();
            if (systemColor === "dark") {
                console.log("Dark");
                return DarkTheme;
            } else {
                return DefaultTheme;
            }
        case "blue":
            return OriginalTheme;
        case "dark":
            return DarkTheme;
        default:
            return OriginalTheme;
    }
};

/**
 * The function `useCustomColorScheme` returns a color based on the provided
 * `colorScheme`, with a default value of "blue" if no valid scheme is provided.
 * @param {CustomColorScheme} colorScheme - The `colorScheme` parameter is a
 * string that represents the desired color scheme. It can have the following
 * values:
 * @returns a color value from the Colors object based on the provided
 * colorScheme. If the colorScheme is undefined, it returns the "blue" color. If
 * the colorScheme is "system", it uses the useColorScheme hook to determine the
 * system color scheme and returns either the "dark" or "light" color. If the
 * colorScheme is "blue", it returns the "blue
 */
export const useCustomColorScheme = (colorScheme: CustomColorScheme) => {
    if (colorScheme === undefined) {
        return Colors["blue"];
    }
    switch (colorScheme) {
        case "system":
            const systemColor = useColorScheme();
            if (systemColor === "dark") {
                return Colors["dark"];
            } else {
                return Colors["light"];
            }
        case "blue":
            return Colors["blue"];
        case "dark":
            return Colors["dark"];
        default:
            return Colors["blue"];
    }
};

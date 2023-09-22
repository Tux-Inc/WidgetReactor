/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";
import { useColorTheme } from "../context/CustomColorProvider";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ColorSchemeJSON } from "../constants/Colors";

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
    blueColor?: string;
    systemColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
    props: { light?: string; dark?: string; blue?: string; system?: string },
    colorName: keyof typeof Colors.light &
        keyof typeof Colors.dark &
        keyof typeof Colors.blue &
        keyof typeof Colors.system
) {
    const { colorScheme } = useColorTheme();
    const theme = colorScheme ?? "light";
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        // return Colors[theme][colorName];
    }
}

export function Text(props: TextProps) {
    const {
        style,
        lightColor,
        darkColor,
        blueColor,
        systemColor,
        ...otherProps
    } = props;
    const color = useThemeColor(
        {
            light: lightColor,
            dark: darkColor,
            blue: blueColor,
            system: blueColor,
        },
        "text"
    );

    return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
    const {
        style,
        lightColor,
        darkColor,
        blueColor,
        systemColor,
        ...otherProps
    } = props;
    const backgroundColor = useThemeColor(
        {
            light: lightColor,
            dark: darkColor,
            blue: blueColor,
            system: blueColor,
        },
        "background"
    );

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

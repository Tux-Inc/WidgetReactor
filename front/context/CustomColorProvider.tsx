import { ColorSchemeName, useColorScheme } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import {
    DarkTheme,
    DefaultTheme,
    Theme,
    ThemeProvider,
} from "@react-navigation/native";
import { useCustomColorTheme } from "../hook/useColors";

export type CustomColorScheme = "blue" | "system" | ColorSchemeName;

type colorThemeType = {
    colorScheme: CustomColorScheme;
    setColorScheme: (colorScheme: CustomColorScheme | null) => void;
};

const ColorTheme = createContext<colorThemeType>({
    colorScheme: "system",
    setColorScheme: () => {},
});

export const useColorTheme = () => useContext(ColorTheme);

function useCustomColorSchemeFunction(colorScheme: any) {
    const { setColorScheme } = useColorTheme();

    useEffect(() => {
        if (colorScheme === undefined) {
            setColorScheme("blue");
        } else {
            setColorScheme(colorScheme);
        }
    }, [colorScheme]);
}

export function CustomColorProvider({
    children,
}: {
    children: JSX.Element;
}): JSX.Element {
    // const [colorScheme, setColorScheme] = useState<CustomColorScheme>("blue");

    // useCustomColorSchemeFunction(colorScheme);

    // const colorThemeContext: colorThemeType = {
    //     colorScheme,
    //     setColorScheme,
    // };
    const colorScheme = useColorScheme();

    return (
        // <ColorTheme.Provider value={colorThemeContext}>
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            {children}
        </ThemeProvider>
        // </ColorTheme.Provider>
    );
}

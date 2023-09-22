const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
const tintColorBlue = "#263A47";

export type ColorSchemeJSON = {
    primary?: string;
    onPrimary?: string;
    primaryContainer?: string;
    onPrimaryContainer?: string;
    primaryFixed?: string;
    onPrimaryFixed?: string;
    primaryFixedDim?: string;
    onPrimaryFixedVariant?: string;
    secondary?: string;
    onSecondary?: string;
    secondaryContainer?: string;
    onSecondaryContainer?: string;
    secondaryFixed?: string;
    onSecondaryFixed?: string;
    secondaryFixedDim?: string;
    onSecondaryFixedVariant?: string;
    tertiary?: string;
    onTertiary?: string;
    tertiaryContainer?: string;
    onTertiaryContainer?: string;
    tertiaryFixed?: string;
    onTertiaryFixed?: string;
    tertiaryFixedDim?: string;
    onTertiaryFixedVariant?: string;
    error?: string;
    onError?: string;
    errorContainer?: string;
    onErrorContainer?: string;
    outline?: string;
    background?: string;
    onBackground?: string;
    surface?: string;
    onSurface?: string;
    surfaceVariant?: string;
    onSurfaceVariant?: string;
    inverseSurface?: string;
    inverseOnSurface?: string;
    inversePrimary?: string;
    shadow?: string;
    surfaceTint?: string;
    outlineVariant?: string;
    scrim?: string;
    surfaceContainerHighest?: string;
    surfaceContainerHigh?: string;
    surfaceContainer?: string;
    surfaceContainerLow?: string;
    surfaceContainerLowest?: string;
    surfaceBright?: string;
    surfaceDim?: string;
};

interface JSONObject {
    [x: string]: ColorSchemeJSON;
}

export const Colors: JSONObject = {
    light: {
        primary: "#00658D",
        onPrimary: "#FFFFFF",
        primaryContainer: "#C6E7FF",
        onPrimaryContainer: "#001E2D",
        primaryFixed: "#C6E7FF",
        onPrimaryFixed: "#001E2D",
        primaryFixedDim: "#82CFFF",
        onPrimaryFixedVariant: "#004C6B",
        secondary: "#4F616E",
        onSecondary: "#FFFFFF",
        secondaryContainer: "#D2E5F4",
        onSecondaryContainer: "#0A1D28",
        secondaryFixed: "#D2E5F4",
        onSecondaryFixed: "#0A1D28",
        secondaryFixedDim: "#B6C9D8",
        onSecondaryFixedVariant: "#374955",
        tertiary: "#006495",
        onTertiary: "#FFFFFF",
        tertiaryContainer: "#CBE6FF",
        onTertiaryContainer: "#001E30",
        tertiaryFixed: "#CBE6FF",
        onTertiaryFixed: "#001E30",
        tertiaryFixedDim: "#90CDFF",
        onTertiaryFixedVariant: "#004B72",
        error: "#BA1A1A",
        onError: "#FFFFFF",
        errorContainer: "#FFDAD6",
        onErrorContainer: "#410002",
        outline: "#71787E",
        background: "#FCFCFF",
        onBackground: "#191C1E",
        surface: "#F9F9FC",
        onSurface: "#191C1E",
        surfaceVariant: "#DDE3EA",
        onSurfaceVariant: "#41484D",
        inverseSurface: "#2E3133",
        inverseOnSurface: "#F0F1F3",
        inversePrimary: "#82CFFF",
        shadow: "#000000",
        surfaceTint: "#00658D",
        outlineVariant: "#C1C7CE",
        scrim: "#000000",
        surfaceContainerHighest: "#E2E2E5",
        surfaceContainerHigh: "#E7E8EB",
        surfaceContainer: "#EDEEF0",
        surfaceContainerLow: "#F3F3F6",
        surfaceContainerLowest: "#FFFFFF",
        surfaceBright: "#F9F9FC",
        surfaceDim: "#D9DADC",
    },
    dark: {
        primary: "#82CFFF",
        onPrimary: "#00344B",
        primaryContainer: "#004C6B",
        onPrimaryContainer: "#C6E7FF",
        primaryFixed: "#C6E7FF",
        onPrimaryFixed: "#001E2D",
        primaryFixedDim: "#82CFFF",
        onPrimaryFixedVariant: "#004C6B",
        secondary: "#B6C9D8",
        onSecondary: "#21323E",
        secondaryContainer: "#374955",
        onSecondaryContainer: "#D2E5F4",
        secondaryFixed: "#D2E5F4",
        onSecondaryFixed: "#0A1D28",
        secondaryFixedDim: "#B6C9D8",
        onSecondaryFixedVariant: "#374955",
        tertiary: "#90CDFF",
        onTertiary: "#003450",
        tertiaryContainer: "#004B72",
        onTertiaryContainer: "#CBE6FF",
        tertiaryFixed: "#CBE6FF",
        onTertiaryFixed: "#001E30",
        tertiaryFixedDim: "#90CDFF",
        onTertiaryFixedVariant: "#004B72",
        error: "#FFB4AB",
        onError: "#690005",
        errorContainer: "#93000A",
        onErrorContainer: "#FFDAD6",
        outline: "#8B9198",
        background: "#191C1E",
        onBackground: "#E2E2E5",
        surface: "#111416",
        onSurface: "#C5C6C9",
        surfaceVariant: "#41484D",
        onSurfaceVariant: "#C1C7CE",
        inverseSurface: "#E2E2E5",
        inverseOnSurface: "#191C1E",
        inversePrimary: "#00658D",
        shadow: "#000000",
        surfaceTint: "#82CFFF",
        outlineVariant: "#41484D",
        scrim: "#000000",
        surfaceContainerHighest: "#333537",
        surfaceContainerHigh: "#282A2C",
        surfaceContainer: "#1D2022",
        surfaceContainerLow: "#191C1E",
        surfaceContainerLowest: "#0C0E10",
        surfaceBright: "#37393C",
        surfaceDim: "#111416",
    },
    blue: {
        // text: "#fff",
        background: "#B4C5DB",
        // tint: tintColorBlue,
        // tabIconDefault: "#aaa",
        // tabIconSelected: tintColorBlue,
    },
    system: {
        // text: "#fff",
        background: "#B4C5DB",
        // tint: tintColorBlue,
        // tabIconDefault: "#aaa",
        // tabIconSelected: tintColorBlue,
    },
    snake: {
        primary: "#365314",
        secondary: "#84cc16",
        tertiary: "#eab308",
        background: "#ecfccb",
    },
};

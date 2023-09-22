import { useEffect } from "react";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import { Slot, SplashScreen, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AuthProvider } from "../context/AuthProvider";
import { MD3DarkTheme, MD3LightTheme, ThemeProvider } from "react-native-paper";
import { CustomColorProvider } from "../context/CustomColorProvider";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Inter: require("../assets/fonts/Inter-Regular.ttf"),
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return <Slot />;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();
    return (
        <ThemeProvider
            theme={colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme}
        >
            <CustomColorProvider>
                <AuthProvider>
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(auth)/login"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="employe"
                            options={{
                                presentation: "modal",
                                title: "Employe",
                            }}
                        />
                        <Stack.Screen
                            name="settings"
                            options={{
                                presentation: "modal",
                                title: "Settings",
                            }}
                        />
                    </Stack>
                </AuthProvider>
            </CustomColorProvider>
        </ThemeProvider>
    );
}

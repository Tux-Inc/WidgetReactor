import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, useColorScheme } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof MaterialIcons>["name"];
    color: string;
    style?: any;
    focused?: boolean;
}) {
    const colorScheme = useColorScheme();
    // NavigationBar.setBackgroundColorAsync(
    //     Colors[colorScheme === "dark" ? "dark" : "light"].surface
    // );
    return (
        <MaterialIcons
            size={28}
            style={[
                { marginBottom: -3 },
                {
                    backgroundColor: props.focused
                        ? Colors[colorScheme ?? "light"].primaryContainer
                        : "transparent",
                },
                { paddingVertical: props.focused ? 4 : 0 },
                { paddingHorizontal: props.focused ? 20 : 0 },
                { borderRadius: props.focused ? 16 : 0 },
                props.style,
            ]}
            {...props}
        />
    );
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerTintColor: "white",
                tabBarStyle: {
                    height: 80,
                    gap: 10,
                },
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name="home"
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerTitleAlign: "center",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name="search"
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="game"
                options={{
                    title: "Game",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name="gamepad"
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name="person"
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabIcons: {
        width: 24,
        height: 24,
    },
});

import React from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    withSpring,
} from "react-native-reanimated";
import ListItem from "./ListItem";

const { width } = Dimensions.get("window");

const LARGE_IMAGE_WIDTH = width * 0.5;
const MEDIUM_IMAGE_WIDTH = LARGE_IMAGE_WIDTH * 0.5;
const SMALL_IMAGE_WIDTH = MEDIUM_IMAGE_WIDTH * 0.5;

const sampleData: { id: number; uri: string }[] = [
    {
        id: 1,
        uri: "https://picsum.photos/500/300?random=1",
    },
    {
        id: 2,
        uri: "https://picsum.photos/500/300?random=2",
    },
    {
        id: 3,
        uri: "https://picsum.photos/500/300?random=3",
    },
    {
        id: 4,
        uri: "https://picsum.photos/500/300?random=4",
    },
    {
        id: 5,
        uri: "https://picsum.photos/500/300?random=5",
    },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const App: React.FC = () => {
    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={sampleData as { id: number; uri: string }[]}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <ListItem
                        uri={item.uri}
                        scrollX={scrollX}
                        index={index}
                        dataLength={sampleData.length}
                    />
                )}
                onScroll={onScroll}
                snapToInterval={SMALL_IMAGE_WIDTH}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
});

export default App;

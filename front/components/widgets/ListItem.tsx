import React, { useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const TombinoscopeWidget: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<ScrollView | null>(null);

    const images = [
        "https://picsum.photos/500/300?random=2",
        "https://picsum.photos/500/300?random=3",
        "https://picsum.photos/500/300?random=4",
        "https://picsum.photos/500/300?random=5",
    ];

    const handleImagePress = (index: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ x: index * width, animated: true });
            setCurrentIndex(index);
        }
    };

    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                ref={scrollRef}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const contentOffsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.round(contentOffsetX / width);
                    setCurrentIndex(index);
                }}
            >
                {images.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => handleImagePress(index)}
                    >
                        <Image
                            source={{ uri: image }}
                            style={{
                                width: width,
                                height: 226,
                                borderRadius: 113,
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default TombinoscopeWidget;

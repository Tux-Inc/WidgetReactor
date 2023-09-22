import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { View, Text, ViewStyle, useColorScheme } from "react-native";

interface AnalogClockProps {
    backgroundImage: string;
    clockSize: number;
    clockBorderWidth: number;
    clockCentreSize: number;
    clockCentreColor: string;
    hourHandColor: string;
    hourHandCurved: boolean;
    hourHandLength: number;
    hourHandWidth: number;
    hourHandOffset: number;
    minuteHandColor: string;
    minuteHandCurved: boolean;
    minuteHandLength: number;
    minuteHandWidth: number;
    minuteHandOffset: number;
    secondHandColor: string;
    secondHandCurved: boolean;
    secondHandLength: number;
    secondHandWidth: number;
    secondHandOffset: number;
}

interface AnalogClockState {
    sec: number;
    min: number;
    hour: number;
}

export default function Clock() {
    const [defaultProps, setDefaultProps] = useState<AnalogClockProps>({
        backgroundImage: "../../assets/images/clockBack.png",
        clockSize: 270,
        clockBorderWidth: 7,
        clockCentreSize: 15,
        clockCentreColor: "black",
        hourHandColor: "black",
        hourHandCurved: true,
        hourHandLength: 70,
        hourHandWidth: 5.5,
        hourHandOffset: 0,
        minuteHandColor: "black",
        minuteHandCurved: true,
        minuteHandLength: 100,
        minuteHandWidth: 5,
        minuteHandOffset: 0,
        secondHandColor: "black",
        secondHandCurved: false,
        secondHandLength: 120,
        secondHandWidth: 2,
        secondHandOffset: 0,
    });
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [clockState, setClockState] = useState<AnalogClockState>({
        sec: 0,
        min: 0,
        hour: 0,
    });
    const colorScheme = useColorScheme();

    useEffect(() => {
        const updateClock = () => {
            const d = new Date();
            setClockState({
                sec: d.getSeconds() * 6,
                min: d.getMinutes() * 6 + (d.getSeconds() * 6) / 60,
                hour:
                    ((d.getHours() % 12) / 12) * 360 +
                    90 +
                    (d.getMinutes() * 6 + (d.getSeconds() * 6) / 60) / 12,
            });
        };
        const intervalId = setInterval(updateClock, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const returnDate = () => {
        var d = new Date();
        var n = d.toLocaleDateString();
        n = n.split("/")[0];
        return n;
    };

    const clockFrame = (): ViewStyle => {
        return {
            width: defaultProps.clockSize,
            height: defaultProps.clockSize,
            position: "relative",
            borderColor: Colors[colorScheme ?? "light"].onBackground,
            borderWidth: defaultProps.clockBorderWidth,
            borderRadius: defaultProps.clockSize / 2,
            backgroundColor: Colors[colorScheme ?? "light"].background,
        };
    };

    const clockHolder = (): ViewStyle => {
        return {
            width: defaultProps.clockSize,
            height: defaultProps.clockSize,
            position: "absolute",
            right: -defaultProps.clockBorderWidth,
            bottom: -defaultProps.clockBorderWidth,
        };
    };

    const clockFace = () => {
        return {
            width: defaultProps.clockCentreSize,
            height: defaultProps.clockCentreSize,
            backgroundColor: defaultProps.clockCentreColor,
            borderRadius: defaultProps.clockCentreSize / 2,
            top: (defaultProps.clockSize - defaultProps.clockCentreSize) / 2,
            left: (defaultProps.clockSize - defaultProps.clockCentreSize) / 2,
        };
    };

    const hourHandStyles = (): ViewStyle => {
        return {
            width: 0,
            height: 0,
            position: "absolute",
            backgroundColor: "none",
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "black",
            top: defaultProps.clockSize / 2,
            left: defaultProps.clockSize / 2 - 7,
            marginVertical: -defaultProps.hourHandWidth,
            marginLeft: -defaultProps.hourHandLength / 2,
            paddingVertical: defaultProps.hourHandWidth,
            paddingLeft: defaultProps.hourHandLength,
        };
    };

    const minuteHandStyles = (): ViewStyle => {
        return {
            width: 0,
            height: 0,
            position: "absolute",
            backgroundColor: defaultProps.minuteHandColor,
            top: defaultProps.clockSize / 2,
            left: defaultProps.clockSize / 2,
            marginTop: -(defaultProps.minuteHandLength / 2),
            marginHorizontal: -defaultProps.minuteHandWidth,
            paddingTop: defaultProps.minuteHandLength,
            paddingHorizontal: defaultProps.minuteHandWidth,
            borderTopLeftRadius: defaultProps.minuteHandCurved
                ? defaultProps.minuteHandWidth
                : 0,
            borderTopRightRadius: defaultProps.minuteHandCurved
                ? defaultProps.minuteHandWidth
                : 0,
        };
    };

    const secondHandStyles = (): ViewStyle => {
        return {
            width: 0,
            height: 0,
            position: "absolute",
            backgroundColor: "red",
            top: defaultProps.clockSize / 2,
            left: defaultProps.clockSize / 2,
            marginTop: -(defaultProps.secondHandLength / 2),
            marginHorizontal: -defaultProps.secondHandWidth,
            paddingTop: defaultProps.secondHandLength,
            paddingHorizontal: defaultProps.secondHandWidth,
            borderTopLeftRadius: defaultProps.secondHandCurved
                ? defaultProps.secondHandWidth
                : 0,
            borderTopRightRadius: defaultProps.secondHandCurved
                ? defaultProps.secondHandWidth
                : 0,
        };
    };

    const dateStyles = (): ViewStyle => {
        return {
            width: "auto",
            paddingVertical: 5,
            paddingHorizontal: 10,
            position: "absolute",
            borderRadius: 10,
            backgroundColor: "#1e87db",
            opacity: 0.5,
            top: defaultProps.clockSize / 2 - 20,
            left: defaultProps.clockSize - 50,
            zIndex: -1,
        };
    };

    return (
        <View style={clockFrame()}>
            <View style={clockHolder()}>
                <View
                    style={[
                        hourHandStyles(),
                        {
                            transform: [
                                { rotate: clockState.hour + "deg" },
                                {
                                    translateX: -(
                                        defaultProps.hourHandOffset +
                                        defaultProps.hourHandLength / 2
                                    ),
                                },
                            ],
                        },
                    ]}
                />
                <View
                    style={[
                        minuteHandStyles(),
                        {
                            transform: [
                                { rotate: clockState.min + "deg" },
                                {
                                    translateY: -(
                                        defaultProps.minuteHandOffset +
                                        defaultProps.minuteHandLength / 2
                                    ),
                                },
                            ],
                        },
                    ]}
                />
                <View
                    style={[
                        secondHandStyles(),
                        {
                            transform: [
                                { rotate: clockState.sec + "deg" },
                                {
                                    translateY: -(
                                        defaultProps.secondHandOffset +
                                        defaultProps.secondHandLength / 2
                                    ),
                                },
                            ],
                        },
                    ]}
                />
                <View style={dateStyles()}>
                    <Text>{returnDate()}</Text>
                </View>
                <View style={clockFace()} />
            </View>
        </View>
    );
}

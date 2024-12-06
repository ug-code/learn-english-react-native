import { Animated, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ScrollView = Animated.ScrollView;
import React from "react";

export interface Category {
    id: string;
    topic: string;
    url: string;
    icon: string;
}

export interface Question {
    id: number;
    category: string;
    question: string;
    answer: string;
    options: string[];
}


export default function TestScreen() {
    const [count, setCount] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [time, setTime] = useState<number>(15);
    const [userScore, setUserScore] = useState<number>(0);
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [selectedBox, setSelectedBox] = useState<number | null>(null);
    const [getResultClicked, setGetResultClicked] = useState<boolean>(false);
    const router = useRouter();

    // Dinamik Tab Bar Yüksekliği
    const tabBarHeight = useBottomTabBarHeight();

    const staticQuestions: Question[] = [
        {
            id: 1,
            category: "Math",
            question: "What is 2 + 2?",
            answer: "4",
            options: ["1", "2", "3", "4"],
        },
        {
            id: 2,
            category: "Science",
            question: "What planet is known as the Red Planet?",
            answer: "Mars",
            options: ["Earth", "Venus", "Mars", "Jupiter"],
        },
        {
            id: 3,
            category: "History",
            question: "Who was the first president of the USA?",
            answer: "George Washington",
            options: [
                "Abraham Lincoln",
                "George Washington",
                "Thomas Jefferson",
                "John Adams",
            ],
        },
    ];

    useEffect(() => {
        setQuestions(staticQuestions);
    }, []);

    const toggleColor = (index: number | null) => {
        if (index === null) return;
        setSelectedBox(index);
        setUserAnswer(questions[count].options[index]);
    };


    const handleSave = () => {
        if (count < questions.length - 1) {
            if (questions[count].answer === userAnswer) {
                setUserScore((userScore) => userScore + 1);
            }
            setCount((count) => count + 1);
            setSelectedBox(null);
            setTime(15);
        } else {
            setGetResultClicked(true);
            /*
            router.push({
                pathname: "/(stack)/completed",
                params: { score: userScore },
            });*/
        }
    };


    useEffect(() => {
        if (time > 0) {
            const timerId = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else if (time === 0) {
            // handleSave();
        }
    }, [time]);

    const handleSkip = () => {
        if (count < questions.length - 1) {
            setCount((count) => count + 1);
            setSelectedBox(null);
            setTime(15);
        }
    };

    return (
        <View className="flex-1 bg-orange-100 p-4">
            <SafeAreaView className="flex-1">
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: tabBarHeight + 20, // Tab bar yüksekliğini hesaba kat
                    }}
                    className="p-4"
                >
                    {/* Üst Kısım */}
                    <View className="w-full flex items-center flex-row justify-between mb-6">
                        <Pressable onPress={() => router.back()}>
                            <MaterialIcons name="cancel" size={44} color="#f97316" />
                        </Pressable>
                        <View className="flex items-center">
                            <Text className="font-bold text-orange-500 text-lg">
                                {questions[count]?.category}
                            </Text>
                            <Text className="text-gray-500 text-lg">{count + 1}/40</Text>
                        </View>

                        <View className="flex items-center">
                            <AntDesign
                                name="clockcircle"
                                size={24}
                                color="#f97316"
                                className="mb-[1px]"
                            />
                            <Text className="font-bold text-xl">
                                {time < 10 ? `0${time}` : time}
                            </Text>
                        </View>
                    </View>

                    {/* Orta Kısım */}
                    <View>
                        <View className="w-full bg-orange-500 py-4 h-[120px] rounded-2xl flex items-center justify-center px-2 mb-8">
                            <Text className="text-2xl text-center font-bold">
                                {questions[count]?.question}
                            </Text>
                        </View>

                        <Text className="text-lg mb-3 text-orange-600 font-bold">
                            Select your answer
                        </Text>
                        <View className="flex items-center mb-4">
                            {questions[count]?.options.map((item:any, index:any) => (
                                <Pressable
                                    className={`w-full ${
                                        selectedBox === index
                                            ? "bg-orange-200 border-[1px] border-orange-500"
                                            : "bg-white"
                                    } py-4 px-4 rounded-2xl mb-3`}
                                    key={index}
                                    onPress={() => toggleColor(index)}
                                >
                                    <Text className="text-xl text-center">{item}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* Alt Kısım */}
                    <View className="w-full flex flex-row items-center justify-between mt-4">
                        {getResultClicked ? (
                            <Pressable
                                disabled={getResultClicked}
                                className="bg-gray-300 shadow-sm p-4 rounded-xl w-full"
                            >
                                <Text className="font-bold text-xl text-center">
                                    Generating your score...
                                </Text>
                            </Pressable>
                        ) : (
                            <>
                                <Pressable
                                    onPress={handleSkip}
                                    className="bg-orange-300 p-4 rounded-xl w-[48%]"
                                >
                                    <Text className="font-bold text-xl text-center">SKIP</Text>
                                </Pressable>
                                <Pressable
                                    onPress={handleSave}
                                    className="bg-green-300 p-4 rounded-xl w-[48%]"
                                >
                                    <Text className="font-bold text-xl text-center">
                                        {count === questions.length - 1 ? "Get Result" : "SAVE"}
                                    </Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

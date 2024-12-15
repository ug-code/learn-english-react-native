import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const data = [
    {
        id: "1",
        title: "home",
        definition: "the place that we live in, usually with our family",
        pronunciation: "/hoʊm/",
        category: "noun",
        image: require("../../assets/images/icon.png"), // Add your image path here
    },
    {
        id: "2",
        title: "to produce",
        definition: "to make something or bring it into existence",
        pronunciation: "/prəˈdjuːs/",
        category: "verb",
        image: require("../../assets/images/icon.png"), // Add your image path here
    },
    // Add more slides as needed
];

const QuizScreen = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        if (activeIndex < data.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{data[activeIndex].title}</Text>
                <Text style={styles.pronunciation}>{data[activeIndex].pronunciation}</Text>
                <Text style={styles.category}>{data[activeIndex].category}</Text>
                <Text style={styles.definition}>{data[activeIndex].definition}</Text>
                <Image source={data[activeIndex].image} style={styles.image} />
            </View>

            <View style={styles.navigationContainer}>
                <TouchableOpacity
                    onPress={handlePrev}
                    style={[styles.navButton, activeIndex === 0 && styles.disabledButton]}
                    disabled={activeIndex === 0}
                >
                    <Text style={styles.navButtonText}>{"<"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleNext}
                    style={[styles.navButton, activeIndex === data.length - 1 && styles.disabledButton]}
                    disabled={activeIndex === data.length - 1}
                >
                    <Text style={styles.navButtonText}>{">"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: width - 40,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    pronunciation: {
        fontSize: 18,
        color: "#555",
        marginBottom: 10,
    },
    category: {
        fontSize: 16,
        color: "#888",
        marginBottom: 10,
    },
    definition: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: "contain",
    },
    navigationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    navButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    disabledButton: {
        backgroundColor: "#CCCCCC",
    },
    navButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default QuizScreen;

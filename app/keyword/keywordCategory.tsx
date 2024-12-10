import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useRouter} from 'expo-router';

const KeywordCategoryScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const router = useRouter();


    return (
        <View style={styles.container}>
            {/* Üst Kısım */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}
                                  onPress={() => {
                                      // Navigate using the `navigation` prop that you received
                                      //navigation.navigate('index');
                                      router.dismissTo('/')
                                  }}

                >
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Kelimelerim</Text>
                <Text style={styles.subtitle}>1 Kelime Listesi</Text>

                {/* Siyah Artı Butonu */}
                <TouchableOpacity style={styles.addButton}
                >
                    <Ionicons name="add" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Liste */}
            <View style={styles.listContainer}>
                <TouchableOpacity style={styles.listItem}
                                  onPress={() => {
                                      // Navigate using the `navigation` prop that you received
                                      //navigation.navigate('index');
                                      router.dismissTo('/keyword/wordList')
                                  }}
                >
                    <Ionicons name="book-outline" size={32} color="#555" style={styles.listIcon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.listTitle}>Free Wordlist</Text>
                        <Text style={styles.listSubtitle}>1 Alt Liste</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#888" />
                </TouchableOpacity>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: "#FAD7A0",
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: "relative",
    },
    backButton: {
        width: 40,
        height: 40,
    },
    addButton: {
        position: "absolute",
        top: 50,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 5,
    },
    listContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    listIcon: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    listSubtitle: {
        fontSize: 14,
        color: "#888",
        marginTop: 5,
    },

});



export default KeywordCategoryScreen;

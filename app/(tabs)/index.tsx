import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect, useRouter} from 'expo-router';
import {getKeywordService, myKeywordCount} from '@/services/wordService'; // İkonlar için

const IndexScreen = () => {

    const router = useRouter();
    const [apiData, setApiData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchData = async () => {
        try {
            const response = await myKeywordCount();
            const data = response?.data || [];
            setApiData(data);

        } catch (err) {
            setError('Veri yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchData().then();
        }, [])
    );


    return (
        <View style={styles.container}>
            {/* Üst kısım */}
            <View style={styles.header}>
                { (1>2) &&
                    <>
                        <View style={styles.profileContainer}>
                            <Image
                                source={{ uri: "https://via.placeholder.com/40" }} // Profil resmi buraya gelecek
                                style={styles.profileImage}
                            />
                            <Text style={styles.welcomeText}>zeki müren</Text>
                        </View>
                        <Text style={styles.subtitle}>LanGeek'e hoş geldiniz!</Text>
                    </>
            }
            </View>

            {/* Orta Kısım */}
            <View style={styles.sectionsContainer}>
                <View style={styles.sectionRow}>
                    <TouchableOpacity style={styles.card}
                                      onPress={() => {
                                          // Navigate using the `navigation` prop that you received
                                          // navigation.navigate('keyword/keywordCategory');
                                          router.dismissTo('/keyword/keywordCategory')
                                      }}
                    >
                        <Ionicons name="folder-outline" size={40} color="#3b5998" />
                        <Text style={styles.cardText}>Words </Text>
                        <View style={styles.notificationBadge}>
                            <Text style={styles.badgeText}>
                                {loading ? (
                                    <ActivityIndicator size="large"
                                                       color="#4CAF50"/>
                                ) : (
                                    apiData??0
                                )}

                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <Ionicons name="cube-outline" size={40} color="#3b5998" />
                        <Text style={styles.cardText}>Daily Keyword</Text>
                        <View style={styles.notificationBadge}>
                            <Text style={styles.badgeText}>10</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionRow}>
                    <TouchableOpacity style={styles.card}>
                        <Ionicons name="text-outline" size={40} color="#3b5998" />
                        <Text style={styles.cardText}>Vocabulary</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <Ionicons name="book-outline" size={40} color="#3b5998" />
                        <Text style={styles.cardText}>Grammar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionRow}>
                    <TouchableOpacity style={styles.card}>
                        <Ionicons name="mic-outline" size={40} color="#3b5998" />
                        <Text style={styles.cardText}>Pronunciation</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <Ionicons name="chatbubble-outline" size={40} color="#3b5998" />
                        <Text style={styles.cardText}>Expressions</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionRow}>
                    <TouchableOpacity style={[styles.card, styles.disabledCard]}>
                        <Ionicons name="book" size={40} color="#b0b0b0" />
                        <Text style={[styles.cardText, { color: "#b0b0b0" }]}>Reading</Text>
                        <Text style={styles.comingSoon}>Coming soon</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f2f5",
        paddingTop: 50,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    time: {
        fontSize: 18,
        color: "#555",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#777",
    },
    sectionsContainer: {
        paddingHorizontal: 20,
    },
    sectionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    card: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        paddingVertical: 20,
        position: "relative",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    disabledCard: {
        backgroundColor: "#e9ebee",
    },
    cardText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#444",
        marginTop: 10,
    },
    notificationBadge: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#3b5998",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
    },
    comingSoon: {
        fontSize: 12,
        color: "#888",
        marginTop: 5,
    },
    bottomMenu: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 15,
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    menuItem: {
        alignItems: "center",
    },
    menuText: {
        fontSize: 13,
        color: "#8b9dc3",
        marginTop: 5,
    },
});

export default IndexScreen;

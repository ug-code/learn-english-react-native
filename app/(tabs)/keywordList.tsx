import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getKeywordListService, setLearnKeywordService } from '@/services/wordService';

export default function IndexScreen() {
    const router = useRouter();
    const [apiData, setApiData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchData = async () => {
        try {
            const response = await getKeywordListService();
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
            fetchData();
        }, [])
    );

    const handleLearnKeyword = async (id: string) => {
        try {
            await setLearnKeywordService(id);
            setApiData((prevData) =>
                prevData.map((item) =>
                    item.id === id ? { ...item, is_learned: true } : item
                )
            );
        } catch (err) {
            Alert.alert('Hata', 'Kelime öğrenilirken bir hata oluştu.');
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
            ) : error ? (
                <Text style={styles.infoText}>{error}</Text>
            ) : apiData.length === 0 ? (
                <Text style={styles.infoText}>Henüz bir kelime eklenmedi.</Text>
            ) : (
                <FlatList
                    data={apiData.filter((item) => !item.is_learned)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.wordInfo}>
                                <Text style={styles.cardTitle}>{item.eng_keyword}</Text>
                                <Text style={styles.cardDefinition}>{item.tr_keyword}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.learnButton}
                                onPress={() => handleLearnKeyword(item.id)}
                            >
                                <Text style={styles.learnButtonText}>✔</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginVertical: 10,
    },
    wordInfo: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDefinition: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    learnButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    learnButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
});

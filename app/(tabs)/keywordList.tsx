import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import {useRouter, RouteParams, useFocusEffect} from 'expo-router';
import { WordContext } from '@/context/WordContext';
import { getKeywordListService, setLearnKeywordService } from '@/services/wordService';  // Servisleri import ediyoruz.

export default function IndexScreen() {
    const router = useRouter();
    const { words } = useContext(WordContext);

    // API'den gelen veriler için state
    const [apiData, setApiData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const fetchData = async () => {
        try {
            const response = await getKeywordListService();
            console.log('response', response);
            const data = response?.data || [];
            setApiData(data);
        } catch (err) {
            setError('Veri yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };
    // API'den veriyi almak için useEffect
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    // "Öğrenildi" butonuna basıldığında, kelimeyi API'ye göndererek öğrenildi olarak işaretliyoruz
    const handleLearnKeyword = async (id: string) => {
        try {
            // API'ye kelimeyi öğrenildi olarak işaretliyoruz
            await setLearnKeywordService(id);

            // API'den gelen veriyi güncelle
            const updatedData = apiData.map((item) => {
                if (item.id === id) {
                    return { ...item, is_learned: true };  // Öğrenildi olarak işaretliyoruz
                }
                return item;
            });

            setApiData(updatedData);  // Güncellenmiş veriyi state'e kaydediyoruz

            // alert('Kelime öğrenildi olarak işaretlendi!');
        } catch (err) {
            setError('Kelime güncellenirken bir hata oluştu.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Kelime Ekle" onPress={() => router.push('/addWord')} color="#4CAF50" />

            {loading ? (
                <Text style={styles.infoText}>Yükleniyor...</Text>
            ) : error ? (
                <Text style={styles.infoText}>{error}</Text>
            ) : apiData.length === 0 ? (
                <Text style={styles.infoText}>Henüz bir kelime eklenmedi.</Text>
            ) : (
                <FlatList
                    data={apiData.filter(item => !item.is_learned)}  // Öğrenilen kelimeleri filtreliyoruz
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{item?.eng_keyword}</Text>
                            <Text style={styles.cardDefinition}>{item?.tr_keyword}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleLearnKeyword(item?.id)}  // API'yi çağırıyoruz
                            >
                                <Text style={styles.buttonText}>Öğrenildi</Text>
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
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDefinition: {
        fontSize: 14,
        color: '#555',
        marginVertical: 8,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
});

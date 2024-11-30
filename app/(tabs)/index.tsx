import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { WordContext } from '@/context/WordContext';

export default function HomeScreen() {
    const router = useRouter();
    const { words, toggleLearned } = useContext(WordContext);

    return (
        <View style={styles.container}>
            <Button title="Kelime Ekle" onPress={() => router.push('/addWord')} color="#4CAF50" />

            {words.length === 0 ? (
                <Text style={styles.infoText}>Henüz bir kelime eklenmedi.</Text>
            ) : (
                <FlatList
                    data={words.filter((word: any) => !word.learned)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{item.word}</Text>
                            <Text style={styles.cardDefinition}>{item.definition}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => toggleLearned(index)}
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

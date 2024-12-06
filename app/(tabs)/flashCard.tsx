import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { getKeywordListService, setLearnKeywordService } from '@/services/wordService';
import * as Speech from 'expo-speech';

const FlashcardScreen = () => {
    const [cards, setCards] = useState<any[]>([]);
    const [sound, setSound] = useState<any>(null);
    const [cardIndex, setCardIndex] = useState<number>(0);
    const translateX = useState(new Animated.Value(0))[0]; // Pan gesture için Animated.Value

    useEffect(() => {
        const fetchData = async () => {
            const response = await getKeywordListService();
            setCards(response.data || []);
        };
        fetchData();
    }, []);



    const handleSpeak = (text: string) => {
        if (text) {
            Speech.speak(text, {
                language: 'en', // İngilizce sesli okuma
            });
        }
    };

    const handleLearned = async (id: string) => {
        try {
            await setLearnKeywordService(id);
            setCards(prevCards =>
                prevCards.map(card =>
                    card.id === id ? { ...card, is_learned: true } : card
                )
            );
        } catch (err) {
            Alert.alert('Hata', 'Kelime öğrenilirken bir hata oluştu.');
        }
    };

    const handleGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    const handleGestureEnd = (e: any) => {
        if (e.nativeEvent.translationX < -150) {  // Sol kaydırma
            if (cardIndex < cards.length - 1) {
                setCardIndex(cardIndex + 1); // Sonraki karta geç
            }
        } else if (e.nativeEvent.translationX > 150) {  // Sağ kaydırma
            if (cardIndex > 0) {
                setCardIndex(cardIndex - 1); // Önceki karta geri dön
            }
        }

        // Kart hareketini sıfırlama
        Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true
        }).start();
    };

    return (

        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                {cards.length > 0 && (
                    <PanGestureHandler
                        onGestureEvent={handleGestureEvent}
                        onHandlerStateChange={handleGestureEnd}>
                        <Animated.View
                            style={[
                                styles.card,
                                {
                                    backgroundColor: cards[cardIndex].is_learned ? '#d3ffd3' : '#fff',
                                    transform: [{ translateX }] // Kartı kaydırma
                                }
                            ]}>
                            <Text style={styles.word}>{cards[cardIndex].eng_keyword}</Text>
                            <Text style={styles.definition}>{cards[cardIndex].tr_keyword}</Text>
                            <TouchableOpacity onPress={() => handleSpeak(cards[cardIndex].eng_keyword)}>
                                <Text style={styles.audioButton}>Dinle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.learnButton}
                                onPress={() => handleLearned(cards[cardIndex].id)}>
                                <Text style={styles.learnButtonText}>Öğrendim</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </PanGestureHandler>
                )}
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        height: '80%', // Kartın boyutunu artırarak tüm ekranı kaplatabilirsiniz
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: 'white', // Varsayılan beyaz renk
        justifyContent: 'center',
        alignItems: 'center',
    },
    word: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    definition: {
        fontSize: 24,
        color: '#555',
        marginTop: 10,
    },
    audioButton: {
        marginTop: 10,
        fontSize: 18,
        color: '#2196F3',
    },
    learnButton: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    learnButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default FlashcardScreen;

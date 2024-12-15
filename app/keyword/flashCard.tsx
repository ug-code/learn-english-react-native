import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Animated,
    Platform,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import {GestureHandlerRootView, PanGestureHandler} from 'react-native-gesture-handler';
import {getKeywordListService, setLearnKeywordService} from '@/services/wordService';
import * as Speech from 'expo-speech';
import KeywordHeader from '@/components/keyword/keywordHeader';
import {Ionicons} from '@expo/vector-icons';

const FlashCardScreen = () => {
    const [cards, setCards] = useState<any[]>([]);
    const [filteredCards, setFilteredCards] = useState<any[]>([]);
    const [cardIndex, setCardIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>('notLearned');

    const translateX = useState(new Animated.Value(0))[0];
    const checkPlatformUseNativeDriver = Platform.OS !== 'web';

    useEffect(() => {
        const fetchData = async () => {
            const response = await getKeywordListService();
            const data = response.data || [];
            setCards(data);
            setFilteredCards(data);
            setLoading(false);
        };
        fetchData().then();
    }, []);

    const handleSpeak = (text: string) => {
        if (text) {


            Speech.speak(text, {
                language: 'en-US',
            });


        }
    };

    const handleLearned = async (id: string, isLearned: any) => {
        try {
            await setLearnKeywordService(id, isLearned);
            setCards(prevCards =>
                prevCards.map(card =>
                    card.id === id ? {...card, is_learned: true} : card
                )
            );
        } catch (err) {
            Alert.alert('Hata', 'Kelime öğrenilirken bir hata oluştu.');
        }
    };

    useEffect(() => {
        const applyFilter = () => {
            if (filter === 'learned') {
                setFilteredCards(cards.filter(card => card.is_learned));
            } else if (filter === 'notLearned') {
                setFilteredCards(cards.filter(card => !card.is_learned));
            } else {
                setFilteredCards(cards);
            }
            setCardIndex(0);
        };
        applyFilter();
    }, [filter, cards]);

    const handleGestureEvent = Animated.event(
        [{nativeEvent: {translationX: translateX}}],
        {useNativeDriver: checkPlatformUseNativeDriver}
    );

    const handleGestureEnd = (e: any) => {
        const {translationX} = e.nativeEvent;
        const threshold = 150;

        if (translationX < -threshold && cardIndex < filteredCards.length - 1) {
            Animated.timing(translateX, {
                toValue: -500,
                duration: 300,
                useNativeDriver: checkPlatformUseNativeDriver,
            }).start(() => {
                setCardIndex(cardIndex + 1);
                translateX.setValue(0);
            });
        } else if (translationX > threshold && cardIndex > 0) {
            Animated.timing(translateX, {
                toValue: 500,
                duration: 300,
                useNativeDriver: checkPlatformUseNativeDriver,
            }).start(() => {
                setCardIndex(cardIndex - 1);
                translateX.setValue(0);
            });
        } else {
            Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: checkPlatformUseNativeDriver,
            }).start();
        }
    };

    const randomColors = ['#FFD700', '#FF6347', '#40E0D0', '#8A2BE2', '#FF69B4'];
    const currentColor = randomColors[cardIndex % randomColors.length];

    return (
        <View style={styles.container}>
            <KeywordHeader dismissToPath="/keyword/wordList">
                <Text style={styles.headerTitle}>Kelimelerim</Text>
                <Text style={styles.subtitle}>1 Kelime Listesi</Text>
            </KeywordHeader>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Kelime: {cardIndex + 1}/{filteredCards.length}</Text>
            </View>

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                    onPress={() => setFilter('all')}
                >
                    <Text style={styles.filterText}>Tümü</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'learned' && styles.activeFilter]}
                    onPress={() => setFilter('learned')}
                >
                    <Text style={styles.filterText}>Öğrendiklerim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'notLearned' && styles.activeFilter]}
                    onPress={() => setFilter('notLearned')}
                >
                    <Text style={styles.filterText}>Öğrenmediklerim</Text>
                </TouchableOpacity>
            </View>

            <GestureHandlerRootView style={{flex: 1}}>
                {loading ? (
                    <ActivityIndicator size="large"
                                       color="#4CAF50"
                                       style={styles.loader}/>
                ) : filteredCards.length === 0 ? (
                    <Text style={styles.noWords}>Henüz bir kelime eklenmedi.</Text>
                ) : (
                    <View style={styles.cardContainer}>
                        <PanGestureHandler
                            onGestureEvent={handleGestureEvent}
                            onHandlerStateChange={handleGestureEnd}>
                            <Animated.View
                                style={[
                                    styles.card,
                                    {backgroundColor: currentColor, transform: [{translateX}]},
                                ]}>
                                <ScrollView contentContainerStyle={styles.scrollContent}>
                                    <Text style={styles.title}
                                          selectable>{filteredCards[cardIndex]?.eng_keyword}
                                        <TouchableOpacity
                                            style={styles.voiceButton}
                                            onPress={() => handleSpeak(filteredCards[cardIndex]?.eng_keyword)}>
                                            <Ionicons name="volume-high"
                                                      size={15}
                                                      color="#fff"/>
                                        </TouchableOpacity>
                                    </Text>
                                    <Text style={styles.phonetic}
                                          selectable>{filteredCards[cardIndex]?.tr_keyword}
                                    </Text>
                                    <Text style={styles.phonetic}
                                          selectable>{filteredCards[cardIndex]?.detail[0]?.phonetic || ''}</Text>


                                    {(filteredCards[cardIndex]?.detail.length>0) && filteredCards[cardIndex]?.detail?.map((item: any, index: number) => (
                                        item?.meanings?.map((meaning: any, meaningKey: number) => (
                                            <View key={`${index}-${meaningKey}`}
                                                  style={styles.meaningContainer}>
                                                <Text style={styles.partOfSpeech}
                                                      selectable>

                                                    {meaning.partOfSpeech}</Text>
                                                <Text style={styles.definition}
                                                      selectable>Definition: {meaning?.definitions[0]?.definition}
                                                    <TouchableOpacity
                                                        style={styles.voiceButton}
                                                        onPress={() => handleSpeak(meaning?.definitions[0]?.definition)}>
                                                        <Ionicons name="volume-high"
                                                                  size={15}
                                                                  color="#fff"/>
                                                    </TouchableOpacity>

                                                </Text>
                                                {meaning?.definitions[0]?.example ? (
                                                    <Text style={styles.example}
                                                          selectable>Example: {meaning?.definitions[0]?.example}
                                                        <TouchableOpacity
                                                            style={styles.voiceButton}
                                                            onPress={() => handleSpeak(meaning?.definitions[0]?.example)}>
                                                            <Ionicons name="volume-high"
                                                                      size={15}
                                                                      color="#fff"/>
                                                        </TouchableOpacity>

                                                    </Text>

                                                ) : ''
                                                }


                                                {(meaning?.synonyms && meaning?.synonyms?.length) ? (
                                                    <Text style={styles.synonyms}
                                                          selectable>Synonyms: {meaning?.synonyms?.join(', ') || 'N/A'}</Text>
                                                ) : ''
                                                }


                                                {(meaning?.antonyms && meaning?.antonyms?.length) ? (
                                                    <Text style={styles.antonyms}
                                                          selectable>Antonyms: {meaning?.antonyms?.join(', ') || 'N/A'}</Text>
                                                ) : ''
                                                }

                                            </View>
                                        ))
                                    ))}
                                </ScrollView>

                                <TouchableOpacity
                                    style={styles.learnButton}
                                    onPress={() => handleLearned(filteredCards[cardIndex].id, filteredCards[cardIndex].is_learned)}>
                                    <Text style={styles.learnButtonText}>

                                        {filteredCards[cardIndex].is_learned ? 'Öğrendim' : 'Çıkar'}


                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </PanGestureHandler>

                        {/* Preview of previous and next cards */}
                        {cardIndex > 0 && (
                            <View style={[styles.preview, styles.leftPreview]}>
                                <Text style={styles.previewText}>{filteredCards[cardIndex - 1]?.eng_keyword}</Text>
                            </View>
                        )}
                        {cardIndex < filteredCards.length - 1 && (
                            <View style={[styles.preview, styles.rightPreview]}>
                                <Text style={styles.previewText}>{filteredCards[cardIndex + 1]?.eng_keyword}</Text>
                            </View>
                        )}
                    </View>
                )}
            </GestureHandlerRootView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 5,
    },
    infoContainer: {
        padding: 10,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 3,
    },
    filterButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        backgroundColor: '#ccc',
    },
    activeFilter: {
        backgroundColor: '#4CAF50',
    },
    filterText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        height: '80%',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    phonetic: {
        fontSize: 18,
        color: '#888',
        marginVertical: 10,
    },
    voiceButton: {
        marginTop: 10,
        alignSelf: 'flex-start',
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 8,
    },
    meaningContainer: {
        marginVertical: 10,
    },
    partOfSpeech: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
    },
    definition: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    example: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#444',
        marginTop: 5,
    },
    synonyms: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    antonyms: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    learnButton: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    learnButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noWords: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    preview: {
        position: 'absolute',
        top: '95%',
        transform: [{translateY: -50}],
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    leftPreview: {
        left: 10,
    },
    rightPreview: {
        right: 10,
    },
    previewText: {
        fontSize: 14,
        color: '#333',
    },
});

export default FlashCardScreen;

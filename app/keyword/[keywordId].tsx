import {View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import React, {useState} from 'react';
import {useFocusEffect, useLocalSearchParams, useRouter} from 'expo-router';
import {getKeywordService} from '@/services/wordService';
import * as Speech from 'expo-speech';

export default function KeywordIdScreen() {

    const router = useRouter();

    const {keywordId} = useLocalSearchParams();


    const [apiData, setApiData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchData = async () => {
        try {
            const response = await getKeywordService(keywordId);
            const data = response?.data || [];
            setApiData(data);

            console.log('apiData', apiData);
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

    const handleSpeak = (text: string) => {
        console.log("handleSpeak",text);
        if (text) {
            Speech.speak(text, {
                language: 'en', // İngilizce sesli okuma
            });
        }
    };

    return (
        <View style={styles.container}>
            {/* Üst Kısım */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}

                                  onPress={() => {
                                      // Navigate using the `navigation` prop that you received
                                      //navigation.navigate('index');
                                      router.dismissTo('/keyword/wordList')
                                  }}>
                    <Ionicons name="chevron-back"
                              size={24}
                              color="#000"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kelimelerim</Text>
                <Text style={styles.subtitle}>1 Kelime Listesi</Text>

            </View>


            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Bir kelime ara"
                />
            </View>

            <ScrollView>


                {loading ? (
                    <ActivityIndicator size="large"
                                       color="#4CAF50"/>
                ) : error ? (
                    <Text style={styles.content}>{error}</Text>
                ) : apiData.length === 0 ? (
                    <Text style={styles.content}>Henüz bir kelime eklenmedi.</Text>
                ) : (

                    apiData.translate?.map((item: any) => (
                        item.meanings?.map((meaning: any, meaningKey: any) => (
                            <View key={meaningKey}
                                  style={styles.content}>
                                <View
                                    style={styles.card}>
                                    <Text style={styles.title}>{apiData?.keyword?.eng_keyword}   {item.phonetic}</Text>

                                    <TouchableOpacity style={styles.voiceButton}
                                                      onPress={() => handleSpeak(apiData?.keyword?.eng_keyword)}
                                    >
                                        <Ionicons name="volume-high" size={30} color="#fff" />
                                    </TouchableOpacity>

                                    <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
                                    <Text style={styles.definitionNumber}>example: {meaning?.definitions[0]?.example}</Text>
                                    <Text style={styles.definition}>
                                        definition: {meaning?.definitions[0]?.definition}
                                    </Text>

                                    <Text style={styles.definition}>
                                        synonyms : {meaning?.synonyms.join(', ')}
                                    </Text>
                                    <Text style={styles.definition}>
                                        antonyms : {meaning?.antonyms.join(', ')}
                                    </Text>
                                </View>
                            </View>
                        ))

                    ))
                )}


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#FAD7A0',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative',
    },
    backButton: {
        width: 40,
        height: 40,
    },
    addButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    voiceButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 5,
    },
    time: {
        fontSize: 18,
        color: '#000',
    },
    searchContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    partOfSpeech: {
        fontSize: 18,
        color: '#666',
        marginVertical: 5,
    },
    definitionNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 5,
    },
    definition: {
        fontSize: 16,
        color: '#333',
        marginVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 20,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    footer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    footerText: {
        fontSize: 14,
        color: '#000',
    },
});

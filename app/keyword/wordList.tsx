import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useFocusEffect, useRouter} from 'expo-router';
import {getKeywordListService, setLearnKeywordService} from '@/services/wordService';
import KeywordHeader from '@/components/keyword/keywordHeader';

const WordListScreen = () => {
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
            await setLearnKeywordService(id, true);
            setApiData((prevData) =>
                prevData.map((item) =>
                    item.id === id ? {...item, is_learned: true} : item
                )
            );
        } catch (err) {
            Alert.alert('Hata', 'Kelime öğrenilirken bir hata oluştu.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Üst Kısım */}
            <KeywordHeader dismissToPath="/keyword/keywordCategory">
                <Text style={styles.title}>Kelimelerim</Text>
                <Text style={styles.subtitle}>1 Kelime Listesi</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Ionicons name="create-outline"
                                  size={24}
                                  color="#000"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="trash-outline"
                                  size={24}
                                  color="#000"/>
                    </TouchableOpacity>
                </View>
            </KeywordHeader>

            {/* Başlık Bölümü */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>--free--</Text>
                <View style={styles.metaInfo}>
                    <MaterialCommunityIcons name="folder-outline"
                                            size={16}
                                            color="#555"/>
                    <Text style={styles.metaText}>1</Text>
                    <MaterialCommunityIcons name="calendar-outline"
                                            size={16}
                                            color="#555"
                                            style={{marginLeft: 10}}/>
                    <Text style={styles.metaText}>03 Dec</Text>
                </View>
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.shareButton}>
                        <Text style={styles.buttonText}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.studyButton}
                                      onPress={() => {

                                          // router.dismissTo('/keyword/[keywordId]')
                                          router.dismissTo('/keyword/flashCard');
                                      }}>
                        <Text style={styles.buttonText}>Study</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Kelime Listesi */}
            <ScrollView style={styles.wordListContainer}>
                <View style={styles.wordListHeader}>
                    <Text style={styles.wordListTitle}>Free wordlist</Text>
                    <View style={styles.wordListActions}>
                        <TouchableOpacity>
                            <Ionicons name="create-outline"
                                      size={20}
                                      color="#555"/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="trash-outline"
                                      size={20}
                                      color="#e74c3c"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.addWordButton}>
                    <Ionicons name="add-circle-outline"
                              size={24}
                              color="#888"/>
                    <Text style={styles.addWordText}>Yeni kelimeyi ekle</Text>
                </TouchableOpacity>

                {/* Örnek Kelime */}


                {loading ? (
                    <ActivityIndicator size="large"
                                       color="#4CAF50"/>
                ) : error ? (
                    <Text style={styles.wordItem}>{error}</Text>
                ) : apiData.length === 0 ? (
                    <Text style={styles.wordItem}>Henüz bir kelime eklenmedi.</Text>
                ) : (
                    apiData.map((item) => (
                        <View key={item.id}
                              style={styles.wordItem}>
                            <Image
                                source={{uri: 'https://via.placeholder.com/50x50'}} // Örnek görsel URL
                                style={styles.wordImage}
                            />
                            <TouchableOpacity style={styles.wordTextContainer}

                                              onPress={() => {
                                                  // Navigate using the `navigation` prop that you received
                                                  //navigation.navigate('index');
                                                  const keywordId: string = (item?.id).toString() ?? '';
                                                  console.log('keywordId', keywordId);
                                                  // router.dismissTo('/keyword/[keywordId]')
                                                  router.push({
                                                      pathname: '/keyword/[keywordId]',
                                                      params: {keywordId: keywordId}
                                                  })
                                              }}>

                                <Text style={styles.wordTitle}>{item?.eng_keyword}</Text>
                                <Text style={styles.wordSubtitle}>{item.tr_keyword}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="close"
                                          size={24}
                                          color="#888"/>
                            </TouchableOpacity>
                        </View>
                    ))
                )}


            </ScrollView>


        </View>
    );
};

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
        padding: 5,
    },
    iconImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        position: 'absolute',
        top: 50,
        right: 20,
        width: 40,
        height: 40,

    },
    titleContainer: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f4f4f4',
    },
    title: {
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
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    metaText: {
        fontSize: 12,
        color: '#555',
        marginLeft: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    shareButton: {
        backgroundColor: '#ddd',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    studyButton: {
        backgroundColor: '#3498db',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    wordListContainer: {
        padding: 15,
    },
    wordListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    wordListTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    wordListActions: {
        flexDirection: 'row',
        gap: 10,
    },
    addWordButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    addWordText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#888',
    },
    wordItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    wordImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    wordTextContainer: {
        flex: 1,
    },
    wordTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    wordSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    premiumContainer: {
        padding: 15,
        backgroundColor: '#eaf2f8',
        alignItems: 'center',
    },
    premiumText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3498db',
    },
    premiumButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    premiumButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default WordListScreen;

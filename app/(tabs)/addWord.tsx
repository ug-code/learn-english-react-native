import React, {useState, useRef, useEffect} from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import {createKeywordService, getCategory} from '@/services/wordService';
import {Dropdown} from 'react-native-element-dropdown'; // Servis dosyasından import



export default function AddWordScreen() {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const wordInputRef = useRef<TextInput>(null); // Kelime alanı için ref
    const definitionInputRef = useRef<TextInput>(null); // Anlam alanı için ref
    const [categoryId, setCategoryId] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [category, setCategory] = useState<any[]>([]);



    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await getCategory();
            const data = response.data || [];

            const transformedData = data.map((item:any):any => ({
                label: item?.description,
                value: item?.id?.toString()
            }));

            setCategory(transformedData);
            setIsLoading(false);
        };
        fetchData().then();
    }, []);



    const renderLabel = () => {
        if (categoryId || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };


    const handleAddWord = async () => {
        if (!word || !definition) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
            return;
        }

        setIsLoading(true);

        try {
            await createKeywordService('userId', word, definition ,categoryId); // Kullanıcı ID'si ve kelimeler
            Alert.alert('Başarılı', 'Kelime başarıyla eklendi.');
            setWord('');
            setDefinition('');
            wordInputRef.current?.focus(); // İlk input alanına geri odaklan
             // router.push('/keywordList');
        } catch (error) {
            Alert.alert('Hata', 'Kelime eklenirken bir hata oluştu.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style={styles.inner}>
                <View>

                    <Text style={styles.title}>Yeni Kelime Ekle</Text>

                    {renderLabel()}
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={category}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={categoryId}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item): any => {
                            setCategoryId(item.value);
                            setIsFocus(false);
                        }}

                    />
                </View>


                <Text style={styles.label}>Kelime:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Kelime"
                    value={word}
                    onChangeText={setWord}
                    ref={wordInputRef} // Ref atandı
                    autoFocus={Platform.OS === 'web'} // Sadece webde otomatik odaklanma
                />

                <Text style={styles.label}>Anlamı:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Anlamı"
                    value={definition}
                    onChangeText={setDefinition}
                    ref={definitionInputRef} // Ref atandı
                    autoFocus={Platform.OS === 'web'} // Sadece webde otomatik odaklanma
                />

                {isLoading ? (
                    <ActivityIndicator size="large"
                                       color="#4CAF50"/>
                ) : (
                    <Button title="Kelime Ekle"
                            onPress={handleAddWord}
                            color="#4CAF50"/>
                )}
            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    inner: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    input: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    dropdownlabel: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },


});

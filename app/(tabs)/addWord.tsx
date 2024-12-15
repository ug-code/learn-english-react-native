import React, {useState, useRef} from 'react';
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
import {useRouter} from 'expo-router';
import {createKeywordService} from '@/services/wordService'; // Servis dosyasından import

export default function AddWordScreen() {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const wordInputRef = useRef<TextInput>(null); // Kelime alanı için ref
    const definitionInputRef = useRef<TextInput>(null); // Anlam alanı için ref
    const router = useRouter();

    const handleAddWord = async () => {
        if (!word || !definition) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
            return;
        }

        setIsLoading(true);

        try {
            await createKeywordService('userId', word, definition); // Kullanıcı ID'si ve kelimeler
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
                <Text style={styles.title}>Yeni Kelime Ekle</Text>

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
});

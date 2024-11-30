import React, { useState, useContext } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { WordContext } from '@/context/WordContext';

export default function AddWordScreen() {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const router = useRouter();
    const { addWord } = useContext(WordContext);

    const handleAddWord = () => {
        if (word && definition) {
            addWord({ word, definition, learned: false });
            router.push('/'); // Ana sayfaya dön
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
                    autoFocus={Platform.OS === 'web'} // Webde otomatik odaklanmayı sağla
                />

                <Text style={styles.label}>Anlamı:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Anlamı"
                    value={definition}
                    onChangeText={setDefinition}
                    autoFocus={Platform.OS === 'web'} // Webde otomatik odaklanmayı sağla
                />

                <Button title="Kelime Ekle" onPress={handleAddWord} color="#4CAF50" />
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
        shadowOffset: { width: 0, height: 4 },
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

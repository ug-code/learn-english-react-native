import {TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import {Href, RelativePathString, useRouter} from 'expo-router';

const KeywordHeader = ({ children, dismissToPath }: { children?: React.ReactNode; dismissToPath: Href }) => {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    router.dismissTo(dismissToPath);
                }}
            >
                <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default KeywordHeader;

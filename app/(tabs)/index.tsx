import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { PieChart } from 'react-native-gifted-charts';

export default function IndexScreen() {
    const router = useRouter();

    const pieData = [
        { value: 47, color: '#4CAF50' }, // Öğrenilen
        { value: 53, color: '#ddd' },    // Kalan
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={pieData}
                    donut
                    showText
                    textSize={20}
                    textColor="#333"
                    radius={120}
                    innerRadius={80}
                    innerCircleColor="#fff"
                    centerLabelComponent={() => (
                        <View style={styles.centerLabel}>
                            <Text style={styles.centerLabelValue}>10/000</Text>
                            <Text style={styles.centerLabelText}>Kelime</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#4CAF50' }]}
                    onPress={() => router.push('/addWord')}
                >
                    <Text style={styles.buttonText}>Kelime Ekle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#2196F3' }]}
                    onPress={() => router.push('/keywordList')}
                >
                    <Text style={styles.buttonText}>Tekrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    chartContainer: {
        marginBottom: 30,
    },
    centerLabel: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerLabelValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    centerLabelText: {
        fontSize: 16,
        color: '#555',
    },
    buttonGroup: {
        flexDirection: 'row',
        marginTop: 30,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

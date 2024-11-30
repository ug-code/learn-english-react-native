import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { PieChart } from 'react-native-chart-kit';

export default function IndexScreen() {
    const router = useRouter();

    const screenWidth = Dimensions.get('window').width;

    const data = [
        {
            name: 'Öğrenilen',
            population: 10, // Öğrenilen kelime sayısı
            color: '#4CAF50',
            legendFontColor: '#333',
            legendFontSize: 15,
        },
        {
            name: 'Kalan',
            population: 990, // Kalan kelime sayısı
            color: '#ddd',
            legendFontColor: '#333',
            legendFontSize: 15,
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Hoş Geldiniz</Text>

            <PieChart
                data={data}
                width={screenWidth - 40}
                height={200}
                chartConfig={{
                    color: () => '#000',
                    labelColor: () => '#333',
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />

            <Text style={styles.wordCountText}>10 / 000 Kelime</Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Yeni Kelime Öğren"
                    onPress={() => router.push('/addWord')}
                    color="#4CAF50"
                />
                <View style={styles.spacer} />
                <Button
                    title="Tekrar"
                    onPress={() => router.push('/keywordList')}
                    color="#2196F3"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    wordCountText: {
        fontSize: 18,
        marginTop: 10,
        color: '#555',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    spacer: {
        width: 20,
    },
});

/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import Card from '@/components/flashCard/Card';
import Activity from '@/components/flashCard/Activity';
import {getKeywordListService} from '@/services/wordService';
import RNProgressBar from 'react-native-tooltip-progress-bar';


const CarouselScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activityIndex, setActivityIndex] = useState(0);
    const animatedValue = useSharedValue(0);
    const MAX = 3;

    const [cards, setCards] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getKeywordListService();
            setCards(response.data || []);
        };
        fetchData();
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        if (animatedValue.value > currentIndex + 0.5) {
            runOnJS(setActivityIndex)(currentIndex + 1);
        } else {
            runOnJS(setActivityIndex)(currentIndex);
        }
        const opacity = interpolate(
            animatedValue.value,
            [currentIndex, currentIndex + 0.3, currentIndex + 0.8, currentIndex + 1],
            [1, 0, 0, 1],
            Extrapolation.CLAMP,
        );

        return {
            opacity: opacity,
        };
    });

    return (
        <>

            <GestureHandlerRootView style={{flex: 1}}>
                <SafeAreaView style={styles.container}>
                    <View >
                        <RNProgressBar
                            options={{leftColor: '#4385f0', rightColor: '#aac0e3'}}
                            value={activityIndex}
                        />
                    </View>
                    <View style={styles.cardContainer}>
                        {cards.map((item, index) => {
                            if (index > currentIndex + MAX || index < currentIndex) {
                                return null;
                            }
                            return (
                                <Card
                                    newData={cards}
                                    setNewData={setCards}
                                    maxVisibleItems={MAX}
                                    item={item}
                                    index={index}
                                    dataLength={cards.length}
                                    animatedValue={animatedValue}
                                    currentIndex={currentIndex}
                                    setCurrentIndex={setCurrentIndex}
                                    key={index}
                                />
                            );
                        })}
                    </View>
                    {/*
                <Text style={styles.text}>Recent Activity</Text>
                <View style={styles.activityContainer}>
                    <Animated.ScrollView
                        showsVerticalScrollIndicator={false}
                        style={[{width: '100%'}, animatedStyle]}>
                        {newData[activityIndex].activity.map((item, index) => {
                            return <Activity item={item} key={index} />;
                        })}
                    </Animated.ScrollView>
                </View>
                */}
                </SafeAreaView>
            </GestureHandlerRootView>
        </>

    );
};

export default CarouselScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcc530',
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityContainer: {
        flex: 3 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        position: 'relative',
        paddingHorizontal: 16,
    },
});

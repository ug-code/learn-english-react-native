import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {StatusBar} from 'expo-status-bar'; // Make sure this package is installed

const data = [
    {
        key: 'one',
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: require('../../assets/images/adaptive-icon.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 'two',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('../../assets/images/adaptive-icon.png'),
        backgroundColor: '#febe29',
    },
    {
        key: 'three',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../../assets/images/adaptive-icon.png'),
        backgroundColor: '#22bcb5',
    }
];

type Item = typeof data[0];


const Onboarding3Screen = () => {
    const [showRealApp, setShowRealApp] = useState(false);

    const _renderItem = ({ item }:any) => {
        return (
            <ImageBackground style={styles.slide} source={item.image}>
                <Text style={styles.text}>{item.text}</Text>
            </ImageBackground>
        );
    };


    const _keyExtractor = (item: Item) => item.text;

    return( <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            data={data}
        />
    </View>);
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        resizeMode: 'cover',
    },
    text: {
        color: '#333',
        marginTop: 92,
        textAlign: 'center',
    },
});

export default Onboarding3Screen;

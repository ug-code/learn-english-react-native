import {Tabs} from 'expo-router';
import React from 'react';
import {Platform, Text} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarIcon: ({color}) =>
                        <Ionicons name="home-outline" size={28} color="#3b5998" />,
                }}
            />
            <Tabs.Screen
                name="addWord"
                options={{
                    title: 'Add Word',
                    tabBarIcon: ({color}) => <IconSymbol size={28}
                                                         name="paperplane.fill"
                                                         color={color}/>,
                }}
            />
            <Tabs.Screen
                name="flashCard"
                options={{
                    title: 'flashCard',
                    tabBarIcon: ({color}) => <IconSymbol size={28}
                                                         name="paperplane.fill"
                                                         color={color}/>,
                }}
            />            <Tabs.Screen
                name="carousel"
                options={{
                    title: 'carousel',
                    tabBarIcon: ({color}) => <IconSymbol size={28}
                                                         name="paperplane.fill"
                                                         color={color}/>,
                }}
            />
            <Tabs.Screen
                name='completed'
                options={{
                    title: 'completed',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name='user-alt' size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name='test'
                options={{
                    title: 'test',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name='user-alt' size={24} color={color} />
                    ),
                }}
            />


        </Tabs>
    );
}

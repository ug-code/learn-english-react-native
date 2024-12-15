import { Stack } from "expo-router"
import WordListScreen from '@/app/keyword/wordList';
import FlashcardScreen from '@/app/keyword/flashCard';

export default function ChatsLayout() {
    return (
        <Stack >
            <Stack.Screen name="keywordCategory"
                          options={{
                              headerShown: false
            }}/>
            <Stack.Screen name="wordList"
                          options={{
                              headerShown: false
            }}/>

            <Stack.Screen name="[keywordId]"
                          options={{
                              headerShown: false
            }}/>

            <Stack.Screen name="flashCard"
                          options={{
                              headerShown: false
            }}/>
        </Stack>
    )
}

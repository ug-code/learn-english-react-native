import { Stack } from "expo-router"
import WordListScreen from '@/app/keyword/wordList';

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
        </Stack>
    )
}

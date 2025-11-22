import { Stack } from 'expo-router';

export default function DevicesLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
            <Stack.Screen name="manual" options={{ headerShown: false }} />
        </Stack>
    );
}

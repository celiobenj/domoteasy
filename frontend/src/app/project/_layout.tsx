import { Stack } from 'expo-router';

export default function ProjectLayout() {
    return (
        <Stack>
            <Stack.Screen name="create" options={{ headerShown: false }} />
            <Stack.Screen name="recommendations" options={{ headerShown: false }} />
            <Stack.Screen name="budget" options={{ headerShown: false }} />
        </Stack>
    );
}

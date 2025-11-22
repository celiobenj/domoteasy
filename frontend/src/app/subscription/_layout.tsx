import { Stack } from 'expo-router';

export default function SubscriptionLayout() {
    return (
        <Stack>
            <Stack.Screen name="manage" options={{ headerShown: false }} />
            <Stack.Screen name="payment" options={{ headerShown: false }} />
            <Stack.Screen name="plans" options={{ headerShown: false }} />
        </Stack>
    );
}

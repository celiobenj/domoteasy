import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './styles'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
    size: number
}

export function ProfilePhoto({ size, ...rest }: Props) {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => router.navigate("./editProfile")} {...rest}>
            <MaterialCommunityIcons
                name={"account"}
                size={size}
                color={"#4A4E69"}
            />
        </TouchableOpacity>
    )
}

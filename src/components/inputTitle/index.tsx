import { Text } from "react-native";
import { View } from "react-native";

import { Input, InputProps } from "../input";
import { styles } from "./styles";

type Props = InputProps & {
    title: string
}

export function InputTitle({ title, icon, size, color, ...rest }: Props) {
    return (
        <View style={styles.section}>
            <Text style={styles.text} >{title}</Text>
            <Input icon={icon} size={size} color={color} {...rest} />
        </View>
    )   
}

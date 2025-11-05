import { ComponentProps, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, TextInput, TextInputProps, View } from "react-native";

import { styles } from "./styles";

export type InputProps = TextInputProps & {
    icon?: ComponentProps<typeof MaterialCommunityIcons>["name"]
    size?: number
    color?: string
    isPsw?: boolean
}

export function Input({ icon, size, color, isPsw, ...rest }: InputProps) {
    const [secure, setSecure] = useState(isPsw);

    return (
        <View style={[styles.container, { position: "relative" }]}>
            <TextInput
                style={[styles.input, { paddingLeft: icon ? (size ?? 24) + 16 : 12 }]}
                placeholderTextColor="#7e7e99"
                secureTextEntry={secure}
                {...rest}
            />
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={size ?? 24}
                    color={color ?? "#7e7e99"}
                    style={{ position: "absolute", left: 12, top: 14 }}
                />
            )}

            {isPsw && (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSecure((s) => !s)}
                    style={{ position: "absolute", right: 12, top: 14 }}
                >
                    <MaterialCommunityIcons
                        name={secure ? "eye-off" : "eye"}
                        size={size ?? 24}
                        color={color ?? "#7e7e99"}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}
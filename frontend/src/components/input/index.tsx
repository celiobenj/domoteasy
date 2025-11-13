import { ComponentProps, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, TextInput, TextInputProps, View } from "react-native";

import { styles } from "./styles";

export type InputProps = TextInputProps & {
    icon?: ComponentProps<typeof MaterialCommunityIcons>["name"]
    size?: number
    color?: string
    isPsw?: boolean
    showPassword?: boolean
    onTogglePassword?: () => void
}

export function Input({ icon, size, color, isPsw, showPassword, onTogglePassword, ...rest }: InputProps) {
    // Se showPassword for fornecido (prop controlada), usar ele; caso contrário, usar estado local
    const [localSecure, setLocalSecure] = useState(isPsw);
    const isControlled = showPassword !== undefined;
    const secure = isControlled ? !showPassword : localSecure;

    const handleToggle = () => {
        if (isControlled && onTogglePassword) {
            onTogglePassword();
        } else {
            setLocalSecure((s) => !s);
        }
    };

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
                    onPress={handleToggle}
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
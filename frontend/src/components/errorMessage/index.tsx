import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorMessageProps {
  message?: string;
  visible?: boolean;
}

export const ErrorMessage = ({ message, visible = true }: ErrorMessageProps) => {
  if (!message || !visible) return null;

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="alert-circle"
        size={20}
        color="#fff"
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F44336',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    flex: 1,
  },
});

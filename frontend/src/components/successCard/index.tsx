import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface SuccessCardProps {
  visible: boolean;
  message?: string;
  onHide?: () => void;
  duration?: number;
}

export const SuccessCard = ({ 
  visible, 
  message = "Sucesso!", 
  onHide, 
  duration = 1500 
}: SuccessCardProps) => {
  const slideAnim = new Animated.Value(-100);

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide?.();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.card}>
        <MaterialCommunityIcons
          name="check-circle"
          size={24}
          color="#fff"
        />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    fontWeight: '500',
  },
});

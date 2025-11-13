// Este arquivo centraliza todas as constantes de design (cores, espaçamentos, fontes)

export const colors = {
  primary: '#4A4E69',
  background: '#F2E9E4',
  text: '#4A4E69',
  onPrimary: '#F2E9E4',
  success: '#4CAF50',
  error: '#F44336',
  white: '#FFFFFF',
};

export const spacing = {
  xsmall: 6,     // gap: 6 (usado no InputTitle)
  small: 8,      // gap: 8 (usado na Checkbox)
  medium: 12,    // padding: 12 (usado no Input e Footer)
  large: 16,     // paddingHorizontal: 16 (Container), gap: 16 (Header)
  xlarge: 24,    // gap: 24 (Body, Buttons)
  xxlarge: 32,   // paddingHorizontal: 32 (Footer)
  xxxlarge: 48,  // paddingVertical: 48 (Container), paddingTop: 48 (Top)
};

export const typography = {
  fontFamily: {
    regular: 'Roboto_400Regular',
    bold: 'Roboto_700Bold',
    heading: 'Arvo_400Regular', 
  },
  fontSize: {
    xsmall: 12,    // errorText
    small: 14,     // errorMessage
    medium: 16,    // Texto padrão, botões, inputs
    large: 20,     // Texto em 'index.tsx' e 'home.tsx'
    xlarge: 24,    // Texto de saudação 'Olá, {name}'
    xxlarge: 28,   // Títulos (h1, title)
  },

  styles: {
    heading: {
      fontFamily: 'Arvo_400Regular',
      fontSize: 28,
      color: colors.text,
    },
    subheading: {
      fontFamily: 'Roboto_700Bold',
      fontSize: 28,
      color: colors.text,
    },
    body: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      color: colors.text,
    },
    bodyBold: {
      fontFamily: 'Roboto_700Bold',
      fontSize: 16,
      color: colors.text,
    },
    button: {
      fontFamily: 'Roboto_700Bold',
      fontSize: 16,
      color: colors.onPrimary,
    },
    caption: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 12,
      color: colors.error,
    },
  }
};

export const radii = { // 'borderRadius'
  xsmall: 4,   // Checkbox
  small: 8,    // ErrorMessage
  medium: 10,  // Input
  large: 16,   // Button
};

export const theme = {
  colors,
  spacing,
  typography,
  radii,
};
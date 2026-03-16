import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'muted';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'muted' ? styles.muted : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 17,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  defaultSemiBold: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 17,
    lineHeight: 25,
    letterSpacing: -0.3,
  },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.6,
  },
  link: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.2,
    color: '#E5481D',
  },
  muted: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    opacity: 0.68,
  },
});

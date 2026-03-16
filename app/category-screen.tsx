import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { categories } from "@/data/casual";

const DATA = Object.keys(categories).map((key) => ({
  key,
  title: key.charAt(0).toUpperCase() + key.slice(1),
  count: (categories as any)[key].length,
  emoji: key === "spicy" ? "🌶️" : key === "deep" ? "🫧" : key === "funny" ? "😂" : "🙂",
}));

const categoryDescriptions: Record<string, string> = {
  spicy: "Flirty, bold, and a bit daring",
  deep: "Slower questions with more meaning",
  funny: "Playful prompts and chaotic energy",
  casual: "Easy starters for any moment",
};

const categoryAccents: Record<string, string> = {
  spicy: "#E15634",
  deep: "#1D7C88",
  funny: "#EF9B0F",
  casual: "#5E708A",
};

export default function CategoryScreen() {
  const { width } = useWindowDimensions();
  const compact = width < 360;
  const numColumns = width >= 980 ? 3 : width >= 680 ? 2 : 1;
  const heroLogoSize = compact ? 86 : 104;

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={["#ac4d4d", "#970909"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.hero}>
          <View style={styles.heroRow}>
            <Image
              source={require("@/assets/images/logo2.png")}
              style={{ width: heroLogoSize, height: heroLogoSize, borderRadius: 20 }}
              contentFit="cover"
            />
            <View style={styles.heroCopy}>
              <ThemedText type="title" style={[styles.title, compact && styles.titleCompact]}>
                Couple Quiz
              </ThemedText>
              <ThemedText type="muted" style={styles.subtitle}>
                Choose a lane and start with questions that feel a bit more intentional.
              </ThemedText>
            </View>
          </View>
        </View>

        <FlatList
          data={DATA}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          renderItem={({ item }) => (
            <View style={[styles.cardShell, numColumns === 1 && styles.cardShellSingle]}>
              <Link href={`/question-screen?category=${item.key}`} asChild>
                <Pressable
                  android_ripple={{ color: "#00000010" }}
                  style={({ pressed }) => [
                    styles.card,
                    {
                      borderColor: `${categoryAccents[item.key] ?? "#5E708A"}44`,
                      shadowColor: categoryAccents[item.key] ?? "#5E708A",
                    },
                    pressed && styles.cardPressed,
                  ]}
                >
                  <View style={styles.cardContent}>
                    <View
                      style={[
                        styles.emojiBox,
                        { backgroundColor: `${categoryAccents[item.key] ?? "#5E708A"}20` },
                      ]}
                    >
                      <ThemedText type="title" style={styles.emojiText}>
                        {item.emoji}
                      </ThemedText>
                    </View>

                    <View style={styles.cardTextBlock}>
                      <ThemedText type="defaultSemiBold" style={styles.catName}>
                        {item.title}
                      </ThemedText>
                      <ThemedText type="muted" style={styles.cardBlurb}>
                        {categoryDescriptions[item.key]}
                      </ThemedText>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.countBadge,
                      { backgroundColor: `${categoryAccents[item.key] ?? "#5E708A"}16` },
                    ]}
                  >
                    <ThemedText
                      type="defaultSemiBold"
                      style={[styles.countText, { color: categoryAccents[item.key] ?? "#5E708A" }]}
                    >
                      {item.count} questions
                    </ThemedText>
                  </View>
                </Pressable>
              </Link>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E9D9C3", overflow: "hidden" },
  safe: { flex: 1, paddingHorizontal: 16 },
  backgroundGradient: {
    position: "absolute",
    inset: 0,
  },
  hero: { paddingTop: 8, paddingBottom: 18 },
  heroRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  heroCopy: { flex: 1 },
  title: { marginBottom: 6, lineHeight: 40, color: "#221f1a" },
  titleCompact: { fontSize: 30 },
  subtitle: { color: "#241d18", maxWidth: 320, opacity: 0.92 },
  list: { paddingTop: 18, paddingBottom: 20 },
  row: { gap: 12, justifyContent: "center" },
  cardShell: {
    flex: 1,
    marginBottom: 12,
  },
  cardShellSingle: {
    flex: 0,
  },
  card: {
    minHeight: 148,
    backgroundColor: "#FFF8EE",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  cardPressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 14,
  },
  emojiBox: {
    width: 64,
    height: 64,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  emojiText: { fontSize: 34, lineHeight: 34 },
  cardTextBlock: { flex: 1, justifyContent: "center" },
  catName: { fontSize: 22, color: "#ffffff", marginBottom: 4 },
  cardBlurb: { color: "#cccccc", minHeight: 40, width: "100%" },
  countBadge: {
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  countText: { fontSize: 13, lineHeight: 16 },
});
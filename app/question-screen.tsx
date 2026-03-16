import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { categories } from "@/data/casual";

type Params = { category?: string };

export default function QuestionScreen() {
  const { category } = useLocalSearchParams<Params>();
  const cat = category ?? "casual";
  const qs: string[] = (categories as any)[cat] ?? [];
  const { width } = useWindowDimensions();
  const compact = width < 360;
  const [current, setCurrent] = useState<string>(() =>
    qs.length ? qs[Math.floor(Math.random() * qs.length)] : ""
  );

  const accent =
    cat === "spicy" ? "#D95431" : cat === "deep" ? "#166E79" : cat === "funny" ? "#DE9016" : "#506B83";

  if (!qs.length) {
    return (
      <ThemedView style={[styles.container, styles.emptyStateBackground]}>
        <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
          <Link href="/category-screen" asChild>
            <Pressable style={styles.backLink}>
              <ThemedText type="defaultSemiBold" style={styles.backText}>
                ← Categories
              </ThemedText>
            </Pressable>
          </Link>
          <ThemedText type="title" style={styles.emptyTitle}>
            No questions
          </ThemedText>
          <ThemedText type="muted">Try another category with more prompts.</ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  function pickRandom() {
    if (qs.length === 1) {
      setCurrent(qs[0]);
      return;
    }
    let next = current;
    while (next === current) {
      next = qs[Math.floor(Math.random() * qs.length)];
    }
    setCurrent(next);
  }

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={["#FAF5EF", "#EEDFD0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.headerRow}>
          <Link href="/category-screen" asChild>
            <Pressable style={styles.backLink}>
              <ThemedText type="defaultSemiBold" style={styles.backText}>
                ← Categories
              </ThemedText>
            </Pressable>
          </Link>
          <ThemedText type="muted" style={styles.countText}>{`${qs.length} questions`}</ThemedText>
        </View>

        <View style={[styles.content, compact && styles.contentCompact]}>
          <ScrollView
            style={styles.promptScroll}
            contentContainerStyle={styles.promptScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <ThemedText type="muted" style={styles.promptLabel}>
              Current prompt
            </ThemedText>
            <ThemedText type="title" style={[styles.question, compact && styles.questionCompact]}>
              {current}
            </ThemedText>
          </ScrollView>

          <View style={styles.actionsArea}>
            <View style={styles.controlsSingle}>
            <Pressable
              style={({ pressed }) => [styles.controlBtnPrimary, { backgroundColor: accent }, pressed && styles.pressed]}
              onPress={pickRandom}
            >
              <ThemedText type="defaultSemiBold" style={styles.controlTextPrimary}>
                Another one!
              </ThemedText>
            </Pressable>
            </View>

            <ThemedText type="muted" style={styles.tip}>
              Each tap gives you a new random prompt.
            </ThemedText>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E9D9C3", overflow: "hidden" },
  emptyStateBackground: { backgroundColor: "#E7D2B7" },
  safe: { flex: 1, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 14 },
  backgroundGradient: {
    position: "absolute",
    inset: 0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    gap: 8,
  },
  backLink: {
    paddingVertical: 6,
  },
  backText: { color: "#7F2710", fontSize: 16 },
  countText: { color: "#7B3018" },
  content: {
    flex: 1,
    paddingVertical: 12,
  },
  promptScroll: {
    flex: 1,
  },
  promptScrollContent: {
    paddingBottom: 12,
  },
  contentCompact: { paddingVertical: 8 },
  promptLabel: {
    marginBottom: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: "#8A4A31",
  },
  question: { fontSize: 32, lineHeight: 40, color: "#4F120D" },
  questionCompact: { fontSize: 27, lineHeight: 33 },
  actionsArea: {
    paddingTop: 12,
  },
  controlsSingle: { marginTop: 8 },
  controlBtnPrimary: {
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7B2E18",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 2,
  },
  controlTextPrimary: { color: "#FFFFFF", fontSize: 16 },
  tip: { marginTop: 14, textAlign: "center", color: "#8A3D22" },
  emptyTitle: { marginTop: 24, marginBottom: 8, color: "#5A170F" },
  pressed: { opacity: 0.75 },
});
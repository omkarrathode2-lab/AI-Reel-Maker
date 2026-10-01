import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AIScriptScreen() {
  const params = useLocalSearchParams();

  const initialIdea =
    typeof params.idea === "string" ? params.idea : "";

  const [idea, setIdea] = useState(initialIdea);
  const [script, setScript] = useState("");

  const generateScript = () => {
    if (!idea.trim()) {
      Alert.alert(
        "Enter an idea",
        "Please enter your reel idea first."
      );
      return;
    }

    // Demo script for the first working version.
    // Real AI API will be connected later.
    const generatedScript = `Every big success starts with a small step.

You may not see the result today,
but every effort you make is building your future.

Keep learning.
Keep working.
Keep moving forward.

Your dream is possible —
but you have to start today.`;

    setScript(generatedScript);
  };

  const continueToLyrics = () => {
    if (!script) {
      Alert.alert(
        "Generate script first",
        "Please generate your AI script before continuing."
      );
      return;
    }

    router.push({
      pathname: "/lyrics",
      params: {
        idea: idea.trim(),
        script: script,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>AI Script Generator</Text>

        <Text style={styles.subtitle}>
          Turn your idea into a reel script
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>💡 Your Reel Idea</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your reel idea..."
            placeholderTextColor="#777777"
            value={idea}
            onChangeText={setIdea}
            multiline
          />

          <TouchableOpacity
            style={styles.generateButton}
            onPress={generateScript}
          >
            <Text style={styles.generateText}>
              ✨ Generate AI Script
            </Text>
          </TouchableOpacity>
        </View>

        {script ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>
              📝 Generated Script
            </Text>

            <TextInput
              style={styles.scriptInput}
              value={script}
              onChangeText={setScript}
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.continueButton}
              onPress={continueToLyrics}
            >
              <Text style={styles.continueText}>
                🎵 Continue to Lyrics & Song →
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>📝</Text>

            <Text style={styles.emptyTitle}>
              Your AI script will appear here
            </Text>

            <Text style={styles.emptyText}>
              Enter your idea and tap Generate AI Script.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0f",
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  backButton: {
    marginBottom: 20,
  },

  backText: {
    color: "#9b87ff",
    fontSize: 16,
    fontWeight: "600",
  },

  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#999999",
    fontSize: 15,
    marginTop: 6,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#17171f",
    borderRadius: 20,
    padding: 20,
  },

  label: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#25252f",
    color: "#ffffff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 90,
    textAlignVertical: "top",
    marginBottom: 15,
  },

  generateButton: {
    backgroundColor: "#6c4cff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  generateText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },

  resultCard: {
    backgroundColor: "#17171f",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },

  resultTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 15,
  },

  scriptInput: {
    backgroundColor: "#25252f",
    color: "#ffffff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 250,
  },

  continueButton: {
    backgroundColor: "#6c4cff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  continueText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },

  emptyCard: {
    backgroundColor: "#17171f",
    borderRadius: 20,
    padding: 30,
    marginTop: 20,
    alignItems: "center",
  },

  emptyEmoji: {
    fontSize: 45,
    marginBottom: 12,
  },

  emptyTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },

  emptyText: {
    color: "#888888",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});
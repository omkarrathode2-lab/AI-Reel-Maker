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

export default function LyricsScreen() {
  const params = useLocalSearchParams();

  const idea =
    typeof params.idea === "string" ? params.idea : "";

  const script =
    typeof params.script === "string" ? params.script : "";

  const [lyrics, setLyrics] = useState("");
  const [songGenerated, setSongGenerated] = useState(false);

  const generateSong = () => {
    const generatedLyrics = `Dream big, keep moving on,
Even when the night feels long.

Every step can make you strong,
Believe in yourself and carry on.

Your dreams are waiting,
Your time is now,
Keep moving forward,
And make yourself proud.`;

    setLyrics(generatedLyrics);
    setSongGenerated(true);
  };

  const continueToVoice = () => {
    if (!songGenerated) {
      Alert.alert(
        "Generate song first",
        "Please generate your lyrics and song first."
      );
      return;
    }

    router.push({
      pathname: "/ai-voice",
      params: {
        idea,
        script,
        lyrics,
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

        <Text style={styles.title}>Lyrics & Song</Text>

        <Text style={styles.subtitle}>
          Create lyrics for your AI reel
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>💡 Reel Idea</Text>

          <Text style={styles.ideaText}>
            {idea || "No idea provided"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>🎵 AI Song</Text>

          <Text style={styles.description}>
            Generate lyrics based on your reel idea.
          </Text>

          <TouchableOpacity
            style={styles.generateButton}
            onPress={generateSong}
          >
            <Text style={styles.generateText}>
              🎵 Generate Lyrics & Song
            </Text>
          </TouchableOpacity>
        </View>

        {songGenerated && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>
              🎶 Generated Lyrics
            </Text>

            <TextInput
              style={styles.lyricsInput}
              value={lyrics}
              onChangeText={setLyrics}
              multiline
              textAlignVertical="top"
            />

            <View style={styles.songStatus}>
              <Text style={styles.statusIcon}>🎧</Text>

              <View style={styles.statusContent}>
                <Text style={styles.statusTitle}>
                  Song Ready
                </Text>

                <Text style={styles.statusText}>
                  AI-generated song will be connected here.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={continueToVoice}
            >
              <Text style={styles.continueText}>
                🎙️ Continue to AI Voice →
              </Text>
            </TouchableOpacity>
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
    marginBottom: 15,
  },

  label: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  ideaText: {
    color: "#cccccc",
    fontSize: 15,
    lineHeight: 22,
  },

  description: {
    color: "#999999",
    fontSize: 14,
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
    fontSize: 16,
    fontWeight: "bold",
  },

  resultCard: {
    backgroundColor: "#17171f",
    borderRadius: 20,
    padding: 20,
  },

  resultTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 15,
  },

  lyricsInput: {
    backgroundColor: "#25252f",
    color: "#ffffff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 230,
  },

  songStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25252f",
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },

  statusIcon: {
    fontSize: 30,
    marginRight: 12,
  },

  statusContent: {
    flex: 1,
  },

  statusTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  statusText: {
    color: "#888888",
    fontSize: 13,
    marginTop: 4,
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
});
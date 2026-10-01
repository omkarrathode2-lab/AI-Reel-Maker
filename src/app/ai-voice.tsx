import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type InfoBoxProps = {
  value: string;
  label: string;
};

export default function AIVoiceScreen() {
  const params = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);

  const idea = typeof params.idea === "string" ? params.idea : "";

  const style =
    typeof params.style === "string"
      ? params.style
      : "Motivational";

  const duration =
    typeof params.duration === "string"
      ? params.duration
      : "30 sec";

  const format =
    typeof params.format === "string"
      ? params.format
      : "9:16";

  const language =
    typeof params.language === "string"
      ? params.language
      : "Hindi";

  const voice =
    typeof params.voice === "string"
      ? params.voice
      : "Male";

  const music =
    typeof params.music === "string"
      ? params.music
      : "Emotional";

  const captions =
    typeof params.captions === "string"
      ? params.captions === "ON"
      : true;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Your Reel Is Ready 🎉
        </Text>

        <Text style={styles.subtitle}>
          Preview your AI-generated reel
        </Text>

        <View style={styles.reelPreview}>
          <View style={styles.previewOverlay}>
            <Text style={styles.previewTitle}>
              AI REEL MAKER
            </Text>

            <View style={styles.centerContent}>
              <Text style={styles.studentEmoji}>
                👨‍💻
              </Text>

              <Text style={styles.mainText}>
                Dream Big.
              </Text>

              <Text style={styles.mainText}>
                Keep Working.
              </Text>

              <Text style={styles.smallText}>
                Your dream is possible.
              </Text>
            </View>

            {captions && (
              <View style={styles.captionBox}>
                <Text style={styles.captionText}>
                  Never stop learning. 🚀
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Text style={styles.playIcon}>
                {isPlaying ? "Ⅱ" : "▶"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.ideaLabel}>
          Your Idea
        </Text>

        <Text
          style={styles.ideaText}
          numberOfLines={3}
        >
          {idea || "Your reel idea will appear here."}
        </Text>

        <View style={styles.infoGrid}>
          <InfoBox
            value={duration}
            label="Duration"
          />

          <InfoBox
            value={format}
            label="Format"
          />

          <InfoBox
            value={language}
            label="Language"
          />

          <InfoBox
            value={style}
            label="Style"
          />

          <InfoBox
            value={voice}
            label="Voice"
          />

          <InfoBox
            value={music}
            label="Music"
          />
        </View>

        <TouchableOpacity
          style={styles.createAgainButton}
          onPress={() => router.replace("/create-reel")}
        >
          <Text style={styles.createAgainText}>
            ✨ Create Another Reel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.homeButtonText}>
            ← Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function InfoBox({ value, label }: InfoBoxProps) {
  return (
    <View style={styles.infoBox}>
      <Text
        style={styles.infoValue}
        numberOfLines={1}
      >
        {value}
      </Text>

      <Text style={styles.infoLabel}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0f",
  },

  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },

  subtitle: {
    color: "#999999",
    fontSize: 15,
    marginTop: 6,
    marginBottom: 20,
    textAlign: "center",
  },

  reelPreview: {
    width: 245,
    height: 435,
    backgroundColor: "#191522",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#3c315f",
  },

  previewOverlay: {
    flex: 1,
    padding: 18,
    justifyContent: "space-between",
    position: "relative",
  },

  previewTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },

  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  studentEmoji: {
    fontSize: 55,
    marginBottom: 18,
  },

  mainText: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },

  smallText: {
    color: "#d0c8ff",
    fontSize: 13,
    marginTop: 14,
    textAlign: "center",
  },

  captionBox: {
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 45,
  },

  captionText: {
    color: "#ffffff",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
  },

  playButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -28,
    marginTop: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6c4cff",
    alignItems: "center",
    justifyContent: "center",
  },

  playIcon: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
  },

  ideaLabel: {
    width: "100%",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 18,
  },

  ideaText: {
    width: "100%",
    color: "#999999",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },

  infoGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 15,
  },

  infoBox: {
    width: "31%",
    backgroundColor: "#17171f",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: "center",
  },

  infoValue: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },

  infoLabel: {
    color: "#888888",
    fontSize: 10,
    marginTop: 3,
  },

  createAgainButton: {
    width: "100%",
    backgroundColor: "#6c4cff",
    padding: 15,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 18,
  },

  createAgainText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  homeButton: {
    width: "100%",
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },

  homeButtonText: {
    color: "#9b87ff",
    fontSize: 15,
    fontWeight: "600",
  },
});
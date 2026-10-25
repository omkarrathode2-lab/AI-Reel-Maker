import { router, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
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

  const idea = typeof params.idea === "string" ? params.idea : "";
  const script = typeof params.script === "string" ? params.script : "";
  const voiceOver =
    typeof params.voiceOver === "string" ? params.voiceOver : "OFF";

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
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Review Your Script & Settings
        </Text>

        <Text style={styles.subtitle}>
          This repository has script generation; a final video has not been rendered yet.
        </Text>

        <View style={styles.reelPreview}>
          <View style={styles.previewOverlay}>
            <Text style={styles.previewTitle}>
              SCRIPT PREVIEW • NOT A RENDERED VIDEO
            </Text>

            <View style={styles.centerContent}>
              <Text style={styles.mainText}>
                Script Preview
              </Text>

              <Text style={styles.scriptPreviewText} numberOfLines={5}>
                {script || "No generated script was passed to this screen."}
              </Text>

              <Text style={styles.smallText}>
                Final MP4 not rendered
              </Text>
            </View>

            <View style={styles.captionBox}>
              <Text style={styles.captionText}>
                {captions
                  ? "Captions will be generated from actual dialogue/audio after video rendering is connected."
                  : "Captions are turned off for this project."}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.ideaLabel}>
          Your Idea
        </Text>

        <Text style={styles.ideaText}>
          {idea || "Your reel idea will appear here."}
        </Text>

        <Text style={styles.ideaLabel}>
          Generated Script
        </Text>

        <Text style={styles.ideaText}>
          {script || "No script available. Go back and generate a script first."}
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

          <InfoBox
            value={voiceOver}
            label="Voice-over"
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
      </ScrollView>
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
    flexGrow: 1,
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
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },

  scriptPreviewText: {
    color: "#e4e0ff",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 10,
    maxHeight: 130,
    textAlign: "left",
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
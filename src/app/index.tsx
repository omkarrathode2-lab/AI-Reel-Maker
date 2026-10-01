import { router } from "expo-router";
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

export default function HomeScreen() {
  const [idea, setIdea] = useState("");

  const generateReel = () => {
    if (!idea.trim()) {
      Alert.alert(
        "Enter an idea",
        "Please enter your reel idea first."
      );
      return;
    }

    router.push({
      pathname: "/create-reel",
      params: {
        idea: idea.trim(),
      },
    });
  };

  const featureMessage = (name: string) => {
    Alert.alert(
      name,
      name + " feature will be added here."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.logo}>
              AI Reel Maker
            </Text>

            <Text style={styles.subtitle}>
              Create reels with AI
            </Text>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginButtonText}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🎬 Create New Reel
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your reel idea..."
            placeholderTextColor="#888888"
            value={idea}
            onChangeText={setIdea}
            multiline
          />

          <TouchableOpacity
            style={styles.mainButton}
            onPress={generateReel}
          >
            <Text style={styles.buttonText}>
              ✨ Generate Reel
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>
          AI Features
        </Text>

        <View style={styles.tools}>
          <TouchableOpacity
            style={styles.tool}
            onPress={() =>
              featureMessage("Auto Caption")
            }
          >
            <Text style={styles.icon}>💬</Text>
            <Text style={styles.toolText}>
              Auto Caption
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tool}
            onPress={() =>
              featureMessage("AI Song")
            }
          >
            <Text style={styles.icon}>🎵</Text>
            <Text style={styles.toolText}>
              AI Song
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tool}
            onPress={() =>
              featureMessage("Song Video")
            }
          >
            <Text style={styles.icon}>🎥</Text>
            <Text style={styles.toolText}>
              Song Video
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tool}
            onPress={() =>
              featureMessage("AI Voice")
            }
          >
            <Text style={styles.icon}>🎙️</Text>
            <Text style={styles.toolText}>
              AI Voice
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tool}
            onPress={() =>
              featureMessage("Translate")
            }
          >
            <Text style={styles.icon}>🌎</Text>
            <Text style={styles.toolText}>
              Translate
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tool}
            onPress={() =>
              featureMessage("Edit Video")
            }
          >
            <Text style={styles.icon}>✂️</Text>
            <Text style={styles.toolText}>
              Edit Video
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },

  headerText: {
    flex: 1,
    alignItems: "center",
  },

  logo: {
    fontSize: 36,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 1.5,
  },

  subtitle: {
    color: "#999999",
    fontSize: 16,
    marginTop: 6,
    textAlign: "center",
  },

  loginButton: {
    backgroundColor: "#25252f",
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 9,
    marginLeft: 12,
  },

  loginButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#17171f",
    borderRadius: 20,
    padding: 20,
  },

  cardTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
  },

  input: {
    backgroundColor: "#25252f",
    color: "#ffffff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    minHeight: 60,
    textAlignVertical: "top",
  },

  mainButton: {
    backgroundColor: "#6c4cff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },

  tools: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  tool: {
    width: "48%",
    backgroundColor: "#17171f",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: "center",
  },

  icon: {
    fontSize: 30,
    marginBottom: 8,
  },

  toolText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
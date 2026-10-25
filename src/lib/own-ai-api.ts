import { Platform } from "react-native";
import * as Device from "expo-device";

type OwnAiPort = 3002 | 3003 | 3004 | 3005 | 3006;

const SERVICE_URLS: Record<OwnAiPort, string | undefined> = {
  3002: process.env.EXPO_PUBLIC_SCRIPT_API_BASE_URL,
  3003: process.env.EXPO_PUBLIC_VIDEO_API_BASE_URL,
  3004: process.env.EXPO_PUBLIC_VOICE_API_BASE_URL,
  3005: process.env.EXPO_PUBLIC_CAPTION_API_BASE_URL,
  3006: process.env.EXPO_PUBLIC_MUSIC_API_BASE_URL,
};

function cleanBaseUrl(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

function normalizeHost(value: string): string {
  const host = cleanBaseUrl(value);
  return /^https?:\/\//i.test(host) ? host : `http://${host}`;
}

function getDefaultServiceBase(port: OwnAiPort): string | null {
  // A browser on the development computer can reach its own local services.
  if (Platform.OS === "web") {
    return `http://127.0.0.1:${port}`;
  }

  // Android emulator uses this special address to reach the host computer.
  if (Platform.OS === "android" && Device.isDevice === false) {
    return `http://10.0.2.2:${port}`;
  }

  // iOS simulator shares the development computer's localhost.
  if (Platform.OS === "ios" && Device.isDevice === false) {
    return `http://127.0.0.1:${port}`;
  }

  // A physical phone needs the computer's reachable LAN address or a remote URL.
  return null;
}

/**
 * Build a URL for one of Own AI's local services.
 *
 * For a physical device, set EXPO_PUBLIC_OWN_AI_HOST to the hostname/IP of
 * the computer running the services, or configure an explicit service URL.
 * The host value must not include a port; this function appends the service port.
 */
export function ownAiServiceUrl(port: OwnAiPort, path: string): string {
  const explicitServiceUrl = SERVICE_URLS[port]?.trim();
  let baseUrl: string | null = null;

  if (explicitServiceUrl) {
    baseUrl = cleanBaseUrl(explicitServiceUrl);
  } else {
    const configuredHost = process.env.EXPO_PUBLIC_OWN_AI_HOST?.trim();
    if (configuredHost) {
      baseUrl = `${normalizeHost(configuredHost)}:${port}`;
    } else {
      baseUrl = getDefaultServiceBase(port);
    }
  }

  if (!baseUrl) {
    throw new Error(
      "This phone needs the computer running Own AI to be reachable over Wi-Fi. " +
        "Set EXPO_PUBLIC_OWN_AI_HOST in your .env file to your computer's LAN IP " +
        "(not the phone's IP), then restart Expo. Make sure both devices share Wi-Fi " +
        "and Windows Firewall allows the backend port."
    );
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

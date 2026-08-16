import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { UpdateAvailableModal } from "../components/updates/UpdateAvailableModal";
import { AppProvider } from "../context/AppContext";
import { AuthProvider } from "../auth/AuthProvider";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "PlusJakartaSans-Regular": require("../../assets/Jakarta_Sans_font/static/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Medium": require("../../assets/Jakarta_Sans_font/static/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("../../assets/Jakarta_Sans_font/static/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("../../assets/Jakarta_Sans_font/static/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-ExtraBold": require("../../assets/Jakarta_Sans_font/static/PlusJakartaSans-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#f7faf5" },
            animation: "fade",
          }}
        />
        <UpdateAvailableModal />
      </AuthProvider>
    </AppProvider>
  );
}

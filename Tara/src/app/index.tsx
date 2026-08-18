import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../auth/AuthProvider";
import { useOnboarding } from "../context/OnboardingContext";
import { colors } from "../theme/theme";

export default function Index() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { state: onboardingState } = useOnboarding();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
    } else if (!onboardingState.isComplete) {
      router.replace("/onboarding" as any);
    } else {
      router.replace("/(tabs)");
    }
  }, [user, isLoading, onboardingState.isComplete, router]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

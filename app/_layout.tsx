import { SplashScreen, Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import useFonts from "@/hooks/useFonts";
import { UserProvider } from "@/hooks/useUserContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isFontsLoaded, error] = useFonts();

  if (!isFontsLoaded && !error) {
    return null;
  }

  return (
    <ToastProvider placement="top" duration={3000}>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="index" />
          <Stack.Screen name="search/[query]" />
        </Stack>
      </UserProvider>
    </ToastProvider>
  );
};

export default RootLayout;

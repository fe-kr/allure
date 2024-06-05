import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts as useExpoFonts } from "expo-font";

const useFonts = () => {
  const [isFontsLoaded, error] = useExpoFonts({
    "RobotoSlab-Bold": require("@/assets/fonts/RobotoSlab-Bold.ttf"),
    "RobotoSlab-ExtraBold": require("@/assets/fonts/RobotoSlab-ExtraBold.ttf"),
    "RobotoSlab-ExtraLight": require("@/assets/fonts/RobotoSlab-ExtraLight.ttf"),
    "RobotoSlab-Light": require("@/assets/fonts/RobotoSlab-Light.ttf"),
    "RobotoSlab-Medium": require("@/assets/fonts/RobotoSlab-Medium.ttf"),
    "RobotoSlab-Regular": require("@/assets/fonts/RobotoSlab-Regular.ttf"),
    "RobotoSlab-SemiBold": require("@/assets/fonts/RobotoSlab-SemiBold.ttf"),
    "RobotoSlab-Thin": require("@/assets/fonts/RobotoSlab-Thin.ttf"),
  });

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (isFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded, error]);

  return [isFontsLoaded, error];
};

export default useFonts;

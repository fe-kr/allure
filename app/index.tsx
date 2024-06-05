import { Text, Image, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { logoImage } from "@/assets/images";
import { CustomButton } from "@/components";
import { StatusBar } from "expo-status-bar";

const App = () => {
  const router = useRouter();

  const onSignIn = () => router.push("/sign-in");

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full flex justify-center items-center px-4">
          <Image source={logoImage} className="" />
          <Image source={logoImage} className="" />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Allure</Text>
            </Text>

            <Image source={logoImage} className="" resizeMode="contain" />
          </View>

          <Text className="text-sm font-rs-regular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Allure
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={onSignIn}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default App;

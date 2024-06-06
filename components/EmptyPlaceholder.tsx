import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { logoImage } from "@/assets/images";
import CustomButton from "./CustomButton";

interface EmptyPlaceholderProps {
  title: string;
  subtitle: string;
}

const EmptyPlaceholder = ({ title, subtitle }: EmptyPlaceholderProps) => {
  const onBack = () => router.push("/home");

  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={logoImage}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-rs-medium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-rs-semibold text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        handlePress={onBack}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyPlaceholder;
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import { CustomButton, FormField } from "@/components";
import { logoImage } from "@/assets/images";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import useUserContext from "@/hooks/useUserContext";
import apiClient from "@/services/apiClient";

const SignUp = () => {
  const toast = useToast();
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useUserContext();

  const onChangeText = (e: Record<string, string>) => {
    setForm((prevState) => ({ ...prevState, [e.name]: e.value }));
  };

  const onSubmit = async () => {
    if (!Object.values(form).every(Boolean)) {
      toast.show("Please fill in all fields", { type: "warning" });
    }

    setIsLoading(true);

    try {
      const currentUser = await apiClient.signIn({ email: form.email, password: form.password });
      setCurrentUser(currentUser);

      toast.show("User signed in successfully", { type: "success" });
      router.replace("/home");
    } catch (error) {
      toast.show((error as Error).message, { type: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={logoImage}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-rs-semibold">
            Sign Up to Allure
          </Text>

          <FormField
            title="User Name"
            name="username"
            value={form.username}
            onChangeText={onChangeText}
            containerStyles="mt-7"
          />

          <FormField
            title="Email"
            name="email"
            value={form.email}
            onChangeText={onChangeText}
            containerStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            name="password"
            type="password"
            value={form.password}
            onChangeText={onChangeText}
            containerStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={onSubmit}
            containerStyles="mt-7"
            isLoading={isLoading}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-rs-regular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-rs-semibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

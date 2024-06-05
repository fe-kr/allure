import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { CustomButton, FormField } from "@/components";
import { logoImage } from "@/assets/images";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useToast } from "react-native-toast-notifications";

const SignIn = () => {
  const toast = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeText = (e: { name: string; value: string }) => {
    setForm((prevState) => ({ ...prevState, [e.name]: e.value }))
  }

  const onSubmit = async () => {
    if (!form.email || !form.password) {
      toast.show("Please fill in all fields", { type: 'warning' });
    }

    setIsLoading(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      toast.show("User signed in successfully", { type: 'success' });
      router.replace("/home");
    } catch (error) {
      toast.show(error.message, { type: 'danger' });
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
            Log in to Allure
          </Text>

          <FormField
            title="Email"
            name="email"
            value={form.email}
            handleChangeText={onChangeText}
            containerStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            name="password"
            type="password"
            value={form.password}
            handleChangeText={onChangeText}
            containerStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={onSubmit}
            containerStyles="mt-7"
            isLoading={isLoading}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-rs-regular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-rs-semibold text-secondary"
            >
              Sign-up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, TextInputProps } from "react-native";
import { useToast } from "react-native-toast-notifications";

import { visibilityIcon, visibilityOffIcon } from "@/assets/icons";
import clsx from "clsx";

const FormFieldType = {
  TEXT: "TEXT",
  PASSWORD: "PASSWORD",
};

type FormFieldProps = {
  title: string;
  type: FormFieldType.PASSWORD | FormFieldType.TEXT;
  value: string;
  name: string;
  placeholder?: string;
  handleChangeText: ({ name, value }: { name: string; value: string }) => void;
  containerStyles: string;
} & TextInputProps;

const FormField = ({
  title,
  type,
  value,
  name,
  placeholder,
  handleChangeText,
  containerStyles,
  ...props
}: FormFieldProps) => {
  const isPasswordField = type === FormFieldType.PASSWORD;
  const [showPassword, setShowPassword] = useState(false);

  const onPasswordIconPress = () => setShowPassword((prevState) => !prevState);
  const onChangeText = (value: string) => {
    handleChangeText({ name, value })
  };

  return (
    <View className={clsx(containerStyles, "space-y-2")}>
      <Text className="text-base text-gray-100 font-rs-medium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-rs-semibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={onChangeText}
          secureTextEntry={isPasswordField && !showPassword}
          {...props}
        />

        {isPasswordField && (
          <TouchableOpacity onPress={onPasswordIconPress}>
            <Image
              source={!showPassword ? visibilityIcon : visibilityOffIcon}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

FormField.defaultProps = {
  type: FormFieldType.TEXT,
};

export default FormField;

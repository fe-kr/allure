import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, TextInputProps } from "react-native";
import { visibilityIcon, visibilityOffIcon } from "@/assets/icons";
import clsx from "clsx";

const FormFieldType = {
  TEXT: "text",
  PASSWORD: "password",
};

type FormFieldProps = {
  title: string;
  type: FormFieldType.TEXT | FormFieldType.PASSWORD;
  value: string;
  name: string;
  placeholder?: string;
  onChangeText: (e: Record<string, string>) => void;
  containerStyles: string;
} & TextInputProps;

const FormField = ({
  title,
  type,
  value,
  name,
  placeholder,
  onChangeText,
  containerStyles,
  ...props
}: FormFieldProps) => {
  const isPasswordField = type === FormFieldType.PASSWORD;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  };
  const handleChangeText = (value: string) => {
    onChangeText({ name, value })
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
          onChangeText={handleChangeText}
          secureTextEntry={isPasswordField && !showPassword}
          {...props}
        />

        {isPasswordField && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
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

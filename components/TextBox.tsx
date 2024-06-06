import clsx from "clsx";
import { View, Text } from "react-native";

interface TextBoxProps {
  title?: string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
  subtitleStyles?: string;
}

const TextBox = ({
  title,
  subtitle,
  titleStyles,
  subtitleStyles,
  containerStyles,
}: TextBoxProps) => {
  return (
    <View className={containerStyles}>
      {!!title && (
        <Text
          className={clsx(
            "text-white text-center font-rs-semibold",
            titleStyles
          )}
        >
          {title}
        </Text>
      )}

      {!!subtitle && (
        <Text
          className={clsx(
            "text-sm text-gray-100 text-center font-rs-regular",
            subtitleStyles
          )}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default TextBox;

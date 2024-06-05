import { Text, View } from "react-native";
import { SvgUri } from 'react-native-svg';

interface TabIconProps {
    name: string;
    focused: boolean;
    color: string;
    iconUri: string
}

const TabIcon = ({ iconUri, color, name, focused }: TabIconProps) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <SvgUri
        uri={iconUri}
        color={color}
        width={6}
        height={6}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;

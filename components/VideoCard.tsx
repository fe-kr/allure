import { View, Text, Image } from "react-native";
import { menuIcon } from "@/assets/icons";
import VideoPlayer from "./VideoPlayer";

interface VideoCardProps {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
}

const VideoCard = ({
  title,
  creator,
  avatar,
  thumbnail,
  video,
}: VideoCardProps) => {
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-rs-semibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-rs-regular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={menuIcon} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      <VideoPlayer video={video} thumbnail={thumbnail} />
    </View>
  );
};

export default VideoCard;

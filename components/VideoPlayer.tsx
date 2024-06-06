import { useState } from "react";
import { ResizeMode, Video, AVPlaybackStatus } from "expo-av";
import { TouchableOpacity, Image } from "react-native";
import { playIcon } from "@/assets/icons";

export interface VideoPlayerProps {
  video: string;
  thumbnail: string;
}

const VideoPlayer = ({ video, thumbnail }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if ("didJustFinish" in status && status.didJustFinish) {
      setIsPlaying(true);
    }
  };

  const onVideoPlay = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <Video
        useNativeControls
        shouldPlay
        source={{ uri: video }}
        className="w-full h-60 rounded-xl mt-3"
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onVideoPlay}
      className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
    >
      <Image
        source={{ uri: thumbnail }}
        className="w-full h-full rounded-xl mt-3"
        resizeMode="cover"
      />

      <Image
        source={playIcon}
        className="w-12 h-12 absolute"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default VideoPlayer;

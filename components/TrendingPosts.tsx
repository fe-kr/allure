import { useState } from "react";
import Animated, { Keyframe } from "react-native-reanimated";
import { FlatList, ViewToken } from "react-native";

import VideoPlayer from "./VideoPlayer";

const zoomIn = new Keyframe({
  from: { scale: 0.9 },
  to: { scale: 1 },
}).duration(500);

const zoomOut = new Keyframe({
  from: { scale: 1 },
  to: { scale: 0.9 },
}).duration(500);

interface TrendingPostsProps {
  posts: any[];
}

const TrendingPosts = ({ posts }: TrendingPostsProps) => {
  const [activeItemId, setActiveItemId] = useState(posts[0].$id);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken<any>>;
  }) => {
    if (viewableItems.length) {
      setActiveItemId(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Animated.View
          className="mr-5"
          {...(activeItemId === item.$id && {
            entering: zoomIn,
            exiting: zoomOut,
          })}
        >
          <VideoPlayer video={item.video} thumbnail={item.thumbnail} />
        </Animated.View>
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default TrendingPosts;

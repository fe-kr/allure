import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { logoImage } from "@/assets/images";
import { getAllPosts, getLatestPosts } from "@/services/appwrite";
import { EmptyPlaceholder, SearchInput, TrendingPosts, VideoCard } from "@/components";
import useAppFetch from "@/hooks/useAppFetch";
import useUserContext from "@/hooks/useUserContext";

const Home = () => {
  const { currentUser } = useUserContext();
  const { data: posts, fetchData: fetchPosts } = useAppFetch(getAllPosts);
  const { data: latestPosts } = useAppFetch(getLatestPosts);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);

    fetchPosts().finally(() => setIsRefreshing(false));
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-rs-medium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-rs-semibold text-white">
                  {currentUser?.name}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={logoImage}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-rs-regular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <TrendingPosts posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyPlaceholder
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
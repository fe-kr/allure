import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppFetch from "@/hooks/useAppFetch";
import { findPostsByParams } from "@/services/appwrite";
import { EmptyPlaceholder, SearchInput, VideoCard } from "@/components";

const Search = () => {
  const searchValue = useLocalSearchParams().searchValue as string;
  const { data: posts, fetchData: fetchPosts } = useAppFetch(findPostsByParams, true);

  useEffect(() => {
    fetchPosts(searchValue);
  }, [searchValue]);

  return (
    <SafeAreaView className="bg-primary h-full">
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
          <>
            <View className="flex my-6 px-4">
              <Text className="font-rs-medium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-rs-semibold text-white mt-1">
                {searchValue}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialValue={searchValue} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyPlaceholder
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { logoutIcon } from "@/assets/icons";
import useAppFetch from "@/hooks/useAppFetch";
import apiClient from "@/services/apiClient";
import useUserContext from "@/hooks/useUserContext";
import { EmptyPlaceholder, TextBox, VideoCard } from "@/components";

const Profile = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const { data: posts } = useAppFetch(() => apiClient.getUserPosts(currentUser?.$id));

  const onLogout = async () => {
    await apiClient.signOut();
    setCurrentUser(null);

    router.replace("/sign-in");
  };

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
        ListEmptyComponent={() => (
          <EmptyPlaceholder
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={onLogout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={logoutIcon}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: currentUser?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <TextBox
              title={currentUser?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <TextBox
                title={posts?.length ?? 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <TextBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import { uploadIcon } from "@/assets/icons";
import { createVideoPost } from "@/services/appwrite";
import { CustomButton, FormField } from "@/components";
import useUserContext from "@/hooks/useUserContext";
import {
  UploadFileType,
  ImageFileType,
  VideoFileType,
} from "@/constants/enums";
import { useToast } from "react-native-toast-notifications";

const initialState = {
  title: "",
  video: null,
  thumbnail: null,
  prompt: "",
};

const CreateVideo = () => {
  const toast = useToast();
  const { currentUser } = useUserContext();
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState(initialState);

  const openFilePicker = async ({ fileType, allowedFileTypes }) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: allowedFileTypes,
    });

    if (result.canceled) {
      return;
    }

    const [asset] = result.assets;

    switch (fileType) {
      case UploadFileType.IMAGE:
        setForm((prevState) => ({ ...prevState, thumbnail: asset }));
        break;

      case UploadFileType.VIDEO:
        setForm((prevState) => ({ ...prevState, video: asset }));
        break;

      default:
        break;
    }
  };

  const onOpenImagePicker = () =>
    openFilePicker({
      fileType: UploadFileType.IMAGE,
      allowedFileTypes: [ImageFileType.JPG, ImageFileType.PNG],
    });

  const onOpenVideoPicker = () =>
    openFilePicker({
      fileType: UploadFileType.VIDEO,
      allowedFileTypes: [VideoFileType.MP4, VideoFileType.GIF],
    });

  const onChangeText = (e: Record<string, string>) => {
    setForm((prevState) => ({ ...prevState, [e.name]: e.value }));
  };

  const onSubmit = async () => {
    if (!Object.values(form).every(Boolean)) {
      return toast.show("Please fill all fields", { type: "warning" });
    }

    setIsUploading(true);

    try {
      await createVideoPost({ ...form, userId: currentUser?.$id });

      toast.show("Post uploaded successfully", { type: "success" });

      router.push("/home");
    } catch (error) {
      toast.show((error as Error).message, { type: "danger" });
    } finally {
      setForm(initialState);

      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-rs-semibold">
          Upload Video
        </Text>

        <FormField
          name="title"
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          onChangeText={onChangeText}
          containerStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-rs-medium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={onOpenVideoPicker}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={uploadIcon}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-rs-medium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={onOpenImagePicker}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={uploadIcon}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-rs-medium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          name="prompt"
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          onChangeText={onChangeText}
          containerStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={onSubmit}
          containerStyles="mt-7"
          isLoading={isUploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateVideo;

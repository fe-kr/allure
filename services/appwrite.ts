import { UploadFileType } from "@/constants/enums";
import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
  ID,
  Query,
  ImageGravity,
} from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.APPWRITE_PLATFORM!);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const signIn = ({ email, password }) =>
  account.createEmailPasswordSession(email, password);

export const signOut = () => account.deleteSession("current");

export const getAccount = () => account.get();

export const createUser = async ({ email, password, username }) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error(`Can't create user`);
    }

    const avatar = avatars.getInitials(username);
    const accountId = newAccount.$id;

    await signIn({ email, password });

    return databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      { accountId, email, username, avatar }
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFile = async ({ file, type }) => {
  const uploadedFile = await storage.createFile(
    process.env.APPWRITE_STORAGE_ID!,
    ID.unique(),
    file
  );

  return getFilePreview({ id: uploadedFile.$id, type });
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) {
      throw new Error(`Can't find current account`);
    }

    const currentUser = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      throw new Error(`Can't find current user`);
    }

    return currentUser.documents[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getFilePreview = async ({ id, type }) => {
  switch (type) {
    case UploadFileType.VIDEO:
      return storage.getFileView(process.env.APPWRITE_STORAGE_ID!, id);

    case UploadFileType.IMAGE:
      return storage.getFilePreview(
        process.env.APPWRITE_STORAGE_ID!,
        id,
        2000,
        2000,
        ImageGravity.Top,
        100
      );

      default:
        throw new Error("Invalid file type");
  }
};

export const createVideoPost = async ({
  title,
  thumbnail,
  video,
  prompt,
  userId,
}) => {
  const [thumbnailUrl, videoUrl] = await Promise.all([
    uploadFile({ file: thumbnail, type: UploadFileType.IMAGE }),
    uploadFile({ file: video, type: UploadFileType.VIDEO }),
  ]);

  return databases.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_VIDEO_COLLECTION_ID!,
    ID.unique(),
    {
      title,
      prompt,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      creator: userId,
    }
  );
};

export const getAllPosts = () =>
  databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_VIDEO_COLLECTION_ID!
  );

export const getUserPosts = (userId: string) =>
  databases
    .listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_VIDEO_COLLECTION_ID!,
      [Query.equal("creator", userId)]
    )
    .then(({ documents }) => documents);

export const getLatestPosts = () =>
  databases
    .listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_VIDEO_COLLECTION_ID!,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    )
    .then(({ documents }) => documents);

export const findPostsByParams = (searchValue: string) =>
  databases
    .listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_VIDEO_COLLECTION_ID!,
      [Query.search("title", searchValue)]
    )
    .then(({ documents }) => documents);

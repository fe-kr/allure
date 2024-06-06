import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.APPWRITE_PLATFORM!);

const account = new Account(client);
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

export const getAllPosts = () => databases.listDocuments(
  process.env.APPWRITE_DATABASE_ID!,
  process.env.APPWRITE_VIDEO_COLLECTION_ID!,
);

export const getLatestPosts = () => databases.listDocuments(
  process.env.APPWRITE_DATABASE_ID!,
  process.env.APPWRITE_VIDEO_COLLECTION_ID!,
  [Query.orderDesc("$createdAt"), Query.limit(10)]
).then(({ documents }) => documents);

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

export class ApiClient {
  account: Account;
  storage: Storage;
  avatars: Avatars;
  databases: Databases;

  constructor() {
    const client = new Client();

    client
      .setEndpoint(process.env.APPWRITE_ENDPOINT!)
      .setProject(process.env.APPWRITE_PROJECT_ID!)
      .setPlatform(process.env.APPWRITE_PLATFORM!);

    this.account = new Account(client);
    this.storage = new Storage(client);
    this.avatars = new Avatars(client);
    this.databases = new Databases(client);
  }

  private async getAccount() {
    return this.account.get();
  }
  
  private async getFilePreview({ id, type }: { id: string; type: string }) {
    switch (type) {
      case UploadFileType.VIDEO:
        return this.storage.getFileView(process.env.APPWRITE_STORAGE_ID!, id);
  
      case UploadFileType.IMAGE:
        return this.storage.getFilePreview(
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
  }

  private async uploadFile({ file, type }: { file: UploadFile; type: string }) {
    const uploadedFile = await this.storage.createFile(
      process.env.APPWRITE_STORAGE_ID!,
      ID.unique(),
      file
    );
  
    return this.getFilePreview({ id: uploadedFile.$id, type });
  };

  async signIn({ email, password }: SignInParams) {
    return this.account.createEmailPasswordSession(email, password);
  }

  async signUp({ email, password, username }: SignUpParams) {
    const newAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error(`Can't create user`);
    }

    await this.signIn({ email, password });

    const avatar = this.avatars.getInitials(username);

    return this.databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar }
    );
  }

  async signOut() {
    return this.account.deleteSession("current");
  }


  async getCurrentUser() {
    const currentAccount = await this.getAccount();

    if (!currentAccount) {
      throw new Error(`Can't find current account`);
    }

    const currentUser = await this.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      throw new Error(`Can't find current user`);
    }

    return currentUser.documents[0];
  }

  async getAllPosts() {
    return this.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_VIDEO_COLLECTION_ID!
    );
  }

  async getUserPosts(userId: string) {
    return this.databases
      .listDocuments(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_VIDEO_COLLECTION_ID!,
        [Query.equal("creator", userId)]
      )
      .then(({ documents }) => documents);
  }

  async getLatestPosts() {
    return this.databases
      .listDocuments(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_VIDEO_COLLECTION_ID!,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      )
      .then(({ documents }) => documents);
  }

  async findPostsByParams(searchValue: string) {
    return this.databases
      .listDocuments(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_VIDEO_COLLECTION_ID!,
        [Query.search("title", searchValue)]
      )
      .then(({ documents }) => documents);
  }

  async createVideoPost(data: CreateVideoPostParams) {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      this.uploadFile({ file: data.thumbnail, type: UploadFileType.IMAGE }),
      this.uploadFile({ file: data.video, type: UploadFileType.VIDEO }),
    ]);

    return this.databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_VIDEO_COLLECTION_ID!,
      ID.unique(),
      { ...data, thumbnail: thumbnailUrl, video: videoUrl }
    );
  }
}

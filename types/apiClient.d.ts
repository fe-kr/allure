declare interface SignUpParams {
  email: string;
  password: string;
  username: string;
}

declare interface SignInParams extends Omit<SignUpParams, "username"> {}

declare interface UploadFile {
  name: string;
  type: string;
  size: number;
  uri: string;
}

declare interface CreateVideoPostParams {
  title: string;
  thumbnail: UploadFile;
  video: UploadFile;
  prompt: string;
  creatorId: string;
}

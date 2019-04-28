export type User = {
  type: "success";
  accessToken: string;
  idToken?: string;
  user: {
    email?: string;
    id: string;
    name: string;
    photoUrl?: string;
  };
};

export type State = {
  rawUser: User | null;
};

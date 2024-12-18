import { create } from "zustand";

const userStore = create((set) => ({
  userAccessToken: "",
  userId: "",
  userRepos: "",
  setUserAccessToken: (state) => set({ userAccessToken: state }),
  setUserId: (state) => set({ userId: state }),
  setUserRepos: (state) => set({ userRepos: state }),
}));

export default userStore;

import { create } from "zustand";

const userStore = create((set) => ({
  userAccessToken: "",
  userId: "",
  setUserAccessToken: (state) => set({ userAccessToken: state }),
  setUserId: (state) => set({ userId: state }),
}));

export default userStore;

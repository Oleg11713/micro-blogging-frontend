import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { USER } from "../../utils/constsRoles";

interface UserState {
  users: IUser[];
  currentUser: IUser;
  viewedUser: IUser;
}

const initialState: UserState = {
  users: [],
  currentUser: {
    id: 0,
    displayName: "",
    age: 0,
    email: "",
    password: "",
    role: USER,
    activationLink: "",
    isActivated: false,
  },
  viewedUser: {
    id: 0,
    displayName: "",
    age: 0,
    email: "",
    password: "",
    role: USER,
    activationLink: "",
    isActivated: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<IUser>) {
      state.currentUser = action.payload;
    },
    setViewedUser(state, action: PayloadAction<IUser>) {
      state.viewedUser = action.payload;
    },
    fetchAllUsers() {},
  },
});

export default userSlice.reducer;

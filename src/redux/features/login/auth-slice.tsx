import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: authState;
};

type authState = {
  userPermission: string;
  userEmail: string;
  userPackage: string;
  userId: string;
};

const initialState = {
  value: {
    userPermission:"",
    userEmail: "",
    userPackage: "",
    userId: "",
  } as authState,
} as InitialState;

export const auth = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.value.userEmail = action.payload;
    },
    setUserPackage: (state, action: PayloadAction<string>) => {
      state.value.userPackage = action.payload;
    },
    setUserPermissions: (state, action: PayloadAction<string>) => {
      state.value.userPermission = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.value.userId = action.payload;
    },
    logOut: () => initialState,
  },
});

export const { setUserEmail, setUserPackage, setUserPermissions,setUserId, logOut } = auth.actions;
export default auth.reducer;

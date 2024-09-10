import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: authState;
};

type authState = {
  userPermission: string;
  userEmail: string;
  userPackage: string;
};

const initialState = {
  value: {
    userPermission:"",
    userEmail: "",
    userPackage: "",
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
    logOut: () => initialState,
  },
});

export const { setUserEmail, setUserPackage, setUserPermissions, logOut } = auth.actions;
export default auth.reducer;

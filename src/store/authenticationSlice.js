import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
} from "../firebase";

const initialState = {
  status: "idle",
  name: "Anonymous",
  avatar: "",
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loadState: (state, action) => {
      state = { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginGoogle.pending, (state) => {
        state.status = "loading"
      })
      .addCase(handleLoginGoogle.fulfilled, (state, action) => {
        const info = JSON.parse(action.payload)
        console.log(info)
        console.log(info.user.displayName)
        console.log(info.user.photoURL)
        state.status = "idle" 
        state.name = info.user.displayName
        state.avatar = info.user.photoURL
      });
  },
});

export const handleLoginGoogle = createAsyncThunk(
  "login/Google",
  async () => {
    const result = await signInWithPopup(auth, provider);
    // return result
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = await GoogleAuthProvider.credentialFromResult(result);
    // console.log("credential :", credential);

    // The signed-in user info.
    const token = await credential.accessToken;
    // console.log("token : ", token);

    // IdP data available using getAdditionalUserInfo(result)
    const user = await result.user;
    // console.log("user :", user);
    return JSON.stringify(result);
  }
);

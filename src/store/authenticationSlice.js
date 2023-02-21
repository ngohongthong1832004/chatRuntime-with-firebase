import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  auth,
  provider,
  signInWithPopup,
  // GoogleAuthProvider,
  signInWithEmailAndPassword,
  // createUserWithEmailAndPassword
} from "../firebase";

const initialState = {
  status: "idle",
  name: "Anonymous",
  avatar: "",
  err: false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.name =  action.payload.name
      state.avatar = action.payload.avatar
    },
    fixErrEmailPass : (state, action) => {
      state.err = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginGoogle.pending, (state) => {
        state.status = "loading"
      })
      .addCase(handleLoginGoogle.fulfilled, (state, action) => {
        const info = JSON.parse(action.payload)
        // console.log(info)
        // console.log(info.user.displayName)
        // console.log(info.user.photoURL)
        state.status = "idle" 
        state.name = info.user.displayName
        state.avatar = info.user.photoURL
      })
      .addCase(handleLoginEmailPass.pending,(state, action) => {
        state.status = 'loading'
      })
      .addCase(handleLoginEmailPass.fulfilled, (state, action) => {
        const info = JSON.parse(action.payload)
        // console.log(info)
        state.status = "idle" 
        state.name =  info.user.email.split('@')[0]
        state.avatar = info.user.photoURL || 'no img'
      })
      .addCase(handleLoginEmailPass.rejected, (state, action) => {
        // console.log("chay vao reject")
        state.err = true
      })
      // .addCase(handleCreateAccountWithEmailAndPass.pending, (state) => {
      //   state.status = 'loading'
      // })
      // .addCase(handleCreateAccountWithEmailAndPass.fulfilled , (state, action) => {
      //   state = state
      // })
  },
});

export const  { logOut, fixErrEmailPass } = authenticationSlice.actions

export const handleLoginGoogle = createAsyncThunk(
  "login/Google",
  async () => {
    const result = await signInWithPopup(auth, provider);
    // return result
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = await GoogleAuthProvider.credentialFromResult(result);
    // console.log("credential :", credential);

    // The signed-in user info.
    // const token = await credential.accessToken;
    // console.log("token : ", token);

    // IdP data available using getAdditionalUserInfo(result)
    // const user = await result.user;
    // console.log("user :", user);
    return JSON.stringify(result);
  }
);


export const handleLoginEmailPass = createAsyncThunk(
  'login/Email-pass',
  async(valueInfoUser) => {
    const rs = await signInWithEmailAndPassword(
      auth,
      valueInfoUser.email,
      valueInfoUser.pass
    );
      // const user = await rs.user;
      return JSON.stringify(rs);
     
})


// export const handleCreateAccountWithEmailAndPass = createAsyncThunk("signup/newAccount" ,async(emailValue, passValue) => {
//   const rs  = await createUserWithEmailAndPassword(auth, emailValue, passValue)
//   const user = rs.user
//   return JSON.stringify(rs);
// })

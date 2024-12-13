import { BASE_URL } from "../constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// const baseUrl = "https://medium-backend-alpha.vercel.app/auth"
const baseUrl = BASE_URL + "auth";

const initialState = {
  loggedInUser: null,
  loading: false,
  errorMessage: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userInput) => {
    const response = await fetch(baseUrl + "/signup", {
      method: "POST",
      body: JSON.stringify({
        ...userInput,
      }),
    });

    if (response.ok) {
      const { jwt, data } = await response.json();
      console.log("data", data);

      localStorage.setItem("jwt", jwt);

      return data;
    } else {
      const { message } = await response.json();
      throw message;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (userInput) => {
    console.log("baseUrl", baseUrl);
    const queryUrl = baseUrl + "/signin";
    console.log("queryUrl", queryUrl);

    const response = await fetch(queryUrl, {
      method: "POST",
      body: JSON.stringify({
        ...userInput,
      }),
    });

    if (response.ok) {
      const { jwt, data } = await response.json();

      console.log("data", data);
      localStorage.setItem("jwt", jwt);

      return data;
    } else {
      const { message } = await response.json();
      throw { message };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrorMessages: (state) => {
      console.log("clear errors");
      state.errorMessage = null;
    },

    logOut: (state) => {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action payload create user ", action.payload);
        state.loggedInUser = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action payload in login ", action.payload);
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const authReducer = authSlice.reducer;
export const {clearErrorMessages ,logOut} = authSlice.actions;

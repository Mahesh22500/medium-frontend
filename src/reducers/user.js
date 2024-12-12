import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = "https://medium-backend-alpha.vercel.app/user";
const initialState = {
  users: [],
  currentUser: null,
  loading: false,
};

export const getUserAsync = createAsyncThunk("user/getUser", async (userId) => {
  console.log("get user async ");
  const response = await fetch(baseUrl + "/" + userId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  if (response.ok) {
    const { data } = await response.json();

    console.log("data", data);

    return data;
  } else {
    const { message } = await response.json();
    throw { message };
  }
});

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (userInput) => {
    const response = await fetch(baseUrl + "/" + userInput.id, {
      method: "PATCH",
      body: JSON.stringify(userInput),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    if (response.ok) {
      const { data } = await response.json();

      return data;
    } else {
      const { message } = await response.json();
      throw { message };
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async (userId) => {
    const response = await fetch(baseUrl + "/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    if (response.ok) {
      const { data } = await response.json();

      return data;
    } else {
      const { message } = await response.json();
      throw { message };
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      }),
});

export const userReducer = userSlice.reducer;

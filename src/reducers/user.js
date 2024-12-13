import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants";

// const baseUrl = "https://medium-backend-alpha.vercel.app/user";
const baseUrl = BASE_URL + "user";

const initialState = {
  users: [],
  currentUser: null,
  userExperiences: [],
  generalUser: null,
  loading: false,
};

// create user experience

export const createUserExperienceAsync = createAsyncThunk(
  "user/createUserExperience",
  async (exp) => {
    const baseUrl = BASE_URL + "experience";

    const response = await fetch(baseUrl, {
      body: JSON.stringify(exp),
      method: "POST",
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
      throw message;
    }
  }
);

// get all experiences
export const getAllExperiencesAsync = createAsyncThunk(
  "user/getAllExperiences",
  async () => {
    const baseUrl = BASE_URL + "experience";

    const response = await fetch(baseUrl, {
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
      throw message;
    }
  }
);


// get all experiences of a user 
export const getExperiencesByUserAsync = createAsyncThunk(
  "user/getExperiencesByUser",
  async (userId) => {
    const baseUrl = BASE_URL + "experience?user=" + userId;

    const response = await fetch(baseUrl, {
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
      throw message;
    }
  }
);


// delete a user experience 

export const deleteUserExperienceAsync  = createAsyncThunk(
  "user/deleteUserExperience",
  async (expId) => {
    const queryUrl = BASE_URL + "experience/" + expId;

    const response = await fetch(queryUrl, {
      method:"DELETE",
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
      throw message;
    }
  }
);

// get User
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

// get a general User
export const getGeneralUserAsync = createAsyncThunk(
  "user/getGeneralUser",
  async (userId) => {
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
  }
);

// update user
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

// delete user

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
  reducers: {
    logOutUser:(state)=>{
      state.currentUser = null;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(updateUserAsync.rejected, (state) => {
        state.loading = false;
        // state.currentUser = action.payload;
      })

      .addCase(getGeneralUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGeneralUserAsync.fulfilled, (state, action) => {
        state.generalUser = action.payload;
        state.loading = false;
      })

      .addCase(createUserExperienceAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserExperienceAsync.fulfilled, (state, action) => {
        state.userExperiences.push(action.payload);
        state.loading = false;
      })
      .addCase(getAllExperiencesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllExperiencesAsync.fulfilled, (state, action) => {
        state.userExperiences = action.payload;
        state.loading = false;
      })
      .addCase(getExperiencesByUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExperiencesByUserAsync.fulfilled, (state, action) => {
        state.userExperiences = action.payload;
        state.loading = false;
      })
      .addCase(deleteUserExperienceAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserExperienceAsync.fulfilled, (state, action) => {
        const newUserExps = state.userExperiences.filter(exp=>exp.id!=action.payload.id);
        state.userExperiences = newUserExps
        state.loading = false;
      })

});

export const userReducer = userSlice.reducer;

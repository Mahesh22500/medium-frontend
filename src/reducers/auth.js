
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseUrl = "https://medium-backend-alpha.vercel.app/auth"


const initialState = {
    loggedInUser:null,
    loading :false
}

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
        console.log("data",data);
  
        localStorage.setItem("jwt", jwt);
  
        return data;
      } else {
        throw { message: "error" };
      }
    }
  );
  
  export const loginUserAsync = createAsyncThunk(
    "auth/loginUser",
    async (userInput) => {
      const response = await fetch(baseUrl + "/signin", {
        method: "POST",
        body: JSON.stringify({
          ...userInput,
        }),
      });
  
      if (response.ok) {
        const { jwt, data } = await response.json();
  
        console.log("data",data);
        localStorage.setItem("jwt", jwt);
  
        return data;
      } else {
        throw { message: "error" };
      }
    }
  );


  
  
  

  const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

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
          .addCase(loginUserAsync.pending, (state) => {
            state.loading = true;
          })
          .addCase(loginUserAsync.fulfilled, (state, action) => {
            state.loading = false;
            console.log("action payload in login ",action.payload)
            state.loggedInUser = action.payload;
          })
          
      },
    
  })

  export const authReducer = authSlice.reducer
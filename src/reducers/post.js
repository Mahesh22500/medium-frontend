import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = "https://medium-backend-alpha.vercel.app/post";

const initialState = {
  posts: [],
  userPosts:[],
  loading: false,
};


// create a post 

export const createPostAsync = createAsyncThunk(
  "post/createPost",
  async (postInput) => {
    console.log("jwt", localStorage.getItem("jwt"));
    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(postInput),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    if (response.ok) {
      const {data} = await response.json();
      return data;
    } else {
      const error = await response.json();

      throw error;
    }
  }
);


// get all posts 
export const getAllPostsAsync = createAsyncThunk(
  "post/getAllPosts",
  async () => {
    console.log("jwt", localStorage.getItem("jwt"));

    const response = await fetch(baseUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      const error = await response.json();

      throw error;
    }
  }
);


// get all posts of a user 
export const getUserPostsAsync  = createAsyncThunk(
  "post/getUserPosts",
  async (userId) => {

    const queryUrl  = baseUrl + '?user=' + userId;
    const response = await fetch(queryUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      const error = await response.json();

      throw error;
    }
  }
);

// update a post 
export const updatePostAsync = createAsyncThunk(
  "post/updatePost",
  async (postInput) => {
    const response = await fetch(baseUrl + `/:${postInput.id}`, {
      method: "PUT",
      body: JSON.stringify(postInput),
    });

    if (response.ok) {
      const {data} = await response.json();
      return data;
    } else {
      const error = await response.json();

      throw error;
    }
  }
);



// delete a post 
export const deletePostAsync = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    const response = await fetch(baseUrl + `/:${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const {message} = await response.json();
      return message;
    } else {
      const error = await response.json();

      throw error;
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
        state.userPosts.push(action.payload);
      })
      .addCase(createPostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPostAsync.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getAllPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPostsAsync.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getUserPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts= action.payload;
      })
      .addCase(getUserPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPostsAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts[index] = action.payload;
        
        const otherIndex  = state.userPosts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.userPosts[otherIndex] = action.payload;
        
       
       
      })
      .addCase(updatePostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePostAsync.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        const newPosts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.posts = newPosts;
        
        const newUserPosts = state.userPosts.filter(
          (post) => post.id !== action.payload.id
        );
        state.posts = newUserPosts;
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePostAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const postReducer = postSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "signup",
  initialState: {
    name: "",
    email: "",
    password: "",
   
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;

    },
  },
});

export const { setName, setEmail, setPassword } = todoSlice.actions;
export default todoSlice.reducer;
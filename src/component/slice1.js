import { createSlice } from "@reduxjs/toolkit";

const todoSlice1 = createSlice({
  name: "signin",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});
export const { setEmail, setPassword} = todoSlice1.actions;
export default todoSlice1.reducer;

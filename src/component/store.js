import { configureStore } from '@reduxjs/toolkit'
import todoslice from "./slice.js"
import todoslice1 from "./slice1.js"
import todoslice2 from "./slice2.js"

export const store= configureStore ({
    reducer:{
   signup: todoslice,
   signin: todoslice1,
   profile:todoslice2
    },
 })

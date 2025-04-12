import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../utils/types/types";

interface UserState {
  user: null | User
}

const initialState: UserState = {
  user: null
}

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const newUser = action.payload
      if(newUser?.id){
        state.user = newUser
      }
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
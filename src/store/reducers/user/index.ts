import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../../utils/types/types";

interface UserState {
  user: null | UserType
}

const initialState: UserState = {
  user: null
}

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      const newUser = action.payload
      state.user = newUser
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
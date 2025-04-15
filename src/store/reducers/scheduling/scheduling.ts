import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SchedulingType } from "../../../utils/types/types";

interface SchedulingState {
  schedulings: Array<SchedulingType> 
}

const initialState: SchedulingState = {
  schedulings: []
}

const schedulingSlice = createSlice({
  initialState,
  name: 'scheduling',
  reducers: {
    setScheduling: (state, action: PayloadAction<Array<SchedulingType>>) => {
      const schedulingList = action.payload
      if(schedulingList?.length > 0){
        state.schedulings = schedulingList
      }
    }
  }
})

export const { setScheduling } = schedulingSlice.actions
export default schedulingSlice.reducer
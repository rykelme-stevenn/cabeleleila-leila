import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceType } from "../../../utils/types/types";

interface ServiceState {
  services: Array<ServiceType> | null
}

const initialState: ServiceState = {
  services: null
}

const servicesSlice = createSlice({
  initialState,
  name: 'services',
  reducers: {
    setServices: (state, action: PayloadAction<Array<ServiceType>>) => {
      const serviceList = action.payload
      if(serviceList?.length > 0){
        state.services = serviceList
      }
    }
  }
})

export const { setServices } = servicesSlice.actions
export default servicesSlice.reducer
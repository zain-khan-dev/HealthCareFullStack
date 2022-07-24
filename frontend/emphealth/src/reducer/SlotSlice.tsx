import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Employee, SlotSchema } from '../utils/schema'

export interface EmployeeState {
  slotInstance: SlotSchema[]
}

const initialState: EmployeeState = {
    slotInstance:[],
}

export const SlotSlice = createSlice({
  name: 'slots',
  initialState,
  reducers: {

    setSlotInstances: (state, action: PayloadAction<SlotSchema[]>) => {
      state.slotInstance = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSlotInstances } = SlotSlice.actions

export default SlotSlice.reducer
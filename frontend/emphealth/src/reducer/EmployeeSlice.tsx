import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Employee } from '../utils/schema'

export interface EmployeeState {
  employeeInstance: Employee|null
}

const initialState: EmployeeState = {
    employeeInstance:null,
}

export const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {

    setEmployee: (state, action: PayloadAction<Employee>) => {
      state.employeeInstance = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEmployee } = EmployeeSlice.actions

export default EmployeeSlice.reducer
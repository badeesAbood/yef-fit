import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GeneratedWorkout} from "../../utils/functions.ts";


export interface FormulatorState {
    workout:  GeneratedWorkout[] | null
}
const  initialState : FormulatorState  = {
    workout: null
}
 const formulatorSlice = createSlice({
    name: "formulate" ,
    initialState ,
    reducers: {
        formulate: (state, action: PayloadAction<GeneratedWorkout[]>) => {
            state.workout = action.payload ;
        } ,
        reset: (state) => {
            state.workout = null ;
        }
    }
})

export const {formulate, reset} = formulatorSlice.actions
export default formulatorSlice.reducer
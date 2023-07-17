import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    API_KEY: "",
    roverSelected: {
        name: "",
        cameras: []
    },
    cameraSelected: {
        id: "",
        name: ""
    },
    dateSelected: "2020-01-22"
};

export const generalSlice = createSlice({
    name: "general",
    initialState: initialState,
    reducers:  {
        setApiKey: (state, action) => {
            state.API_KEY = action.payload;
        },
        setRoverSelected: (state, action) => {
            state.roverSelected = action.payload
        },
        setCameraSelected: (state, action) => {
            state.cameraSelected = action.payload;
        },
        setDateSelected: (state, action) => {
            state.dateSelected = action.payload instanceof Date ? 
                                  action.payload.toLocaleDateString('sv-SE', { month: '2-digit', day: '2-digit', year: 'numeric' })
                                : action.payload;
        }
    }
});

export const { 
    setApiKey, 
    setRoverSelected, 
    setCameraSelected,
    setDateSelected } = generalSlice.actions;
export default generalSlice.reducer;

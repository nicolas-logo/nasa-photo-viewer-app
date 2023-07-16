import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    API_KEY: "",
    roverSelected: {
        name: "",
        cameras: []
    },
    cameraSelected: ""
};

export const generalSlice = createSlice({
    name: "general",
    initialState: initialState,
    reducers:  {
        setApiKey: (state, action) => {
            state.API_KEY = action.payload;
        },
        setRoverSelected: (state, action) => {
            state.roverSelected.name = action.payload.name;
            state.roverSelected.cameras = action.payload.cameras;
        },
        setCameraSelected: (state, action) => {
            state.cameraSelected = action.payload;
        }
    }
});

export const { setApiKey, setRoverSelected, setCameraSelected } = generalSlice.actions;
export default generalSlice.reducer;

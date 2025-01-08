import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

interface Position {
  latitude: number;
  longitude: number;
}

interface UserState {
  username: string;
  status: "idle" | "loading" | "error";
  position: Position | null;
  address: string;
  error: string;
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

export const fetchAddress = createAsyncThunk<
  { position: Position; address: string }, 
  void, 
  { rejectValue: string }
>(
  "user/fetchAddress",
  async function (_, { rejectWithValue }) {
    try {
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      return { position, address };
    } catch  {
      return rejectWithValue("There was a problem getting your address. Please try again.");
    }
  }
);

const initialState: UserState = {
  username: "",
  status: "idle",
  position: null,
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string || "There was a problem getting your address.";
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

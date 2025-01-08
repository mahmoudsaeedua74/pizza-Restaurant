import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

// تعريف الأنواع الخاصة بالـ state
interface Position {
  latitude: number;
  longitude: number;
}

interface UserState {
  username: string;
  status: "idle" | "loading" | "error";
  position: Position | {};
  address: string;
  error: string;
}

interface FetchAddressPayload {
  position: Position;
  address: string;
}

// دالة للحصول على الموقع باستخدام الـ Geolocation API
function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// إنشاء الـ Async Thunk لجلب العنوان
export const fetchAddress = createAsyncThunk<FetchAddressPayload, void>(
  "user/fetchAddress",
  async function () {
    // 1) الحصول على الموقع الجغرافي للمستخدم
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) استخدام API الجغرافيا العكسية للحصول على تفاصيل العنوان
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) إرجاع البيانات المطلوبة
    return { position, address };
  }
);

// الحالة الأولية (Initial State)
const initialState: UserState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

// إنشاء الـ Slice
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
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

// تصدير الأكشنز
export const { updateName } = userSlice.actions;

// تصدير الـ Reducer
export default userSlice.reducer;

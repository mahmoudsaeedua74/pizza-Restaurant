import { useSelector } from "react-redux";

// تعريف نوع حالة الـ Redux
interface RootState {
  userSlice: {
    username: string | null; // لأن username قد يكون null في البداية
  };
}

function Username() {
  const username = useSelector((state: RootState) => state.userSlice.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;

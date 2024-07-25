import React from "react";
import { useAuthStore } from "../../store/authUser.js";

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <button
        onClick={logout}
        className="bg-orange-500 rounded-lg text-white p-2"
      >
        Logout
      </button>
    </div>
  );
};

export default HomeScreen;

import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="h-full w-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    );
  }
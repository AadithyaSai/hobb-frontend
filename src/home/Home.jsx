import { Outlet } from "react-router";

export default function Home() {
  return (
    <div className="home-container">
      <Outlet />
    </div>
  );
}

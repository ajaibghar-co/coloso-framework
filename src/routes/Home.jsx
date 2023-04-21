import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/landing");
  // }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

function Dashboard() {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });

  const router = useRouter();
  const getProfile = async () => {
    const response = await axios.get("/api/profile");
    setUser(response.data);
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error(error);
      router.push("/login");
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <div>{JSON.stringify(user, null, 2)}</div>
      <button onClick={() => getProfile()}>Get profile</button>

      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}

export default Dashboard;

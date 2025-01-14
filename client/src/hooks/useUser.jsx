import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUser(true);
    }
  }, []);
  return user;
};

export default useUser;

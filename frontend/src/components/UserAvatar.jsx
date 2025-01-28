import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import axios from "axios";

const UserAvatar = () => {
  const [userData, setUserData] = useState(null);
  const { user } = useContext(BlogContext);

  const userEmailId = user?.email; // Ensure user exists before accessing email

  const fetchUserData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/get-user-by-email",
        { email: userEmailId } 
      );

      if (!response || !response.data) {
        throw new Error("Error fetching user data");
      }

      setUserData(response.data.credentials);
    } catch (error) {
      console.log(`Error while fetching user credentials: ${error.message}`);
    }
  };

  useEffect(() => {
    if (userEmailId) {
      fetchUserData();
    }
  }, [userEmailId]);

  // Extract first letter of user name
  const userInitial = userData?.name ? userData.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold text-lg rounded-full m-auto">
      {userInitial}
    </div>
  );
};

export default UserAvatar;

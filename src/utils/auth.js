import { jwtDecode } from "jwt-decode";

export const getUserEmail = () => {
  const token = localStorage.getItem("token");

  if (!token) return "pavani@test.com";

  try {
    const decoded = jwtDecode(token);

    return (
      decoded.email ||
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
      "pavani@test.com"
    );
  } catch (error) {
    console.log(error);
    return "pavani@test.com";
  }
};
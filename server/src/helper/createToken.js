import jwt from "jsonwebtoken";

export const createToken = async (data) => {
  try {
    const authToken = jwt.sign(data, "234567890", {
      expiresIn: "1h", // token expires in 1 hour
    });
    
    return authToken // add token expiration time
  } catch (error) {
    throw new Error("Failed to create auth token");
  }
};
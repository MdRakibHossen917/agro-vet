"use server";

import bcrypt from "bcrypt";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  try {
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);

    const { email, password } = payload;
    if (!email || !password) return null;

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object with hashed password
    const newUser = {
      ...payload,
      password: hashedPassword,
    };

    // Insert new user
    const result = await usersCollection.insertOne(newUser);

    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
    };
  } catch (error) {
    console.error("Registration DB Error:", error);
    throw new Error(error.message || "Registration failed");
  }
};

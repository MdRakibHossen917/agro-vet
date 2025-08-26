"use server";

import bcrypt from "bcrypt";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  try {
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);

    const { email, password, name } = payload;
    if (!email || !password || !name) {
      throw new Error("Name, email and password are required");
    }

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return {
      success: true,
      insertedId: result.insertedId,
    };
  } catch (error) {
    console.error("Registration DB Error:", error);
    return { success: false, message: error.message };
  }
};

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    auth0Id: {
      type: String,
      required: true,
      unique: true,
    },

    votedCases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Case" }],
    savedCases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Case" }],
    role: {
      type: String,
      enum: ["visitor", "collaborator"],
      default: "visitor",
    },

    profilePicture: {
      type: String,
    },

    bio: {
      type: String,
      default: "No bio provided",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

// "sid": "Hq1TVKHWiC4PlBDyBdMsqJjF0s9id2og",
//         "given_name": "Dana",
//         "family_name": "Z",
//         "nickname": "danazyt",
//         "name": "Dana Z",
//         "picture": "https://lh3.googleusercontent.com/a/ACg8ocLZrQw5P8sXNqLEpE3W0et5WptECOEc_Gav1occ8UTnKVpa4lM2=s96-c",
//         "updated_at": "2025-02-16T23:05:15.661Z",
//         "email": "danazyt@gmail.com",
//         "email_verified": true,
//         "sub": "google-oauth2|115312442419540091700"

import { ObjectId } from "bson";
import { client } from "../db.js";

export function getAllProfiles() {
  return client
    .db("project2")
    .collection("profile")
    .find()
    .toArray();
}

export function getProfileById(id) {
  return client
    .db("project2")
    .collection("profile")
    .findOne({ _id: new ObjectId(id) });
}

export function createProfile(profileData) {
  return client
    .db("project2")
    .collection("profile")
    .insertOne(profileData);
}

export function updateProfile(id, updatedData) {
  return client
    .db("project2")
    .collection("profile")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
}

export function deleteProfile(id) {
  console.log("id",id);
  return client
    .db("project2")
    .collection("profile")
    .findOneAndDelete({ _id: new ObjectId(id) }, { projection: { _id: 0 } });
}

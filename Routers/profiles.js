import express from "express";
import { createProfile, deleteProfile, getAllProfiles, getProfileById, updateProfile } from "../Controllers/profiles.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const profiles = await getAllProfiles();
    res.status(200).json({ data: profiles });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await getProfileById(id);
    if (!profile) {
      res.status(400).json({ error: "Profile not found" });
      return;
    }
    res.status(200).json({ data: profile });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const newProfile = req.body;
    if (!newProfile) {
      res.status(400).json({ error: "No profile details provided" });
      return;
    }
    const createdProfile = await createProfile(newProfile);
    res.status(200).json({ data: createdProfile, message: "Profile created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProfileData = req.body;
    if (!updatedProfileData) {
      res.status(400).json({ error: "No updated profile data provided" });
      return;
    }
    const updatedProfile = await updateProfile(id, updatedProfileData);
    if (!updatedProfile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }
    res.status(200).json({ data: updatedProfile, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await deleteProfile(id);
    if (!deletedProfile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }
    res.status(200).json({ data: deletedProfile, message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export const profilesRouter = router;

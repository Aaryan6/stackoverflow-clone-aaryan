import express from "express";
import {
  addPost,
  deletePost,
  dislike,
  getPosts,
  getUserPosts,
  like,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/user-posts/:id", getUserPosts);
router.post("/", auth, addPost);
router.delete("/:id", auth, deletePost);
router.put("/like/:id", auth, like);
router.put("/dislike/:id", auth, dislike);

export default router;

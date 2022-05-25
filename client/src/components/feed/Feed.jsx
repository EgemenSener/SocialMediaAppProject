import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const res = username ? 
        await axios.get("/posts/profile/" + username) :
        await axios.get("/posts/timeline/" + user._id) 
        setPosts(res.data.sort((a,b) => {
           return new Date(b.createdAt) - new Date(a.createdAt)}));
    }
    fetchData();
  }, [username]);
  return (
    <div className="feed">
      <div className="feedWrapper"></div>
      <Share />
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}

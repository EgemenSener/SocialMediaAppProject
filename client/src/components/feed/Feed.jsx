import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from 'axios';

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);

  useEffect( ()=> {
    const fetchPosts = async () => {
      const res = username ? 
      await axios.get("/posts/profile/" + username) : 
      await axios.get("posts/timeline/627d083f5c663b676b4864ff");
      setPosts(res.data);
    }
    
    fetchPosts();
  }, [username]) // If ı use [] use effect render only one time
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

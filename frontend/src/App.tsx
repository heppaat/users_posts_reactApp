import { useEffect, useState } from "react";
import "./App.css";
import { fetchData, Post } from "./lib/api";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchData();
        console.log(posts);
        setPosts(posts);
      } catch (error) {
        setError((error as Error).message || "An error occurred");
      }
    };
    getPosts();
  }, []);

  const uniqueUserIds = posts.reduce<number[]>((acc, curr) => {
    if (!acc.includes(curr.userId)) {
      acc.push(curr.userId);
    }
    return acc;
  }, []);

  return (
    <div className="select-container">
      <select name="users" id="select-users">
        <option value="" disabled>
          Users
        </option>
        {uniqueUserIds.map((userId) => (
          <option key={userId} value={userId}>
            User: {userId}
          </option>
        ))}
      </select>
      <select name="posts" id="select-posts">
        <option value="">Posts</option>
      </select>
    </div>
  );
}

export default App;

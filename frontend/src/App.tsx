import { useEffect, useState } from "react";
import "./App.css";
import { fetchData, Post } from "./lib/api";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

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

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value, 10);
    setSelectedUser(userId);
  };

  const filteredPosts = posts.filter((post) => post.userId === selectedUser);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="select-container">
      <select name="users" id="select-users" onChange={handleSelectUser}>
        <option value="">Users</option>
        {uniqueUserIds.map((userId) => (
          <option key={userId} value={userId}>
            User: {userId}
          </option>
        ))}
      </select>
      <select name="posts" id="select-posts">
        <option value="">Posts</option>
        {filteredPosts.map((post) => (
          <option key={post.id} value={post.id}>
            {post.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;

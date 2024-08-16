import { useEffect, useState } from "react";
import "./App.css";
import { fetchData, Post } from "./services/get";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  //NEW POST VARIABLES
  const [selectedUserForNewPost, setSelectedUserForNewPost] = useState<
    number | null
  >(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchData();

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
    console.log(typeof userId, userId);
    setSelectedUser(userId);
  };

  const handleSelectPost = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const postId = parseInt(event.target.value, 10);

    setSelectedPost(postId);
  };

  const filteredPosts = selectedUser
    ? posts.filter((post) => post.userId === selectedUser)
    : posts;

  const postToRender = filteredPosts.find((post) => post.id === selectedPost);

  //WRITE A NEW POST LOGIC

  const handleSelecUserForNewPost = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const userIdNewPost = parseInt(event.target.value, 10);
    setSelectedUserForNewPost(userIdNewPost);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <main className="app-container">
        <h1 className="get-post">Choose a post</h1>
        <div className="select-container">
          <select name="users" id="select-users" onChange={handleSelectUser}>
            <option value="">Users</option>
            {uniqueUserIds.map((userId) => (
              <option key={userId} value={userId}>
                User: {userId}
              </option>
            ))}
          </select>
          <select name="posts" id="select-posts" onChange={handleSelectPost}>
            <option value="">Posts</option>
            {filteredPosts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>
        </div>

        {postToRender && (
          <div className="post-container">
            <h1>{postToRender.title}</h1>
            <p>{postToRender.body}</p>
          </div>
        )}
      </main>
      <main>
        <h1>Write a new Post</h1>
        <div>
          <select
            name="users-for-post"
            id="post-users"
            onChange={handleSelecUserForNewPost}
          >
            <option value="">Users</option>
            {uniqueUserIds.map((userId) => (
              <option key={userId} value={userId}>
                User: {userId}
              </option>
            ))}
          </select>
        </div>
      </main>
    </>
  );
}

export default App;

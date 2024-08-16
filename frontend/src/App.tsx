import { useEffect, useState } from "react";
import "./App.css";
import { fetchData, Post } from "./services/get";
import { postData } from "./services/post";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  //NEW POST VARIABLES
  const [selectedUserForNewPost, setSelectedUserForNewPost] = useState<
    number | null
  >(null);
  const [newPostTitle, setNewPostTitle] = useState<string>("");
  const [newPostBody, setNewPostBody] = useState<string>("");

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

  const handleSelectUserForNewPost = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const userIdNewPost = parseInt(event.target.value, 10);
    setSelectedUserForNewPost(userIdNewPost);
  };

  const handlePostButton = async () => {
    if (!selectedUserForNewPost || !newPostTitle || !newPostBody) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const newPost = await postData({
        userId: selectedUserForNewPost,
        title: newPostTitle,
        body: newPostBody,
      });

      setPosts([...posts, newPost]);
      setSelectedUserForNewPost(null);
      setNewPostTitle("");
      setNewPostBody("");
      setError(null);
    } catch (error) {
      setError((error as Error).message || "Failed to create post");
    }
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
            onChange={handleSelectUserForNewPost}
          >
            <option value="">Users</option>
            {uniqueUserIds.map((userId) => (
              <option key={userId} value={userId}>
                User: {userId}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2>Post title</h2>
          <input
            value={newPostTitle}
            type="text"
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
        </div>
        <div>
          <h2>Post body</h2>
          <textarea
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handlePostButton}>Post</button>
      </main>
    </>
  );
}

export default App;

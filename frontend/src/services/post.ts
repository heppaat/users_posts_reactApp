import { Post } from "./get";

export type NewPost = {
  userId: number;
  title: string;
  body: string;
};

export const postData = async (newPost: NewPost): Promise<Post> => {
  try {
    const response = await fetch("http://localhost:3001/api/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Error status: ${response.status}`);
    }

    const data = await response.json();
    return data as Post;
  } catch (error) {
    console.error("Error creating post", error);
    throw error;
  }
};

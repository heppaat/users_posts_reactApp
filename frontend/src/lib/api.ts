type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const fetchData = async (): Promise<Post[]> => {
  try {
    const response = await fetch("http://localhost:3001/api/posts");

    if (!response.ok) {
      throw new Error(`HTTP error. Response status: ${response.status}`);
    }

    const data = await response.json();
    return data as Post[];
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

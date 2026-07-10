import { createContext, useContext, useState } from "react";
import { Posts } from "../data/posts";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(Posts);

  const likePost = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const dislikePost = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, dislikes: post.dislikes + 1 } : post
      )
    );
  };

  return (
    <PostsContext.Provider value={{ posts, likePost, dislikePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);



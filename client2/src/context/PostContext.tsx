// src/context/PostContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// PostContext의 타입 정의
interface Post {
  title: string;
  content: string;
  date: string;
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
}

// 초기 상태 생성
export const PostContext = createContext<PostContextType | undefined>(undefined);

// Provider 컴포넌트
export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // 새로운 포스트 추가 함수
  const addPost = (post: Post) => {
    setPosts([...posts, post]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

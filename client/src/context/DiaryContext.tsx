import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getDiariesByUserId,
  countDiariesByUserId,
  saveDiary,
} from "../api/diaryApi"; // API 함수 사용

interface Diary {
  diary_id: number;
  user_id: number;
  title: string;
  content: string;
  color: string;
  date: string;
}

interface DiaryContextType {
  diaries: Diary[] | null;
  diaryCount: number;
  fetchDiaries: (user_id: number) => void;
  saveDiaryEntry: (
    diaryData: Omit<Diary, "diary_id" | "date">
  ) => Promise<void>;
  fetchDiaryCount: (user_id: number) => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [diaries, setDiaries] = useState<Diary[] | null>(null);
  const [diaryCount, setDiaryCount] = useState<number>(0);

  const fetchDiaries = async (user_id: number) => {
    try {
      const result = await getDiariesByUserId(user_id);
      setDiaries(result);
    } catch (error) {
      console.error("일기 데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const saveDiaryEntry = async (
    diaryData: Omit<Diary, "diary_id" | "date">
  ) => {
    try {
      await saveDiary(diaryData);
      fetchDiaries(diaryData.user_id);
      fetchDiaryCount(diaryData.user_id);
    } catch (error) {
      console.error("일기를 저장하는 중 오류가 발생했습니다:", error);
    }
  };

  const fetchDiaryCount = async (user_id: number) => {
    try {
      const count = await countDiariesByUserId(user_id);
      setDiaryCount(count);
    } catch (error) {
      console.error("일기 갯수 조회 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <DiaryContext.Provider
      value={{
        diaries,
        diaryCount,
        fetchDiaries,
        saveDiaryEntry,
        fetchDiaryCount,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (context === undefined) {
    throw new Error("useDiary는 DiaryProvider 내에서 사용되어야 합니다.");
  }
  return context;
};

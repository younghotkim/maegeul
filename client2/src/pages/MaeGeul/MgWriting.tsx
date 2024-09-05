import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { analyzeEmotion } from '../../api/analyzeApi'; // 분석 API import

const MgWriting: React.FC = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [emotionResult, setEmotionResult] = useState<string | null>(null); // 분석 결과 상태 추가
    const maxLength = 500;

    useEffect(() => {
        const today = new Date();
        const formatted = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${today.getHours()}시 ${today.getMinutes()}분`;
        setFormattedDate(formatted);
    }, []);

    const handleSave = async () => {
        try {
            const posts = JSON.parse(localStorage.getItem('posts') || '[]');
            const newPost = { title, content, date: formattedDate };
            posts.push(newPost);
            localStorage.setItem('posts', JSON.stringify(posts));
            alert('글이 저장되었습니다!');
            setTitle(''); // 제목 초기화
            setContent(''); // 내용 초기화

            // AI 분석 여부 확인
            if (window.confirm('AI 분석을 하시겠습니까?')) {
                const emotion = await analyzeEmotion(content); // 감정 분석 호출
                setEmotionResult(emotion); // 분석 결과 상태 저장
                alert(`감정 분석 결과: ${emotion}`);
            }

        } catch (error) {
            console.error('글 저장 중 오류 발생:', error);
        }
    };

    const handleDelete = (index: number) => {
        try {
            const posts = JSON.parse(localStorage.getItem('posts') || '[]');
            posts.splice(index, 1);
            localStorage.setItem('posts', JSON.stringify(posts));
            alert('글이 삭제되었습니다!');
        } catch (error) {
            console.error('글 삭제 중 오류 발생:', error);
        }
    };

    const handleEdit = (index: number) => {
        try {
            const posts = JSON.parse(localStorage.getItem('posts') || '[]');
            const postToEdit = posts[index];
            setTitle(postToEdit.title);
            setContent(postToEdit.content);
            handleDelete(index);
        } catch (error) {
            console.error('글 수정 중 오류 발생:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="BackgroundBorder w-full h-full p-10 bg-white rounded-3xl shadow border border-black/10 flex dark:bg-gray-600 dark:text-white">
                <div className="Verticalborder flex-grow self-stretch pl-10 pr-11 pt-14 pb-96 border-r border-black/10 flex-col">
                    <div className="Container w-96 h-72 flex flex-col">
                        <div className="User w-96 h-11 text-scampi-600 font-bold text-2xl leading-10 dark:text-white">user님의 오늘의 감정 일기</div>
                        <div className="Date w-96 h-11 text-right text-neutral-500 text-sm">{formattedDate}</div>
                        <div className="HorizontalDivider w-96 h-px my-2 bg-black/10" />
                        <div className="Container flex flex-col space-y-2">
                            <div className="BackgroundBorder p-5 bg-white rounded-2xl border border-black/10">
                                <div className="text-zinc-800 text-base">
                                    1. 작성안내<br />
                                    2. 작성안내<br />
                                    3. 작성안내
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Background flex-grow px-12 pt-14 bg-slate-100 rounded-tr-2xl rounded-br-2xl flex flex-col dark:bg-gray-600 dark:text-white">
                    <div className="Container w-full flex flex-col space-y-4">
                        <div className="Input w-full pb-3 border-b border-black/10 flex">
                            <input 
                                className="w-full h-9 text-scampi-600 font-bold text-2xl" 
                                placeholder="제목을 입력하세요." 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <textarea 
                            className="w-full h-40 p-3 bg-white rounded-lg border border-black/10 dark:bg-gray-800 dark:text-white"
                            placeholder="오늘 하루 어떠셨나요? 오늘 내가 느낀 감정을 일으킨 상황과 함께 구체적으로 작성해보세요. (최대 500자까지 작성이 가능합니다.)"
                            maxLength={maxLength}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="w-full text-right text-xs text-zinc-800">글자수: {content.length}</div>
                        <div className="flex flex-col space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-sm text-zinc-800">비공개 - 본인과 관리자 외 게시물을 볼 수 없게 합니다.</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-sm text-zinc-800">익명 - 작성자 명을 익명으로 표시 합니다.</span>
                            </label>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <button onClick={handleSave} className="w-1/2 py-2 bg-gray-200 rounded-lg">임시 저장</button>
                            <button onClick={handleSave} className="w-1/2 py-2 bg-blue-500 text-white rounded-lg">작성 완료</button>
                        </div>
                        {/* AI 분석 결과 표시 */}
                        {emotionResult && (
                            <div className="mt-4 p-4 bg-blue-100 rounded-lg text-blue-800">
                                AI 분석 결과: {emotionResult}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MgWriting;

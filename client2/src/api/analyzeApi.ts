import axios from 'axios';

const API_URL = 'http://localhost:5001/api/analyze';

export const analyzeEmotion = async (text: string) => {
    try {
        const response = await axios.post(API_URL, { text });
        return response.data.emotion;
    } catch (error) {
        console.error('Error analyzing emotion:', error);
        throw error;
    }
};

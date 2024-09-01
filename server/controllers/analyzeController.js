// controllers/analyzeController.js
const axios = require('axios');

const analyzeEmotion = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "당신은 감정 분석과 가이드를 제공하는 공감적이고 통찰력 있는 어시스턴트입니다. 당신의 목표는 무드 미터를 사용해 사용자의 감정을 분석하고, 러셀의 원형 감정 모델에 근거한 맞춤형 가이드를 제공하는 것입니다."},
                    { role: "user", content: `

다음 문장을 분석하여 무드 미터의 4개 구간(레드, 블루, 옐로우, 그린) 중 어느 구간에 해당하는지 분류하고, 
러셀의 원형 감정 모델에 근거해 사용자가 부정적인 감정을 관리하거나 긍정적인 감정을 유지 및 강화할 수 있는 구체적인 가이드를 제공해줘.
그런 다음 문장을 분석하여 워드 클라우드로 표현 할 수 있는 감정 키워드들을 추출해주고, 감정 키워드를 json형식으로 정리해줘. 출력 순서는 구간, 가이드라인, json이야.
분석할 문장은 다음과 같습니다: "${text}"` }
                ],
                //max_tokens: 50,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                }
            }
        );

        const emotionAnalysis = response.data.choices[0].message.content.trim();
        res.json({ emotion: emotionAnalysis });

    } catch (error) {
        console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Error analyzing emotion" });
    }
};

module.exports = { analyzeEmotion }; // 함수가 제대로 내보내기 되고 있는지 확인

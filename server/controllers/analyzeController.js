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

사용자가 세 항목에 대하여 감정을 느낀 상황에 대해 작성합니다:

- 상황: 
- 행동: 
- 생각: 

이 데이터를 바탕으로 사용자가 현재 속한 감정 구간을 판단한 후, 다음 네 가지 중 하나의 구간에 맞는 맞춤형 가이드를 제공하세요:

1. 고활성화 & 부정적 감정 (Red Quadrant)
2. 저활성화 & 부정적 감정 (Blue Quadrant)
3. 고활성화 & 긍정적 감정 (Yellow Quadrant)
4. 저활성화 & 긍정적 감정 (Green Quadrant)

이 무드 미터를 사용하는 이유는 사용자의 감정을 인식하고 측정해서 그에 맞는 가이드를 주기 위함이야. 이 모델은 러셀의 '원형감정모델'에 기반하고 있어. 감정을 단순히 전환시키라고 가이드를 주기 보다, 이미 생긴 감정을 인지할 수 있도록 구간을 특정해 사용자가 자신의 감정을 그대로 인정하도록 하고 싶어. 

각 구간에 따라 다음과 같은 가이드를 제공해야 합니다:

1. 감정 인식과 수용
2. 상황에 맞는 구체적 행동 제안
3. 감정 조절 방법
4. 자기 돌봄 및 휴식 방법
5. 긍정적인 행동 유도

이제 사용자의 데이터를 바탕으로 현재 상태에 맞는 가이드를 제공하세요. 분석할 문장은 다음과 같습니다: "${text}"` }
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

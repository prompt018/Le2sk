const GEMINI_API_KEY = "AIzaSyD4jp_dRQtVGFQDZc5lCd7vVtBGz02DvA0"; // 반드시 새로 발급받은 키 넣은지 확인하기!

    async function sendMessage() {
        const input = document.getElementById('userInput');
        const messages = document.getElementById('chatMessages');
        if (!input.value.trim()) return;

        // 사용자 메시지 표시
        const userDiv = document.createElement('div');
        userDiv.className = 'bubble user-bubble';
        userDiv.innerText = input.value;
        messages.appendChild(userDiv);
        const userText = input.value;
        input.value = ""; 

        const aiDiv = document.createElement('div');
        aiDiv.className = 'bubble ai-bubble';
        aiDiv.innerText = "연결 시도 중...";
        messages.appendChild(aiDiv);

        try {
            // [비법 1] 내 계정에서 사용 가능한 '진짜' 모델 목록을 먼저 가져옵니다.
            const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
            const listRes = await fetch(listUrl);
            const listData = await listRes.json();
            
            // [비법 2] 목록 중 'generateContent'가 가능한 첫 번째 모델을 자동으로 선택합니다.
            const availableModel = listData.models.find(m => m.supportedGenerationMethods.includes('generateContent'));
            
            if (!availableModel) {
                aiDiv.innerText = "사용 가능한 모델이 하나도 없습니다. API 키를 새로 생성해주세요.";
                return;
            }

            console.log("자동 선택된 모델:", availableModel.name);

            // [비법 3] 찾은 모델 주소로 질문을 던집니다.
            const url = `https://generativelanguage.googleapis.com/v1beta/${availableModel.name}:generateContent?key=${GEMINI_API_KEY}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "당신은 영양사입니다. 답하세요: " + userText }] }]
                })
            });

            const data = await response.json();

            if (data.candidates && data.candidates[0].content) {
                aiDiv.innerText = data.candidates[0].content.parts[0].text;
            } else {
                aiDiv.innerText = "오류: " + (data.error ? data.error.message : "응답 실패");
            }
        } catch (error) {
            aiDiv.innerText = "네트워크 연결 오류: " + error.message;
        }
        messages.scrollTop = messages.scrollHeight;
    }

    function toggleChat() {
        const win = document.getElementById('chatWindow');
        win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
    }
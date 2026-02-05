// ai-chat.js
const GEMINI_API_KEY = "YOUR_KEY_HERE";
// 1. 챗봇 창 열기/닫기
function toggleChat() {
    const win = document.getElementById('chatWindow');
    if (win) {
        win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
    }
}

// 2. 음성 인식 기능 (STT) 추가
function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    const micBtn = document.getElementById('micBtn');

    recognition.onstart = () => {
        micBtn.innerText = "🔴"; // 녹음 중 표시
    };

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        document.getElementById('userInput').value = text;
    };

    recognition.onend = () => {
        micBtn.innerText = "🎤";
    };

    recognition.start();
}

// 3. 메시지 전송 (Gemini 연동)
async function sendMessage() {
    const input = document.getElementById('userInput');
    const messages = document.getElementById('chatMessages');
    if (!input.value.trim()) return;

    const userText = input.value;
    appendMessage(userText, 'user');
    input.value = "";

    const aiDiv = appendMessage("생각 중...", 'ai');

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "당신은 영양사 플레이츠입니다. 친절하게 답하세요: " + userText }] }]
            })
        });

        const data = await response.json();
        aiDiv.innerText = data.candidates[0].content.parts[0].text;
    } catch (error) {
        aiDiv.innerText = "오류가 발생했습니다. 키를 확인해주세요.";
    }
}

function appendMessage(text, sender) {
    const messages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `bubble ${sender}-bubble`;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
}
// script.js - 통합 버전

window.onload = function() {
    // 1. 기존 데이터 확인 로직
    const savedDiet = localStorage.getItem("myDiet");
    if (savedDiet) {
        console.log("마지막으로 입력한 식단: " + savedDiet);
    }

    // 2. "분석중" 상태를 "준비 완료"로 변경 (3초 뒤 실행)
    setTimeout(() => {
        const statusText = document.querySelector('.user-status');
        if (statusText) {
            statusText.innerHTML = "● <b>잘한다</b>님 맞춤형 식단 준비 완료!";
            statusText.style.color = "#007AFF"; // 색상도 파란색으로 변경하여 완료 느낌 강조
        }
    }, 3000);
};

// 3. 채팅창 열고 닫기 함수
function toggleChat() {
    const win = document.getElementById('chatWindow');
    if (win) {
        win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
    }
}

// 4. 메시지 전송 함수 (ai-chat.js가 없는 페이지를 위한 기본 로직)
// 만약 ai-chat.js가 연결된 페이지라면 ai-chat.js의 sendMessage가 우선 실행
function sendMessage() {
    const input = document.getElementById('userInput');
    const messages = document.getElementById('chatMessages');

    if (!input || !input.value.trim()) return;

    // 사용자 메시지 추가
    const userDiv = document.createElement('div');
    userDiv.className = 'bubble user-bubble';
    userDiv.innerText = input.value;
    messages.appendChild(userDiv);

    const userValue = input.value;
    input.value = ""; // 입력창 비우기

    // AI 답변 시뮬레이션
    setTimeout(() => {
        const aiDiv = document.createElement('div');
        aiDiv.className = 'bubble ai-bubble';
        aiDiv.innerText = "분석 중입니다... 잠시만 기다려 주세요!";
        messages.appendChild(aiDiv);
        messages.scrollTop = messages.scrollHeight; 
    }, 1000);
}
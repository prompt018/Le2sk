// 페이지 로드 시 기존 데이터 확인
window.onload = function() {
    const savedDiet = localStorage.getItem("myDiet");
    if (savedDiet) {
        console.log("마지막으로 입력한 식단: " + savedDiet);
        // 필요하다면 채팅창에 "이전에 OO을 입력하셨네요!" 같은 문구를 띄울 수 있습니다.
    }
}

// 채팅창 열고 닫기 함수
        function toggleChat() {
            const win = document.getElementById('chatWindow');
            win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
        }

        // 메시지 전송 함수 (간단 로직)
        function sendMessage() {
            const input = document.getElementById('userInput');
            const messages = document.getElementById('chatMessages');

            if (input.value.trim() === "") return;

            // 1. 사용자 메시지 추가
            const userDiv = document.createElement('div');
            userDiv.className = 'bubble user-bubble';
            userDiv.innerText = input.value;
            messages.appendChild(userDiv);

            input.value = ""; // 입력창 비우기

            // 2. 가짜 AI 답변 (나중에 API로 대체될 부분)
            setTimeout(() => {
                const aiDiv = document.createElement('div');
                aiDiv.className = 'bubble ai-bubble';
                aiDiv.innerText = "분석 중입니다... 잠시만 기다려 주세요!";
                messages.appendChild(aiDiv);
                messages.scrollTop = messages.scrollHeight; // 스크롤 하단 이동
            }, 1000);
        }


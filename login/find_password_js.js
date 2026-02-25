document.addEventListener('DOMContentLoaded', function() {
    // 탭 전환 기능
    window.openTab = function(tabName) {
        // 모든 탭 컨텐츠 숨김
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
        
        // 선택된 탭 활성화
        document.getElementById(tabName).classList.add('active');
        // 버튼 활성화 (이벤트 타겟을 못 찾을 수 있으므로 순서대로 매칭)
        const btns = document.querySelectorAll('.tab-btn');
        if(tabName === 'findId') btns[0].classList.add('active');
        else btns[1].classList.add('active');
        
        // 메시지 초기화
        document.getElementById('statusMessage').textContent = '';
    };

    // [1] 아이디 찾기 로직
    const findIdForm = document.getElementById('findIdForm');
    const statusMessage = document.getElementById('statusMessage');

    if(findIdForm) {
        findIdForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userPhone').value;

            statusMessage.textContent = "SEARCHING DATABASE...";
            statusMessage.style.color = "#00ff9d";

            fetch('find_password_process.jsp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `mode=find_id&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`
            })
            .then(res => res.text())
            .then(data => {
                const result = data.trim();
                if(result === "not_found") {
                    statusMessage.textContent = "일치하는 정보가 없습니다.";
                    statusMessage.style.color = "#ff4444";
                } else if (result.startsWith("error")) {
                    statusMessage.textContent = "서버 오류가 발생했습니다.";
                    statusMessage.style.color = "#ff4444";
                } else {
                    // 성공 시 아이디 알려줌 (result에 이메일이 들어있음)
                    alert(`회원님의 아이디는 [ ${result} ] 입니다.`);
                    statusMessage.textContent = "아이디 찾기 완료.";
                }
            });
        });
    }

    // [2] 비밀번호 찾기 로직 (기존 유지 + 디자인 변경)
    const findPwForm = document.getElementById('findPwForm');
    const codeModal = document.getElementById('codeModal');
    let generatedCode = "";

    if(findPwForm) {
        findPwForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            statusMessage.textContent = "SENDING CODE...";
            statusMessage.style.color = "#00ff9d";

            fetch('find_password_process.jsp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `mode=find_pw&email=${encodeURIComponent(email)}`
            })
            .then(res => res.text())
            .then(data => {
                const result = data.trim();
                if(result.length === 6 && !isNaN(result)) {
                    generatedCode = result;
                    alert(`[테스트용] 인증 코드: ${result}`);
                    codeModal.style.display = 'flex'; // 모달 열기
                    statusMessage.textContent = "";
                } else {
                    statusMessage.textContent = "등록되지 않은 이메일입니다.";
                    statusMessage.style.color = "#ff4444";
                }
            });
        });
    }

    // 모달 관련 버튼
    document.getElementById('closeModalBtn').onclick = () => { codeModal.style.display = 'none'; };
    
    document.getElementById('confirmCodeBtn').onclick = function() {
        const inputCode = document.getElementById('verificationCode').value;
        if(inputCode === generatedCode) {
            alert("인증 성공! 비밀번호 재설정 페이지로 이동합니다.");
            window.location.href = "new_password.html";
        } else {
            alert("인증 코드가 일치하지 않습니다.");
        }
    };
});
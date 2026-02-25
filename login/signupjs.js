document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signupForm');
    var statusMessage = document.getElementById('statusMessage');

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 폼 자동 제출 방지

            // 1. 값 가져오기
            var name = document.getElementById('name').value;
            var nickname = document.getElementById('nickname').value; // 닉네임 추가
            var phone = document.getElementById('phone').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirmPassword').value;

            // 2. 비밀번호 일치 확인
            if (password !== confirmPassword) {
                statusMessage.textContent = "⚠ 비밀번호가 서로 일치하지 않습니다.";
                statusMessage.style.color = "#ff4444";
                return;
            }

            statusMessage.textContent = "PROCESSING REQUEST...";
            statusMessage.style.color = "#00ff9d";

            // 3. 데이터 전송 준비 (닉네임 포함!)
            var params = new URLSearchParams();
            params.append('name', name);
            params.append('nickname', nickname); // ★ JSP로 닉네임 전송
            params.append('phone', phone);
            params.append('email', email);
            params.append('password', password);

            // 4. 서버로 전송
            fetch('signup_process.jsp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params
            })
            .then(function(response) { return response.text(); })
            .then(function(result) {
                var trimmedResult = result.trim();
                
                if (trimmedResult === "success") {
                    alert("회원가입 완료! 로그인 페이지로 이동합니다.");
                    window.location.href = "/NewsPaper/login/loginhtml.html";
                } else if (trimmedResult === "duplicate") {
                    statusMessage.textContent = "이미 등록된 이메일 주소입니다.";
                    statusMessage.style.color = "#ff4444";
                } else {
                    statusMessage.textContent = "가입 오류: " + trimmedResult;
                    statusMessage.style.color = "#ff4444";
                }
            })
            .catch(function(error) {
                console.error(error);
                statusMessage.textContent = "서버 연결 실패";
            });
        });
    }
});
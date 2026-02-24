document.addEventListener('DOMContentLoaded', function() {
    var resetForm = document.getElementById('resetPasswordForm');
    var statusMessage = document.getElementById('statusMessage');
    var submitBtn = document.querySelector('.btn-main-login');

    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var newPassword = document.getElementById('newPassword').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

        // 1. 비밀번호 일치 확인
        if (newPassword !== confirmPassword) {
            statusMessage.textContent = "⚠ 비밀번호가 서로 일치하지 않습니다.";
            statusMessage.style.color = "#ff4444"; // 에러 레드
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "PROCESSING REQUEST...";

        // 2. 데이터 준비
        var params = new URLSearchParams();
        params.append('newPassword', newPassword);

        // 3. JSP 서버로 전송
        fetch('newpassword_process.jsp', {
            method: 'POST',
            body: params
        })
        .then(function(response) { return response.text(); })
        .then(function(result) {
            var data = result.trim();
            if (data === "success") {
                alert("비밀번호가 성공적으로 변경되었습니다! 다시 로그인해주세요.");
                // [경로 수정]
                window.location.href = "/NewsPaper/login/loginhtml.html";
            } else if (data === "session_expired") {
                alert("인증 시간이 만료되었습니다. 계정 찾기를 처음부터 다시 진행해주세요.");
                // [경로 수정]
                window.location.href = "/NewsPaper/login/find_password_html.html";
            } else {
                alert("오류 발생: " + data);
                submitBtn.disabled = false;
                submitBtn.textContent = "RESET PASSWORD";
            }
        })
        .catch(function(error) {
            alert("서버 연결 실패!");
            submitBtn.disabled = false;
            submitBtn.textContent = "RESET PASSWORD";
        });
    });
});
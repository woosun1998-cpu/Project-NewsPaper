document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");

    const loginForm = document.getElementById("loginForm");
    
    // 엔터키 처리
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                processLogin();
            }
        });
    });

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            processLogin();
        });
    } else {
        console.error("loginForm not found!");
    }
});

window.processLogin = function() {
    console.log("processLogin started");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const statusMessage = document.getElementById("statusMessage");

    if (!emailInput || !passwordInput || !statusMessage) {
        console.error("Inputs or statusMessage element not found!");
        return;
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    fetch("/NewsPaper/login/login_process.jsp", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.text();
    })
    .then(data => {
        console.log("Server response:", data);
        const result = data.trim();

        if (result.startsWith("success")) {
            const parts = result.split("/");
            const nickName = parts[1]; 

            // ★★★ 핵심: 댓글 작성을 위해 이메일과 이름을 모두 저장합니다 ★★★
            localStorage.setItem("userEmail", email);  // 작성자 ID로 사용
            localStorage.setItem("userNickName", nickName);
            localStorage.setItem("userName", nickName); // 메인 페이지 환영 문구용

            statusMessage.style.color = "#00ff9d";
            statusMessage.innerText = "로그인 성공! " + nickName + "님 환영합니다.";

            setTimeout(function() {
                window.location.href = "/NewsPaper/firstpage/main.html"; 
            }, 500);

        } else if (result === "fail") {
            statusMessage.style.color = "#ff4444";
            statusMessage.innerText = "아이디 또는 비밀번호가 일치하지 않습니다.";
        } else {
            statusMessage.style.color = "#ff4444";
            statusMessage.innerText = "로그인 오류: " + result;
        }
    })
    .catch(error => {
        console.error("Fetch Error:", error);
        if (statusMessage) statusMessage.innerText = "서버 연결 실패";
    });
}
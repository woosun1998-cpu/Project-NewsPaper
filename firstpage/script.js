// [1] 통계 숫자 카운팅 함수 (가장 먼저 독립 실행)
function initStatistics() {
    const counters = document.querySelectorAll('.count-up');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target') || 0;
                let count = 0;
                
                // 속도 조절: 큰 숫자는 더 빨리 올라가게 설정
                const increment = target / 100; 

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count).toLocaleString();
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(counter => observer.observe(counter));
}

// [2] 세션 체크 및 자동 로그아웃 함수
async function checkSession() {
    try {
        const response = await fetch('/NewsPaper/todaynews/GetSession.jsp');
        const userId = (await response.text()).trim();
        const loginLink = document.getElementById("loginLink");

        if (userId && userId !== "null" && userId !== "") {
            const savedNick = localStorage.getItem("userNickName") || userId;
            loginLink.textContent = savedNick + " 님 환영합니다";
            loginLink.style.color = "#00ff9d";
            loginLink.href = "/NewsPaper/mypage/mypage.html";
        } else if (localStorage.getItem("userNickName")) {
            alert("세션이 만료되어 자동으로 로그아웃되었습니다.");
            localStorage.clear();
            location.href = "/NewsPaper/login/loginhtml.html";
        }
    } catch (err) {
        console.warn("세션 체크 지연됨 (통계 로직은 이미 실행 중입니다)");
    }
}

// [3] 모든 로직 실행 (안전한 순서)
document.addEventListener("DOMContentLoaded", () => {
    // 1. 통계 애니메이션 먼저 실행 (화면 UI 중요)
    initStatistics();

    // 2. 세션 체크 실행 (비동기)
    checkSession();

    // 3. 1분마다 세션 체크 반복
    setInterval(checkSession, 60000);
});
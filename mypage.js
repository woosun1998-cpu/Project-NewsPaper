/* mypage.js */

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. 요소 가져오기
    const modal = document.getElementById("editModal"); // 팝업창 전체
    const openBtn = document.getElementById("openEditBtn"); // 정보 수정 버튼
    const closeBtn = document.getElementById("closeEditBtn"); // 취소 버튼

    // 2. [정보 수정] 버튼 누르면 -> 팝업 열기
    if (openBtn) {
        openBtn.addEventListener("click", function() {
            if (modal) {
                modal.style.display = "flex"; // 숨겨진 창을 보이게 함
            } else {
                alert("수정 창(editModal)을 찾을 수 없습니다.");
            }
        });
    }

    // 3. [취소] 버튼 누르면 -> 팝업 닫기
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
        });
    }

    // 4. 창 바깥쪽(검은 배경) 누르면 -> 닫기
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// 로그아웃 함수
function handleLogout() {
    if(confirm("정말 로그아웃 하시겠습니까?")) {
        location.href = 'logout.jsp';
    }
}
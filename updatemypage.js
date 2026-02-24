/**
 * 마이페이지 정보 수정 스크립트
 * 아이디별 독립된 로컬 저장소를 사용합니다.
 */

const $ = (sel) => document.querySelector(sel);
const KEY_PREFIX = "profile_"; // 아이디별 저장소 구분을 위한 접두사
let CURRENT_USER_ID = "";      // 서버에서 받아올 현재 로그인 아이디

// 1. 초기 실행: 로그인 세션 확인 및 폼 초기화
async function init() {
    try {
        // GetSession.jsp로부터 현재 로그인한 유저 아이디를 가져옵니다.
        const response = await fetch('/NewsPaper/todaynews/GetSession.jsp');
        const id = await response.text();
        
        CURRENT_USER_ID = id.trim();

        if (CURRENT_USER_ID && CURRENT_USER_ID !== "null" && CURRENT_USER_ID !== "") {
            // 로그인 확인 성공 시 폼을 채웁니다.
            initForm();
        } else {
            // 로그인 정보가 없으면 로그인 페이지로 튕겨냅니다.
            alert("로그인이 필요한 서비스입니다.");
            location.href = "/NewsPaper/login/loginhtml.html";
        }
    } catch (error) {
        console.error("세션 확인 중 오류 발생:", error);
        alert("시스템 연결이 원활하지 않습니다.");
    }
}

// 2. 현재 로그인 유저 전용 저장 키 생성
function getStorageKey() {
    return KEY_PREFIX + CURRENT_USER_ID;
}

// 3. 기본 프로필 데이터 (해당 유저의 저장소가 비어있을 때 사용)
function defaultProfile() {
    return {
        userId: CURRENT_USER_ID,
        userName: "사용자", // 실무에서는 DB에서 가져오는 것이 좋으나 현재는 기본값 설정
        nickname: "GAKHA", 
        phone: "010-0000-0000",
        avatar: "https://via.placeholder.com/150/000000/00ff9d?text=PROFILE", 
        password: "1234"
    };
}

// 4. 데이터 불러오기
function loadProfile() {
    const key = getStorageKey();
    const raw = localStorage.getItem(key);
    if (!raw) {
        const def = defaultProfile();
        saveProfile(def); 
        return def;
    }
    return JSON.parse(raw);
}

// 5. 데이터 저장하기
function saveProfile(p) {
    localStorage.setItem(getStorageKey(), JSON.stringify(p));
}

// 6. 화면 폼 초기화
function initForm() {
    const p = loadProfile();
    
    // 읽기 전용 데이터
    $("#userId").value = p.userId;
    $("#userName").value = p.userName;

    // 수정 가능 데이터
    $("#nickname").value = p.nickname;
    $("#phone").value = p.phone;

    // 이미지 미리보기
    if (p.avatar) {
        $("#avatarPreview").src = p.avatar;
    }
}

/* [이벤트 리스너 설정] */

// 이미지 파일 선택 시 미리보기 (Base64 변환)
$("#avatarFile").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        // 용량 체크 (5MB 제한)
        if (file.size > 5 * 1024 * 1024) {
            alert("이미지 크기는 5MB 이하여야 합니다.");
            this.value = ""; 
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            $("#avatarPreview").src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 취소 버튼
$("#btnCancel").addEventListener("click", () => {
    if (confirm("수정을 취소하고 돌아가시겠습니까?")) {
        location.href = 'mypage.jsp'; // 혹은 mypage.html
    }
});

// 수정 완료 (저장)
$("#editForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const p = loadProfile();
    const newNick = $("#nickname").value.trim();
    const newPhone = $("#phone").value.trim();
    const pw1 = $("#newPw").value;
    const pw2 = $("#newPw2").value;
    const newAvatar = $("#avatarPreview").src;

    if (newNick === "") {
        alert("닉네임을 입력해주세요.");
        return;
    }

    // 비밀번호 변경 로직
    let finalPw = p.password;
    if (pw1) {
        if (pw1.length < 4) {
            alert("비밀번호는 4자 이상이어야 합니다.");
            return;
        }
        if (pw1 !== pw2) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        finalPw = pw1;
    }

    const updated = {
        ...p,
        nickname: newNick,
        phone: newPhone,
        avatar: newAvatar,
        password: finalPw
    };

    try {
        saveProfile(updated);
        alert("회원 정보가 수정되었습니다.");
        location.href = 'mypage.jsp';
    } catch (err) {
        alert("이미지 용량이 너무 커서 저장할 수 없습니다. 더 작은 이미지를 사용해주세요.");
    }
});

// 실행 시작
init();
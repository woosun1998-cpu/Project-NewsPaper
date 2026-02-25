/**
 * 
 */// 1. 요소 선택
const imgElement = document.getElementById('mainImage');
const toggleBtn = document.getElementById('toggleBtn');
const resetBtn = document.getElementById('resetBtn');
const container = document.getElementById('imageContainer');

// 줌 컨트롤 관련 요소 (새로 추가됨)
const btnZoomIn = document.getElementById('btnZoomIn');
const btnZoomOut = document.getElementById('btnZoomOut');
const zoomPercentDisplay = document.getElementById('zoomPercent');

// 2. 번역본 토글 기능
let isTranslated = false;
const originalFile = "news_old.jpg";    // 원본 이미지
const translatedFile = "news_new.jpg";  // 번역본 이미지

toggleBtn.addEventListener('click', () => {
    if (isTranslated) {
        // 원본으로 돌아가기
        imgElement.src = originalFile;
        toggleBtn.innerText = "🔄 번역본 보기";
        toggleBtn.classList.remove('active-mode');
        isTranslated = false;
    } else {
        // 번역본 보여주기
        imgElement.src = translatedFile;
        toggleBtn.innerText = "↩ 원본 보기";
        toggleBtn.classList.add('active-mode');
        isTranslated = true;
    }
});

// 3. 줌 & 드래그 변수 설정
let scale = 1;      // 배율 (1 = 100%)
let pagingX = 0;    // 가로 이동 거리
let pagingY = 0;    // 세로 이동 거리
let isDragging = false;
let startX, startY;

// ★ 화면 업데이트 함수 (이미지 변형 + % 숫자 표시) ★
function updateTransform() {
    imgElement.style.transform = `translate(${pagingX}px, ${pagingY}px) scale(${scale})`;
    
    // 배율을 퍼센트로 변환해서 보여주기 (반올림)
    zoomPercentDisplay.innerText = `${Math.round(scale * 100)}%`;
}

// (1) 마우스 휠 줌
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    const scaleAmount = 0.1;
    if (e.deltaY < 0) scale += scaleAmount;
    else scale -= scaleAmount;
    
    // 배율 제한 (0.5배 ~ 5배)
    scale = Math.min(Math.max(0.5, scale), 5);
    updateTransform();
});

// (2) ★ 버튼 줌 (새로 추가됨)
btnZoomIn.addEventListener('click', () => {
    scale += 0.2; // 20%씩 확대
    scale = Math.min(Math.max(0.5, scale), 5);
    updateTransform();
});

btnZoomOut.addEventListener('click', () => {
    scale -= 0.2; // 20%씩 축소
    scale = Math.min(Math.max(0.5, scale), 5);
    updateTransform();
});

// (3) 드래그 시작
container.addEventListener('mousedown', (e) => {
    // 이미지나 배경을 눌렀을 때만 드래그 시작 (컨트롤러 클릭 제외)
    if(e.target.closest('.zoom-controls')) return;

    isDragging = true;
    startX = e.clientX - pagingX;
    startY = e.clientY - pagingY;
    container.style.cursor = 'grabbing';
});

// (4) 드래그 종료
window.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
});

// (5) 드래그 중 이동
window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    pagingX = e.clientX - startX;
    pagingY = e.clientY - startY;
    updateTransform();
});

// 4. 리셋 버튼 (모두 초기화)
resetBtn.addEventListener('click', () => {
    scale = 1; 
    pagingX = 0; 
    pagingY = 0;
    updateTransform();
});
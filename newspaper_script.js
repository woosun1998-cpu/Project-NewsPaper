// 1. 요소 선택
const imgElement = document.getElementById('mainImage');
const toggleBtn = document.getElementById('toggleBtn');
const resetBtn = document.getElementById('resetBtn');
const container = document.getElementById('imageContainer');

// 2. 번역본 토글 기능 설정
let isTranslated = false;

// ★★★ 파일 이름이 정확해야 합니다! ★★★
const originalFile = "/NewsPaper/image/news_old.jpg";    // 원본 이미지
const translatedFile = "/NewsPaper/image/news_new.jpg";  // 번역본 이미지

toggleBtn.addEventListener('click', () => {
    if (isTranslated) {
        // [현재 번역본] -> 버튼 누르면 -> [원본으로 변경]
        imgElement.src = originalFile;
        toggleBtn.innerText = "🔄 번역본 보기";        toggleBtn.classList.remove('active-mode');
        isTranslated = false;
    } else {
        // [현재 원본] -> 버튼 누르면 -> [번역본으로 변경]
        imgElement.src = translatedFile;
        toggleBtn.innerText = "↩ 원본 보기";
        toggleBtn.classList.add('active-mode');
        isTranslated = true;
    }
});

// 3. 줌 & 드래그 기능 구현
let scale = 1;
let pagingX = 0;
let pagingY = 0;
let isDragging = false;
let startX, startY;

// (1) 마우스 휠로 확대/축소
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    const scaleAmount = 0.1;
    if (e.deltaY < 0) scale += scaleAmount;
    else scale -= scaleAmount;
    
    // 배율 제한 (0.5배 ~ 5배)
    scale = Math.min(Math.max(0.5, scale), 5);
    updateTransform();
});

// (2) 드래그 시작
container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - pagingX;
    startY = e.clientY - pagingY;
    container.style.cursor = 'grabbing';
});

// (3) 드래그 종료
window.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
});

// (4) 드래그 중 이동
window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    pagingX = e.clientX - startX;
    pagingY = e.clientY - startY;
    updateTransform();
});

// 화면 업데이트 함수
function updateTransform() {
    imgElement.style.transform = `translate(${pagingX}px, ${pagingY}px) scale(${scale})`;
}

// 4. 리셋 버튼
resetBtn.addEventListener('click', () => {
    scale = 1; pagingX = 0; pagingY = 0;
    updateTransform();
});
// [1] 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 탭 기능 설정
    setupTabs();

    // 엔터키 이벤트 설정
    const input = document.getElementById('keyword-input');
    if(input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchNews();
        });
    }

    // ★ 페이지 로드 시 '아래쪽 목록(기본 뉴스)'만 채우기 ★
    loadDefaultNews();
});

// [2] 탭 기능 분리
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.search-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            contents.forEach(content => content.classList.remove('active'));
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// [3] ★ 서버 통신 함수 (targetContainerId 추가됨) ★
// targetContainerId: "어디에 그릴지" 지정 (search-result-container 또는 default-news-container)
function fetchNews(type, param1, param2, targetContainerId) {
    let url = '';
    
    if (type === 'date') {
        url = `search_api.jsp?type=date&start=${param1}&end=${param2}`;
    } else {
        url = `search_api.jsp?type=keyword&q=${encodeURIComponent(param1)}`;
    }

    fetch(url)
        .then(response => response.json()) 
        .then(data => { renderResults(data, targetContainerId); })
        .catch(error => {
            console.error('Error:', error);
            const container = document.getElementById(targetContainerId);
            if(container) container.innerHTML = `<div class="no-result" style="color:red;">DB 연결 실패</div>`;
        });
}

// [4] 기본 뉴스 로딩 (아래쪽 고정 목록)
function loadDefaultNews() {
    // 검색어 없이 전체를 불러와서 'default-news-container'에 그린다
    fetchNews('keyword', '', '', 'default-news-container');
}

// [5] 검색 실행 (위쪽 검색 결과 창)
function searchNews() {
    const input = document.getElementById('keyword-input');
    const query = input.value.trim();

    if(query === "") {
        alert("검색어를 입력해주세요.");
        return;
    }

    // 1. 검색 결과를 'search-result-container'에 요청
    fetchNews('keyword', query, '', 'search-result-container');
    
    // 2. 숨겨져 있던 검색 결과 섹션(#search-result-section)을 보여줌
    const resultSection = document.getElementById('search-result-section');
    if(resultSection) resultSection.style.display = 'block';
}

function searchByDate() {
    const startInput = document.getElementById('date-start').value;
    const endInput = document.getElementById('date-end').value;

    if (!startInput || !endInput) {
        alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
        return;
    }
    
    // 날짜 검색 결과도 위쪽에 보여줌
    fetchNews('date', startInput, endInput, 'search-result-container');
    document.getElementById('search-result-section').style.display = 'block';
}

// [6] 결과 그리기 (공통 함수)
function renderResults(data, containerId) {
    const container = document.getElementById(containerId);
    if(!container) return; 
    
    if(containerId === 'search-result-container') {
        const countSpan = document.getElementById('search-count');
        if(countSpan) countSpan.innerText = data.length;
    }
    
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = `<div class="no-result"><span>⚠️</span><br>결과가 없습니다.</div>`;
        return;
    }

    data.forEach(item => {
        // ★★★ [수정 1] JSP에서 보낸 이름표("img")를 정확히 받아야 합니다!
        // DB에 저장된 파일명 (예: news_old.jpg)
        const dbFileName = item.img; 
        
        let imgSrc = '/NewsPaper/image/로고2.png'; // 기본 이미지

        // 파일명이 존재하고 'null' 글자가 아닐 때만 경로 결합
        if (dbFileName && dbFileName !== 'null' && dbFileName.trim() !== '') {
            // ★★★ [수정 2] 파일명 앞에 폴더 경로를 붙여줍니다.
            imgSrc = '/NewsPaper/image/' + dbFileName; 
        }

        // 번역 이미지 (현재 DB에 없으면 빈칸)
        const transSrc = item.trans_img ? item.trans_img : ''; 

        // ★★★ [수정 3] 클릭 시 뷰어로 이동하는 기능 (제목, 날짜 등 데이터 전달)
        // 뷰어 파일명이 NewPaperView.html 인지 newpaperview.html 인지 꼭 확인하세요! (대소문자 중요)
        const viewerPath = "/NewsPaper/newpageview/NewPaperView.html"; 
        
        const cardHTML = `
            <div class="news-card" onclick="openViewer('${imgSrc}', '${transSrc}')">
                <div class="news-thumb">
                    <img src="${imgSrc}" alt="${item.title}" onerror="this.src='/NewsPaper/image/로고2.png'">
                </div>
                <div class="news-info">
                    <p class="page-info">${item.date}</p>
                    <h4>${item.title}</h4>
                    <p class="summary">${item.desc}</p>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

// [7] 뷰어 열기 함수 (수정됨)
// [searchjs.js] 맨 아래 함수 수정

function openViewer(original, translated) {
    // 주소 끝에 '&from=search' 를 추가했습니다!
    const viewerUrl = `/NewsPaper/newpageview/NewPaperView.html?img=${encodeURIComponent(original)}&trans=${encodeURIComponent(translated)}&from=search`;
    
    // 새 탭으로 열기 (혹은 현재 창에서 열기)
    window.open(viewerUrl, '_blank'); 
}
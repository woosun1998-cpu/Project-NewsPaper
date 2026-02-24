// [1] 뉴스 데이터베이스
const newsData = [
    {
        id: 0,
        title: "6.10 만세 운동",
        summary: "순종의 인산일, 학생들이 쏘아 올린 독립의 함성",
        date: "1926.06.10",
        badge: "호외",
        desc: "이 유물은 1926년 6월 10일 항일 만세운동이 일어나기 바로 전날인 6월 9일에 발행된 신문입니다. 대한제국의 마지막 황제, 순종의 인산일(장례식)을 앞두고 무거운 침묵이 감도는 경성의 분위기를 생생하게 전하고 있습니다.",
        img: "/NewsPaper/image/news_old.jpg",
        
        // ★★★ [중요] 뷰어에게 보낼 암호(ID) 추가 ★★★
        viewId: "610"
    },
    {
        id: 1,
        title: "홍커우 공원 의거",
        summary: "도시락 폭탄이 아님을 증명한 윤봉길 의사의 쾌거",
        date: "1932.04.30",
        badge: "긴급",
        desc: "윤봉길 의사가 상하이 홍커우 공원에서 열린 일왕 생일 행사장에 폭탄을 투척하여 일본군 수뇌부를 처단했습니다. 이 사건은 중국인들에게도 큰 감동을 주어 한중 연대 투쟁의 계기가 되었습니다.",
        img: "/NewsPaper/image/윤봉길체포기사1932년05월04일기사.png",
        
        // ★★★ [중요] ★★★
        viewId: "yun"
    },
    {
        id: 2,
        title: "1909년의 기록: 하얼빈의 총성, 여순의 포효",
        summary: "안중근의 당당한 기개, 일제를 압도하다",
        date: "1909.12.03",
        badge: "호외",
        desc: "하얼빈 의거 직후 안중근 의사의 초연한 태도와 여순 감옥에서 이토 히로부미의 15가지 죄목을 당당히 꾸짖는 논리적인 항거 과정을 담은 대한매일신보의 기록입니다.",
        img: [
            "/NewsPaper/image/대한매일신보19091203_2(원본).jpg", 
            "/NewsPaper/image/대한매일신보19091109_3(원본).jpg"
        ],
        
        // ★★★ [중요] ★★★
        viewId: "안중근"
    },
    {
        id: 3,
        title: "안창호 선생 체포",
        summary: "독립운동의 큰 별 도산, 상하이에서 일경에 피체",
        date: "1932.05.01",
        badge: "속보",
        desc: "독립운동의 정신적 지주인 도산 안창호 선생이 윤봉길 의사 의거 직후 상하이 프랑스 조계지에서 일제 경찰에 의해 체포되었습니다. 민족의 스승을 잃을 위기에 처했습니다.",
        img: "/NewsPaper/image/안창호체포기사_1932년5월1일.png",
        
        // (안창호 뷰어 데이터가 없다면 기본값 610으로 연결)
        viewId: "안창호"
    },
    {
        id: 4,
        title: "손기정, 올림픽 제패",
        summary: "슬픈 시상대 위, 가슴의 일장기를 가린 금메달리스트",
        date: "1936.08.09",
        badge: "스포츠",
        desc: "베를린 올림픽 마라톤에서 손기정 선수가 세계 신기록으로 우승했습니다. 그러나 그는 시상대에서 월계수 화분으로 가슴의 일장기를 가리며 망국의 설움을 표현했습니다.",
        img: "/NewsPaper/image/손기정_1936년8월25일기사.png",
        
        viewId: "손기정"
    },
    {
        id: 5,
        title: "이봉창 의사 도쿄 의거",
        summary: "적의 심장부 도쿄에서 일왕을 향해 폭탄을 던지다",
        date: "1932.01.08",
        badge: "긴급",
        desc: "1932년 1월 8일, 일본 제국의 심장부 도쿄 요요기 연병장에서 관병식을 마치고 돌아가는 히로히토 일왕의 행렬을 향해 이봉창 의사가 폭탄을 투척했습니다.",
        img: [
            "/NewsPaper/image/da_3969_e_19320110_1.png",
            "/NewsPaper/image/da_3969_e_19320110_2.png"
        ],
        
        // ★★★ [중요] ★★★
        viewId: "이봉창"
    }
];

let currentIndex = 0;
let currentNewsId = 0; 
const container = document.querySelector('.fan-container');

// [초기화] 카드 생성
function initSlider() {
    if(!container) return;
    container.innerHTML = '';
    
    newsData.forEach((news, index) => {
        const card = document.createElement('div');
        card.className = 'fan-card hidden'; 
        card.onclick = () => selectSlide(index);
        
        const img = document.createElement('img');
        img.src = Array.isArray(news.img) ? news.img[0] : news.img;
        card.appendChild(img);

        const overlay = document.createElement('div');
        overlay.className = 'card-text-overlay';
        
        const title = document.createElement('h3');
        title.className = 'card-title';
        title.innerText = news.title;
        
        const summary = document.createElement('p');
        summary.className = 'card-summary';
        summary.innerText = news.summary;

        overlay.appendChild(title);
        overlay.appendChild(summary);
        card.appendChild(overlay);
        
        container.appendChild(card);
    });
    updateSlider();
}

function changeSlide(direction) {
    if (direction === 'next') currentIndex = (currentIndex + 1) % newsData.length;
    else currentIndex = (currentIndex - 1 + newsData.length) % newsData.length;
    updateSlider();
}

function selectSlide(index) {
    currentIndex = index;
    updateSlider();
}

function updateSlider() {
    const cards = document.querySelectorAll('.fan-card');
    const len = newsData.length;
    
    cards.forEach(c => c.className = 'fan-card hidden');
    cards[currentIndex].className = 'fan-card active';
    cards[(currentIndex - 1 + len) % len].className = 'fan-card prev';
    cards[(currentIndex + 1) % len].className = 'fan-card next';

    if (len > 3) {
        cards[(currentIndex - 2 + len) % len].className = 'fan-card prev-2';
        cards[(currentIndex + 2) % len].className = 'fan-card next-2';
    }

    updateDetail(newsData[currentIndex]);
}

// ★★★ [여기가 문제였습니다!] ★★★
// 기존 코드는 frame.onclick을 썼지만, 이제는 HTML의 링크(a href)를 바꿔줘야 합니다.
function updateDetail(data) {
    document.getElementById('detail-title').innerText = data.title;
    document.getElementById('detail-date').innerText = data.date;
    document.getElementById('detail-desc').innerText = data.desc;
    document.getElementById('detail-badge').innerText = data.badge;
    
    const imgElement = document.getElementById('detail-img');
    imgElement.src = Array.isArray(data.img) ? data.img[0] : data.img;

    currentNewsId = data.id;
    if(typeof loadComments === 'function') {
        loadComments(currentNewsId);
    }

    // ★★★ [링크 주소 갈아끼우기] ★★★
    // data.viewId (예: "yun", "이봉창")를 가져와서 링크 뒤에 붙입니다.
  const linkElement = document.getElementById("view-link");
    if (linkElement && data.viewId) {
        // 고정된 "610" 대신, 현재 슬라이드 데이터의 "viewId"를 사용합니다.
        linkElement.href = "../newpageview/NewPaperView.html?id=" + encodeURIComponent(data.viewId) + "&from=today";
    }
}

function addComment() {
    // 1. 로그인 확인 (GetSession.jsp 이용)
    fetch('/NewsPaper/todaynews/GetSession.jsp')
        .then(response => response.text())
        .then(data => {
            const userId = data.trim();
            
            // 로그인 안 했으면 경고
            if (userId === "" || userId === "null") {
                alert("로그인 한 상태에서 댓글을 달아주세요.");
                return; 
            }

            // 2. 입력 내용 확인
            const commentInput = document.getElementById("comment-input");
            const commentText = commentInput.value.trim();

            if (commentText === "") {
                alert("댓글 내용을 입력해주세요.");
                return;
            }

            // 3. ★ [핵심] 아까 만든 JSP에게 데이터 전송 (AJAX) ★
            // currentNewsId 변수는 news_slider.js 상단에 선언되어 있어야 합니다.
            const params = new URLSearchParams();
            params.append('user_id', userId);
            params.append('news_id', currentNewsId); // 현재 보고 있는 뉴스 ID
            params.append('content', commentText);

            fetch('/NewsPaper/todaynews/comment_process.jsp', {
                method: 'POST',
                body: params
            })
            .then(res => res.text())
            .then(result => {
                const msg = result.trim();
                if(msg === 'success') {
                    alert("댓글이 등록되었습니다!");
                    commentInput.value = ""; // 입력창 비우기
                    // 여기서 댓글 목록 다시 불러오기 함수 호출 (loadComments 등)
                } else if(msg === 'not_login') {
                    alert("로그인 정보가 올바르지 않습니다.");
                } else {
                    alert("오류 발생: " + msg);
                }
            });

        })
        .catch(error => {
            console.error("에러 발생:", error);
            alert("시스템 오류가 발생했습니다.");
        });
}

function loadComments(newsId) {
    const listArea = document.getElementById("comment-list-area");
    if (!listArea) return;

    fetch('/NewsPaper/todaynews/get_comments.jsp?news_id=' + newsId)
        .then(res => res.json())
        .then(data => {
            listArea.innerHTML = ""; // 기존 목록 비우기
            
            if (data.length === 0) {
                listArea.innerHTML = "<p style='color:gray; padding:20px;'>아직 작성된 기록이 없습니다. 첫 기록을 남겨보세요.</p>";
                return;
            }

            data.forEach(comm => {
                // 댓글 HTML 생성 (스타일은 CSS에 맞춰서 꾸며주세요)
                const item = document.createElement("div");
                item.className = "comment-item";
                item.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
                item.style.padding = "15px 0";
                
                item.innerHTML = `
                    <div style="display:flex; justify-content:space-between; color:#00ff9d; font-size:0.9rem; margin-bottom:5px;">
                        <span>${comm.user}</span>
                        <span style="color:gray;">${comm.date}</span>
                    </div>
                    <div style="color:white; font-size:1rem;">
                        ${comm.content}
                    </div>
                `;
                listArea.appendChild(item);
            });
        })
        .catch(err => console.error("댓글 로딩 실패:", err));
}

// (댓글 관련 함수들은 기존과 동일하므로 그대로 두셔도 됩니다)
// ...
// ...

window.onload = initSlider;
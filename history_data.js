// [1] 인물별 데이터베이스 (유지)
const historyData = {
	// 1. 윤봉길
	yun: {
		name: "윤봉길",
		year: "1908 - 1932",
		desc: "1932년 상하이 홍커우 공원 의거를 통해 일제 수뇌부를 타격하고, 전 세계에 우리 민족의 독립 의지를 알린 영웅.",
		video: "/NewsPaper/video/윤봉길.mp4",
		timeline: [
			{
				year: "1908",
				title: "충남 예산 출생",
				desc: "윤봉길 의사는 1908년 충남 예산에서 태어났습니다. 조국 독립의 뜻을 품고 19세에 야학을 세워 농촌 계몽 운동을 시작했습니다."
			},
			{
				year: "1930",
				title: "망명과 다짐",
				desc: "1930년 3월 6일, 가족에게 '장부출가 생불환'이라는 글을 남기고 중국으로 망명하여 김구 선생을 만나 한인애국단에 입단했습니다."
			},
			{
				year: "1932",
				title: "홍커우 공원 의거",
				desc: "1932년 4월 29일, 일왕의 생일 행사장에 물통 폭탄을 던져 시라카와 대장 등 일본군 수뇌부를 처단했습니다."
			},
			{
				year: "순국",
				title: "가나자와 순국",
				desc: "12월 19일, 일본 가나자와 미육군 공병 작업장에서 총살형으로 순국,의거 직후 체포되어 가혹한 고문을 받았으며, 25세의 나이로 일본 가나자와에서 총살형으로 순국하셨습니다.",
			}
		]
	},

	// 2. 이봉창
	lee: {
		name: "이봉창",
		year: "1900 - 1932",
		desc: "적의 심장부인 도쿄에서 일왕 히로히토에게 폭탄을 투척하여 대한의 독립 의지를 만천하에 알린 영웅.",
		video: "/NewsPaper/video/이봉창.mp4",
		videoPos: "center 0%",
		timeline: [
			{
				year: "1900",
				title: "서울 용산 출생",
				desc: "1900년 8월 10일, 서울 용산에서 태어났으며 일제 치하에서 일본인 상점 점원, 철도원 등으로 일하며 극심한 차별을 겪고 독립운동을 결심했습니다."
			},
			{
				year: "1931",
				title: "한인애국단 입단",
				desc: "상하이 임시정부를 찾아가 김구 선생을 만났습니다. '제 나이 서른하나입니다. 쾌락은 맛볼 만큼 맛보았습니다. 영원한 쾌락을 위해 목숨을 바치겠습니다.'라고 맹세했습니다."
			},
			{
				year: "1932",
				title: "사쿠라다문 의거",
				desc: "1932년 1월 8일, 도쿄 요요기 연병장에서 관병식을 마치고 돌아가는 일왕 히로히토를 향해 사쿠라다문 앞에서 수류탄을 던졌으나 아쉽게도 명중하지 못했습니다."
			},
			{
				year: "순국",
				title: "이치가야 형무소 순국",
				desc: "현장에서 체포된 후 비공개 재판을 거쳐 사형을 선고받았고, 1932년 10월 10일 이치가야 형무소에서 순국하셨습니다."
			}
		]
	},

	// 3. 안중근
	an: {
		name: "안중근",
		year: "1879 - 1910",
		desc: "하얼빈 역에서 침략의 원흉 이토 히로부미를 처단하고 동양 평화를 외친 대한의군 참모중장.",
		video:"/NewsPaper/video/안중근.mp4",
		videoPos:"center 15%",
		timeline: [
			{
				year: "1879",
				title: "출생",
				desc: "황해도 해주에서 태어나다."

			},
			{
				year: "1897",
				title: "천주교 입교",
				desc: "세례명 '도마(Thomas)'를 받고 신학문과 서구 사상을 접하다."

			},
			{
				year: "1906",
				title: "육영 사업 (학교 설립)",
				desc: "전 재산을 털어 삼흥학교와 돈의학교를 세우고 민족의 인재를 양성하다. (계몽 운동)"

			},
			{
				year: "1907",
				title: "연해주 망명 및 의병 창설",
				desc: "교육만으로는 나라를 구할 수 없음을 깨닫고 러시아 연해주로 망명, 대한의군 참모중장이 되어 무장 투쟁을 시작하다."

			},
			{
				year: "1909",
				title: "단지동맹",
				desc: "동지 11명과 함께 왼손 약지를 끊어 독립을 맹세하다."

			},
			{
				year: "1909",
				title: "하얼빈 의거",
				desc: "10월 26일, 하얼빈 역에서 이토 히로부미 저격 1909년 10월 26일 오전 9시 30분, 하얼빈 역에 도착한 이토 히로부미를 향해 총탄 3발을 명중시키고 '코레아 우라!(대한 만세)'를 외쳤습니다."
			},
			{
				year: "1910",
				title: "뤼순 감옥 순국",
				desc: "3월 26일, 뤼순 감옥에서 순국. 사형 선고를 받고도 당당함을 잃지 않았으며, '동양평화론'을 저술하던 중 1910년 3월 26일 순국하셨습니다."
			}
		]
	},

	// 4. 유관순
	yu: {
		name: "유관순",
		year: "1902 - 1920",
		desc: "아우내 장터의 만세 소리, 서대문 형무소의 별이 되다.",
		video: "/NewsPaper/video/유관순.mp4",
		timeline: [
			{
				year: "1902",
				title: "출생",
				desc: "충남 천안에서 기독교 신앙과 민족의식이 투철한 가정의 둘째 딸로 태어나다.",

			},
			{
				year: "1916",
				title: "이화학당 입학",
				desc: "선교사의 소개로 서울 이화학당(현 이화여고)에 입학하여 신학문을 배우며 조국애와 민족의식을 키우다.",

			},
			{
				year: "1919",
				title: "서울 3·1 만세 운동 참여",
				desc: "3·1 운동이 발발하자 이화학당 학생들과 결사대를 조직하여 서울 학생 만세 시위에 적극적으로 뛰어들다. (이후 일제의 휴교령으로 고향 천안으로 향함)",

			},
			{
				year: "1920",
				title: "서대문 형무소 순국",
				desc: "9월 28일, 모진 고문 끝에 옥중 순국 . 체포되어 서대문 형무소에 수감된 후에도 옥중에서 만세를 불렀으며, 일제의 모진 고문 후유증으로 1920년 9월 28일 꽃다운 나이에 순국",

			}
		]
	},

	// 나머지 인물
	kim: {
		name: "김 구", year: "1876 - 1949", desc: "대한민국 임시정부의 영원한 주석 분단을 넘어 완전한 통일 국가를 꿈꾼 거목", video: "/NewsPaper/video/김구.mp4",
		timeline: [
			{
				year: "1876",
				title: "출생",
				desc: "황해도 해주에서 태어났습니다. 어릴 적 이름은 창암이라 불렸습니다.",
			},

			{
				year: "1896",
				title: "치하포 의거",
				desc: "명성황후 시해에 대한 분노로, 황해도 치하포에서 일본인을 처단하고 국모의 원수를 갚습니다.",
			},

			{
				year: "1919",
				title: "대한민국 임시정부 참여",
				desc: "3·1 운동 직후 상하이로 망명하여 임시정부의 경무국장(초대 경찰청장)으로 취임, 이후 주석에 오르며 독립운동을 이끌었습니다.",
			},

			{
				year: "1931",
				title: "한인애국단 창설",
				desc: "침체된 독립운동에 불씨를 당기기 위해 특무 조직인 '한인애국단'을 조직하고 이봉창, 윤봉길 의사의 거사를 준비합니다.",
			},

			{
				year: "1940",
				title: "한국광복군 창설",
				desc: "충칭에서 대한민국 임시정부의 정규군인 '한국광복군'을 창설하여 대일 선전포고를 하고 무장 투쟁을 전개합니다.",
			},

			{
				year: "1945",
				title: "광복",
				desc: "광복을 맞아 11월에 임시정부 요인들과 함께 꿈에 그리던 조국 땅을 다시 밟습니다.",
			},
			
			{
				year: "1947",
				title: "경교장 김구 선생 서거",
				desc: "통일된 완전한 자주독립 국가를 세우기 위해 헌신하던 중, 서울 경교장에서 안두희에게 흉탄에 맞아 서거합니다.",
			}



		]
	},
	ahn: { name: "안창호", year: "1878 - 1938", desc: "민족의 스스로의 힘을 기른 겨레의 영원한 스승 행동하는 양심으로 독립의 기초를 다지다", video: "/NewsPaper/video/안창호.mp4",
	 timeline: [
		{
				year: "1878",
				title: "출생",
				desc: "평안남도 강서에서 태어납니다.",
			},
			
			{
				year: "1907",
				title: "신민회 결성 및 대성학교 설립",
				desc: "미국에서 귀국 후 비밀 결사 조직인 '신민회'를 창립하고, 평양에 대성학교를 세워 민족의 인재를 길러냈습니다.",
			},
			
			{
				year: "1913",
				title: "흥사단 창설",
				desc: "미국 샌프란시스코에서 '무실역행'과 '충의용감'을 바탕으로 민족의 지도자를 양성할 청년 단체 '흥사단'을 조직합니다.",
			},
			
			{
				year: "1919",
				title: "대한민국 임시정부의 주춧돌",
				desc: "3·1 운동 직후 상하이로 건너가 임시정부의 내무총장 및 국무총리 서리로 취임하며, 흩어져 있던 독립운동 단체들의 통합 체계를 만들었습니다",
			},
			
			{
				year: "1932",
				title: "훙커우 공원 의거 직후 체포",
				desc: "윤봉길 의사의 폭탄 투척 거사 직후 일제 경찰에 불법으로 체포되어, 국내로 압송된 후 모진 옥고를 치릅니다.",
			},
			
			{
				year: "1938",
				title: "순국",
				desc: "거듭된 수감 생활과 고문으로 얻은 병환이 악화되어, 조국의 광복을 보지 못한 채 눈을 감습니다.",
			},
			
		
		
	] },
	sohn: { name: "손기정", year: "1912 - 2002", desc: "가슴의 일장기를 지우고, 조국의 이름을 심다. 빼앗긴 나라의 슬픔을 안고 42.195km를 달린 영웅", video: "/NewsPaper/video/손기정.mp4", 
	timeline: [
		{
				year: "1912",
				title: "출생",
				desc: "평안북도 신의주에서 태어났습니다.",
			},
			
			{
				year: "1936",
				title: "베를린 올림픽 금메달",
				desc: "올림픽 마라톤에서 세계 신기록으로 우승하다. 하지만 시상대에서 가슴에 단 일장기를 묘목으로 가린 채 고개를 숙여야 했고, 이는 민족의 슬픔과 분노를 깨운 '일장기 말소 사건'으로 이어졌습니다.",
			},
			
			{
				year: "1947",
				title: "보스턴 마라톤 우승",
				desc: "광복 후, 태극기를 달고 출전한 서윤복 선수의 보스턴 마라톤 세계 제패를 감독으로서 이끌며 조국에 벅찬 승전보를 전합니다.",
			},
			
			{
				year: "1948",
				title: "런던 올림픽 기수",
				desc: "대한민국 정부 수립 후 처음으로 출전한 런던 올림픽 개막식에서, 마침내 가슴에 태극기를 품고 대한민국 선수단 기수로 입장합니다.",
			},
			{
				year: "1988",
				title: "서울 올림픽 성화 봉송",
				desc: "76세의 노구로 가슴에 온전한 태극기를 단 채 서울 올림픽 개막식 성화 주자로 경기장을 감격스럽게 달립니다.",
			},
			{
				year: "2002",
				title: "타계",
				desc: "한국 마라톤의 영원한 영웅으로 남은 채 세상을 떠납니다.",
			},
		
		
		
	] }
};


// [2] 초기화 및 카드 회전 로직 (유지)
const cardContainer = document.querySelector('.hero-selection-container');
let cards = document.querySelectorAll('.hero-card');
let currentIndex = 0;

function updateCards() {
    cards.forEach((card, index) => {
        card.className = 'hero-card hidden';
        card.onclick = null;

        if (index === currentIndex) {
            card.className = 'hero-card center';
            card.onclick = () => enterProfile(card.getAttribute('data-id'));
        }
        else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.className = 'hero-card left-pos';
            card.onclick = () => rotateCards('left');
        }
        else if (index === (currentIndex + 1) % cards.length) {
            card.className = 'hero-card right-pos';
            card.onclick = () => rotateCards('right');
        }
    });
}

function rotateCards(direction) {
    if (direction === 'right') {
        currentIndex = (currentIndex + 1) % cards.length;
    } else {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }
    updateCards();
}

// [3] 프로필 페이지 진입 로직 (★ 비디오 재생 로직 복구 완료)
function enterProfile(id) {
    const data = historyData[id];

    if (!data) {
        alert("해당 인물의 데이터는 준비 중입니다.");
        return;
    }

    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.getElementById('section-profile').scrollIntoView({ behavior: 'smooth' });

    document.getElementById('dynamic-name').innerText = data.name;
    document.getElementById('dynamic-year').innerText = data.year;
    document.getElementById('dynamic-desc').innerText = data.desc;

    if (data.bg) {
        document.getElementById('dynamic-bg').style.backgroundImage = `url('${data.bg}')`;
    } else {
        document.getElementById('dynamic-bg').style.backgroundImage = 'none';
    }

    // ★ 누락되었던 비디오 교체 및 재생 로직 ★
   const videoPlayer = document.getElementById('dynamic-video');
    if (data.video) {
        videoPlayer.src = data.video;
        
        // ★★★ 각하, 바로 이 줄이 빠져 있었습니다! 이 줄이 비디오 위치를 옮겨줍니다! ★★★
        videoPlayer.style.objectPosition = data.videoPos ? data.videoPos : "center center";
        
        videoPlayer.style.display = "block";
        videoPlayer.load();
        videoPlayer.play().catch(e => console.log("비디오 재생 실패:", e));
    } else {
        videoPlayer.src = "";
        videoPlayer.style.display = "none";
    }

    // 타임라인 그리기
    createTimeline(data);
}


// [4] 타임라인 생성 함수 (★ 에러 유발 우측 리스트 코드 삭제 완료)
function createTimeline(data) {
    const timelineContainer = document.getElementById('dynamic-timeline-area');
    timelineContainer.innerHTML = '';
    document.getElementById('dynamic-timeline-title').innerText = data.name + " 타임라인";

    if (!data.timeline || data.timeline.length === 0) {
        timelineContainer.innerHTML = '<p style="color:gray; margin-top:50px; text-align:center;">등록된 타임라인 정보가 없습니다.</p>';
        return;
    }

    data.timeline.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'timeline-item';
        // 모달창 연결 (선택사항, 필요없으면 주석 처리)
        // card.onclick = () => openModal(item); 
        // card.style.cursor = "pointer";

        card.innerHTML = `
            <div class="timeline-year-box">
                <span class="timeline-year-text">${item.year}</span>
            </div>
            <div class="timeline-node"></div>
            <div class="timeline-content-box">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `;
        timelineContainer.appendChild(card);
    });

    if (typeof observeTimelineItems === "function") {
        observeTimelineItems();
    }
}

function scrollToTimeline() {
    document.getElementById('section-timeline').scrollIntoView({ behavior: 'smooth' });
}

// 초기 실행
window.onload = updateCards;
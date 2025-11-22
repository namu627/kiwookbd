// 모달 엘리먼트 가져오기
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const bookElement = document.querySelector('.book');

// --- 사진첩 슬라이더 데이터 및 로직 ---

// 이미지 데이터: 실제 사진 URL로 교체해주세요! (placeholder 사용)
const albumImages = [
    { url: "photo/pt1.jpg", caption: "2001년 6월 27일 오후 1시 22분. 엄마와의 첫 만남" },
    { url: "photo/pt2.jpg", caption: "2018년 대천해수욕장 여행" },
    { url: "photo/pt3.jpg", caption: "2018년 보정동 카페에서" },
    { url: "photo/pt4.jpg", caption: "엄마랑 영화관" },
    { url: "photo/pt5.jpg", caption: "2018년 제주도 여행" },
    { url: "photo/pt6.jpg", caption: "남유찬 사춘기 날려버리기" },
    { url: "photo/pt7.jpg", caption: "함덕해수욕장 델문도 카페에서" },
    { url: "photo/pt8.jpg", caption: "2021년 가족여행" },
    { url: "photo/pt9.jpg", caption: "엄마가 아들 다리에 낙서함" },
    { url: "photo/pt10.jpg", caption: "훈련소 끝나고 잠깐 면회할 때.." },
    { url: "photo/pt11.jpg", caption: "어느새 상병달고 속초여행" },
    { url: "photo/pt12.jpg", caption: "부산 껍데기 맛집" },
    { url: "photo/pt13.jpg", caption: "결혼식장에서 한컷" },
];
let currentSlideIndex = 0;

/**
 * 슬라이드를 지정된 인덱스로 표시합니다.
 * @param {number} n 표시할 슬라이드의 인덱스.
 */
function showSlide(n) {
    if (albumImages.length === 0) return;

    // 인덱스가 배열 범위를 벗어나면 루프 (마지막 -> 처음, 처음 -> 마지막)
    if (n >= albumImages.length) {
        currentSlideIndex = 0;
    } else if (n < 0) {
        currentSlideIndex = albumImages.length - 1;
    } else {
        currentSlideIndex = n;
    }

    const image = albumImages[currentSlideIndex];
    
    // 슬라이더 컨테이너를 찾아 이미지와 캡션을 업데이트
    const sliderContainer = document.getElementById('image-slider');
    if (sliderContainer) {
        sliderContainer.innerHTML = `
            <img src="${image.url}" alt="${image.caption}" class="slider-image" 
                 onerror="this.onerror=null; this.src='https://placehold.co/800x600/808080/FFFFFF?text=사진+로드+실패';" />
            <div class="caption">${image.caption}</div>
        `;
    }
    
    // 페이지 번호 업데이트
    const pageIndicator = document.getElementById('slide-page-indicator');
    if (pageIndicator) {
        pageIndicator.textContent = `${currentSlideIndex + 1} / ${albumImages.length}`;
    }
}

// 다음 슬라이드로 이동
function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

// 이전 슬라이드로 이동
function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

// --- 기존 모달 함수 ---

// 모달 열기 함수
function openModal(content) {
    modalBody.innerHTML = content;
    modal.style.display = "block";
}

// 모달 닫기 함수
function closeModal() {
    modal.style.display = "none";
    // 책이 열려있다면 닫기
    bookElement.classList.remove('open'); 
    // 모달 내용 비우기
    modalBody.innerHTML = '';
    // 인덱스 초기화 (선택 사항)
    currentSlideIndex = 0;
}

// 1. 편지 봉투 클릭 이벤트
function openLetter() {
    const letterContent = `
        <h3>To. 어머니</h3>
        <p>엄마, 생신 진심으로 축하드려요!</p>
        <p>요즘 엄마 보면 참 존경스럽고, 한편으로는 마음이 쓰여요. 평일엔 회사 다니느라 바쁘고, 쉬는 날엔 외할머니 간호하러 다니느라 쉴 틈이 없잖아요. 
        고생하는 엄마 뒷모습을 볼 때마다 '우리 엄마 참 강한 사람이구나' 싶다가도, 혹여나 엄마 건강까지 상할까 봐 걱정이 많이 돼요.
        몸도 고단하실 텐데 외할머니 때문에 마음까지 많이 힘들어하시는 걸 보면, 제가 곁에서 해드릴 수 있는 게 별로 없는 것 같아 죄송한 마음이 듭니다.</p>
        <p>오늘은 외할머니 생각에 마음 한구석이 여전히 무겁겠지만, 그래도 오늘만큼은 엄마가 주인공이니까 조금이라도 웃을 수 있는 하루가 됐으면 좋겠어요.</p>
        <p>표현은 서툴러도 항상 엄마를 응원하고 있습니다. 건강 잘 챙기세요. 엄마는 혼자가 아니니까 너무 힘들어하지 마세요. 생신 진심으로 축하드려요.</p>
        <br>
        <p>- From. 남유찬 -</p>
    `;
    openModal(letterContent);
}

// 2. 책 (사진첩) 클릭 이벤트 - 슬라이더 구현
function openBook() {
    // 책 3D 열림/닫힘 애니메이션 토글
    bookElement.classList.toggle('open'); 

    if (bookElement.classList.contains('open')) {
        // 슬라이더 HTML 구조를 모달에 삽입
        const albumContent = `
            <h3 class="album-title">📷 추억의 사진첩</h3>
            <div class="slider-wrapper">
                <button class="prev-button" onclick="prevSlide()">&#10094;</button>
                <div id="image-slider" class="image-slider">
                    <!-- 이미지는 showSlide() 함수에서 로드됩니다 -->
                </div>
                <button class="next-button" onclick="nextSlide()">&#10095;</button>
            </div>
            <div id="slide-page-indicator" class="page-indicator"></div>
            <p class="guide-text">화살표를 눌러 사진을 넘겨보세요</p>
        `;
        
        // 책을 클릭할 때 모달이 열리도록 잠시 딜레이를 주어 애니메이션 감상
        setTimeout(() => {
            openModal(albumContent);
            showSlide(currentSlideIndex); // 첫 슬라이드 로드 및 초기화
        }, 500); 
    } else {
        closeModal();
    }
}

// 3. 캠코더 클릭 이벤트
function playVideo() {
    const videoContent = `
        <h3>🎥 엄마에게 보내는 영상 편지</h3>
        <p><strong>[여기에 실제 영상 링크를 넣어주세요!]</strong></p>
        <iframe width="100%" height="315" 
            src="YOUR_YOUTUBE_LINK" 
            title="엄마 생신 축하 영상" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
        <p>영상을 준비하지 않으셨다면 이 공간에 축하 메시지나 음성 녹음 파일 링크를 넣어주셔도 좋습니다.</p>
    `;
    openModal(videoContent);
    
    // **팁:** 'YOUR_YOUTUBE_LINK' 부분을 실제 YouTube 영상의 "공유 > 퍼가기" 코드를 사용해 변경해주세요.
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
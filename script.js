const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const bookElement = document.querySelector('.book');

const albumImages = [
    { url: "photo/pt1.jpg", caption: "2001년 6월 27일 오후 1시 22분. 엄마와의 첫 만남" },
    { url: "photo/pt2.jpg", caption: "2018년 대천해수욕장 여행" },
    { url: "photo/pt3.jpg", caption: "2018년 보정동 카페에서" },
    { url: "photo/pt4.jpg", caption: "엄마랑 영화관" },
    { url: "photo/pt5.jpg", caption: "2018년 제주도 여행" },
    { url: "photo/pt6.jpg", caption: "남유찬 사춘기 날려버리기" },
    { url: "photo/pt7.jpg", caption: "함덕해수욕장 델문도 카페에서" },
    { url: "photo/pt8.jpg", caption: "2021년 가족여행" },
    { url: "photo/pt9.jpg", caption: "아들 다리에 낙서" },
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

    if (n >= albumImages.length) {
        currentSlideIndex = 0;
    } else if (n < 0) {
        currentSlideIndex = albumImages.length - 1;
    } else {
        currentSlideIndex = n;
    }

    const image = albumImages[currentSlideIndex];
    
    const sliderContainer = document.getElementById('image-slider');
    if (sliderContainer) {
        sliderContainer.innerHTML = `
            <img src="${image.url}" alt="${image.caption}" class="slider-image" 
                 onerror="this.onerror=null; this.src='https://placehold.co/800x600/808080/FFFFFF?text=사진+로드+실패';" />
            <div class="caption">${image.caption}</div>
        `;
    }
    
    const pageIndicator = document.getElementById('slide-page-indicator');
    if (pageIndicator) {
        pageIndicator.textContent = `${currentSlideIndex + 1} / ${albumImages.length}`;
    }
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}


function openModal(content) {
    modalBody.innerHTML = content;
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    bookElement.classList.remove('open'); 
    modalBody.innerHTML = '';
    currentSlideIndex = 0;
}

function openLetter() {
    const letterContent = `
        <h3>To. 어머니</h3>
        <p>엄마, 생신 진심으로 축하드려요!</p>
        <p>요즘 엄마 보면 참 존경스럽고, 한편으로는 마음이 쓰여요. 평일엔 회사 다니느라 바쁘고, 쉬는 날엔 외할머니 걱정에 마음이 편치 않으신 것 같아서요.</p>
        <p>고생하는 엄마 뒷모습을 볼 때마다 '우리 엄마 참 강한 사람이구나' 싶다가도, 엄마 건강까지 상할까 봐 걱정이 많이 돼요.</p>
        <p>몸도 고단하실 텐데 외할머니 때문에 마음까지 많이 힘들어하시는 걸 보면, 제가 곁에서 해드릴 수 있는 게 별로 없는 것 같아 죄송한 마음이 듭니다.</p>
        <p>오늘은 외할머니 생각에 마음 한구석이 여전히 무겁겠지만, 그래도 오늘만큼은 엄마가 주인공이니까 조금이라도 웃을 수 있는 하루가 됐으면 좋겠어요.</p>
        <p>표현은 서툴러도 항상 엄마를 응원하고 있습니다. 건강 잘 챙기세요.</p>
        <p>생신 진심으로 축하드려요.</p>
        <br>
        <p>2025년 11월 26일 - From. 남유찬 -</p>
    `;
    openModal(letterContent);
}

function openBook() {
    bookElement.classList.toggle('open'); 

    if (bookElement.classList.contains('open')) {
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
        
        setTimeout(() => {
            openModal(albumContent);
            showSlide(currentSlideIndex);
        }, 500); 
    } else {
        closeModal();
    }
}

function playVideo() {
    const videoContent = `
        <h3>🎥 수상한 아빠 발견..?</h3>
        <iframe width="100%" height="400vw" 
            src="https://www.youtube.com/embed/hemEypeu-jw?si=s2cEanVPA_810dyn" 
            title="엄마 생신 축하 영상" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
    openModal(videoContent);
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

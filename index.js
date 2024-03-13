const images = [
    // 이미지 URL을 여기에 추가하세요. 예시:
    'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg',
    'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg',
    'image9.jpg', 'image10.jpg', 'image11.jpg', 'image12.jpg',
    'image13.jpg', 'image14.jpg', 'image15.jpg', 'image16.jpg',
];

let currentRound = [...images]; // 현재 라운드의 이미지 배열 복사
let nextRound = []; // 다음 라운드 이미지 저장

function displayImages(images) {
    const container = document.getElementById('imageContainer');
    container.innerHTML = ''; // 이전 이미지 제거
    images.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = `이미지 ${index + 1}`;
        imgElement.addEventListener('click', () => selectImage(image));
        container.appendChild(imgElement);
    });
}

function selectImage(selectedImage) {
    nextRound.push(selectedImage);
    if (currentRound.length % 2 === 0) { // 첫 번째 이미지 선택 후 바로 삭제하지 않음
        updateRound();
    }
}

function updateRound() {
    if (currentRound.length === 1) { // 최종 우승자
        document.getElementById('imageContainer').style.display = 'none';
        const winnerSection = document.getElementById('winner');
        document.getElementById('winnerImage').src = currentRound[0];
        winnerSection.style.display = 'block';
    } else if (currentRound.length === 0) {
        currentRound = [...nextRound]; // 다음 라운드 설정
        nextRound = [];
        displayImages(currentRound);
    }
}

displayImages(currentRound); // 초기 이미지 표시

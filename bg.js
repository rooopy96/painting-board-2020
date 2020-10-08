const body = document.querySelector("body")
const IMG_COUNT = 3

function paintBg(num){
	const bgImg = new Image();
	bgImg.src = `images/${num + 1}.jpg`
	body.appendChild(bgImg);
}

function getRanNum(){
	return Math.floor(Math.random() * 3);
}

function init(){
	getRanNum();
	paintBg(getRanNum());
}

init();
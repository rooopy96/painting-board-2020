const canvas = document.querySelector("#jsCanvas");
const canvasShape = document.getElementsByClassName("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementsByClassName("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = canvasShape[0].offsetWidth;
canvas.height = canvasShape[0].offsetHeight;

ctx.lineWidth = 5;
ctx.strokeStyle = "black";
ctx.fillStyle = "black";

let painting = false;
let filling = false;


function handlePaintMode(){
	if(filling === true) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
}

function handleRange(event){
	const value = event.target.value;

	ctx.lineWidth = value;
}

function handleColorClick(event){
	const color = event.target.style.backgroundColor;

	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleFillColor(){
	if(filling){
		ctx.fillRect(0, 0, 2000, 2000);
	}
}

function startPainting(){
	painting = true;
}

function stopPainting(){
	painting = false;
}

function onMouseMove(event){
	let x = event.offsetX;
	let y = event.offsetY;

	if(!painting){
		ctx.beginPath();
		ctx.moveTo(x, y);
	}	else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function handleSaveBtn(){
	const img = canvas.toDataURL("image/png");
	const link = document.createElement("a");

	link.href = img;
	link.download = "paintJS";
	link.click();
}

if(canvas){
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleFillColor);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(range){
	addEventListener("input", handleRange)
}

if(mode) {
	mode.addEventListener("click", handlePaintMode);
}

if(save) {
	save.addEventListener("click", handleSaveBtn)
}
var localw,localh,localurl,local_offset_top=45;
var imageObj;

function drawImgOnCanvas(){
    console.log("Image loading completed, drawing on canvas");
	var w=localw;
	var h=localh;

	var canvas = document.getElementById('cnv');
	var ctx = canvas.getContext('2d');
	canvas.width=w;
	canvas.height=h;

	// fix cases in which the user has incorrectly configured the plugin and
	// the drawImage call likely spit out an unknown error. Should save us hours of debugging.
	if(local_offset_top > imageObj.height-h) {
		local_offset_top = imageObj.height-h;
	}
	ctx.drawImage(imageObj,0,local_offset_top,w,h,0,0,w,h);
	return true;
};

function drawImgOnCanvas_debug(){
    console.log("Image loading completed, drawing on canvas");
	var w=imageObj.width;
	var h=imageObj.height;

	var canvas = document.getElementById('cnv');
	var ctx = canvas.getContext('2d');
	canvas.width=w;
	canvas.height=h;

	// fix cases in which the user has incorrectly configured the plugin and
	// the drawImage call likely spit out an unknown error. Should save us hours of debugging.
	if(local_offset_top > imageObj.height-h) {
		local_offset_top = imageObj.height-h;
	}
	alert(ctx.drawImage(imageObj,0,0,w,h,0,0,w,h) ? "Errori in stampa" : "Nessun errore");
	return true;
};

function setScreenshotUrl(url,w,h,offset_top) {
    document.getElementById('title').value=localStorage["title"] ? localStorage["title"] : "";

	localw=w+1-1-340;
	localh=h+1-1;
	localurl=url;
	local_offset_top=offset_top+1-1;
	var canvas = document.getElementById('cnv');
  	imageObj = new Image();
	imageObj.onload = drawImgOnCanvas;
	imageObj.src = url;
};

document.getElementById("print_button").onclick=function(e) { window.print(); };


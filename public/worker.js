// worker.js
self.addEventListener('message', function (e) {
	console.log('WORKERMESSAGE', e);
	const canvas = self.document.createElement('canvas');
	const { media } = e;
    const video = self.document.getElementById("camvideo")
	const video_width = media.settings.width;
	const video_height = media.settings.height;
	const to_width = window.innerWidth;
	const to_height = Math.floor((to_width * video_height) / video_width); //window.innerHeight;
	const ratio = media.settings.aspectRatio;
	const scaleRatioY = to_height / video_height;
	const scaleRatioX = to_width / video_width;
	canvas.width = video_width; //media.settings.width; //window.innerWidth;
	canvas.height = video_height; //media.settings.height; //window.innerHeight;
	canvas.style.width = `${to_width}px`;
	canvas.style.height = `${to_height}px`;
	const ctx = canvas.getContext('2d');

	// ctx.scale(scaleRatioX, scaleRatioY);
	ctx.drawImage(video, 0, 0);

	const url = canvas.current.toDataURL('image/png');
	const download = document.createElement('a');

	// photo.current.setAttribute('src', url);
	download.current.href = url;
	download.current.download = 'MyPhoto.png';
	download.current.click();
	//
	window.URL.revokeObjectURL(url);
	// code to be run
});

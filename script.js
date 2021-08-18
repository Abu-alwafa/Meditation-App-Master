const app = () => {
	const outLine = document.querySelector('.moving-outline circle');
	const play = document.querySelector('.play');
	const song = document.querySelector('.song');
	const video = document.querySelector('.vid-container video');
	const timeDisplay = document.querySelector('.time-display');
	const timeSelect = document.querySelectorAll('.time-select button');
	const sounds = document.querySelectorAll('.sound-picker button');
	outLineLength = outLine.getTotalLength();
	// Duration
	let fakeDuration = 600;
	outLine.style.strokeDasharray = outLineLength;
	outLine.style.strokeDashoffset = outLineLength;

	// change the sound
	sounds.forEach((sound) => {
		sound.addEventListener('click', function() {
			song.src = this.getAttribute('data-sound');
			video.src = this.getAttribute('data-video');
			checkPlaying(song);
		});
	});

	// Play sound
	play.addEventListener('click', () => {
		checkPlaying(song);
	});
	// select time of the sound
	timeSelect.forEach((option) => {
		option.addEventListener('click', function() {
			fakeDuration = this.getAttribute('data-time');
			timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
		});
	});
	// function for play and stop sound
	const checkPlaying = (song) => {
		if (song.paused) {
			song.play();
			video.play();
			play.src = 'svg/pause.svg';
		} else {
			song.pause();
			video.pause();
			play.src = 'svg/play.svg';
		}
	};
	// animate the circle
	song.ontimeupdate = () => {
		let currentTime = song.currentTime;
		let elapsed = fakeDuration - currentTime;
		let seconds = Math.floor(elapsed % 60);
		let minutes = Math.floor(elapsed / 60);

		let progress = outLineLength - currentTime / fakeDuration * outLineLength;
		outLine.style.strokeDashoffset = progress;
		// animate the text
		timeDisplay.textContent = `0${minutes}:${seconds}`;

		if (currentTime >= fakeDuration) {
			song.pause();
			song.currentTime = 0;
			play.src = 'svg/play.svg';
			video.pause();
		}
	};
};
app();

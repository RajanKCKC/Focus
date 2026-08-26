export default function () {
	let audioCtx = null

	function getAudioContext() {
		if (!audioCtx) {
			const AudioContextClass = window.AudioContext || window.webkitAudioContext
			if (AudioContextClass) {
				audioCtx = new AudioContextClass()
			}
		}
		if (audioCtx && audioCtx.state === 'suspended') {
			audioCtx.resume()
		}
		return audioCtx
	}

	const forestAudio = new Audio('https://cdn.hackclub.com/01a03e8a-27f1-7693-b40a-1fe3a11ac236/forest.wav')
	const coffeeAudio = new Audio('https://cdn.hackclub.com/01a03e8a-2167-7a10-80a7-62902136ed75/coffee.wav')
	const rainAudio = new Audio('https://cdn.hackclub.com/01a03e8a-2cc3-775a-bd18-d724eb645e26/rain.wav')
	const fireAudio = new Audio('https://cdn.hackclub.com/01a03e8a-24de-7c28-8614-54abdcaf003a/fire.wav')

	forestAudio.loop = true
	coffeeAudio.loop = true
	rainAudio.loop = true
	fireAudio.loop = true

	function pressButton() {
		try {
			const ctx = getAudioContext()
			if (!ctx) return
			const osc = ctx.createOscillator()
			const gain = ctx.createGain()
			osc.type = 'sine'
			osc.frequency.setValueAtTime(520, ctx.currentTime)
			osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.05)
			gain.gain.setValueAtTime(0.18, ctx.currentTime)
			gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
			osc.connect(gain)
			gain.connect(ctx.destination)
			osc.start()
			osc.stop(ctx.currentTime + 0.06)
		} catch (err) {
			// Audio context playback error handling
		}
	}

	function timeEnd() {
		try {
			const ctx = getAudioContext()
			if (!ctx) return
			const melody = [659.25, 783.99, 987.77, 1318.51]
			melody.forEach((freq, idx) => {
				const osc = ctx.createOscillator()
				const gain = ctx.createGain()
				const startTime = ctx.currentTime + idx * 0.15
				osc.type = 'triangle'
				osc.frequency.setValueAtTime(freq, startTime)
				gain.gain.setValueAtTime(0.25, startTime)
				gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4)
				osc.connect(gain)
				gain.connect(ctx.destination)
				osc.start(startTime)
				osc.stop(startTime + 0.45)
			})
		} catch (err) {
			// Audio context playback error handling
		}
	}

	function playAudio(sound, card) {
		const isActive = card.classList.contains('active')
		if (isActive) {
			sound.play().catch(() => { })
		} else {
			sound.pause()
		}
	}

	function adjustVolume(sound, volume) {
		sound.volume = Number(volume)
	}

	return {
		pressButton,
		timeEnd,
		playAudio,
		adjustVolume,
		forestAudio,
		coffeeAudio,
		rainAudio,
		fireAudio
	}
}

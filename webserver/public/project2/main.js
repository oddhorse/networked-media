/* church
	by john trinh
	main.js */

window.onload = () => {
	// DEMO/TEST BUTTONS
	const demoRingBtn = document.getElementById("demo-ring-btn")
	const demoRingTwiceBtn = document.getElementById("demo-ring-twice-btn")
	const demoRingSixBtn = document.getElementById("demo-ring-six-btn")

	const bell = new Audio('bell.mp3')
	const church = document.getElementById("church")
	const time = document.getElementById("time")
	let ringsRemaining = 0

	// RECURSIVE BELL HANDLING
	// not biggest recursive fan in the world but simplest way i know to handle the timed nature

	/**
	 * starts church bell ringing number of times.
	 * @param {number} count number of times it plays
	 */
	function ringChurchBell(count) {
		ringsRemaining = count - 1 // decrements right before bell plays so we can catch it at 0
		console.log(`ringing ${count} times!`)
		bell.play()
	}

	function ringChurchBellAgain() {
		if (ringsRemaining === 0) {
			console.log("ringing done!")
			return
		}
		console.log("ringing again!")
		ringsRemaining--
		bell.play()
	}

	bell.addEventListener("ended", (event) => {
		console.log("bell done")

		ringChurchBellAgain()
	})

	demoRingBtn.addEventListener("click", () => {
		ringChurchBell(1)
	})

	demoRingTwiceBtn.addEventListener("click", () => {
		ringChurchBell(2)
	})

	demoRingSixBtn.addEventListener("click", () => {
		ringChurchBell(6)
	})



	setInterval(() => {
		let min = new Date().getMinutes()
		let hour = new Date().getHours()
		time.innerText = `${hour}:${min}`
	}, 1000)

	church.addEventListener("click", () => {
		ringChurchBell(1)
	})
}


/* church
	by john trinh
	main.js */

window.onload = () => {
	//=====DEMO/TEST ELEMENTS=====//

	//const time = document.getElementById("time")
	const demoRingBtn = document.getElementById("demo-ring-btn")
	const demoRingTwiceBtn = document.getElementById("demo-ring-twice-btn")
	const demoRingSixBtn = document.getElementById("demo-ring-six-btn")
	const demoCongregateBtn = document.getElementById("demo-congregate-btn")
	const demoDisperseBtn = document.getElementById("demo-disperse-btn")

	//=====ELEMENTS AND STATE=====//
	// audio
	const bell = new Audio("bell.mp3")
	const crowdTalk = new Audio("crowd-talking.mp3")
	const shh = new Audio("shh.mp3")
	const knock = new Audio("knock.mp3")
	const slam = new Audio("slam.mp3")

	// elements
	const light = document.getElementById("light")
	const church = document.getElementById("church")
	const congregation = document.getElementById("congregation")
	const pageTitle = document.getElementById("page-title")

	let ringsRemaining = 0
	let lastHourRung
	let congregating = false

	//=====RECURSIVE BELL HANDLING=====//
	// not biggest recursive fan in the world but simplest way i know to handle the timed nature

	/**
	 * starts church bell ringing number of times.
	 * @param {number} count - number of times it plays
	 */
	function ringChurchBell(count) {
		ringsRemaining = count - 1 // decrements right before bell plays so we can catch it at 0
		console.log(`tolling ${count} times!`)
		bell.play()
	}

	/**
	 * handles recursive re-ringing of bell, handling remaining rings count.
	 * not meant to be run(g) except on finished-ringing callback!
	 */
	function ringChurchBellAgain() {
		if (ringsRemaining === 0) {
			console.log("ringing done!")
			return
		}
		console.log("ringing again!")
		ringsRemaining--
		bell.play()
	}

	bell.addEventListener("playing", () => {
		pageTitle.innerText = "the bell tolls"
		light.animate(
			[
				{ opacity: "0%" },
				{ opacity: "100%" },
			],
			{
				duration: 50,
				iterations: 1,
				delay: 90,
				easing: "linear",
			}
		)
		light.animate(
			[
				{ opacity: "100%" },
				{ opacity: "0%" },
			],
			{
				duration: 3500,
				iterations: 1,
				delay: 140,
				easing: "linear",
			}
		)
		church.animate(
			[
				{ rotate: "0" },
				{ rotate: "3deg" },
			],
			{
				duration: 30,
				iterations: 1,
				delay: 90,
				easing: "linear",
			}
		)
		church.animate(
			[
				// { scale: "100%" },
				{ rotate: "3deg" },
				{ rotate: "0" },
			],
			{
				duration: 2500,
				iterations: 1,
				delay: 120,
				easing: "linear",
			}
		)
	})

	bell.addEventListener("ended", () => {
		console.log("bell done")
		pageTitle.innerText = "church"
		ringChurchBellAgain()
	})

	// DEMO BUTTONS
	demoRingBtn.addEventListener("click", () => {
		ringChurchBell(1)
	})
	demoRingTwiceBtn.addEventListener("click", () => {
		ringChurchBell(2)
	})
	demoRingSixBtn.addEventListener("click", () => {
		ringChurchBell(6)
	})

	//=====CONGREGATION=====//
	/**
	 * gather congregation
	 */
	function goToChurch() {
		if (congregating) {
			console.log("already congregating")
			return
		}
		congregating = true
		crowdTalk.play()
		congregation.animate(
			[
				{ left: "100%", top: "50%", scale: "80%" },
				{ left: "45%", top: "calc(60% - 30px)", scale: "40%" },
			],
			{
				duration: 2500,
				iterations: 1,
				delay: 0,
				easing: "linear",
			}
		)
		church.animate(
			[
				{ scale: "100%" },
				{ scale: "103%" },
				{ scale: "100%" },
			],
			{
				duration: 100,
				iterations: 1,
				delay: 2400,
				easing: "steps(2)",
			}
		)
		setTimeout(() => {
			slam.play()
		}, 2400)
	}

	/**
	 * disperse congregation
	 */
	function leaveChurch() {
		if (!congregating) {
			console.log("nobody's in there")
			return
		}
		congregating = false
		crowdTalk.play()
		slam.play()
		congregation.animate(
			[
				{ left: "45%", top: "calc(60% - 30px)", scale: "-40% 40%" }, // note neg x val to flip image
				{ left: "100%", top: "50%", scale: "-80% 80%" },
			],
			{
				duration: 2500,
				iterations: 1,
				delay: 100,
				easing: "linear",
			}
		)
		church.animate(
			[
				{ scale: "100%" },
				{ scale: "103%" },
				{ scale: "100%" },
			],
			{
				duration: 100,
				iterations: 1,
				delay: 0,
				easing: "steps(2)",
			}
		)
	}

	// DEMO BUTTONS
	demoCongregateBtn.addEventListener("click", () => {
		goToChurch()
	})
	demoDisperseBtn.addEventListener("click", () => {
		leaveChurch()
	})


	//=====TIMER EVENTS!!!!!!=====//

	setInterval(() => {
		let time = new Date()
		let hr = time.getHours()
		let hr12 = (hr + 24) % 12 || 12 // https://stackoverflow.com/questions/10556879/changing-the-1-24-hour-to-1-12-hour-for-the-gethours-method
		let min = time.getMinutes()
		let sec = time.getSeconds()
		let day = time.getDay() // sunday === 0

		// ring bell every hour
		if (min === 0 && sec == 0) ringChurchBell(hr12)

		// on sundays
		if (day === 0) {
			// early congregation 
			if (hr === 9 && min === 15 && sec === 0) goToChurch()
			if (hr === 10 && min === 30 && sec === 0) leaveChurch()

			// late congregation
			if (hr === 10 && min === 45 && sec === 0) goToChurch()
			if (hr === 12 && min === 0 && sec === 0) leaveChurch()
		}
	}, 1000)

	church.addEventListener("click", () => {
		//ringChurchBell(1)
		//goToChurch()
		knock.play()
		if (congregating) {
			setTimeout(() => {
				shh.play()
				setTimeout(() => {
					knock.pause()
					knock.currentTime = 0
				}, 450)
			}, 100)
		}
	})

	//=====UTILITY=====//

	//function ()
}


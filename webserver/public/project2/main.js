/* church
	by john trinh
	main.js */

window.onload = () => {
	const bell = new Audio('bell.mp3')
	const church = document.getElementById("church")
	const time = document.getElementById("time")

	function ring() {
		bell.play()
	}

	setInterval(() => {
		let min = new Date().getMinutes()
		let hour = new Date().getHours()
		time.innerTex = `${hour}:${min}`
	}, 1000)

	church.addEventListener("click", () => {
		ring()
	})
}


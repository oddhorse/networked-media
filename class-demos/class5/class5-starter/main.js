// main.js
alert("hello!")


window.onload = () => {
	console.log("webpage is fully loaded")

	document.getElementById("main").innerHTML = "PEWWWW"
	// document.getElementById("main").style.backgroundColor = 'red'

	let main = document.getElementById("main")
	// main.style.color = 'lightgreen'

	main.classList.add("blue")

	let container = document.getElementById("container")
	let item = document.createElement("p")
	item.textContent = "dynamically created item"
	container.appendChild(item)
}
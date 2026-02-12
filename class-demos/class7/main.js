window.onload = () => {
	console.log("page has loaded!")

	let newSpan = document.createElement("span")
	newSpan.classList.add("text-body")
	newSpan.innerHTML = "this is a new span"
	document.body.appendChild(newSpan)
}
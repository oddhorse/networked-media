let rotValue = 0

// Q: what is the first function we always run in our javascript files? add it below this comment.
window.onload = () => {

	// Q: inside the function, get the element with the id of "rotate" and store it in a variable.
	const rotate = document.getElementById("rotate")
	// Q: what function do we use to repeat something over time?
	// A: 
	setInterval(() => {
		rotValue = (rotValue + 1) % 360
		console.log(rotValue)

		rotate.style.transform = `rotate(${rotValue}deg)`
	}, 10)
	// Q: what parameters does it accept?
	// A: function to run every interval, and interval time
}
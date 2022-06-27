let toggle = false

document.querySelector('.toggle').addEventListener('click', function () {
	if ((toggel = false)) {
		document.querySelector('.loginForm').classList.add('.noDisplay')
		document.querySelector('.registerForm').classList.remove('.noDisplay')
	} else {
		document.querySelector('.loginForm').classList.remove('.noDisplay')
		document.querySelector('.registerForm').classList.add('.noDisplay')
	}
})

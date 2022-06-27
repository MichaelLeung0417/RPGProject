let toggle = false

document.querySelector('.toggle').addEventListener('click', function () {
	if (toggle == false) {
		document.querySelector('.loginForm').classList.toggle('.noDisplay')
		document.querySelector('.registerForm').classList.toggle('.noDisplay')
		toggle = true
	} else {
		document.querySelector('.loginForm').classList.toggle('.noDisplay')
		document.querySelector('.registerForm').classList.toggle('.noDisplay')
		toggle = false
	}
})

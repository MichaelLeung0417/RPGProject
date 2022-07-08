document.querySelector('.login').addEventListener('click', function () {
	document.querySelector('.registerForm').classList.add('noDisplay')
	document.querySelector('.loginForm').classList.remove('noDisplay')
})

document.querySelector('.register').addEventListener('click', function () {
	document.querySelector('.registerForm').classList.remove('noDisplay')
	document.querySelector('.loginForm').classList.add('noDisplay')
})

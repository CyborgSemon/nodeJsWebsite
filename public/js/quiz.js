let questions = ['2+2', '4+4', '8+8', '16+16'];

let finalData = {};

let questionForm = document.getElementById('questionForm');

questionForm.insertAdjacentHTML('beforeend', '<h3>What is you name?</h3><input id="username" type="text" name="username" value="" required><br>');

document.getElementById('username').addEventListener('input', ()=> {
	finalData['user'] = document.getElementById('username').value;
});

for (var i = 0; i < questions.length; i++) {
	let counter = (i + 1);
	finalData[`answer${counter}`] = '';

	questionForm.insertAdjacentHTML('beforeend', `<br><br><h3>Question ${counter}: ${questions[i]}<h3><input id="answer${counter}" type="text" name="question${i + 1}" value="" required>`);

	document.getElementById(`answer${counter}`).addEventListener('input', ()=> {
		finalData[`answer${counter}`] = document.getElementById(`answer${counter}`).value;
	});
}

questionForm.insertAdjacentHTML('beforeend', '<button type="submit" class="btn">Submit</button>');

function valadate () {
	for (var property in finalData) {
		if (finalData.hasOwnProperty(property)) {
			if (!finalData[property]) {
				alert('You must have all the fields filled in');
				return false;
			}
		}
	}
	return true;
}
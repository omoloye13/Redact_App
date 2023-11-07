document.addEventListener('DOMContentLoaded', function () {
	const originalText = document.getElementById('originalText');
	const wordsToRedact = document.getElementById('wordsToRedact');
	const replacementCharacter = document.getElementById('replacementCharacter');
	const redactButton = document.getElementById('redactButton');
	const redactedText = document.getElementById('redactedText');
	const wordCount = document.getElementById('wordCount');
	const matchedCount = document.getElementById('matchedCount');
	const scrambledCount = document.getElementById('scrambledCount');
	const timeTaken = document.getElementById('timeTaken');

	redactButton.addEventListener('click', function () {
		const startTime = new Date().getTime();
		const originalContent = originalText.value;
		const redactedContent = redactText(
			originalContent,
			wordsToRedact.value,
			replacementCharacter.value
		);

		const endTime = new Date().getTime();
		const time = ((endTime - startTime) / 1000).toFixed(2);

		redactedText.textContent = redactedContent;
		wordCount.textContent = countWords(originalContent);
		matchedCount.textContent = countMatchedWords(
			originalContent,
			wordsToRedact.value
		);
		scrambledCount.textContent = countScrambledCharacters(
			originalContent,
			wordsToRedact.value,
			replacementCharacter.value
		);
		timeTaken.textContent = time;
	});

	function redactText(text, wordsToRedact, replacement) {
		const words = wordsToRedact.split(' ');
		for (const word of words) {
			const regex = new RegExp(`\\b${word}\\b`, 'gi');
			text = text.replace(regex, replacement.repeat(word.length));
		}
		return text;
	}

	function countWords(text) {
		return text.split(/\s+/).filter((word) => word !== '').length;
	}

	function countMatchedWords(text, wordsToRedact) {
		const words = wordsToRedact.split(' ');
		let count = 0;
		for (const word of words) {
			const regex = new RegExp(`\\b${word}\\b`, 'gi');
			const matches = text.match(regex);
			if (matches) {
				count += matches.length;
			}
		}
		return count;
	}

	function countScrambledCharacters(text, wordsToRedact, replacement) {
		const words = wordsToRedact.split(' ');
		let count = 0;
		for (const word of words) {
			const regex = new RegExp(`\\b${word}\\b`, 'gi');
			const matches = text.match(regex);
			if (matches) {
				for (const match of matches) {
					count += match.length * (replacement.length - 1);
				}
			}
		}
		return count;
	}
});

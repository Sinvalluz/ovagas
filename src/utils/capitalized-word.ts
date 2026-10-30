export function capitalizedWord(word: string) {
	const firstLetter = word.charAt(0);
	const remainingLetters = word.slice(1);

	return firstLetter.toUpperCase() + remainingLetters;
}

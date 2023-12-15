interface splitBySymbolsPropertiesInterface {
	element: HTMLElement;
	wordSpanAttribute?: string;
	symbolSpanAttribute?: string;
}

interface splitBySymbolsInterface {
	wordsElements?: NodeListOf<HTMLElement>;
	symbolsElements?: NodeListOf<HTMLElement>;
	originalText?: string;
	originalHTML?: string;
}

const splitBySymbols = ({
	element,
	wordSpanAttribute,
	symbolSpanAttribute,
}: splitBySymbolsPropertiesInterface): splitBySymbolsInterface => {
	const originalText = element.textContent?.trim();
	const originalHTML = element.innerHTML;
	// eslint-disable-next-line no-param-reassign
	element.innerHTML = element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, `$1<span ${wordSpanAttribute}="">$2</span>`);

	const words = element.querySelectorAll(`[${wordSpanAttribute}]`);

	for (let i = 0; i < words.length; i += 1) {
		const word = words[i];
		// @ts-ignore
		word.innerHTML = word.textContent?.replace(/\S/g, `<span ${symbolSpanAttribute}="">$&</span>`); // eslint-disable-line no-param-reassign,max-len
	}

	return {
		wordsElements: element.querySelectorAll(`[${wordSpanAttribute}]`),
		symbolsElements: element.querySelectorAll(`[${symbolSpanAttribute}]`),
		originalText,
		originalHTML,
	};
};

export default splitBySymbols;

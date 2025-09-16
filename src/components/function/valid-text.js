const validText = (text, countMin, countMax, valueRegex) => {
	return text.length >= countMin && text.length < countMax && valueRegex.test(text);
}

export default validText;

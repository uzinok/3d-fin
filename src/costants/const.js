export const REGEXTEXT = /^(?!.*<[^>]+>)(?!.*(function\s*\(|const\s+|let\s+|var\s+|if\s*\(|for\s*\(|while\s*\(|console\.)).*$/;
export const PHONEREGEX = /^(\+7|8)[0-9]{10}$/;
export const TELEGRAMREGEX = /^@[a-zA-Z0-9_]{5,}$/;

export const CLASSNAME = "invalid";

export const TEXTFORBUTTON = {
	send: 'Отправить',
	loading: 'Отправка',
	error: 'Ошибка',
	success: 'Отправлено',
}

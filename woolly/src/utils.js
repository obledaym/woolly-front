import React from 'react';

export function shorten(text, limit) {
	if (text.length > limit)
		return text.slice(0,limit-3) + '...';
	return text;
}

export function textOrIcon(text, Icon, displayText) {
	return displayText ? text : <Icon title={text} />
}

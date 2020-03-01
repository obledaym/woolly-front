import React from 'react';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';

class FieldGenerator {

	constructor(store, handleChange, keyPrefix = null) {
		this.store = store;
		this.handleChange = handleChange;
		this.keyPrefix = keyPrefix;
	}

	needUpdate = (store, handleChange) => {
		if (this.store !== store) {
			this.store = store;
			return true;
		}
		if (this.handleChange !== handleChange)
			this.handleChange = handleChange;
		return false;
	}

	getKey = (key) => this.keyPrefix ? `${this.keyPrefix}.${key}` : key

	getValue = (key, params) => (
		key.split('.').reduce((props, step) => props[step], this.store)
	)

	text = (key, label, props = {}) => (
		<TextField
			label={label}
			inputProps={{ 'data-key': this.getKey(key) }}
			value={this.getValue(key, props) || ''}
			onChange={this.handleChange}
			{...props}
		/>
	)

	boolean = (key, label, props = {}) => (
		<FormControlLabel
			label={label}
			control={
				<Checkbox
					inputProps={{ 'data-key': this.getKey(key) }}
					checked={this.getValue(key, props)}
					onChange={this.handleChange}
				/>
			}
		/>
	)

	integer = (key, label, props = {}) => (
		<TextField
			label={label}
			inputProps={{ 'data-key': this.getKey(key) }}
			value={this.getValue(key, props) || 0}
			onChange={this.handleChange}
			type="number"
			{...props}
		/>
	)

	datetime = (key, label, props = {}) => (
		<TextField
			label={label}
			inputProps={{ 'data-key': this.getKey(key) }}
			value={this.getValue(key, props) || Date.now()}
			onChange={this.handleChange}
			type="datetime"
			{...props}
		/>
	)
}

export default FieldGenerator;

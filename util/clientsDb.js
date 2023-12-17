const { readFile, writeFile } = require('fs').promises;
const { resolve } = require('path');
const { v4: uuid } = require('uuid');

class Db {
	constructor(dbFileName) {
		this.dbFileName = resolve(__dirname, '../data', dbFileName);
		this._load();
	}

	async _load() {
		this._data = JSON.parse(await readFile(this.dbFileName));
	}

	_save() {
		this._data = writeFile(JSON.stringify(this._data), 'utf-8');
	}

	create(obj) {
		this._data.push({
			id: uuid(),
			...obj,
		});
	}

	getAll() {
		return this._data;
	}

	getOne(id) {
		return this._data.find((oneObj) => oneObj.id === id);
	}

	update(id, newObj) {
		this._data = this._data.map((oneObj) => {
			oneObj.id === id
				? {
						...oneObj,
						...newObj,
				  }
				: oneObj;
		});

		this._save();
	}

	delete(id) {
		this._data = this._data.filter((obj) => obj.id !== id);
		this._save();
	}
}

const db = new Db('clients.json');

module.exports = {
	db,
};

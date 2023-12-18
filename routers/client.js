const express = require('express');
const { join } = require('path');
const ejs = require('ejs');
const { db } = require('../util/clientsDb');

const clientRouter = express.Router();

clientRouter
	.get('/', async (req, res) => {
		const body = await ejs.renderFile(
			join(__dirname, '../views/client/list-all.ejs'),
			{
				clients: db.getAll(),
			}
		);
		res.render('layout', {
			body: body,
		});
	})

	.get('/:id', async (req, res) => {
		console.log('Klient :', db.getOne(req.params.id));
		const body = await ejs.renderFile(
			join(__dirname, '../views/client/one.ejs'),
			{
				client: db.getOne(req.params.id),
			}
		);

		res.render('layout', {
			body: body,
		});
	})

	.get('/form/edit/:id', (req, res) => {
		res.render('client/forms/edit.ejs', {
			client: db.getOne(req.params.id)
		})
	})
module.exports = {
	clientRouter,
};
//Proszę sprawdź mój kod pod względem logicznym i czystość kodu również

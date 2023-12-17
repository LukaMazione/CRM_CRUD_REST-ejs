const express = require('express');
const { join } = require('path');
//const { urlencoded } = require('express');
const { db } = require('./util/clientsDb.js');
const { homeRouter } = require('./routers/home.js');
const { clientRouter } = require('./routers/client.js');

const app = express();

app.use(express.static(join(__dirname, 'public')));
// app.use('/assets', express.static(path.join(__dirname, '../public')))
app.use(express.json());

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use('/', homeRouter);
app.use('/client', clientRouter);

app.listen(3000, 'localhost', () => {
	console.log(`Aplikacja działa na porcie 3000`);
});

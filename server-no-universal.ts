import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {renderModuleFactory} from '@angular/platform-server';
import {readFileSync} from 'fs';
import * as express from 'express';
import {enableProdMode} from '@angular/core';

const {AppServerModuleNgFactory} = require('./dist-server/main.js');

const app = express();

const indexHTML = readFileSync(__dirname + '/dist/index.html', 'utf-8').toString();

// использую продакшн мод, чтобы не дублировать change detection
enableProdMode();


// перенаправляю все запросы на дист
app.use(express.static(__dirname + '/dist', {
    maxAge: '1y'
}));

// routes
app.route('*').get(async (req, res) => {
    let html;

    try {
        html = await renderModuleFactory(AppServerModuleNgFactory, {
            document: indexHTML,
            url: req.url
        });

        res.status(200).send(html);
    } catch (e) {
        console.log('app.route(\'/\') renderModuleFactory error ', e);
        res.sendStatus(500);
    }
});

app.listen(9000, () => console.log('server is running on 9000 port'));

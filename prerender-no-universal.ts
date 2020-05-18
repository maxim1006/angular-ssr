import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {renderModuleFactory} from '@angular/platform-server';
import {writeFileSync} from 'fs';

// фактори из юниверсал билда, получил после ng g angular-ssr:server
const {AppServerModuleNgFactory} = require('./dist/server/main.js');

async function main() {
    let html;

    try {
        html = await renderModuleFactory(AppServerModuleNgFactory, {
            document: '<app-root></app-root>', // что рендерить
            url: '/' // роут который рендерить (сюда же лезийные запишу)
        });
    } catch (e) {
        throw new Error('renderModuleFactory html render error ' + e);
    }

    console.log('renderModuleFactory html rendered!');
    writeFileSync('./prerender.html', html);
}

main();



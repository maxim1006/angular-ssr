1. ng g universal --client-project=angular-ssr (получу все файлы для ssr: app.server.module.ts, main.server.ts, tsconfig.server.json)
Также в angular.json добавится "server": {...

dist/angular-ssr-server переименую в dist-server

запускаю ng run angular-ssr:server и получаю main.js - angular universal bundle, который понадобится для дальнейшей компиляции client side bundle

2. создаю prerender.ts и в скриптах package.json         
"prerender": "./node_modules/.bin/ts-node -O='{\"module\":\"commonjs\"}' ./prerender.ts",

тут меняю модуль на commonjs для import resolution

запускаю npm run prerender и получаю prerender.html (на этом этапе уже будут валиться ошибки с window и тд, этот код оборачиваю в 

```typescript
constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            window.setTimeout(() => {
                    console.log('setTimeout in ssr');
                }
            );
        }
    }
```
)

3. Создаю  server.ts, а дальше билд апп, билд сервер, старт сервер ssr

Все это только для одной странички без поддержки модулей


4. Чтобы сделать годно 

ng add @nguniversal/express-engine --clientProject angular.io-example

добавилось куча файлов и поменялось места для генерации server bundle, из которого теперь достаю const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

затем запускаю build:ssr, build, затем serve:ssr - профит

Немного поменял, так как для ssr нужен браузерный index.html и dist/server/main.js для того чтобы из него вытащить AppServerModuleNgFactory, LAZY_MODULE_MAP, сам Ангуляр дополнительно еще конверить server.ts в .js,  но если использовать ts-node то этот шаг необязателен

serve:ssr и serve:ssr:js одно и тоже, только второе запускает скомпиленный js, а первое скомпиленный тс

Также в примере добавлена установка title и мета тегов

5. Application cell - посылаю только часть того что нужно показать пользователю, остальное на клиенте рендерю (так как html много + не все нужно сразу показывать)

для этого создаю 2 структурные директивы *appShellNoRender и *appShellRender

то что оборачиваю в appShellNoRender не будет разрендерено в ssr, 

6. чтобы сделать запрос и сразу закинуть в ssr, в серивисе с гет методом обязательно указываю полный путь.




# AngularSsr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

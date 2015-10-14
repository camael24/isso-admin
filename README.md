# isso-admin

Manage comments of Isso sqlite database.

## Install

```bash
$ docker-compose up -d
 > Creating issoadmin_php_1...
 > Creating issoadmin_app_1...


### If want use internal API Work with local sqlite

$ cd src/api && composer install

 * Note: if you don't have composer or php you can run composer inside docker by docker exec command


### Start Ember APP

$ cd src/ui
$ npm install
$ bower install

$ ember server
 > Visit http://www.ember-cli.com/#watchman for more info.
 > Livereload server on http://localhost:35729
 > Serving on http://localhost:4200/
```

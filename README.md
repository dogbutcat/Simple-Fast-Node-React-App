# Simple Fast Node-React App

## Causion

This is an example for node-react quick rendering application, providing for learners who wants to learn further about react in typescript and mongodb (through mongoose). This branch has been intergrated with mongodb services, so you need have some basic knowledge about mongodb and mongoose.

## Steps

1. run ```npm install``` in workspaceRoot directory

1. change ```redirectUri```, ```DbConnection``` in ```./src/resources/config.ts``` for basic usage.

1. make sure gulp is installed globally, then ```gulp default``` to produce with source-map files, or ```DEBUG=false gulp default``` to make productive files

1. change environment in ```scripts/startWeb.sh``` or start express server directly by ```node ./build/server.js```

1. open [Local Page](http://localhost:8000) to view the page

## Further

### Config

* ```NumPerPage``` means how many item to show in one page

* ```AutoUpdate``` means allowing auto update when client's disconnected. Paired using with ```UpdateInterval```

* ```TestDb``` this only works when starting with ```ENV=TEST gulp mocha```

### CRUD Operator

#### insert app id and app secret only for first time

    > METHOD: GET
    > BODY: {"client_id":"XXX","client_secret":"XXXX"}
    > URL: http://localhost:8000/OAuth2
    > RETURN: success or error after authentation

#### get token info store in db

    > METHOD: GET
    > URL: http://localhost:8000/OAuth2/tokeninfo
    > RETURN: token string

#### get data from db

    > METHOD: GET
    > URL: http://localhost:8000/json
    > RETURN: {"statuses":[...],"first_cursor":"58be3da1891a2130c000c26b","current_page":1,"total_page":437}

#### get target page

    > METHOD: GET
    > URL: http://localhost:8000/json/58be3da1891a2130c000c26b/2
    > RETURN: {"statuses":[...],"first_cursor":"58be3da1891a2130c000c26b","current_page":2,"totala_page":439}

### Todo List

* [X] ~~*number addition scroll*~~
* [X] ~~*add refresh after click notification*~~
* [X] ~~*change Peek event to attach more pages in socket*~~
* [X] ~~*check socket event wheather still emit after client closed*~~
* [X] ~~*transform to redux*~~


## End

Welcome to fork this example to build your own app based on typescript!
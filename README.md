# CycleTour-Webapp

## Deployment with remote database and API
Just copy the all files from "FahrradKiel" folder in root folder in your server

## Development

### System Requirements

 - Node (Latest Version)
 - PHP > 7.1.3
 - PostgreSQL 
 - Postgis extension for postgresql
 - Composer ( Latest version ) 

### installation
Clone repository
```
git clone https://github.com/RajibTheKing/CycleTour-Webapp.git
```
### REST Api - installation and config

Install PHP dependencies
```
cd CycleTour-Webapp/apps/ctapi
composer install
```
To configure api settings open below file and change database connection
```
CycleTour-Webapp/apps/ctapi/.env
```

Now run below command from current folder location
```
php -S 127.0.0.1:8080 -t public public/index.php
```

#### Application frontend - installation and config
Install node dependency 
```
cd CycleTour-Webapp/apps/ctweb
npm install
```

To change API_URI, edit below file
```
CycleTour-Webapp/apps/ctweb/src/helpers/ctKielApi.js
```
Now run below command
```
cd CycleTour-Webapp/apps/ctweb
npm start
```

note: Default config

 - Development Server URL: http://localhost:3000
 - Api URL: http://127.0.0.1:8080/ 

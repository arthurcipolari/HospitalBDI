### Install and run API

1. Install MySQL Server
2. Install NodeJs from https://nodejs.org/en
3. Create a schema on MySQL ( Use 'HospitalMysql' or change database name on scripts pages )
4. Insert your MySQL user and password on script pages ( For MySQL 8.0 must use legacy authentication for new method use empty password ONLY )
5. Go to HospitalAPI folder
6. Open Terminal
7. To install dependencies run: ```npm install```
8. To create tables (if first time running) run: ```node create-table.js```
9. For adding seeds run: ```node seeds.js```
10. With tables created run: ```node index.js```
11. API Running on `http://localhost:3333`


### Install and run Front-End

1. Open Terminal
2. Go to your HospitalBDI folder
3. Run in terminal: ```npm install -g @angular/cli```
4. Then: ```npm install```
5. And: ```ng serve```
6. Navigate to `http://localhost:4200/`

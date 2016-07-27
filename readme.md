#ExamPrep
ExamPrep is a vocabulary builder tool to prepare for various examinations.

##Installation -
1. Download & Install node.js [https://nodejs.org/en/download/]
2. Download & Install mongoDb [https://www.mongodb.com/download-center?jmp=nav#community]
3. Open the root folder of the application in cmd/terminal and type -

    npm install

4. Run mongoDb (mongod)
5. Go to data folder in cmd/terminal and type -

      mongoimport --db exam --collection words --file words.json

   This will load the database into your local mongoDb server.

##Usage -

1. Open the root folder of the application in cmd/terminal and type -

     node app.js

2. To export data (while mongoDb server is runnning)-

    mongoexport --db exam --collection words --file words.json

   This will duplicate your local database to the current directory.
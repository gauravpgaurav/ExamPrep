# ExamPrep
ExamPrep is a vocabulary builder tool to prepare for various examinations.

## Installation -
0. Download & Unzip the project [https://codeload.github.com/gauravpgaurav/ExamPrep/zip/master]
1. Download & Install node.js [https://nodejs.org/en/download/]
2. Download & Install mongoDb [https://www.mongodb.com/download-center?jmp=nav#community]
3. Open the root folder of the application in cmd/terminal and type -

    **npm install**

4. Run mongoDb (mongod) in cmd/terminal.
5. Go to data folder in cmd/terminal and type -

      **mongoimport --db exam --collection words --file words.json**

   This will load the database into your local mongoDb server.
6. To make search work. Text indexes must be created. Open mongo, switch to exam database & type -

	**db.words.createIndex(
   {
     	"level": "text",
     	"meaning": "text",
	"word": "text"
   }
 );**


6. To export data (while mongoDb server is runnning)-

    **mongoexport --db exam --collection words --out words.json**

   This will duplicate your local database to the current directory.


## Usage -
0. Run mongoDb (mongod) in cmd/terminal.
1. Open the root folder of the application in cmd/terminal and type -

     **node app.js**
2. Open [http://localhost:3000/] in browser.

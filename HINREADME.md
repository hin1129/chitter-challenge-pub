============================================================
============================================================
Installing
Forked chitter-challenge folder from DF to my own GitHub account, then cloned the folder onto my local machine.-
On VSC terminal, inside chitter-challenge folder, set up the library with the following commands:
for frontend: npm i, npm i axios dotenv, npm i --save react-router-dom@5.2.0
for backend: npm i body-parser cors dotenv express mongoose nodemon chai chai-http mocha

Modified package.json:
"type":"module"
"test": "mocha --timeout 10000 --exit"

To run program (both front/backend): "nodemon"
============================================================
============================================================
Frontend
React Structure
1 = Component Hierarchy
2 = Static Versions
3 = Identifying State
4 = Identifying Where State Should Live
5 = Adding Inverse Data Flow

Component Hierarchy - version1
Components   || Colour || Content
header       || red    || title, loading status, nav bar
postComment  || white  || user input content
commentList  || pink   || reverse chronological order, visible when logged out
comment      || yellow || time, trainee name, user handle
signup       || black  || email/username(unique), password/name
login/logout || red    || username/password
footer       || green  || text
============================================================
============================================================
Backend
Node Structure
model: db that stores user accounts and comments
routes: deal with clients http requests
============================================================
============================================================
Tests


============================================================
============================================================
Other

============================================================
============================================================
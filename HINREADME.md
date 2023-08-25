============================================================
============================================================
Installing
Forked chitter-challenge folder from DF to my own GitHub account, then cloned the folder onto my local machine.-
On VSC terminal, inside chitter-challenge folder, set up the library with the following commands:
for frontend: npm i axios dotenv --save react-router-dom universal-cookie bootstrap jwt-decode react-validation validator web-vitals
for backend: npm i body-parser cors dotenv express mongoose nodemon bcryptjs cookie-parser express-jwt express-validator https jsonwebtoken nodemailer validator chai chai-http mocha 

Modified package.json:
"type":"module"
"test": "mocha --timeout 10000 --exit"

To run program (both front/backend): "nodemon"
To connect to database: "mongodb.com"
============================================================
============================================================
Frontend
React Structure
1 = Component Hierarchy
2 = Static Versions
3 = Identifying State
4 = Identifying Where State Should Live
5 = Adding Inverse Data Flow

Component Hierarchy - version
Components   || Colour || Content
header       || red    || title, nav bar, logout button, clock
postComment  || white  || post new comment
commentList  || pink   || display comments
comment      || yellow || username, comment description, time, user handle - edit/delete
signup       || black  || create new user account (email/username/password/name), sign up button
login        || red    || email/password, sign in button
footer       || green  || text
============================================================
============================================================
Backend
Node Structure
Model = stores user data
Comment = comment description, username, date
User = full name, username, email, password

Routes = deal with clients http requests
Comment = post new comment, retrieve existing comments in reverse order, delete comment, update existing comment
Signin = create new user account, apply validation and encryption 
Signup = retrieve existing user account, apply encryption
============================================================
============================================================
Tests


============================================================
============================================================
Other

============================================================
============================================================
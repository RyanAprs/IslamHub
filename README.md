# BLOG APP
---

## Features

- SignIn, SignUp, Update Profile, Reset Password, Comment for blogs
- Create Blog, Update Blog, Delete Blog, View Blog, Search blog
----
## Tech

Dillinger uses a number of open source projects to work properly:

- FrontEnd: ReactJs, Tailwind CSS
- Backend: Node.js, Express.js, and MongoDB.
- Database: Uses MongoDB as a NoSQL database to store blog, user.
----
## Installation
1. Make sure you have Node.js (version 12 or higher) and npm (Node Package Manager) installed on your system. You also need database management software like MongoDB.

2. Clone the repository

```sh
git clone https://github.com/RyanAprs/blogApp.git
cd blogApp
```

3. Environment Configuration for ackend:
Copy the .env.example file to .env and adjust the environment variables (such as database URL) according to your development environment.

4. Install dependencies for frontend and run the app

```sh
cd fe
npm install 
```
```sh
npm run dev
```

5. Install dependencies for backend and run the app

```sh
cd be
npm install 
```
```sh
npm run dev
```

6. Access the Application:
After running the backend server and frontend application, you can access the web application through a browser by visiting http://localhost:5173.

----
## API DOCUMENTATION
Base Url = http://localhost:3000/api/v1

| Method | Endpoint | Usage | Example |
| ------ | ------ | ------ |----------|
| GET | read blog |``/blog`` |-|
| GET | read blog by user id |``/blog/:user_id/:user_blog_id`` |``/blog/1/2``|
| GET | read blog by id | ``/blog/:id`` |``/blog/1``|
| POST | create blog |``/blog`` |-|
| PUT | update blog | ``/blog/:id`` |``/blog/1``|
| DELETE | delete blog | ``/blog/:id`` |``/blog/1``|
| POST | login | ``/auth/login`` | - | 
| POST | register | ``/auth/register`` | - |
| POST | reset password | ``/auth/reset-password`` | - |
| PUT | update user | ``/user/:id`` | ``/user/1`` |

build with ❤️ by RysnAprs;

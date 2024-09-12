# todo-task-manager
The to-do list application is a web-based application that allows users to create and manage a list of tasks. The user interface consists of a form to add new tasks, a list of all tasks, and controls to mark tasks as complete or delete them.

To create the application, Node.js is used to set up the server and handle the logic of the application. Express.js is used to create the routes for the application, allowing the user to interact with the application through a web browser. EJS is used to create the views for the reset password page, allowing the user to see the list of tasks and the form to add new tasks.

Sequelize  are used to store the tasks in a database, allowing the user to add, delete, and update tasks as needed. Nodemon is used to monitor changes to the code and automatically restart the server, making it easy to develop and test the application.

Technologies Used: NodeJS, ExpressJS, EJS, CSS, JavaScript, Nodemon, Sequelize.
## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file and add your MySQL database credentials.
4. Run migrations: `npx sequelize-cli db:migrate`.
5. Run the server: `npm start`.

## Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login a user.
- **POST /api/auth/forgot-password**: Reset password.
- **GET /api/taskList**: Retrieve all tasks.
- **GET /api/tasks/:id**: Retrieve a task by ID.
- **POST /api/createTask**: Create a new task.
- **PUT /api/updateTask/:id**: Update a task.
- **DELETE /api/deleteTask/:id**: Delete a task.

## Swagger endpoint for api 
http://localhost:3000/api/swaggerdocs/

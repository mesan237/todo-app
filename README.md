<div align="center">
  <br />
    <a href="#" target="_blank">
      <img src="" alt="ToDo Banner">
    </a>
  <br />
  
  <div>
    <img src="https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />    
    <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat" alt="Express.js" /> 
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular.js" />
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="Node.s" />
    <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white" alt="sass" />
  </div>

  <h3 align="center">A ToDo Application</h3>

   <div align="center">
     Build this project step by step from scratch
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Built with React.js for the user interface, Node js for the Backend, and styled with TailwindCSS,Todo App is a website project designed to help beginners get started with learning MEAN stack. 

## <a name="tech-stack"> Tech Stack</a>

- Angular.js
- Appwrite
- Tailwind CSS

## <a name="features"> Features</a>


👉 **Responsiveness**: Fully responsive design that works seamlessly across devices.
👉 **Task Creation**:  Users can easily add new tasks to their list.​.
👉 **User Authentication**: Secure login to protect user data and personalize the experience.
👉 **Categories**:  Organize tasks by grouping them into categories .

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Angular cli](https://github.com/angular/angular-cli#installation)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/mesan237/todo-app.git
cd todo-app
```

**Installation**

Install the project dependencies using npm:

For the server
```bash
npm install
```

For the Client
```bash
cd client

npm install
```

**Set Up Environment Variables**

In the root directory of your project, duplicate the `.env.example` file and rename the copy to `.env`.
Open the `.env` file and replace the placeholder values with your actual configuration details

```env

ATLAS_URI=mongodb+srv://<username>:<password>@<your-cluster>.mongodb.net/meanStackExample?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```


**Running the Server**

```bash
npm run dev
```

seed the database:

run these commands
```bash
npm run 'data:import'
```


**Running the client**

```bash
ng serve"
```

Open [http://localhost:4200](http://localhost:4200) in your browser to view the project.


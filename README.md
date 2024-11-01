<div align="center">

# DevOps Sample Project  
### Containerizing MERN Stack [Application](https://www.geeksforgeeks.org/how-to-build-a-basic-crud-app-with-node-js-and-reactjs/) 
<img width="1781" alt="image" src="https://github.com/user-attachments/assets/fb67c2ea-558b-427e-937d-025fdfe91028">

</div>

---


## **Project Overview**  
This project involves containerizing a CRUD-based MERN stack application to demonstrate containerization using Docker. The focus is on decoupling the full-stack architecture into isolated containers, optimizing the code for better performance, and managing version control effectively using GitHub.  

The application provides a seamless user experience for creating, reading, updating, and deleting (CRUD) operations, supported by React for the frontend, Node.js with Express for the backend, and MongoDB for database management.

---
### **Objective:** 
Find out full-stack CRUD-based MERN (MongoDB, Express, React, Node.js) application in internet, then decouple into microservices to deployment and manage repositories. Optimized the code and introduced user-friendly changes to enhance the overall experience.

### **Role:**
Led the containerization, code optimization, and repository management processes to ensure efficient deployment and easy maintenance.

### **Technologies and Tools Used:**  
- **Frontend:** React.js  
- **Backend:** Node.js with Express.js  
- **Database:** MongoDB  
- **Containerization:** Docker, Docker Compose  
- **Host OS:** Ubuntu
- **Virtualization:** Oracle VirtualBox
- **Version Control:** GitHub  

### **Key Actions:**  
- Developed Dockerfiles and Docker Compose configurations to containerize the frontend, backend, and database services.  
- Optimized application code for better performance and scalability while introducing UI/UX improvements for a more user-friendly experience.  
- Built possible lightweight Docker images and ensured all services functioned seamlessly within containers.  
- Deployed the containerized application on an Ubuntu host and mapped ports to ensure accessibility.  
- Managed version control through GitHub, documenting changes and ensuring smooth collaboration.  

### **Outcome:** 
- Enhanced application performance through code optimization and improved usability with new features.  
- Simplified deployment by encapsulating the stack into containers, reducing setup time and improving portability.  
- Facilitated collaboration through version control on GitHub, streamlining future updates and issue tracking.

---
## **Project Walkthrough**

### Table of Contents  
1. [Project Setup](#1-project-setup)  
   1.1 [Creating Ubuntu VM in VirtualBox](#11-creating-ubuntu-vm-in-virtualbox)  
   1.2 [Installing Node.js, NVM, and Docker](#12-installing-nodejs-nvm-and-docker)  
   1.3 [Setting Up Project Directory Structure](#13-setting-up-project-directory-structure)  
   &nbsp;&nbsp;&nbsp; 1.3.1 [Setting Up Frontend](#131-setting-up-frontend)  
   &nbsp;&nbsp;&nbsp; 1.3.2 [Setting Up Backend](#132-setting-up-backend)  
   1.4 [Installing Project Dependencies](#14-installing-project-dependencies)  

2. [Dockerizing the Application](#2-dockerizing-the-application)  
   2.1 [Configuring Docker Network](#21-configuring-docker-network)  
   2.2 [Creating Dockerfiles](#22-creating-dockerfiles)  
   2.3 [Setting up Docker Compose](#23-setting-up-docker-compose)  

3. [Building and Running Containers](#3-building-and-running-containers)  
   3.1 [Running Containers](#31-running-containers)  
   3.2 [Verifying Application](#32-verifying-application)  
   3.3 [Publishing Image to Docker Hub](#33-publishing-image-to-docker-hub)  

4. [Code Optimization](#4-code-optimization)  
   4.1 [Improving Frontend Queries](#41-improving-frontend-queries)  
   4.2 [Improving Backend Queries](#42-improving-backend-queries)  

5. [Orchestrating with Kubernetes](#5-orchestrating-with-kubernetes)  
6. [Version Control and Collaboration](#version-control-and-collaboration) 
7. [Challenges and Resolutions](#challenges-and-resolutions)  
8. [Outcome and Lessons Learned](#outcome-and-lessons-learned)  
9. [Future Improvements](#future-improvements)  

---

## 1. Project Setup  

## 1.1. Creating Ubuntu VM in VirtualBox  
This includes creating an Ubuntu VM on top of the Ubuntu host.  

![hostmachine](https://github.com/user-attachments/assets/696a0a77-0c47-43cf-8c4c-54463879d369)  
![vmdetail1](https://github.com/user-attachments/assets/0efe334f-9a5c-4273-9d74-0f1aa306fe82)


i. Create a VM with at least:  
   - 2G Memory  
   - 2 Processors  
   - 30G Disk size  
   - Bridge the VM network to your router network for better reachability.
     ![vmdetail2](https://github.com/user-attachments/assets/e71ce478-27db-4b3c-999e-0a31cf2e4d39)

     ![vm](https://github.com/user-attachments/assets/155d426c-e60a-44c1-aeec-d4557cb668e1)


ii. Configure IP manually for VM
    ![vmIP](https://github.com/user-attachments/assets/01e2c849-114a-4724-85b2-bd21a295b819)

## 1.2. Installing Node.js, NVM, and Docker  

i. Install NVM  
   - Visit the NVM [GitHub page](https://github.com/nvm-sh/nvm).  
   - Copy the curl command to download the installation script:
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh
     ```  

   - Audit the script by reviewing it before running. If you're satisfied, execute it:
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
     ```  

     Installing NVM enables you to manage multiple versions of Node.js seamlessly, allowing you to switch between versions as needed for different projects.

ii. Activate NVM  
   - Source your `.bashrc` to make NVM available:  
     ```bash
     source ~/.bashrc
     ```  

     Sourcing your `.bashrc` makes the NVM command available in your terminal session, enabling you to use NVM commands right away without restarting your terminal.  

iii. List Available Node.js Versions  
   - Use the following command to see all available versions:  
     ```bash
     nvm list-remote
     ```  

iv. Install a Specific Node.js Version  
   - Install the latest version:  
     ```bash
     nvm install v20.18.0
     ```  

v. Verify the installations:  
   - Run the following command to check the installed Node.js version:  
     ```bash
     node -v
     ```
     
vi. Now for docker, follow the official [link](https://docs.docker.com/engine/install/ubuntu/) to install in ubuntu.
   - Run the following command to uninstall all conflicting packages.
     ```bash
     for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
     ```
     If you are running this in freshly setup VM, apt-get might report that you have none of these packages installed.

   - Set up Docker's apt repository.
     ```bash
     # Add Docker's official GPG key:
      sudo apt-get update
      sudo apt-get install ca-certificates curl
      sudo install -m 0755 -d /etc/apt/keyrings
      sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
      sudo chmod a+r /etc/apt/keyrings/docker.asc
      ```
   - Add the repository to Apt sources
     ```bash
      echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
        $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      sudo apt-get update
     ```
   - Verify that the Docker Engine installation is successful by running the hello-world image
     ```bash
     sudo docker run hello-world
     ```


## 1.3. Setting Up Project Directory Structure

### 1.3.1. Setting Up Frontend

i. Create a directory named 'crud-webapplication'. Then in the directory, create react app named 'frontend'.
   ```bash
   mkdir crud-webapplication
   cd crud-webapplication/
   npx create-react-app frontend
   ```
   <img width="652" alt="frontendcreate" src="https://github.com/user-attachments/assets/0c8eb564-0d8e-4e27-912d-3c7f3466d611">


ii. Now as suggested in the Approach section of the frontend part from the [link](https://www.geeksforgeeks.org/how-to-build-a-basic-crud-app-with-node-js-and-reactjs/), create and copy those codes.


   <img width="1050" alt="frontApproach" src="https://github.com/user-attachments/assets/72dcb48e-1a91-4c12-9634-92ced69492ef">
   <br>
   <img width="883" alt="frontendCopy" src="https://github.com/user-attachments/assets/3d8307f5-c2aa-4eb4-8a50-33f502a05f57">
   <br>
   
   Below is what we see in 'frontend' and 'src' directories.
   
   ```
   frontend
   ├── README.md
   ├── node_modules/
   ├── package-lock.json
   ├── package.json
   ├── public/
   └── src
       ├── App.css
       ├── App.js
       ├── App.test.js
       ├── Components
       │   ├── StudentForm.js
       │   ├── StudentTableRow.js
       │   ├── create-student.component.js
       │   ├── edit-student.component.js
       │   └── student-list.component.js
       ├── index.css
       ├── index.js
       ├── logo.svg
       ├── reportWebVitals.js
       └── setupTests.js
   ```


### 1.3.2. Setting Up Backend

i. In the directory 'crud-webapplication', create directory 'backend'. Then, add more directories 'database', 'models' and 'routes' inside 'backend'.
   ```bash
   mkdir backend
   cd backend/
   mkdir database models routes
   ```

ii. Now as suggested in the Approach section of the backend part from the [link](https://www.geeksforgeeks.org/how-to-build-a-basic-crud-app-with-node-js-and-reactjs/), create and copy those codes.

<img width="1034" alt="backApproach" src="https://github.com/user-attachments/assets/2ffa56a2-65e8-4678-be7d-ee289ede3c53">

<img width="728" alt="backendCopy" src="https://github.com/user-attachments/assets/477de6cb-748e-4508-8a14-2366bdb3bb47">

Below is what we see in 'backend' directory

   ```bash
      backend/
      ├── database/
      │   └── db.js
      ├── models/
      │   └── Student.js
      ├──routes/
      │   └── student.route.js
      └── server.js
      
   ```

## 1.4. Installing Project Dependencies

i. In the frontend directory install react-bootstrap@next, bootstrap@5.1.0, react-router-dom, axios, formik and yup.

   ```bash
   npm i react-bootstrap@next bootstrap@5.1.0 react-router-dom axios formik yup
   ```
<img width="905" alt="front-dependencies" src="https://github.com/user-attachments/assets/f8414faa-1337-4006-a254-818efa97ee34">

ii. Check the installed frontend dependencies in package.json
   ```json
   {
     "name": "frontend",
     "version": "0.1.0",
     "private": true,
     "dependencies": {
       "@testing-library/jest-dom": "^5.17.0",
       "@testing-library/react": "^13.4.0",
       "@testing-library/user-event": "^13.5.0",
       "axios": "^1.7.7",
       "bootstrap": "^5.1.0",
       "formik": "^2.4.6",
       "react": "^18.3.1",
       "react-bootstrap": "^2.9.0-beta.1",
       "react-dom": "^18.3.1",
       "react-router-dom": "^6.27.0",
       "react-scripts": "5.0.1",
       "web-vitals": "^2.1.4",
       "yup": "^1.4.0"
     },
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "react-scripts test",
       "eject": "react-scripts eject"
     },
     "eslintConfig": {
       "extends": [
         "react-app",
         "react-app/jest"
       ]
     },
     "browserslist": {
       "production": [
         ">0.2%",
         "not dead",
         "not op_mini all"
       ],
       "development": [
         "last 1 chrome version",
         "last 1 firefox version",
         "last 1 safari version"
       ]
     }
   }
   ```

iii. Now, in the backend directory initialize npm and install express, body-parser, cors, mongoose, nodemon and dotenv.

   ```bash
   npm init -y
   npm install express body-parser cors mongoose nodemon dotenv
   ```
<img width="455" alt="back-dependencies1" src="https://github.com/user-attachments/assets/ddde5e34-9d76-46f5-b986-bc1e39ab60df">
<img width="778" alt="back-dependencies2" src="https://github.com/user-attachments/assets/d0021d4a-7755-47fe-ab40-a0c848f2deb4">


iv. Check the installed backend dependencies in package.json
   ```json
   {
     "name": "backend",
     "version": "1.0.0",
     "main": "server.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "start": "node server.js"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "description": "",
     "dependencies": {
       "body-parser": "^1.20.3",
       "cors": "^2.8.5",
       "dotenv": "^16.4.5",
       "express": "^4.21.1",
       "mongoose": "^8.7.2",
       "nodemon": "^3.1.7"
     }
   }
   ```
---

## 2. Dockerizing the Application

## 2.1. Configuring Docker network

i. Create network named 'webapp'. We are using this network to run our frontend, backend and database containers.

   ```bash
   docker network create webapp
   ```
<img width="486" alt="dockerNetwork" src="https://github.com/user-attachments/assets/14bd7be6-4917-42c0-aa26-dacaa4bf4b8c">

> [!IMPORTANT]
> By defining a custom network (webapp), the services (frontend, backend, and mongodb) are isolated from other containers on your host.

This automatically provides internal DNS resolution within the defined network.

Reference:
From backend/database/db.js
   ```javascript
   module.exports = {
     db: 'mongodb://web-mongodb:27017/reactdb'
   };
   ```
      - The string 'mongodb://web-mongodb:27017/reactdb' relies on Docker’s internal DNS to resolve web-mongodb to the MongoDB container’s private IP within the network.
      - If the IP of the MongoDB container changes (e.g., after a restart), you don’t need to modify the connection string because Docker manages the name resolution.
      - Even if the web-mongodb container restarts or the backend service reboots, the hostname remains valid, and no manual changes to the code are required.

ii. Next, we are binding port 80 on the host machine to port 3000 on the container that will run for frontend service.

   We bind using flag, "-p 80:3000" connecting conainer to "--network webapp"

iii Similarly for backend to connect with frontend, we are binding port 5000 on the host machine to port 4000 on container.
This is because we have configured frontend to connect with port 5000 on backend.
And backend server.js listens at port 4000.
<img width="836" alt="endpoints" src="https://github.com/user-attachments/assets/7489b6ff-7962-4a25-b8ec-e561c9f6f441">


   ```javascript
   //backend.server.js
   
   // PORT
   const port = process.env.PORT || 4000;
   const server = app.listen(port, () => {
   console.log('Connected to port ' + port);
   });
   ```

iv. Finally, like for frontend and backend, we also connect mongodb to network 'webapp'. And we are naming the container 'web-mongodb' because backend/database/db.js connects to mongodb with that name.

   ```javascript
   //backend/database/db.js
   module.exports = {
     db: 'mongodb://web-mongodb:27017/reactdb'
   };
   ```

## 2.2. Creating Dockerfiles  

i. First, let's create .dockerignore file in both frontend and backend directories. We don't want unnecessary copied into the Docker image.
   ```bash
   cd backend
   echo -e "# Ignore node_modules\nnode_modules\nnpm-debug.log\ndist\n\n# Ignore local environment files\n.env\n\n# Ignore any logs\n*.log\n\n# others\nDockerfile\nREADME.md" > .dockerignore
   ```

   Output
   ```bash
   bsuman@masternode:~/crud-webapplication/backend$ vim .dockerignore 
   bsuman@masternode:~/crud-webapplication/backend$ cat .dockerignore 
   # Ignore node_modules
   node_modules
   npm-debug.log
   dist
   
   # Ignore local environment files
   .env
   
   # Ignore any logs
   *.log
      
   #others
   Dockerfile
   README.md
   bsuman@masternode:~/crud-webapplication/backend$
   ```

ii. In frontend directory, create a file 'Dockerfile' and copy from below.

   ```bash
   cd frontend
   vim Dockerfile
   ```

   ```text
   # Frontend Dockerfile
   FROM 	node:latest
   WORKDIR	/app
   COPY	. .
   RUN	npm i react-bootstrap@next bootstrap@5.1.0 react-router-dom axios formik yup
   EXPOSE	3000
   CMD	npm start
   ```

iii. Similarly in backend directory, create a file 'Dockerfile' and copy from below.

   ```bash
   cd backend
   vim Dockerfile
   ```

   ```text
   # Backend Dockerfile
   FROM	node:latest
   WORKDIR	/backend
   COPY 	. .
   RUN	npm i express body-parser cors mongoose nodemon dotenv
   CMD	npm start
   ```

## 2.3. Setting up Docker Compose  
Now, create a docker-compose file in the main directory of 'crud-webapplication'

   ```bash
   vim ~/crud-webapplication/docker-compose
   ```
   ```yaml
   # ~/crud-webapplication/docker-compose
   version: "3.9"

   networks:
     webapp:
   services:
     frontend:
       container_name: frontend
       build: ./frontend
       ports:
         - 80:3000
       networks:
         - webapp
     backend:
       container_name: backend
       build: ./backend
       ports:
         - 5000:4000
       networks:
         - webapp
       depends_on:
         - mongodb
     mongodb:
       container_name: web-mongodb
       image: mongo
       networks:
         - webapp
   ```
---

## 3. Building and Running Containers
## 3.1. Running Containers

i. Using Dockerfile, lets start by build container images first.

   - For Frontend:
      ```bash
      cd ~/crud-webapplication/frontend
      docker build -t web-front .
      ```
   - For backend
      ```bash
      cd ~/crud-webapplication/backend
      docker build -t web-back .
      ```

ii. Then, build frontend container
   ```bash
    docker run -itd --name frontend --network webapp -p 80:3000 web-front
   ```

iii. Next, before we containerize backend let's containerize mongodb.
   ```bash
   docker run -itd --name web-mongodb --network webapp -p 27017 mongo
   ```
Although for persistent data storage, containerizing this way is not a good practice. However we are implementing for demonstration.


iv. Now, build backed container
   ```bash
   docker run -it --name backend --network webapp -p 5000:4000 web-back
   ```
   Let's not detach the terminal '-itd', because we are trying to observe what is being logged and see how the application interacts with MongoDB.

Here's the docker images.

<img width="488" alt="dockerImages" src="https://github.com/user-attachments/assets/7af1dc8a-b4a2-4a5a-a619-4af325c47f4c">

See the logs below when you make changes in application database.
<img width="1364" alt="dbLogs" src="https://github.com/user-attachments/assets/3b160302-c774-4032-b991-42c16a23871f">

You may refer below to [3.2.](#32-verifying-application) for activity done from browser.


v. Now lets test to run containers from docker-compose file.

   - This will create containers and images all from single file. Which is why, first, lets stop and remove previously created docker containers and images.

      ```bash
      docker stop $(docker ps -aq)
      docker rm $(docker ps -aq)
      docker rmi -f $(docker images -aq)
      ```

   - Also remove dangling images (unused intermediary layers), unused cache and data.
      ```bash
      docker image prune -f
      docker builder prune -a --force
      ```
   
   - Now lets run docker-compose
      ```bash
      docker compose up --build -d
      ```

     Images and Containers created:
      ```bash
      bsuman@masternode:~/crud-webapplication$ docker images
      REPOSITORY                     TAG       IMAGE ID       CREATED              SIZE
      crud-webapplication-frontend   latest    847a214e5bb5   About a minute ago   1.47GB
      crud-webapplication-backend    latest    b5845e2a66fb   5 minutes ago        1.16GB
      mongo                          latest    77c59b638412   2 days ago           855MB
      bsuman@masternode:~/crud-webapplication$
      bsuman@masternode:~/crud-webapplication$ 
      bsuman@masternode:~/crud-webapplication$ docker ps -a
      CONTAINER ID   IMAGE                          COMMAND                  CREATED              STATUS              PORTS                                         NAMES
      845160b507e5   crud-webapplication-backend    "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:5000->4000/tcp, [::]:5000->4000/tcp   backend
      eb2cdbd3e5d2   mongo                          "docker-entrypoint.s…"   About a minute ago   Up About a minute   27017/tcp                                     web-mongodb
      48fa4b2eccc3   crud-webapplication-frontend   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:80->3000/tcp, [::]:80->3000/tcp       frontend
      bsuman@masternode:~/crud-webapplication$ 
      bsuman@masternode:~/crud-webapplication$ 
      ```
   
## 3.2. Verifying Application

i. Since the application reachability is forwarded to Router's Network. We are browsing application at IP: 192.168.0.11:80
<img width="1364" alt="browsingApp" src="https://github.com/user-attachments/assets/fc8b318a-0964-40ec-ac5f-fbcab0d66a53">

ii. Create student info by filling form.
<img width="1311" alt="createStudent" src="https://github.com/user-attachments/assets/92f0a52d-d181-4256-9227-7d367f9a18b6">

<img width="1324" alt="createStudent2" src="https://github.com/user-attachments/assets/f068c3e3-4e2f-4a23-a39d-5d794a6feee5">

iii. Read the student list.
<img width="1324" alt="readStudent1" src="https://github.com/user-attachments/assets/b011bbf0-cde0-449f-82fe-c10727d9f75c">

iv. Update the student info.
<img width="1324" alt="updateStudent" src="https://github.com/user-attachments/assets/2400855a-e6a7-4b19-947a-ba370caf435e">

v. Delete student info.
<img width="1297" alt="deleteStudent" src="https://github.com/user-attachments/assets/1fb748d0-1881-4917-8dfd-5f4cf8e02f1e">

vi. Read the list again.
<img width="1326" alt="readStudent2" src="https://github.com/user-attachments/assets/77ea2b66-7408-4963-9c91-bbe5e5d59c63">


## 3.3. Publishing Image to Docker Hub

i. Logging to docker registry
   ```bash
   docker login -u bsumanji
   ```

ii. Tagging images
   ```bash
   docker tag crud-webapplication-frontend:latest bsumanji/frontend-crud-webapp
   docker tag crud-webapplication-backend:latest bsumanji/backend-crud-webapp
   ```

iii. Pushing images
   ```bash
   docker push bsumanji/frontend-crud-webapp
   docker push bsumanji/backend-crud-webapp
   ```
<img width="722" alt="pushingImages" src="https://github.com/user-attachments/assets/53305357-645c-4d15-8849-78e3a01d56e9">



---

## 4. Code Optimization

The actual javascript codes were written during older versions of some dependencies which created the issue to run the application in the latest versions. Though package.json for the frontend and backend have been updated recently in provided website the codes are still dependent on older versions of dependencies.

## 4.1. Improving Frontend Queries

i. Optimizing frontend/src/App.js

   Error that occurred in provided code:
   <img width="1303" alt="appjsIssue" src="https://github.com/user-attachments/assets/2525adc1-1330-44fe-a500-c65030281de4">
   
   Provided Code:
   ```javascript
   <Switch>
       <Route exact path="/" component={CreateStudent} />
       <Route path="/create-student" component={CreateStudent} />
       <Route path="/edit-student/:id" component={EditStudent} />
       <Route path="/student-list" component={StudentList} />
   </Switch>
   ```

   Optimized Code:
   ```javascript
   <Routes>
       <Route exact path="/" element={<CreateStudent />} />
       <Route path="/create-student" element={<CreateStudent />} />
       <Route path="/edit-student/:id" element={<EditStudent />} />
       <Route path="/student-list" element={<StudentList />} />
   </Routes>
   // The Route components use the element prop, which requires JSX syntax (e.g., <CreateStudent />).
   ```

   Import Statements:
   ```javascript
   // Provided Code
   import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
   
   // Optimized Code
   import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
   ```

ii. Optimizing frontend/src/Components/StudentForm.js

   - Added FormLabel for Accessibility:
      ```javascript
      //Label for Name Field
      <FormLabel htmlFor="name">Name</FormLabel>
      //Label for Email Field
      <FormLabel htmlFor="email">Email</FormLabel>
      //Label for Roll Number Field
      <FormLabel htmlFor="rollno">Roll Number</FormLabel>
      ```

   - Added Placeholder
     ```javascript
     //Placeholder for Name Field
     placeholder="Enter your full name"
     //Placeholder for Email Field
     placeholder="Enter your email"
     //Placeholder for Roll Number Field
     placeholder="Enter your class roll number"
     ```
     
   - Changed Email Input Type
     ```javascript
     //Provided Code:
     <Field name="email" type="text" className="form-control" />
     //Optimized Code:
     <Field name="email" type="email" id="email" placeholder="Enter your email" className="form-control" />
     ```
     
   - Error Message Styling Improvement
     ```javascript
     //Provided Code:
     <ErrorMessage name="name" className="d-block invalid-feedback" component="span" />
     //Optimized Code:
     <ErrorMessage name="name" component="span" className="text-danger" />
     ```

   - Removed console.log(props); Statement
     
   - Added Bootstrap’s mb-3 Class for Spacing
     ```javascript
     <FormGroup className="mb-3">
     ```
     
iii. URL Endpoint 'localhost:4000' Changed to '192.168.0.11:5000'  in the StudentTableRow.js, create-student.component.js, edit-student.component.js, student-list.component.js
      <img width="836" alt="endpoints" src="https://github.com/user-attachments/assets/dc76bdca-d9fc-4ed3-8dcc-afce97b804d5">


iv. Optimizing frontend/src/Components/create-student.component.js

   - Added Formik parameters: resetForm and setSubmitting are now used to improve form handling.
     ```javascript
     const onSubmit = (studentObject, { resetForm, setSubmitting }) => { ... }
     ```
   - Added to Reset the Form After Successful Submission
     ```javascript
     resetForm(); // Reset form fields to initial state
     ```
   - Added 'finally()' to Ensure Form Submission Ends
     ```javascript
     .finally(() => setSubmitting(false)); // Ensure Formik submission ends
     ```

v. Optimizing frontend/src/Components/edit-student.component.js

   Error that occurred in provided code:
   
   <img width="495" alt="editIssue" src="https://github.com/user-attachments/assets/5b430141-2a42-4b82-9a23-5edfce535c5f">

   The error that is encountering (undefined is not an object (evaluating 'props.match.params')) usually occurs when the match object or its params are unavailable in the component.     This happens because React Router version 6 and later changed how route parameters are accessed.


   - React Router Update: useParams()
     Used to access route parameters instead of props.match.params.id. This aligns with the modern version of React Router.
     
     ```javascript
     //Provided Code:
     axios.put("http://localhost:4000/students/students/" +props.match.params.id,studentObject)
     //Optimized Code:
     import { useParams, useNavigate } from "react-router-dom";  // New  //line 8

     //Other changes
     const { id } = useParams();  // Extract route parameter (id) //line 13
     
     axios.put(`http://192.168.0.11:5000/students/update-student/${id}`, studentObject) //line 23,24

     axios.get(`http://192.168.0.11:5000/students/update-student/${id}`) //line 39


   - Navigation Handling
     ```javascript
     //Provided Code:
     props.history.push("/student-list");

     //Optimized Code:
     const navigate = useNavigate();  // New useNavigate hook
     navigate("/student-list");  // Navigate after form submission
     ```
     Modern React Router Navigation: useNavigate() replaces the older props.history.push for programmatic navigation.


## 4.2. Improving Backend Queries

i. Optimized in backend/routes/server.js

   - Adjusted Import Path for studentRoute
      ```javascript
      //Provided Code
      const studentRoute = require('../backend/routes/student.route');
      
      //Optimized Code
      const studentRoute = require('./routes/student.route');
      ```

   - Use of dbConfig for MongoDB URI and backend/database/db.js
      ```javascript
      //Provided Code
      const { MONGODB_URI, PORT } = process.env;
      mongoose.connect('Your Connection String', { ... });
      
      //Optimized Code
      const dbConfig = require('./database/db');
      mongoose.connect(dbConfig.db, { ... });
   
      // backend/database/db.js
      module.exports = {
      db: 'mongodb://web-mongodb:27017/reactdb'
      };
      ```

   - Recommended Database COnnection Logic

     Issue in connection with mongodb
     
     <img width="876" alt="mongooseConnect" src="https://github.com/user-attachments/assets/7851a34b-96a9-4550-9903-fa57bce700d0">
      
      Recommend Solution
      ```javascript
      //In provided code:
      // Connecting to MongoDB Database
      mongoose.connect('Your Connection String', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      })
          .then(() => {
              console.log('Database successfully connected!');
          })
          .catch((error) => {
              console.log('Could not connect to database: ' + error);
          });
   
      // Recommend Code:
      mongoose.connect(dbConfig.db)
       .then(() => console.log('Database successfully connected!'))
       .catch(error => console.log('Could not connect to database: ' + error));
      ```
      Newer versions of Mongoose (6.x and above) no longer require useNewUrlParser or useUnifiedTopology because these features are now enabled by default.
   
   - Introduced Named Server Variable
      ```javascript
      //Provided Code
      app.listen(port, () => { ... });
      
      //Optimized Code
      const server = app.listen(port, () => { ... });
      ```
      The server instance is assigned to a variable (server). This makes it easier to access or manage the server instance later, such as for testing or graceful shutdowns.

ii. Optmized in backend/routes/student.route.js

   - Route Naming Changed
      ```javascript
      //Previous Code
      router.post('/students', async (req, res, next) => { ... });
      router.route('/students/:id').get(...).put(...);
      router.delete('/students/:id', async (req, res, next) => { ... });
   
      //Optimized Code
      router.post("/create-student", async (req, res, next) => { ... });
      router.route("/update-student/:id").get(...).put(...);
      router.delete("/delete-student/:id", async (req, res, next) => { ... });
      ```

   - Improved Deletion Logic
      ```javascript
      // DELETE Student
      router.delete("/delete-student/:id", async (req, res, next) => { ... });
      console.log("Student updated successfully !");

      const data = await Student.findByIdAndDelete(req.params.id); //line 60
      ```

---

## 5. Orchestrating with Kubernetes
Kubernetes deployment steps with YAML configurations.  
Saved in [another GitHub repository](https://github.com/sumanb007/kubernetes/tree/master/sample-project).

---

## Version Control and Collaboration  
Managing code and configurations through GitHub with proper documentation.

---

## Challenges and Resolutions  
Issues faced during container networking and their resolutions.

---

## Outcome and Lessons Learned  
Summary of achievements and skills gained from the project.

---

## Future Improvements  
- Integrating CI/CD pipelines for automated deployment.  
- Exploring Nginx as a reverse proxy for performance optimization.

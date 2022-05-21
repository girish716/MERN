# Task Manager

Current project uses Manogo DB to store data, Node js for backend leveraging Express JS and React JS for front end.

By using this app user can manage his/her daily tasks. My main focus while developing this app is on backend and connecting backend server with the Mongo DB using mongoose.

## `Front End Features`

1. By clicking on add button, user can add the task by providing description in the input.
  <img width="367" alt="image" src="https://user-images.githubusercontent.com/72153725/169648553-d4e00ba3-d59f-491f-9654-4193e6fd888d.png">
2. once tasks are added, user can delete & update the task by clicking on icon which are present at right side for each item. 
3. while updating the task, user will have option to make the task completed.
  <img width="411" alt="image" src="https://user-images.githubusercontent.com/72153725/169648635-8c9fbde0-f50d-40cc-a222-0eaeaed53da7.png">
4. If the task is completed, a task completed icon will be displayed to the left the task item, so that user users can easily identify completed tasks.
  <img width="400" alt="image" src="https://user-images.githubusercontent.com/72153725/169648657-51f699a5-0e3d-4547-94ed-c4703694fa58.png">
  
### `Error Handling`

1. when user tries to delete the task, while he is updating it, it will show error message in App like below.
  <img width="394" alt="image" src="https://user-images.githubusercontent.com/72153725/169649452-1d28ea2f-ab3f-45c6-bfd0-198d740f89a6.png">
2. when the server is down, app will show "Loading" text.
  <img width="353" alt="image" src="https://user-images.githubusercontent.com/72153725/169649534-2dadcc96-2b74-44b1-8d25-6b343845b783.png">

  
## `Back End Features`

1. It can return the list of all the tasks when user hits this (domain/api/v1/tasks) endpoint URL with GET request.
   <img width="369" alt="image" src="https://user-images.githubusercontent.com/72153725/169648874-9fe6902e-7e50-4b84-a0e4-c07b98040432.png">
2. simillarly for Creating the Task (domain/api/v1/tasks) with POST request
   <img width="631" alt="image" src="https://user-images.githubusercontent.com/72153725/169649012-57b3ce92-5acb-45cb-844a-f43171f5237c.png">
3. For getting the specific Task (domain/api/v1/tasks/taskId) with GET request  
   <img width="284" alt="image" src="https://user-images.githubusercontent.com/72153725/169649111-ec474c60-32e3-41e4-ab39-306175ee9a5d.png">
   ***Note : If the task with provided is not available then it returns below JSON***
4. For deleting the Task (domain/api/v1/tasks/taskId) with DELETE request.
5. For Updating the task (domain/api/v1/tasks/taskId) with PATCH request, as we are updating we also have to pass body, or else it will not update the Task.


### `Error Handling`

1. when user requests for the path which is not available, server will return "Route not found" text. This is handeled by the middleware in Express as mentioned below.
  <img width="582" alt="image" src="https://user-images.githubusercontent.com/72153725/169649672-fa8af0df-456d-42bd-bb65-e304e5e6ddd7.png">
2. server will only work when it was able to connect to the Mongo DB.
3. In order for the user to create the task using API, user must provide description for it in body, as it was made mandatory in Task schema, if not it will return below message.
  <img width="436" alt="image" src="https://user-images.githubusercontent.com/72153725/169649832-4d23805f-bc6f-4fa0-a449-aa0f5ba31de5.png">








    



  
  





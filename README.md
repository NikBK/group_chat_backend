# Group Chat Backend

Welcome to the backend repository for [Group Chat Backend]. This repository contains the server-side implementation for user authentication, admin operations, group management, and messaging functionalities.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your/group_chat_backend.git
   cd group_chat_backend
   ```
2. **Install dependencies**

    ```bash
    npm install
    ```
3. **Set up environment variables**

    ```bash
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/your-database
    MONGO_DB_NAME=group_chat_db
    JWT_SECRET=your_jwt_secret
    SALT_ROUND=10
    ```
4. **Start the server**

    ```bash
    npm start
    ```
5. **Test the API's**

    ```bash
    npm test

## API Endpoints

## Authentication

### Register a New User

- **POST /api/auth/signup**
  - Create a new user account.
  - Request Body:
    ```json
    {
      "username": "example",
      "email": "example@example.com",
      "password": "your_password"
    }
    ```
  - Response:
    ```json
    {
      "username": "example",
      "email": "example@example.com",
      "isAdmin": false,
      "_id": "user_id_here",
      "__v": 0
    }
    ```

### User Login

- **POST /api/auth/login**
  - Authenticate user and generate JWT token.
  - Request Body:
    ```json
    {
      "email": "example@example.com",
      "password": "your_password"
    }
    ```
  - Response:
    ```json
    {
      "token": "your_jwt_token_here"
    }
    ```

### User Logout

- **POST /api/auth/logout**
  - Invalidate current JWT token.
  - Response:
    ```json
    {
      "message": "Logout successful"
    }
    ```
## Admin Operations

### Create a New User (Admin)

- **POST /api/admin/createUser**
  - Create a new user by admin.
  - Authorization: Bearer Token with admin privileges.
  - Request Body:
    ```json
    {
      "username": "new_user",
      "email": "new_user@example.com",
      "password": "new_user_password"
    }
    ```
  - Response:
    ```json
    {
      "username": "new_user",
      "email": "new_user@example.com",
      "password": "hashed_password",
      "isAdmin": false,
      "_id": "new_user_id_here",
      "__v": 0
    }
    ```

### Edit User Details (Admin)

- **PUT /api/admin/user/:userId**
  - Update user details by admin.
  - Authorization: Bearer Token with admin privileges.
  - Request Body (fields to update):
    ```json
    {
      "username": "updated_username",
      "email": "updated_email@example.com"
    }
    ```
  - Response:
    ```json
    {
      "user": {
        "username": "updated_username",
        "email": "updated_email@example.com",
        "password": "hashed_password",
        "isAdmin": false,
        "_id": "new_user_id_here",
        "__v": 0
      }
    }
    ```

## Group Management

### Create a New Group

- **POST /api/groups**
  - Create a new group.
  - Authorization: Bearer Token
  - Request Body:
    ```json
    {
      "name": "Group Name",
      "members": ["member_id1", "member_id2"]
    }
    ```
  - Response:
    ```json
    {
      "_id": "group_id_here",
      "name": "Group Name",
      "members": ["member_id1", "member_id2", "group_creator_id"],
      "createdAt": "timestamp",
      "createdBy": "group_creator_id",
      "__v": 0
    }
    ```

### Search for Groups

- **GET /api/groups/search?q=test**
  - Get details of groups where the group name matches the query.
  - Authorization: Bearer Token
  - Response:
    ```json
    {
      "groups": [
        {
          "_id": "group_id_here",
          "name": "Testing Group",
          "members": ["member_id1", "member_id2"],
          "createdAt": "timestamp",
          "createdBy": "member_id1",
          "__v": 0
        }
      ]
    }
    ```

### Add Member to Group

- **POST /api/groups/:groupId/members**
  - Add a list of members to a group.
  - Authorization: Bearer Token
  - Request body
    ```json
    {
      "userIds": ["member_id3", "member_id4"]
    }
    ```
  - Response:
    ```json
    {
      "group": {
        "_id": "group_id_here",
        "name": "Testing Group",
        "members": ["member_id1", "member_id2", "member_id3", "member_id4"],
        "createdAt": "timestamp",
        "createdBy": "member_id1",
        "__v": 0
      }
    }
    ```

### Delete Group

- **DELETE /api/groups/:groupId**
  - Delete a group which in turn deletes all the messages related to this group.
  - Authorization: Bearer Token
  - Response:
    ```json
    {
      "message": "Group deleted successfully."
    }
    ```

## Messaging

### Send Message to Group

- **POST /api/groups/:groupId/messages/send**
  - Send a message to a group.
  - Authorization: Bearer Token
  - Request Body:
    ```json
    {
      "messageContent": "Message content"
    }
    ```
  - Response:
    ```json
    {
      "success": "true",
      "message": {
        "_id": "message_id_here",
        "text": "Message content",
        "sender": "sender_id_here",
        "group": "group_id_here",
        "createdAt": "timestamp",
        "likes": [],
        "__v": 0
      }
    }
    ```

### Like Message in Group

- **POST /api/groups/:groupId/messages/:messageId/like**
  - Like a message in a group.
  - Authorization: Bearer Token
  - Response:
    ```json
    {
      "success": "true",
      "message": {
        "_id": "message_id_here",
        "text": "Message content",
        "sender": "sender_id_here",
        "group": "group_id_here",
        "createdAt": "timestamp",
        "likes": ["user_id"],
        "__v": 0
      }
    }
    ```

---

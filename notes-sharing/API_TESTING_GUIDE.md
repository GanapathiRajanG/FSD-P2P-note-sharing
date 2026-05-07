# API Testing Guide - Peer-to-Peer Notes Sharing Application

This guide provides detailed instructions for testing all API endpoints using Postman, cURL, or any HTTP client.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require a JWT token. After login/register, include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Authentication Endpoints

### 1.1 Register User
**Endpoint:** `POST /auth/register`  
**Auth Required:** No  
**Description:** Create a new user account

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe",
    "isAdmin": false
  }
}
```

**Error Response (400):**
```json
{
  "error": "Email already registered"
}
```

---

### 1.2 Login User
**Endpoint:** `POST /auth/login`  
**Auth Required:** No  
**Description:** Login with email and password

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe",
    "isAdmin": false
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

### 1.3 Validate Token
**Endpoint:** `GET /auth/validate`  
**Auth Required:** Yes  
**Description:** Verify if the current token is valid and get user info

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "valid": true,
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe",
    "isAdmin": false
  }
}
```

---

## 2. Notes Management Endpoints

### 2.1 Create Note
**Endpoint:** `POST /notes`  
**Auth Required:** Yes  
**Description:** Create a new note

**Request:**
```json
{
  "title": "My First Note",
  "content": "This is the content of my note. It can be quite long.",
  "tags": ["important", "work", "todo"],
  "status": "draft"
}
```

**Response (201):**
```json
{
  "id": "note-uuid-here",
  "title": "My First Note",
  "content": "This is the content of my note. It can be quite long.",
  "tags": ["important", "work", "todo"],
  "status": "draft",
  "createdAt": "2026-05-06T10:30:00.000Z",
  "updatedAt": "2026-05-06T10:30:00.000Z"
}
```

---

### 2.2 Get All Notes
**Endpoint:** `GET /notes`  
**Auth Required:** Yes  
**Description:** Fetch all notes for the logged-in user

**Response (200):**
```json
[
  {
    "id": "note-uuid-1",
    "title": "My First Note",
    "content": "Content here...",
    "tags": ["important", "work"],
    "status": "draft",
    "createdAt": "2026-05-06T10:30:00.000Z",
    "updatedAt": "2026-05-06T10:30:00.000Z"
  },
  {
    "id": "note-uuid-2",
    "title": "Published Note",
    "content": "Published content...",
    "tags": ["public"],
    "status": "published",
    "createdAt": "2026-05-05T14:20:00.000Z",
    "updatedAt": "2026-05-05T14:20:00.000Z"
  }
]
```

---

### 2.3 Get Single Note
**Endpoint:** `GET /notes/:id`  
**Auth Required:** Yes  
**Description:** Fetch details of a specific note

**URL Parameter:**
- `id` - Note ID (UUID)

**Response (200):**
```json
{
  "id": "note-uuid-here",
  "userId": "user-uuid-here",
  "title": "My First Note",
  "content": "This is the content of my note.",
  "tags": ["important", "work"],
  "status": "draft",
  "createdAt": "2026-05-06T10:30:00.000Z",
  "updatedAt": "2026-05-06T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "Note not found"
}
```

---

### 2.4 Update Note
**Endpoint:** `PUT /notes/:id`  
**Auth Required:** Yes  
**Description:** Update an existing note

**URL Parameter:**
- `id` - Note ID (UUID)

**Request:**
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "tags": ["updated", "important"],
  "status": "draft"
}
```

**Response (200):**
```json
{
  "id": "note-uuid-here",
  "title": "Updated Title",
  "content": "Updated content",
  "tags": ["updated", "important"],
  "status": "draft",
  "createdAt": "2026-05-06T10:30:00.000Z",
  "updatedAt": "2026-05-06T11:45:00.000Z"
}
```

---

### 2.5 Delete Note
**Endpoint:** `DELETE /notes/:id`  
**Auth Required:** Yes  
**Description:** Delete a note

**URL Parameter:**
- `id` - Note ID (UUID)

**Response (200):**
```json
{
  "message": "Note deleted successfully"
}
```

---

### 2.6 Publish Note
**Endpoint:** `PUT /notes/:id/publish`  
**Auth Required:** Yes  
**Description:** Change note status from draft to published

**URL Parameter:**
- `id` - Note ID (UUID)

**Response (200):**
```json
{
  "message": "Note published successfully",
  "status": "published"
}
```

---

## 3. User Profile Endpoints

### 3.1 Get Current User Profile
**Endpoint:** `GET /users/profile`  
**Auth Required:** Yes  
**Description:** Get the profile of the logged-in user

**Response (200):**
```json
{
  "id": "user-uuid-here",
  "email": "user@example.com",
  "name": "John Doe",
  "bio": "I love sharing notes",
  "interests": "technology, writing",
  "createdAt": "2026-05-01T08:00:00.000Z",
  "isAdmin": false
}
```

---

### 3.2 Update User Profile
**Endpoint:** `PUT /users/profile`  
**Auth Required:** Yes  
**Description:** Update the profile of the logged-in user

**Request:**
```json
{
  "name": "John Updated",
  "bio": "Updated bio here",
  "interests": "technology, writing, design"
}
```

**Response (200):**
```json
{
  "id": "user-uuid-here",
  "email": "user@example.com",
  "name": "John Updated",
  "bio": "Updated bio here",
  "interests": "technology, writing, design",
  "createdAt": "2026-05-01T08:00:00.000Z",
  "isAdmin": false
}
```

---

### 3.3 Get All Users
**Endpoint:** `GET /users`  
**Auth Required:** No  
**Description:** Get list of all active users (for note sharing)

**Response (200):**
```json
[
  {
    "id": "user-uuid-1",
    "email": "user1@example.com",
    "name": "John Doe",
    "bio": "I love sharing notes"
  },
  {
    "id": "user-uuid-2",
    "email": "user2@example.com",
    "name": "Jane Smith",
    "bio": "Tech enthusiast"
  }
]
```

---

### 3.4 Get User by ID
**Endpoint:** `GET /users/:id`  
**Auth Required:** No  
**Description:** Get profile information of a specific user

**URL Parameter:**
- `id` - User ID (UUID)

**Response (200):**
```json
{
  "id": "user-uuid-here",
  "email": "user@example.com",
  "name": "John Doe",
  "bio": "I love sharing notes",
  "interests": "technology, writing",
  "createdAt": "2026-05-01T08:00:00.000Z"
}
```

---

## 4. Note Sharing Endpoints

### 4.1 Request Note Share
**Endpoint:** `POST /shares/request`  
**Auth Required:** Yes  
**Description:** Request access to another user's note

**Request:**
```json
{
  "ownerId": "owner-user-uuid",
  "noteId": "note-uuid"
}
```

**Response (201):**
```json
{
  "id": "request-uuid-here",
  "requesterId": "your-user-uuid",
  "ownerId": "owner-user-uuid",
  "noteId": "note-uuid",
  "status": "pending",
  "createdAt": "2026-05-06T12:00:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Request already exists"
}
```

---

### 4.2 Get Pending Requests
**Endpoint:** `GET /shares/requests`  
**Auth Required:** Yes  
**Description:** Get all pending share requests for notes you own

**Response (200):**
```json
[
  {
    "id": "request-uuid-1",
    "requesterId": "requester-uuid",
    "noteId": "note-uuid",
    "status": "pending",
    "createdAt": "2026-05-06T12:00:00.000Z",
    "email": "requester@example.com",
    "name": "John Request",
    "notesTitle": "Important Document"
  }
]
```

---

### 4.3 Accept Share Request
**Endpoint:** `PUT /shares/requests/:id/accept`  
**Auth Required:** Yes  
**Description:** Accept a share request for your note

**URL Parameter:**
- `id` - Request ID (UUID)

**Response (200):**
```json
{
  "message": "Request accepted",
  "status": "accepted"
}
```

---

### 4.4 Reject Share Request
**Endpoint:** `PUT /shares/requests/:id/reject`  
**Auth Required:** Yes  
**Description:** Reject a share request for your note

**URL Parameter:**
- `id` - Request ID (UUID)

**Response (200):**
```json
{
  "message": "Request rejected",
  "status": "rejected"
}
```

---

### 4.5 Get Shared Notes (Notes Shared With Me)
**Endpoint:** `GET /shares/shared-with-me`  
**Auth Required:** Yes  
**Description:** Get all notes that have been shared with you

**Response (200):**
```json
[
  {
    "id": "note-uuid-1",
    "title": "Shared Note Title",
    "content": "Shared note content...",
    "tags": ["shared", "important"],
    "createdAt": "2026-05-04T09:00:00.000Z",
    "author": "John Doe",
    "authorEmail": "john@example.com"
  }
]
```

---

## 5. Admin Endpoints

### 5.1 Get All Users (Admin Only)
**Endpoint:** `GET /admin/users`  
**Auth Required:** Yes (Admin)  
**Description:** Get list of all users with their status

**Response (200):**
```json
[
  {
    "id": "user-uuid-1",
    "email": "user@example.com",
    "name": "John Doe",
    "status": "active",
    "createdAt": "2026-05-01T08:00:00.000Z"
  },
  {
    "id": "user-uuid-2",
    "email": "banned@example.com",
    "name": "Bad User",
    "status": "banned",
    "createdAt": "2026-04-15T10:00:00.000Z"
  }
]
```

---

### 5.2 Ban/Unban User
**Endpoint:** `PUT /admin/users/:id/ban`  
**Auth Required:** Yes (Admin)  
**Description:** Ban or unban a user account

**URL Parameter:**
- `id` - User ID (UUID)

**Response (200):**
```json
{
  "message": "User banned",
  "status": "banned"
}
```

Or (if unbanning):
```json
{
  "message": "User unbanned",
  "status": "active"
}
```

---

### 5.3 Delete User
**Endpoint:** `DELETE /admin/users/:id`  
**Auth Required:** Yes (Admin)  
**Description:** Permanently delete a user and all their data

**URL Parameter:**
- `id` - User ID (UUID)

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

---

### 5.4 Get Dashboard Statistics
**Endpoint:** `GET /admin/stats`  
**Auth Required:** Yes (Admin)  
**Description:** Get system statistics for the admin dashboard

**Response (200):**
```json
{
  "totalUsers": 45,
  "activeUsers": 43,
  "bannedUsers": 2,
  "totalNotes": 156,
  "publishedNotes": 89,
  "totalRequests": 34,
  "pendingRequests": 12
}
```

---

## Testing Workflow Example

### Step 1: Register and Login
1. Call `POST /auth/register` with your email and password
2. Call `POST /auth/login` with same credentials
3. Copy the token from response

### Step 2: Create and Manage Notes
1. Call `POST /notes` to create a note (use token from Step 1)
2. Call `GET /notes` to fetch your notes
3. Call `GET /notes/{noteId}` to view a specific note
4. Call `PUT /notes/{noteId}` to update it
5. Call `PUT /notes/{noteId}/publish` to publish it
6. Call `DELETE /notes/{noteId}` to delete it

### Step 3: Share Notes
1. Call `GET /users` to find other users
2. Call `POST /shares/request` with their ID and a published note ID
3. Have the other user call `GET /shares/requests`
4. Have them call `PUT /shares/requests/{requestId}/accept`
5. Call `GET /shares/shared-with-me` to see shared notes

### Step 4: Admin Operations (requires admin account)
1. Call `GET /admin/stats` to see system statistics
2. Call `GET /admin/users` to see all users
3. Call `PUT /admin/users/{userId}/ban` to ban a user
4. Call `DELETE /admin/users/{userId}` to delete a user

---

## Health Check
**Endpoint:** `GET /api/health`  
**Auth Required:** No

**Response:**
```json
{
  "status": "Server is running"
}
```

---

## Common Error Responses

### 400 Bad Request
```json
{
  "error": "Title is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Note not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Postman Collection
You can import this as a Postman collection. Create an environment variable `base_url` = `http://localhost:5000/api` and `token` after logging in.

---

## cURL Examples

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","name":"Test User"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

**Create Note (replace TOKEN with your token):**
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"My Note","content":"Note content","tags":["test"],"status":"draft"}'
```

**Get Notes:**
```bash
curl -X GET http://localhost:5000/api/notes \
  -H "Authorization: Bearer TOKEN"
```

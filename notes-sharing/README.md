# 📝 Peer-to-Peer Notes Sharing Application

A modern, full-stack web application that enables users to create, manage, and securely share notes with other users. Built with React and Node.js/Express.

[![Status](https://img.shields.io/badge/Status-Complete-brightgreen)]()
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green)]()
[![React](https://img.shields.io/badge/React-v18+-blue)]()
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

---

## ✨ Features

### 📌 Core Features
- ✅ **User Authentication** - Secure login/register with JWT tokens
- ✅ **Note Management** - Create, read, update, delete notes
- ✅ **Note Publishing** - Save drafts and publish notes
- ✅ **Note Sharing** - Request access to other users' notes
- ✅ **User Profiles** - Create and manage user profiles
- ✅ **User Discovery** - Browse other users to find notes
- ✅ **Admin Dashboard** - Manage users and view system statistics
- ✅ **Responsive Design** - Works on desktop and mobile

### 🔐 Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Secure database with proper schema
- CORS protection
- Input validation

### 👥 Multi-User Features
- Independent user accounts
- Public and private note sharing
- Request/accept sharing workflow
- User ban/unban functionality

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side navigation
- **Axios** - HTTP client
- **CSS3** - Responsive styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Lightweight database
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing

### Database
- **SQLite** - Simple, file-based SQL database
- 4 tables: users, notes, note_requests, note_shares

---

## 📂 Project Structure

```
notes-sharing/
├── frontend/                      # React frontend application
│   ├── src/                      # React source code
│   │   ├── components/
│   │   │   └── Navbar.js        # Navigation component
│   │   ├── pages/               # Page components
│   │   │   ├── AdminPage.js     # Admin dashboard
│   │   │   ├── HomePage.js      # Home page
│   │   │   ├── LoginPage.js     # Auth page
│   │   │   ├── NotesListPage.js # Notes management
│   │   │   ├── NotesRequestPage.js # Share requests
│   │   └── ProfilePage.js       # User profile
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── styles/              # CSS files
│   │   ├── App.js               # Main app
│   │   └── index.js             # Entry point
│   ├── public/                   # Static files
│   ├── build/                    # Production build
│   └── package.json              # Frontend dependencies
│
├── backend/                       # Express.js backend server
│   ├── routes/                   # API endpoints
│   │   ├── auth.js              # Authentication
│   │   ├── notes.js             # Note CRUD
│   │   ├── users.js             # User profiles
│   │   ├── shares.js            # Note sharing
│   │   └── admin.js             # Admin functions
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/                  # Database models
│   ├── database.js              # Database setup
│   ├── server.js                # Express server
│   ├── package.json             # Backend dependencies
│   └── notes_sharing.db         # SQLite database
│
├── package.json                   # Root package.json for running both servers
├── SETUP_GUIDE.md                # Installation guide
├── API_TESTING_GUIDE.md          # API documentation
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- npm (comes with Node.js)

### Installation

```bash
# Install all dependencies (frontend + backend)
npm run install-all

# Or install manually:
# Backend dependencies
npm run install-server

# Frontend dependencies
npm run install-client
```

### Running the Application

**Start both servers simultaneously:**
```bash
npm start
```

**Or run them separately:**

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

Then open http://localhost:3000 in your browser.

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/validate` - Verify JWT token

### Notes (Protected)
- `GET /api/notes` - Get user's notes
- `POST /api/notes` - Create new note
- `GET /api/notes/:id` - Get specific note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `PUT /api/notes/:id/publish` - Publish note

### Users
- `GET /api/users` - List active users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/profile` - Get current user (Protected)
- `PUT /api/users/profile` - Update profile (Protected)

### Sharing (Protected)
- `POST /api/shares/request` - Request note access
- `GET /api/shares/requests` - Get pending requests
- `PUT /api/shares/requests/:id/accept` - Accept request
- `PUT /api/shares/requests/:id/reject` - Reject request
- `GET /api/shares/shared-with-me` - Get shared notes

### Admin (Protected, Admin Only)
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id/ban` - Ban user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Get statistics

Complete API documentation: [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)

---

## 📊 Database Schema

### Users Table
- `id` (UUID) - Primary key
- `email` - Unique email address
- `password` - Bcrypt hashed password
- `name` - User's display name
- `bio` - User biography
- `interests` - User interests
- `createdAt` - Registration date
- `isAdmin` - Admin flag
- `status` - 'active' or 'banned'

### Notes Table
- `id` (UUID) - Primary key
- `userId` - Owner's user ID
- `title` - Note title
- `content` - Note body
- `tags` - JSON array of tags
- `status` - 'draft' or 'published'
- `createdAt` - Creation date
- `updatedAt` - Last modified date

### Note Requests Table
- `id` (UUID) - Primary key
- `requesterId` - User requesting access
- `ownerId` - Note owner
- `noteId` - Requested note
- `status` - 'pending', 'accepted', or 'rejected'
- `createdAt` - Request date

---

## 🔐 Security Implementation

### Password Security
- Passwords are hashed using bcrypt with salt rounds
- Never stored in plain text
- Salted with factor 10 rounds

### Authentication
- JWT tokens with 7-day expiration
- Token required for protected endpoints
- Token verification via middleware

### Database Protection
- Parameterized queries prevent SQL injection
- Foreign key constraints
- User isolation (users only access their own notes)

### Authorization
- User can only modify their own notes
- Note owners approve share requests
- Admin-only endpoints with middleware check

---

## 🧪 Testing

### Using Postman
1. Register a new user at `POST /api/auth/register`
2. Copy the JWT token from the response
3. Use the token in Authorization header: `Bearer <token>`
4. Test endpoints as documented in API_TESTING_GUIDE.md

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","name":"Test"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

See [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) for complete testing guide.

---

## 🎯 User Workflows

### Creating and Sharing a Note
1. User A registers and logs in
2. User A creates a note (saved as draft)
3. User A publishes the note
4. User B registers and discovers User A
5. User B requests access to User A's note
6. User A approves the request
7. User B can now view the shared note

### Admin Management
1. Admin logs in with admin account
2. Admin views all users and statistics
3. Admin can ban users or delete accounts
4. Ban prevents user login
5. Delete removes all user data

---

## 📋 Features Checklist

### Authentication & Authorization
- [x] User registration with email
- [x] Secure password hashing
- [x] JWT-based login
- [x] Token validation
- [x] Admin role support

### Note Management
- [x] Create notes
- [x] Edit notes
- [x] Delete notes
- [x] Save as draft
- [x] Publish notes
- [x] Tag organization

### Note Sharing
- [x] Request access to notes
- [x] Accept/reject requests
- [x] View shared notes
- [x] Track pending requests

### User Management
- [x] User profiles
- [x] Update profile info
- [x] User discovery
- [x] View user info

### Admin Features
- [x] View all users
- [x] Ban/unban users
- [x] Delete users
- [x] View statistics
- [x] Manage system

### Frontend
- [x] Responsive design
- [x] Error handling
- [x] Loading states
- [x] Navigation
- [x] Form validation
- [x] Authentication flow

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port is in use
lsof -i :5000

# Use different port
PORT=3001 npm start
```

### Database errors
```bash
# Reset database
rm server/notes_sharing.db
npm start  # Creates new database
```

### CORS errors
- Ensure backend is running on port 5000
- Check frontend REACT_APP_API_URL setting
- CORS is enabled by default on backend

### Can't login
- Verify correct email and password
- Check JWT_SECRET is consistent
- Clear browser localStorage if needed

For more troubleshooting, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

## 📝 Configuration

### Environment Variables

**Backend (`server/.env`):**
```env
PORT=5000
JWT_SECRET=your_secret_key_change_in_production
NODE_ENV=development
```

**Frontend (`.env.local`):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📚 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Installation and configuration
- [API Testing Guide](API_TESTING_GUIDE.md) - API endpoints and examples
- [Backend Files](#project-structure) - Server code structure
- [Frontend Files](#project-structure) - React components

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `build/` folder
3. Set `REACT_APP_API_URL` environment variable

### Backend (Heroku/Railway)
1. Push code to Git repo
2. Set `JWT_SECRET` environment variable
3. Backend starts automatically

---

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📞 Support & Contact

For API documentation, see: **[API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)**

For setup help, see: **[SETUP_GUIDE.md](SETUP_GUIDE.md)**

---

## ✅ Completion Status

This project is **fully complete** with:
- ✅ Complete backend implementation
- ✅ Complete frontend implementation
- ✅ Database with proper schema
- ✅ All API endpoints functional
- ✅ Authentication and authorization
- ✅ Error handling
- ✅ Documentation
- ✅ Ready for deployment

---

**Last Updated:** May 2026  
**Version:** 1.0.0  
**Status:** Production Ready 🚀

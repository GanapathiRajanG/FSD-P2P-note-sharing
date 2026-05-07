# Peer-to-Peer Notes Sharing Application - Complete Setup Guide

## 📋 Overview

This is a **complete peer-to-peer notes sharing application** with both frontend (React) and backend (Node.js/Express) fully implemented.

**Key Features:**
- ✅ User authentication with JWT tokens
- ✅ Create, read, update, delete (CRUD) notes
- ✅ Note sharing with request/accept workflow
- ✅ User profiles and discovery
- ✅ Admin dashboard for user management
- ✅ Responsive React UI
- ✅ SQLite database with proper schema
- ✅ RESTful API architecture

---

## 📁 Project Structure

```
notes-sharing/
├── public/                   # Frontend static files
├── src/                      # Frontend React application
│   ├── components/           # Reusable React components
│   │   └── Navbar.js        # Navigation component
│   ├── pages/               # Page components
│   │   ├── AdminPage.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── NotesListPage.js
│   │   ├── NotesRequestPage.js
│   │   └── ProfilePage.js
│   ├── services/            # API integration
│   │   └── api.js           # Axios-based API service
│   ├── styles/              # CSS stylesheets
│   ├── App.js               # Main app component
│   └── index.js             # React entry point
├── server/                   # Backend Node.js/Express server
│   ├── routes/              # API route handlers
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── notes.js         # Notes CRUD endpoints
│   │   ├── users.js         # User profile endpoints
│   │   ├── shares.js        # Note sharing endpoints
│   │   └── admin.js         # Admin dashboard endpoints
│   ├── middleware/          # Custom middleware
│   │   └── auth.js          # JWT authentication
│   ├── database.js          # Database initialization
│   ├── server.js            # Express server setup
│   ├── package.json         # Backend dependencies
│   ├── .env.example         # Environment variables template
│   └── notes_sharing.db     # SQLite database (auto-created)
├── package.json             # Frontend dependencies
├── SETUP_GUIDE.md           # This file
├── API_TESTING_GUIDE.md     # API endpoint documentation
└── README.md                # Project overview
```

---

## ⚙️ Prerequisites

- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- A text editor or IDE (VS Code recommended)

**Verify Installation:**
```bash
node --version
npm --version
```

---

## 🚀 Installation & Setup

### Step 1: Install Backend Dependencies

Open a terminal and navigate to the backend folder:

```bash
cd server
npm install
```

This installs all required packages:
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `sqlite3` - Database
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `uuid` - Unique ID generation

### Step 2: Install Frontend Dependencies

From the project root directory:

```bash
npm install
```

This installs React and related dependencies.

### Step 3: Configure Environment Variables (Optional)

#### Backend Configuration
Create a `server/.env` file for custom configuration:

```env
PORT=5000
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=development
```

**Note:** The `.env.example` file in the server folder shows available options.

#### Frontend Configuration
Create `.env.local` in the project root (optional - frontend auto-detects backend):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

If not set, the frontend defaults to `http://localhost:5000/api`.

---

## ▶️ Running the Application

### Option 1: Run Backend and Frontend Separately (Recommended)

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm start
```

Or with auto-reload for development:
```bash
npm run dev
```

Expected output:
```
Connected to SQLite database
Server is running on port 5000
```

Backend runs at: **http://localhost:5000**

**Terminal 2 - Start Frontend Development Server:**
```bash
npm start
```

Expected output:
```
Compiled successfully!
You can now view the app in the browser.
Local: http://localhost:3000
```

Frontend runs at: **http://localhost:3000**

### Option 2: Quick Test

Check if both servers are running:

**Test Backend:**
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{ "status": "Server is running" }
```

**Test Frontend:**
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Creating Test Accounts

### Register a Regular User
1. Open http://localhost:3000
2. Click "Register"
3. Fill in email, password, and name
4. Click "Register"
5. You'll be logged in automatically with a JWT token

### Create an Admin Account

#### Method 1: Using Database Browser
1. Install SQLite Browser: https://sqlitebrowser.org/
2. Open `server/notes_sharing.db`
3. Find the users table
4. Edit the user you want to promote
5. Set `isAdmin` to `1`
6. Save and restart the backend

#### Method 2: Using SQLite CLI
```bash
# From server directory
sqlite3 notes_sharing.db
UPDATE users SET isAdmin = 1 WHERE email = 'admin@example.com';
.quit
```

---

## 📚 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  bio TEXT,
  interests TEXT,
  createdAt TEXT NOT NULL,
  isAdmin INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active'  -- 'active' or 'banned'
);
```

### Notes Table
```sql
CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  tags TEXT,  -- JSON array as string
  status TEXT DEFAULT 'draft',  -- 'draft' or 'published'
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### Note Requests Table
```sql
CREATE TABLE note_requests (
  id TEXT PRIMARY KEY,
  requesterId TEXT NOT NULL,
  ownerId TEXT NOT NULL,
  noteId TEXT NOT NULL,
  status TEXT DEFAULT 'pending',  -- 'pending', 'accepted', or 'rejected'
  createdAt TEXT NOT NULL,
  FOREIGN KEY (requesterId) REFERENCES users(id),
  FOREIGN KEY (ownerId) REFERENCES users(id),
  FOREIGN KEY (noteId) REFERENCES notes(id)
);
```

---

## 📡 API Endpoints Overview

All backend endpoints are documented in [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md).

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/validate` - Validate JWT token

### Notes Endpoints
- `GET /api/notes` - Get all user's notes
- `POST /api/notes` - Create new note
- `GET /api/notes/:id` - Get single note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `PUT /api/notes/:id/publish` - Publish note

### User Profile Endpoints
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users` - List all active users
- `GET /api/users/:id` - Get specific user

### Note Sharing Endpoints
- `POST /api/shares/request` - Request note access
- `GET /api/shares/requests` - Get pending requests
- `PUT /api/shares/requests/:id/accept` - Accept request
- `PUT /api/shares/requests/:id/reject` - Reject request
- `GET /api/shares/shared-with-me` - Get shared notes

### Admin Endpoints
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id/ban` - Ban/unban user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Get dashboard stats

See [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) for detailed request/response examples.

---

## 🧪 Testing the API

### Using Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Refer to [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) for endpoint examples
3. Create environment variables for `base_url` and `token`

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

### Using VS Code REST Client
Install the REST Client extension and create requests.http:
```http
### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "pass123",
  "name": "Test User"
}
```

---

## 📝 Workflow Examples

### Example 1: Create and Share a Note

1. **User A: Register** → `/auth/register`
2. **User A: Create Note** → `POST /notes` (creates draft)
3. **User A: Publish Note** → `PUT /notes/:id/publish` (change status)
4. **User B: Register** → `/auth/register`
5. **User B: Request Share** → `POST /shares/request` (with User A's ID)
6. **User A: View Requests** → `GET /shares/requests`
7. **User A: Accept Request** → `PUT /shares/requests/:id/accept`
8. **User B: View Shared** → `GET /shares/shared-with-me`

### Example 2: Admin Management

1. **Admin: Login** with admin account
2. **Admin: View Users** → `GET /admin/users`
3. **Admin: View Stats** → `GET /admin/stats`
4. **Admin: Ban User** → `PUT /admin/users/:id/ban`

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Use different port
PORT=5001 npm start
```

### Database errors
```bash
# Delete and recreate database
rm server/notes_sharing.db  # or delete on Windows
npm start  # Creates fresh database
```

### CORS errors
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` environment variable
- Backend has CORS enabled by default

### Authentication fails
- Verify JWT_SECRET is consistent
- Check token expiration (set to 7 days)
- Clear localStorage on browser if token corrupted

### Can't connect to backend
```bash
# Test backend connectivity
curl http://localhost:5000/api/health

# If fails, check:
1. Backend process is running
2. Correct port in frontend config
3. No firewall blocking port 5000
```

---

## 📚 Key Dependencies

### Backend
- **express** - Web framework
- **sqlite3** - Lightweight database
- **bcrypt** - Secure password hashing
- **jsonwebtoken** - JWT token management
- **cors** - Enable cross-origin requests
- **uuid** - Generate unique IDs

### Frontend
- **react** - UI framework
- **react-router-dom** - Client-side routing
- **axios** - HTTP client (via api.js wrapper)

---

## 🔒 Security Notes

⚠️ **For Production:**
1. Change `JWT_SECRET` to a strong random string
2. Use HTTPS instead of HTTP
3. Add input validation
4. Implement rate limiting
5. Use environment variables for sensitive data
6. Hash passwords securely (bcrypt is configured)
7. Add CSRF protection
8. Implement refresh token rotation

---

## 📖 File Descriptions

| File | Purpose |
|------|---------|
| `src/services/api.js` | Centralized API calls with error handling |
| `server/database.js` | SQLite setup and table initialization |
| `server/middleware/auth.js` | JWT verification middleware |
| `server/routes/*.js` | API endpoint handlers |
| `.env.example` | Environment variable template |
| `API_TESTING_GUIDE.md` | Comprehensive API documentation |

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Start backend server
3. ✅ Start frontend server
4. ✅ Create test accounts
5. ✅ Test creating and sharing notes
6. ✅ Refer to API_TESTING_GUIDE.md for endpoint details

---

## 📞 Support

For API endpoint details, see: **[API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)**

Happy coding! 🚀
3. Or use the database directly via SQL

After login with an admin account, you'll see the "Admin" menu option in the navbar.

## Features Implemented

### Frontend Features
✅ User Registration & Login
✅ User Profile Management
✅ Create, Edit, Delete, Publish Notes
✅ Search & Filter Notes
✅ Share Notes Requests (Accept/Reject)
✅ View Shared Notes
✅ Admin Dashboard with User Management
✅ Real-time Authentication
✅ Responsive Design

### Backend API Features
✅ Authentication (Register, Login, Token Validation)
✅ Notes CRUD Operations
✅ User Profile Management
✅ Note Sharing Request System
✅ Admin User Management & Statistics
✅ Database Integration with SQLite
✅ JWT-based Authentication
✅ CORS Support

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/validate` - Validate token

### Notes
- `POST /api/notes` - Create note
- `GET /api/notes` - Get user's notes
- `GET /api/notes/:id` - Get single note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `PUT /api/notes/:id/publish` - Publish note

### Users
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)
- `GET /api/users` - Get all active users
- `GET /api/users/:id` - Get user by ID

### Shares
- `POST /api/shares/request` - Request note share
- `GET /api/shares/requests` - Get share requests for user
- `PUT /api/shares/requests/:id/accept` - Accept share request
- `PUT /api/shares/requests/:id/reject` - Reject share request
- `GET /api/shares/shared-with-me` - Get notes shared with user

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:id/ban` - Ban/unban user (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `GET /api/admin/stats` - Get dashboard statistics (admin only)

## Database

The application uses SQLite with the following tables:

- `users` - User accounts with auth credentials
- `notes` - User notes with content and metadata
- `note_requests` - Share requests between users
- `note_shares` - Active note shares

Database file: `server/notes_sharing.db` (auto-created on first run)

## Building for Production

### Frontend
```bash
npm run build
```

This creates optimized production build in `build/` directory.

### Backend
The backend is production-ready as-is. For deployment:

1. Set environment variables on the production server
2. Ensure PORT is set appropriately
3. Use a process manager like PM2 or systemd

```bash
cd server
NODE_ENV=production npm start
```

## Troubleshooting

### Backend not starting
- Check if port 5000 is already in use: `netstat -tlnp | grep 5000`
- Install dependencies: `cd server && npm install`

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL environment variable
- Check browser console for CORS errors

### Database issues
- Delete `server/notes_sharing.db` to reset database
- Database will be recreated on next backend start

### Port already in use
- Change port: `PORT=5001 npm start` (in server directory)
- Update frontend API URL accordingly

## Development Notes

- All passwords are hashed with bcrypt
- JWTs expire after 7 days
- Notes can have tags for better organization
- Admin role provides access to dashboard
- All API endpoints are protected with CORS
- Database uses WAL mode for better concurrency

## Testing the Application

### Test User Accounts
Register new accounts through the UI or use these credentials if pre-populated:
- Email: test@example.com
- Password: password123

### Test Admin Functions
1. Create an account and manually set `isAdmin = 1` in database
2. Login with that account
3. Access Admin Dashboard from navbar

### Test Features
1. Create notes and save as drafts
2. Publish notes to make them shareable
3. Request access to other users' notes
4. Accept/reject share requests
5. View shared notes on home page

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check API response error messages

---

**Happy Sharing!** 📝

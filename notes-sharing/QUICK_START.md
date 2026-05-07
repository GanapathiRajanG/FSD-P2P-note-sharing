# ⚡ Quick Start Checklist

Follow this checklist to get your Peer-to-Peer Notes Sharing App running in minutes.

## Pre-Flight Checks ✅

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Project folder opened in terminal/editor

---

## Installation (5 minutes)

### Step 1: Backend Setup
```bash
cd server
npm install
```
- [ ] Command completed successfully
- [ ] `node_modules` folder created
- [ ] `package-lock.json` created

### Step 2: Frontend Setup
```bash
cd ..
npm install
```
- [ ] Command completed successfully
- [ ] `node_modules` folder in root created

---

## Running the Application

### Terminal 1: Start Backend
```bash
cd server
npm start
```
- [ ] See message: "Connected to SQLite database"
- [ ] See message: "Server is running on port 5000"
- [ ] Database file created: `server/notes_sharing.db`

### Terminal 2: Start Frontend
```bash
npm start
```
- [ ] Browser opens to http://localhost:3000
- [ ] See login page
- [ ] No error messages in console

---

## First-Time Setup

### Create Your First Account
- [ ] Click "Register" button
- [ ] Enter email (e.g., `test@example.com`)
- [ ] Enter password (e.g., `password123`)
- [ ] Enter name (e.g., `John Doe`)
- [ ] Click "Register"
- [ ] Logged in successfully
- [ ] See "Home" page with empty notes list

---

## Test Core Features

### Create a Note
- [ ] Click "Notes" in navigation
- [ ] Click "Create Note" button
- [ ] Enter title (e.g., "My First Note")
- [ ] Enter content
- [ ] Add tags (optional)
- [ ] Click "Save as Draft"
- [ ] Note appears in list

### Edit a Note
- [ ] Click on a note in the list
- [ ] Click "Edit" button
- [ ] Modify content
- [ ] Click "Update"
- [ ] Changes saved

### Publish a Note
- [ ] Open a note
- [ ] Click "Publish" button
- [ ] Status changes to "published"
- [ ] Note is now shareable

### Delete a Note
- [ ] Click on a note
- [ ] Click "Delete" button
- [ ] Confirm deletion
- [ ] Note removed from list

---

## Test Multi-User Features

### Create Second Account
- [ ] Open second browser/incognito window
- [ ] Go to http://localhost:3000
- [ ] Register with different email
- [ ] Log in successfully

### Share a Note
- [ ] In User A: Create and publish a note
- [ ] In User B: Go to "Share Requests"
- [ ] Click "Request Access"
- [ ] Select User A from list
- [ ] Select the published note
- [ ] Click "Request"
- [ ] Back in User A: See pending request
- [ ] Click "Accept"
- [ ] Back in User B: Note now appears in "Shared With Me"

---

## Test User Profile

- [ ] Click profile icon/name in navbar
- [ ] See profile information
- [ ] Edit profile (add bio, interests)
- [ ] Save changes
- [ ] Changes persist on page refresh

---

## Test Admin Features

### Create Admin Account
- [ ] Log in to backend database
  - Option 1: Use SQLite Browser app
  - Option 2: Use SQLite CLI: `sqlite3 server/notes_sharing.db`
- [ ] Find your user in users table
- [ ] Set `isAdmin` to `1`
- [ ] Save changes
- [ ] Restart backend (`npm start`)

### Access Admin Dashboard
- [ ] Log out and log back in
- [ ] See "Admin" option in navbar
- [ ] Click "Admin"
- [ ] See "User Management" section
- [ ] See "Statistics" section
- [ ] View user list
- [ ] Ban a user (user can't login)
- [ ] Delete a user (all data removed)

---

## Backend Health Check

### Check Server Status
```bash
curl http://localhost:5000/api/health
```
- [ ] Response: `{"status":"Server is running"}`

### Test Authentication
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@example.com","password":"pass123","name":"Test"}'
```
- [ ] Response includes `token` and `user` object

---

## Troubleshooting Checklist

### Backend Won't Start
- [ ] Check if port 5000 is in use
  ```bash
  lsof -i :5000  # macOS/Linux
  netstat -ano | findstr :5000  # Windows
  ```
- [ ] Try different port: `PORT=5001 npm start`
- [ ] Check `server/package.json` dependencies
- [ ] Reinstall: `cd server && rm -rf node_modules && npm install`

### Frontend Won't Connect
- [ ] Verify backend is running on port 5000
- [ ] Check browser console for errors (F12)
- [ ] Clear browser cache/localStorage
- [ ] Try incognito window
- [ ] Check `REACT_APP_API_URL` env variable

### Database Errors
- [ ] Delete database: `rm server/notes_sharing.db`
- [ ] Restart backend to recreate
- [ ] Check database file exists in `server/`

### Authentication Issues
- [ ] Clear localStorage in browser
- [ ] Check JWT token in network tab
- [ ] Verify correct password entered
- [ ] Check if account is banned

---

## Documentation Reference

- 📖 **Setup**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- 📡 **API**: [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)
- 📋 **Overview**: [README.md](README.md)
- 📊 **Status**: [PROJECT_STATUS.md](PROJECT_STATUS.md)

---

## Performance Notes

- [ ] Backend response time < 500ms
- [ ] Frontend loads < 2 seconds
- [ ] Database queries are fast
- [ ] No console errors
- [ ] All features responsive

---

## You're Done! 🎉

- [ ] Backend running
- [ ] Frontend running
- [ ] Can create account
- [ ] Can create notes
- [ ] Can share notes
- [ ] Can manage profile
- [ ] Admin features work (optional)
- [ ] No errors in console

**Congratulations!** Your Peer-to-Peer Notes Sharing App is fully functional! 🚀

---

## What's Next?

### Easy Enhancements
- [ ] Add note search functionality
- [ ] Add note filtering by tags
- [ ] Add user follow system
- [ ] Add note comments
- [ ] Add favorites/likes

### Medium Enhancements
- [ ] Add real-time updates (Socket.io)
- [ ] Add email notifications
- [ ] Add note versioning
- [ ] Add user analytics
- [ ] Add backup feature

### Advanced Enhancements
- [ ] Deploy to production
- [ ] Add GitHub OAuth login
- [ ] Implement full-text search
- [ ] Add data export (PDF)
- [ ] Add mobile app

---

## Support

For issues, check:
1. Console errors (F12 Developer Tools)
2. Terminal output
3. [SETUP_GUIDE.md](SETUP_GUIDE.md) Troubleshooting
4. [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) Examples

---

**Happy coding!** 🎊

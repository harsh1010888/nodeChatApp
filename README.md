# Real-Time Chat App

Hey! This is a chat application I built using MERN stack. It's got real-time messaging, group chats, and a cool dark blue theme. You can send files too!

## What it does

- Login and signup with your email
- Chat with people one-on-one
- Create group chats with multiple people
- Search for users to start chatting
- Upload and share files (images, PDFs, documents)
- See when someone is typing
- Get notifications for new messages
- Dark mode UI with blue theme
- Works on mobile and desktop

## Tech Stack

**Frontend:**

- React (the main UI library)
- Chakra UI (for styling components)
- Socket.io client (for real-time stuff)
- Axios (to call backend APIs)
- React Router (for navigation)
- React Lottie (for loading animations)

**Backend:**

- Node.js and Express.js
- MongoDB with Mongoose
- Socket.io (handles real-time chat)
- JWT (for authentication)
- bcryptjs (password hashing)
- Multer (file uploads)

## Project Structure

```
mern-chat-app/
├── backend/
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   └── generateToken.js         # JWT token generation
│   ├── controllers/
│   │   ├── chatControllers.js       # Chat logic
│   │   ├── messageControllers.js    # Message logic
│   │   └── userControllers.js       # User auth logic
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── errorMiddleware.js       # Error handling
│   ├── models/
│   │   ├── chatModel.js             # Chat schema
│   │   ├── messageModel.js          # Message schema
│   │   └── userModel.js             # User schema
│   ├── routes/
│   │   ├── chatRoutes.js            # Chat endpoints
│   │   ├── messageRoutes.js         # Message endpoints
│   │   ├── uploadRoutes.js          # File upload endpoint
│   │   └── userRoutes.js            # User endpoints
│   ├── uploads/                     # Uploaded files stored here
│   ├── .env                         # Environment variables
│   └── server.js                    # Main server file
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Authentication/
│   │   │   │   ├── Login.js
│   │   │   │   └── Signup.js
│   │   │   ├── miscellaneous/
│   │   │   │   ├── SideDrawer.js         # Search drawer
│   │   │   │   ├── ProfileModal.js       # User profile modal
│   │   │   │   ├── GroupChatModal.js     # Create group modal
│   │   │   │   ├── UpdateGroupChatModal.js
│   │   │   │   ├── AboutModal.js
│   │   │   │   └── FileUploadButton.js   # File upload component
│   │   │   ├── userAvatar/
│   │   │   │   ├── UserListItem.js
│   │   │   │   └── UserBadgeItem.js
│   │   │   ├── Chatbox.js               # Main chat area
│   │   │   ├── MyChats.js               # Chat list sidebar
│   │   │   ├── SingleChat.js            # Individual chat view
│   │   │   ├── ScrollableChat.js        # Message list
│   │   │   └── ChatLoading.js
│   │   ├── Context/
│   │   │   └── ChatProvider.js          # Global state
│   │   ├── Pages/
│   │   │   ├── Homepage.js
│   │   │   └── Chatpage.js
│   │   ├── animations/
│   │   │   └── typing.json              # Typing animation
│   │   ├── config/
│   │   │   └── ChatLogics.js            # Helper functions
│   │   ├── theme.js                     # Chakra UI theme config
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── screenshots/                     # App screenshots
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js installed (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- A code editor (VS Code recommended)

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/harsh1010888/nodechat.git
   cd nodechat
   ```

2. **Install backend dependencies**

   ```bash
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install --legacy-peer-deps
   cd ..
   ```

4. **Setup environment variables**

   Create `.env` file in `backend/` folder:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

   The frontend already has proxy setup in package.json to connect to backend.

5. **Start the application**

   Open two terminals:

   **Terminal 1 - Backend:**

   ```bash
   cd backend
   node server.js
   ```

   **Terminal 2 - Frontend:**

   ```bash
   cd frontend
   npm start
   ```

   Frontend will open at `http://localhost:3000`
   Backend runs at `http://localhost:5000`

## Common Issues Beginners Face

### 1. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Fix:**

- Kill the process using that port
- Windows: `netstat -ano | findstr :5000` then `taskkill /PID <process_id> /F`
- Or just change the port in .env file

### 2. MongoDB Connection Failed

**Error:** `MongoNetworkError` or `connection refused`

**Fix:**

- Check your MONGO_URI is correct
- Make sure your IP is whitelisted in MongoDB Atlas (or allow access from anywhere)
- Internet connection should be stable
- Free tier MongoDB Atlas clusters can be slow, give it time

### 3. JWT Authentication Error

**Error:** `User not authorized` or `Token expired`

**Fix:**

- Make sure JWT_SECRET in .env matches on backend
- Clear browser localStorage and login again
- Check if token is being sent in headers

### 4. CORS Error

**Error:** `Access to fetch has been blocked by CORS policy`

**Fix:**

- Make sure backend has CORS enabled (already done in server.js)
- Check proxy in frontend package.json is `"proxy": "http://localhost:5000"`
- Don't access backend directly from browser, use frontend

### 5. Socket.io Not Connecting

**Error:** Messages not showing in real-time

**Fix:**

- Make sure both backend and frontend are running
- Check socket connection in browser console
- Backend socket.io should allow frontend origin
- Try refreshing the page

### 6. File Upload Not Working

**Error:** Upload fails or returns 404

**Fix:**

- Make sure `backend/uploads/` folder exists
- Check multer is installed: `npm list multer`
- Verify uploadRoutes.js is properly imported in server.js
- File size limit is 5MB, check your file isn't too big

### 7. npm Install Errors

**Error:** `ERESOLVE unable to resolve dependency tree`

**Fix:**

- Use `npm install --legacy-peer-deps` instead
- Delete node_modules and package-lock.json, then reinstall
- Make sure you're using compatible Node version

### 8. Page Shows Blank After Login

**Fix:**

- Check browser console for errors
- Make sure all environment variables are set
- Clear cache and hard refresh (Ctrl+Shift+R)
- Check if APIs are responding in Network tab

### 9. Typing Indicator Stuck

**Fix:**

- Refresh the page
- It's a socket event, make sure socket connection is stable
- Check backend logs for socket errors

### 10. Group Chat Issues

**Error:** Can't add users or update group

**Fix:**

- Only group admins can add/remove users
- Make sure you're the admin of the group
- Check if user IDs are being sent correctly

## Tips for Development

- Always check browser console for errors
- Use Postman to test backend APIs separately
- MongoDB Compass is helpful to see your database
- Keep backend terminal open to see logs
- Use `console.log()` generously when debugging
- Socket.io has a client testing tool in Chrome DevTools

## Environment Variables Explained

**Backend .env:**

- `PORT` - Which port backend runs on (usually 5000)
- `MONGO_URI` - MongoDB connection string from Atlas
- `JWT_SECRET` - Any random string for token encryption
- `NODE_ENV` - Set to 'development' or 'production'

**Frontend:**

- Already has proxy configured, no .env needed for basic setup
- For production, you'll need to set backend URL

## Deployment

You can deploy this on platforms like:

- **Render** (recommended for beginners)
- **Railway**
- **Heroku** (paid now)
- **Vercel** (frontend only)

For backend, deploy the `backend/` folder as a web service.
For frontend, deploy the `frontend/` folder as a static site.

Make sure to:

- Set environment variables on hosting platform
- Change MongoDB to allow all IPs or add hosting server IP
- Update socket.io CORS settings for production URL

## Screenshots

Check the `screenshots/` folder to see how the app looks.

## What I Learned Building This

- Real-time communication with Socket.io
- JWT authentication and protected routes
- MongoDB schemas and relationships
- React Context API for state management
- File uploads with Multer
- Responsive UI with Chakra UI
- Debugging CORS and proxy issues

## Future Improvements

- Voice/video calling
- Message reactions and emojis
- Delete and edit messages
- User status (online/offline)
- Message read receipts
- Better file preview
- Push notifications

## License

Feel free to use this project for learning. If you find it helpful, give it a star!

---

Made with ☕ and lots of debugging

If you face any issues not listed here, open an issue on GitHub or check the browser console first!

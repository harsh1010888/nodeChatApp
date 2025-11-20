
# 💬 MERN Chat Application - Talk-A-Tive

A full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring Socket.io for instant messaging, JWT authentication, and a modern dark/light theme UI.

![Chat App Banner](https://img.shields.io/badge/MERN-Chat%20App-blue?style=for-the-badge&logo=react)
![Status](https://img.shields.io/badge/Status-Active-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## 🌟 Features

### ✨ **Core Features**
- 🔐 **JWT Authentication** - Secure user registration and login
- 💬 **Real-time Messaging** - Instant message delivery with Socket.io
- 👥 **Group Chats** - Create and manage group conversations
- 🔍 **User Search** - Find and connect with other users
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🌙 **Dark/Light Theme** - Toggle between themes with smooth transitions
- ⌨️ **Typing Indicators** - See when someone is typing
- 🔔 **Real-time Notifications** - Get notified of new messages
- 📷 **Profile Management** - View and update user profiles

### 🎨 **UI Enhancements**
- Modern chat bubbles with timestamps
- Smooth gradient backgrounds
- Enhanced input area with send button
- Loading states and animations
- Improved scrollbar styling
- Sticky header with blur effect

## 🛠️ Tech Stack

### **Frontend**
- **React.js** - UI library
- **Chakra UI** - Component library with theming
- **Socket.io-client** - Real-time communication
- **Axios** - HTTP client for API calls
- **React Router** - Navigation
- **React Lottie** - Animations

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt.js** - Password hashing

## 📁 Detailed Project Structure

### **Root Directory**
```
mern-chat-app/
├── 📁 backend/                 # Node.js Express Server
├── 📁 frontend/                # React Application
├── 📁 screenshots/             # App Screenshots
├── 📄 package.json            # Root package config
├── 📄 README.md               # Project documentation
└── 📄 .gitignore              # Git ignore rules
```

### **🔧 Backend Architecture**
```
backend/
├── 📁 config/                 # Configuration files
│   ├── db.js                  # MongoDB connection logic
│   └── generateToken.js       # JWT token generation
├── 📁 controllers/            # Business logic handlers
│   ├── userControllers.js     # User operations (register/login/search)
│   ├── chatControllers.js     # Chat management (create/access/group)
│   └── messageControllers.js  # Message handling (send/fetch)
├── 📁 data/                   # Sample/seed data
│   └── data.js               # Initial user data
├── 📁 middleware/             # Request processing middleware
│   ├── authMiddleware.js      # JWT authentication
│   └── errorMiddleware.js     # Error handling
├── 📁 models/                 # Database schemas
│   ├── userModel.js          # User schema & methods
│   ├── chatModel.js          # Chat room schema
│   └── messageModel.js       # Message schema
├── 📁 routes/                 # API endpoints
│   ├── userRoutes.js         # User-related routes
│   ├── chatRoutes.js         # Chat-related routes
│   └── messageRoutes.js      # Message-related routes
└── 📄 server.js              # Main server entry point
```

### **⚛️ Frontend Architecture**
```
frontend/src/
├── 📁 components/            # React components
│   ├── 📁 Authentication/   # Login/Signup components
│   ├── 📁 miscellaneous/    # Modals and utility components
│   ├── 📁 userAvatar/       # User display components
│   ├── Chatbox.js          # Main chat container
│   ├── MyChats.js          # Chat list sidebar
│   ├── SingleChat.js       # Individual chat interface
│   ├── ScrollableChat.js   # Message display area
│   └── styles.css          # Component styles
├── 📁 config/               # Helper functions
│   └── ChatLogics.js       # Chat utility functions
├── 📁 Context/              # Global state management
│   └── ChatProvider.js     # React Context for app state
├── 📁 Pages/                # Main page components
│   ├── Homepage.js         # Landing/Auth page
│   └── Chatpage.js         # Main chat interface
├── 📁 animations/           # Lottie animations
├── App.js                  # Main app component
├── index.js               # React entry point
├── theme.js               # Chakra UI theme configuration
└── background images      # UI assets
```

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### **1. Clone the Repository**
```bash
git clone https://github.com/harsh1010888/nodeChatApp.git
cd mern-chat-app
```

### **2. Backend Setup**
```bash
# Install backend dependencies
npm install

# Create environment file
cd backend
touch .env
```

**Backend Environment Variables (.env):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### **3. Frontend Setup**
```bash
# Install frontend dependencies
cd frontend
npm install --legacy-peer-deps
```

### **4. Run the Application**

**Start Backend Server:**
```bash
cd backend
npm run start
```

**Start Frontend (in new terminal):**
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000`

## 🔄 Data Flow & Communication

### **Real-time Communication:**
```
Frontend ←→ Socket.io ←→ Backend ←→ MongoDB
    ↓
1. User sends message
2. Frontend emits to socket
3. Backend saves to DB
4. Socket broadcasts to room
5. All users receive instantly
```

### **Authentication Flow:**
```
1. User login → JWT token generated
2. Token stored in localStorage
3. Token sent in headers for protected routes
4. Middleware validates token
5. User data attached to request
```

## 🎯 Key Features & Implementation

| Feature | Frontend Location | Backend Location | Description |
|---------|------------------|------------------|-------------|
| **Real-time Messaging** | `SingleChat.js` | `server.js` (Socket.io) | Instant message delivery |
| **User Authentication** | `Authentication/` | `userControllers.js` | JWT-based auth system |
| **Group Chat** | `GroupChatModal.js` | `chatControllers.js` | Multi-user chat rooms |
| **User Search** | `SideDrawer.js` | `userRoutes.js` | Find users by name/email |
| **Message History** | `ScrollableChat.js` | `messageControllers.js` | Persistent chat history |
| **Typing Indicators** | `SingleChat.js` | Socket events | Real-time typing status |
| **Theme System** | `theme.js` | N/A | Dark/Light mode toggle |

## 🎨 UI Screenshots

### Authentication
![Login](./screenshots/login.PNG)
![Signup](./screenshots/signup.PNG)

### Main Chat Interface
![Main Screen](./screenshots/mainscreen.PNG)
![Real-time Chat](./screenshots/real-time.PNG)

### Features
![User Search](./screenshots/search.PNG)
![Group Chat](./screenshots/new%20grp.PNG)
![Notifications](./screenshots/group%20+%20notif.PNG)
![User Management](./screenshots/add%20rem.PNG)
![Profile View](./screenshots/profile.PNG)

## 🐛 Common Issues & Solutions

### **Problem: New users can't see chat history**
```javascript
// Solution: Load chat history when user joins
const joinChat = async (chatId, userId) => {
  socket.join(chatId);
  const { data } = await axios.get(`/api/message/${chatId}`);
  setMessages(data);
  await axios.put(`/api/message/mark-read`, { chatId, userId });
};
```

### **Problem: Messages arriving out of order**
```javascript
// Solution: Sort messages by timestamp
socket.on('message received', (message) => {
  setMessages(prev => [...prev, message].sort((a, b) => 
    new Date(a.createdAt) - new Date(b.createdAt)
  ));
});
```

### **Problem: Too many typing events**
```javascript
// Solution: Debounce typing indicators
const handleTyping = debounce(() => {
  socket.emit('typing');
}, 500);
```

## 🚀 Deployment

### **Backend Deployment (Heroku/Railway)**
1. Set environment variables
2. Configure MongoDB Atlas
3. Deploy backend service

### **Frontend Deployment (Netlify/Vercel)**
1. Build the React app: `npm run build`
2. Deploy the build folder
3. Configure API base URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Harsh Omar**
- GitHub: [@harsh1010888](https://github.com/harsh1010888)
- LinkedIn: [Your LinkedIn Profile]
- Email: [Your Email]

## 🙏 Acknowledgments

- Socket.io for real-time communication
- Chakra UI for the component library
- MongoDB for the database solution
- All contributors and testers

---

⭐ **Star this repository if you found it helpful!**

  

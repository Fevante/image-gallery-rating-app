# Image Gallery with Star Ratings ⭐

> A full-stack React application for uploading, displaying, and rating images with an interactive star rating system.
**Note:** *Backend API provided as part of technical school assignment. Frontend implementation is my original work.*

## 🌟 Features

- ✅ Upload images via URL
- ✅ Interactive 5-star rating system
- ✅ Real-time rating updates
- ✅ URL validation (format & image type checking)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states and error handling
- ✅ Scroll-to-top button
- ✅ Empty state handling

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- Axios

**Backend (Provided):**
- Node.js
- Express
- CORS

**Note:** *Backend API provided as part of technical school assignment. Frontend implementation is my original work.*

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/Fevante/image-gallery-rating-app.git
cd image-gallery-rating-app
```

### Frontend Setup
```bash
cd image-gallery-rating-app
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

### Backend Setup
```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:3333`

## 🎯 Usage

1. Enter a valid image URL in the input field
2. Click "Submit Photo" to upload
3. Click on stars to rate images (1-5 stars)
4. Scroll down to see the scroll-to-top button appear
5. Images are displayed in a responsive grid layout

## 📁 Project Structure

```
image-gallery-rating-app/
├── image-gallery-rating-app/    # Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── ImageDisplay.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
└── backend/                    # Backend
    ├── index.js
    └── package.json
```

## 📚 What I Learned

- React 19 hooks (`useState`, `useEffect`, `useRef`)
- Building RESTful APIs with Express
- Form validation and error handling
- Responsive design with Tailwind CSS
- CSS transitions
- Managing async operations in React
- CORS configuration for API communication

# React Frontend for Django REST API (Tutorials)

This project is a React.js frontend for a Django REST API (tutorials). It includes:
- App component with navbar and router
- TutorialsList component to display all tutorials
- Tutorial component to edit a tutorial by id
- AddTutorial component to add a new tutorial
- TutorialService for API calls

## Getting Started

1. Make sure your Django backend is running at `http://localhost:8000/api/tutorials/`.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the React app:
   ```powershell
   npm run dev
   ```
4. Open your browser at the URL shown in the terminal (usually `http://localhost:5173`).

## Project Structure
- `src/components/` – React components
- `src/services/` – API service for HTTP requests

## Features
- List all tutorials
- Add a new tutorial
- Edit a tutorial by ID

---

This project uses [Vite](https://vitejs.dev/) for fast development and [react-router-dom](https://reactrouter.com/) for routing.

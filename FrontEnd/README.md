# Tutorial Management Frontend

A modern, elegant, and responsive frontend for a Django REST API that manages tutorials.

## Features

- **Dashboard (Home)**: Lists all tutorials with search functionality to filter by title
- **Create Tutorial Form**: Form to create a tutorial with validation
- **Edit View**: Edit an existing tutorial with pre-filled fields
- **Detail View**: Show all fields of a tutorial
- **Delete (Individual + All)**: Delete one or all tutorials with confirmation dialogs
- **Toggle Published Status**: Toggle the published state directly from the list or detail view
- **Published Only View**: A filtered view showing only published tutorials
- **Toast Notifications**: Success/error feedback for every API interaction
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works on all device sizes

## Tech Stack

- **Next.js**: React framework with App Router
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **shadcn/ui**: Component library
- **React Hook Form**: For form handling and validation
- **Zod**: For schema validation
- **Lucide React**: For icons

## Installation

1. Clone the repository:

\`\`\`bash
git clone <repository-url>
cd tutorial-management-frontend
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Start the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

This frontend is designed to work with a Django REST API that exposes the following endpoints:

- `GET /api/tutorials/` — List all tutorials (supports filtering by `title` via query string)
- `POST /api/tutorials/` — Create a new tutorial
- `DELETE /api/tutorials/` — Delete all tutorials
- `GET /api/tutorials/{id}/` — Retrieve a specific tutorial by ID
- `PUT /api/tutorials/{id}/` — Update a tutorial by ID
- `DELETE /api/tutorials/{id}/` — Delete a specific tutorial by ID
- `GET /api/tutorials/published/` — List tutorials where `published` is `true`

The API is expected to run on the same origin (e.g., `http://localhost:8000`).

## Project Structure

- `app/`: Next.js App Router pages
- `components/`: Reusable React components
- `lib/`: Utility functions and API services
- `types/`: TypeScript type definitions
- `public/`: Static assets

## Usage

### Dashboard

The dashboard displays all tutorials with a search bar to filter by title. You can:
- Search for tutorials by title
- Create a new tutorial
- Edit or delete existing tutorials
- Toggle the published status of tutorials
- Delete all tutorials at once

### Creating a Tutorial

Click on "Add Tutorial" in the navigation to create a new tutorial. Fill in:
- Title (required, max 70 characters)
- Description (required, max 200 characters)
- Published status (optional, default: false)

### Editing a Tutorial

Click on the "Edit" button on a tutorial card to edit its details.

### Viewing Tutorial Details

Click on the "View" button on a tutorial card to see all details of a tutorial.

### Published Tutorials

Click on "Published Tutorials" in the navigation to see only published tutorials.

## License

This project is licensed under the MIT License.

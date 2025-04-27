# OptiUrban Frontend

A modern React frontend application for the OptiUrban project - an urban planning optimization tool using AI to determine optimal locations for facilities.

## 🚀 Project Overview

OptiUrban Frontend integrates with the OptiUrban API to provide a user-friendly interface for urban planners. The application allows users to:

- Register and authenticate
- Input urban planning parameters
- Upload area maps for processing
- View analysis results with recommended optimal locations
- Export and share results

## 🛠️ Tech Stack

- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - For navigation and routing
- **Axios** - Promise-based HTTP client for API requests
- **React Hook Form** - Form validation and handling
- **Framer Motion** - Animations and transitions

## 📁 Project Structure

```
src/
├── api/                  # API configuration and services
├── components/           # Reusable UI components
│   └── layout/           # Layout components (Header, Footer, etc.)
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── pages/                # Page components
└── utils/                # Utility functions
```

## 🔄 Cloning and Setting Up the Project

1. Clone the repository
   ```bash
   git clone https://github.com/AMHezam22/KKU-GD-Frontend.git
   ```

2. Navigate to the project directory
   ```bash
   cd KKU-GD-Frontend
   ```

3. Install dependencies
   ```bash
   npm install
   ```

   If you encounter any dependency issues, you may need to install specific packages:
   ```bash
   npm install react-router-dom axios react-hook-form framer-motion
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. The application will be running at `http://localhost:3000`

## 🧩 Core Architecture Components

### Context (`src/context/`)

The Context folder contains React Context providers that manage global state across the application:

- **AuthContext.js** - Manages authentication state throughout the app
  - Provides user information to all components
  - Handles login, registration, logout functionality
  - Stores authentication tokens
  - Used by: Header, ProtectedRoute, profile-related components
  - Persists auth state using localStorage

Example usage:
```jsx
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Now you can access authentication state and methods
}
```

### Hooks (`src/hooks/`)

Custom hooks encapsulate reusable stateful logic:

- **useAuth.js** - Hook for accessing authentication context
  - Simplifies access to auth context throughout the app
  - Provides user data, auth state, and authentication methods
  - Used by: Any component needing authentication information
  
- **useApi.js** - Hook for simplified API interactions
  - Manages loading, error, and data states for API calls
  - Provides standardized methods for API requests
  - Handles common API patterns to reduce boilerplate
  - Used by: Any component making API calls

Example usage:
```jsx
import { useApi } from '../hooks/useApi';

function DataComponent() {
  const { loading, error, data, get } = useApi();
  
  useEffect(() => {
    get('/some-endpoint');
  }, []);
  
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  
  return <DisplayData data={data} />;
}
```

### Utils (`src/utils/`)

Utility functions contain pure, reusable logic:

- **validation.js** - Form validation functions
  - Used by: Form components for field validation
  
- **formatter.js** - Data formatting functions
  - Used by: Components displaying formatted data
  
- **helpers.js** - General helper functions
  - Used throughout the application

Example usage:
```jsx
import { formatCurrency } from '../utils/formatter';

function PriceDisplay({ amount }) {
  return <span>{formatCurrency(amount)}</span>;
}
```

### API (`src/api/`)

The API folder manages all backend communication:

- **endpoints.js** - Central repository of API endpoints
  - Defines all API paths as constants
  - Makes it easy to update endpoints in one place
  - Follows the OptiUrban API Swagger documentation
  
- **client.js** - Configures the Axios instance
  - Sets up base URL, interceptors, and default headers
  - Handles authentication token inclusion
  - Manages error responses

- **auth.js** - Authentication service
  - Encapsulates auth-related API calls
  - Handles token storage and management

Example usage:
```jsx
import apiClient from '../api/client';
import { MODEL_PREDICT } from '../api/endpoints';

async function predictOptimalLocations(data) {
  try {
    const response = await apiClient.post(MODEL_PREDICT, data);
    return response.data;
  } catch (error) {
    console.error("Prediction failed:", error);
    throw error;
  }
}
```

## 🎨 Styling with Tailwind CSS

The project uses Tailwind CSS for styling with the following configuration:

### tailwind.config.js

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        accent: "#8B5CF6",
        dark: "#1F2937",
      },
    },
  },
  plugins: [],
}
```

This configuration:
- Sets up content paths for Tailwind's JIT compiler
- Extends the default theme with custom color variables
- Enables custom utility classes defined in index.css

### Custom Component Classes

Custom component classes are defined in `src/index.css`:

```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded transition-colors duration-200 font-medium;
  }
  
  .btn-primary {
    @apply btn bg-primary text-white hover:bg-blue-600;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm;
  }
  
  /* More custom component classes... */
}
```

These classes provide consistent styling for common UI elements while maintaining the utility-first approach.

## 📄 Key Pages

- **HomePage** - Landing page with feature overview and CTA
- **SignUpPage** - Registration form with validation
- **SignInPage** - Login form with authentication
- **InputPage** - Form for entering urban planning parameters
- **ResultsPage** - Displays analysis results with visualizations
- **NotFoundPage** - Custom 404 error page

## 🔒 Authentication Flow

1. User registers via the SignUpPage, which calls the `/auth/register` endpoint
2. User logs in via the SignInPage, which calls the `/auth/token` endpoint
3. JWT token is stored in localStorage
4. AuthContext maintains authentication state
5. Protected routes check authentication before rendering
6. Token is automatically included in API requests via Axios interceptor

## 👥 Development Workflow

1. Create a new branch for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test locally
   ```bash
   npm start
   ```

3. Commit your changes with descriptive messages
   ```bash
   git add .
   git commit -m "Add meaningful commit message"
   ```

4. Push to the repository
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request on GitHub for code review

## 📱 Responsive Design

The application follows a mobile-first approach with responsive breakpoints:
- Small screens (< 640px): Single column layout
- Medium screens (640px - 768px): Two column layout for forms
- Large screens (> 768px): Multi-column layout with sidebars

## 🔄 API Integration

The application communicates with the OptiUrban backend API:

- **Authentication**: Register, login, user management
- **Data Input**: Submit urban planning parameters
- **Image Upload**: Upload map images for processing
- **Prediction**: Get optimal location recommendations
- **Results**: Retrieve and display analysis results

API calls are centralized in the API services, with endpoints defined in `endpoints.js`.

## 🧪 Testing

To run tests:
```bash
npm test
```

## 🚀 Building for Production

To create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🧠 Future Improvements

- Unit and integration tests
- Advanced state management with Redux Toolkit
- Progressive Web App (PWA) capabilities
- Performance optimizations
- Advanced visualization tools
- CI/CD pipeline integration
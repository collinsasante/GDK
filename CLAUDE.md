# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "echooling-react" - a React-based educational platform/learning management system (LMS) built with Create React App. The application displays courses, instructors, events, and blog posts with multiple page layouts and filtering capabilities.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm start

# Run tests in watch mode
npm test

# Build for production
npm run build
```

Note: This project uses npm (not yarn, despite yarn.lock being present).

## Architecture

### Component Structure

The application follows a page-component architecture:

- **`src/app/App.js`**: Main routing configuration using React Router v6. All routes are defined here with their corresponding page components.

- **`src/pages/`**: Full page components organized by feature area:
  - Each page (e.g., `home-2`, `course`, `event`, `blog`) has its own directory
  - Page components import and compose sections/components
  - Pattern: `index.js` exports the full page, `{PageName}Main.js` contains the main content sections

- **`src/components/`**: Reusable UI components organized by feature:
  - `Header/` - Navigation and top bar
  - `Footer/` - Footer variations (FooterTwo, etc.)
  - `Course/` - Course card variations (SingleCourse, SingleCourseTwo, SingleCourseThree, etc.)
  - `Blog/`, `Event/`, `Team/`, `Testimonial/` - Feature-specific components
  - `Breadcrumb/` - Page breadcrumbs with feature-specific variants
  - `Preloader/` - Loading spinner
  - `ScrollTop/` - Scroll-to-top functionality

- **`src/data/`**: Static JSON files serving as the data source:
  - `Courses.json` - Course catalog with pricing, duration, type, language, reviews
  - `Instructors.json` - Instructor profiles
  - `Events.json` - Event listings
  - `Posts.json` - Blog posts

### Styling

- Uses Bootstrap 5 for base styles (`bootstrap/dist/css/bootstrap.min.css`)
- Custom SCSS in `src/assets/scss/`:
  - `main.scss` - Entry point for all styles
  - `_variables.scss` - SCSS variables
  - `_design.scss` - Design system
  - `_menu.scss` - Navigation styling
  - `_animations.scss`, `_keyframes.scss` - Animation definitions
  - `_responsive.scss` - Media queries
  - `_custom-spacing.scss` - Spacing utilities

### Data Flow

- Data is imported directly from JSON files in `src/data/`
- Each JSON entity has an `id` field used for routing (e.g., `/course/:id`, `/blog/:id`)
- Components filter and map over JSON data based on criteria (type, language, category, etc.)

### Routing Pattern

Routes follow this structure:
- List pages: `/course`, `/event`, `/blog`, `/instructor`
- Detail pages: `/course/:id`, `/event/:id`, `/blog/:id`, `/instructor/:id`
- Variants: `/course-list`, `/course-sidebar`, `/event-sidebar`

## Key Implementation Details

### Page Layout Pattern

Most pages follow this structure:
```javascript
// src/pages/{feature}/index.js
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {FeatureName}Main from './{FeatureName}Main';

const FeaturePage = () => (
  <>
    <Header parentMenu="feature" />
    <FeatureMain />
    <Footer />
  </>
);
```

### Component Variations

The codebase uses numbered/named variations for different layouts:
- `SingleCourse`, `SingleCourseTwo`, `SingleCourseThree`, `SingleCourseFour` - Different course card layouts
- `SingleCourseList` - List view variant
- Similar patterns exist for other features

### Preloader

A 500ms preloader displays on initial app load (configured in [App.js](src/app/App.js#L28-L34)).

### Static Assets

- Images: `src/assets/images/` (organized by feature: course, contact, Home7, etc.)
- Fonts: `src/assets/fonts/`
- All image references in JSON use relative paths (e.g., `"1.png"` resolved from feature-specific directories)

## Testing

Tests use React Testing Library and Jest (configured via Create React App).

Run single test file:
```bash
npm test -- --testPathPattern=ComponentName
```

## Authentication System

The application includes a fully functional authentication system using React Context and localStorage:

### Authentication Architecture

- **`src/context/AuthContext.js`**: Core authentication context providing:
  - `useAuth()` hook for accessing auth state and methods
  - `login(email, password)` - Validates credentials and logs in user
  - `signup(email, username, password, confirmPassword)` - Registers new users
  - `logout()` - Clears user session
  - `user` - Current logged-in user object
  - `isAuthenticated` - Boolean authentication status
  - `loading` - Loading state during initialization

- **`src/components/ProtectedRoute`**: Wrapper component for routes requiring authentication
  - Redirects to `/login` if user is not authenticated
  - Shows loading state while checking auth status

### Data Storage

- User data is stored in localStorage:
  - `users` - Array of all registered users (email, username, password, id, createdAt)
  - `user` - Currently logged-in user (without password)
- **Note**: Passwords are stored in plain text for development. In production, implement proper backend authentication with hashed passwords.

### Authentication Flow

1. **Signup**: User registers via `/signup` → credentials validated → user created in localStorage → auto-login → redirect to home
2. **Login**: User logs in via `/login` → credentials checked against localStorage → session created → redirect to home
3. **Logout**: User clicks logout button in header → session cleared → remain on current page
4. **Persistence**: User stays logged in across page refreshes via localStorage

### Using Authentication in Components

```javascript
import { useAuth } from '../../context/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};
```

### Protected Routes Example

```javascript
import ProtectedRoute from '../components/ProtectedRoute';

<Route path="/protected-page" element={
  <ProtectedRoute>
    <MyProtectedPage />
  </ProtectedRoute>
} />
```

## Important Notes

- The app uses React Router v6 syntax (`element` prop, `Routes` component)
- Data layer: Static JSON files + localStorage for auth
- Home page route is `/` which renders `HomeTwo` component
- Error handling: 404 page at `src/pages/404.js` catches all unmatched routes

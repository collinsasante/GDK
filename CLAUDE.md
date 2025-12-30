# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Gospel Keys Demystified** - A professional React-based e-commerce platform for selling gospel piano lessons. Features a complete shopping cart, wishlist, multi-item checkout, and discount coupon system. Built on modern architecture with services layer, custom hooks, utilities, and full e-commerce functionality.

**Tech Stack:** React 18.2.0, React Router v6, Bootstrap 5, SCSS, Context API, localStorage

**E-Commerce Features:** Shopping Cart, Wishlist, Multi-Item Checkout, Coupon System, Order Management

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Run tests in watch mode
npm test

# Run tests with coverage
npm test:coverage

# Build for production
npm run build

# Build with production environment variables
npm run build:prod

# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Analyze bundle size (must run build first)
npm run analyze

# Run single test file
npm test -- --testPathPattern=ComponentName
```

**Note:** This project uses npm (not yarn, despite yarn.lock being present).

## Architecture

This codebase follows a **layered architecture** with clear separation of concerns:

### Services Layer (`src/services/`)

The services layer handles all business logic and data operations. **Always use services instead of direct localStorage access.**

- **`storageService.js`**: Centralized localStorage operations with error handling
  - `get(key, defaultValue)`, `set(key, value)`, `remove(key)`, `clear()`

- **`courseService.js`**: Course CRUD operations
  - `getAllCourses()` - Merges static JSON courses with user-created courses from localStorage
  - `getCourseById(id)`, `createCourse(data)`, `updateCourse(id, updates)`, `deleteCourse(id)`

- **`authService.js`**: Authentication with SHA-256 password hashing
  - `login(email, password)`, `signup(userData)`, `logout()`, `getCurrentUser()`
  - Passwords are hashed using crypto-js before storage

- **`enrollmentService.js`**: Enrollment and progress tracking
  - `enrollInCourse(userId, courseId)`, `getUserEnrollments(userId)`, `updateProgress(enrollmentId, progress)`

**Critical:** When implementing features that interact with data, always use the appropriate service rather than accessing localStorage directly.

### Custom Hooks (`src/hooks/`)

Reusable React hooks for common functionality:

- **`useCourses.js`**: Course state management with loading/error states
  ```javascript
  const { courses, loading, error, refetch } = useCourses();
  ```

- **`useEnrollment.js`**: Enrollment operations
  ```javascript
  const { enrollments, enroll, updateProgress } = useEnrollment(userId);
  ```

- **`useLocalStorage.js`**: Persist state to localStorage
  ```javascript
  const [value, setValue] = useLocalStorage('key', defaultValue);
  ```

### Utilities (`src/utils/`)

Helper functions for validation, formatting, and sanitization:

- **`validators.js`**: Input validation (email, password, username, price)
  - Use these validators in forms before submitting data

- **`formatters.js`**: Formatting utilities (dates, prices, numbers, text)

- **`sanitizers.js`**: XSS protection and input sanitization
  - Always sanitize user input before rendering

### Configuration (`src/config/`)

- **`constants.js`**: Application-wide constants
- **`routes.js`**: Route configuration and lazy loading setup

### Context API (`src/context/`)

- **`AuthContext.js`**: Global authentication state
  - Provides `useAuth()` hook: `{ user, isAuthenticated, login, signup, logout, loading }`

- **`CartContext.js`**: Shopping cart and wishlist state
  - Provides `useCart()` hook with cart and wishlist management
  - Functions: `addToCart`, `removeFromCart`, `clearCart`, `getCartTotal`, `getCartCount`
  - Wishlist: `addToWishlist`, `removeFromWishlist`, `isInWishlist`, `moveToCart`
  - Persists to localStorage automatically

- **`EnrollmentContext.js`**: Global enrollment state
  - Manages course enrollments and progress

### Component Structure

Components are organized by purpose:

- **`src/components/Header/`**: Navigation with cart and wishlist icons
- **`src/components/Footer/`**: Footer variations
- **`src/components/Breadcrumb/`**: Page breadcrumbs
- **`src/components/Course/`**: Course card variations (SingleCourseFour with e-commerce buttons)
- **`src/components/ShoppingCart/`**: Cart sidebar UI component
- **`src/components/ErrorBoundary/`**: Error boundary for graceful error handling
- **`src/components/ProtectedRoute/`**: Route wrapper requiring authentication

### Pages (`src/pages/`)

Full page components:

- **`home/`** (renamed from home-2) - Landing page with featured courses
- **`course/`** - Course listing and details
- **`wishlist/`** - Saved courses for later (NEW)
- **`checkout/`** - Multi-item cart OR single course checkout with coupon system (ENHANCED)
- **`my-lessons/`** - User's enrolled courses
- **`admin/`** - Admin dashboard for course management
- **`authentication/`** - Login and signup
- **`about/`, `contact/`** - Static pages
- **`404.js`** - Error page

Pattern: Each page directory has `index.js` (exports the page) and `{PageName}Main.js` (contains main content sections).

### Data Flow

1. **Static Data**: Imported from `src/data/*.json` files
2. **User-Generated Data**: Stored in localStorage via services
3. **Merged Data**: Services combine static JSON + localStorage data
4. **State Management**: Context API for global state, hooks for local state

## Key Implementation Patterns

### Using Services in Components

```javascript
import { courseService } from '../../services/courseService';
import { authService } from '../../services/authService';

// Get all courses (merges JSON + localStorage)
const courses = courseService.getAllCourses();

// Create new course (admin only)
const newCourse = courseService.createCourse({
  title: 'Advanced Gospel Chords',
  price: 99.99,
  duration: '8 weeks'
});
```

### Using Custom Hooks

```javascript
import { useCourses } from '../../hooks/useCourses';
import { useAuth } from '../../context/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated } = useAuth();
  const { courses, loading, error } = useCourses();

  if (loading) return <Preloader />;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* Render courses */}</div>;
};
```

### Page Layout Pattern

```javascript
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FeatureName }Main from './{FeatureName}Main';

const FeaturePage = () => (
  <>
    <Header parentMenu="feature" />
    <FeatureMain />
    <Footer />
  </>
);

export default FeaturePage;
```

### Protected Routes

```javascript
import ProtectedRoute from '../components/ProtectedRoute';

<Route path="/admin" element={
  <ProtectedRoute>
    <Admin />
  </ProtectedRoute>
} />
```

## Environment Variables

The app uses environment variables for configuration. **Always use `.env.example` as a template.**

Required variables:
```bash
REACT_APP_ADMIN_CODE=your_secret_code   # Admin registration code
REACT_APP_ENV=development               # Environment
REACT_APP_SESSION_DURATION=86400000     # Session timeout (ms)
```

Access in code:
```javascript
const adminCode = process.env.REACT_APP_ADMIN_CODE;
```

**Critical:** Never commit `.env` to git. It's already in `.gitignore`.

## Performance Optimizations

1. **Lazy Loading**: All routes are lazy-loaded using `React.lazy()` in [App.js](src/app/App.js)
2. **Code Splitting**: Automatic via lazy loading
3. **Suspense**: Fallback UI during route loading
4. **Error Boundaries**: [ErrorBoundary](src/components/ErrorBoundary) component wraps the entire app

## Security

### Password Security
- Passwords are hashed with SHA-256 via crypto-js before storage
- Plain text passwords never stored in localStorage
- Use `authService.js` for all auth operations

### Input Validation
Always validate user input:
```javascript
import { validators } from '../../utils/validators';

if (!validators.email(email)) {
  setError('Invalid email');
}

if (!validators.password(password)) {
  setError('Password must be 8+ chars with uppercase, lowercase, and number');
}
```

### Input Sanitization
Sanitize user input before rendering:
```javascript
import { sanitize } from '../../utils/sanitizers';

const cleanInput = sanitize.html(userInput);
```

## Data Storage

All data is stored in localStorage with these keys:
- `users` - Array of registered users (with hashed passwords)
- `user` - Currently logged-in user (without password)
- `pianoCourses` - User-created courses (merged with static JSON)
- `enrollments` - User course enrollments
- `session` - Session data with expiry
- **`shoppingCart`** - Array of cart items (NEW)
- **`wishlist`** - Array of wishlist items (NEW)

**Note:** This is development-only. Production requires a proper backend with database and server-side authentication.

## Routing

Routes use React Router v6 syntax:
- List pages: `/course`
- Detail pages: `/course/:id`
- E-commerce: `/wishlist`, `/checkout`
- Auth pages: `/login`, `/signup`
- Protected pages: `/admin`, `/my-lessons`, `/checkout`

The home page is at `/` and renders the `home` page component.

404 handling: All unmatched routes show [404.js](src/pages/404.js).

**E-Commerce Routes:**
- `/wishlist` - View saved courses (accessible to all)
- `/checkout` - Purchase cart items OR single course (requires auth)
- Cart sidebar - Opens via header icon (not a route)

## Styling

- **Base**: Bootstrap 5
- **Custom**: SCSS in `src/assets/scss/`
  - `main.scss` - Entry point
  - `_variables.scss` - SCSS variables
  - `_responsive.scss` - Media queries
  - `_menu.scss` - Navigation styling

## Common Development Tasks

### Adding a New Page

1. Create page directory: `src/pages/my-page/`
2. Create `index.js` and `MyPageMain.js`
3. Add lazy import in [App.js](src/app/App.js):
   ```javascript
   const MyPage = lazy(() => import('../pages/my-page'));
   ```
4. Add route:
   ```javascript
   <Route path="/my-page" element={<MyPage />} />
   ```

### Adding a New Service Method

1. Open appropriate service file in `src/services/`
2. Add method following existing patterns
3. Use `storageService` for localStorage operations
4. Always include error handling

### Creating a Custom Hook

1. Create file in `src/hooks/useMyHook.js`
2. Use existing hooks as templates
3. Include loading and error states when fetching data

## Testing

- Uses React Testing Library and Jest (configured via Create React App)
- Test files should be colocated with components or in `__tests__/` directories
- Run `npm test:coverage` to see coverage report

## Admin Functionality

- Admin users can upload courses via `/admin` page
- Registration requires admin secret code from environment variable
- Admin courses are stored in localStorage and merged with static courses
- Use `courseService.createCourse()` to add courses programmatically

## E-Commerce System

### Shopping Cart
The cart system is fully functional with CartContext managing state:

```javascript
import { useCart } from '../../context/useCart';

const {
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
  getCartTotal,
  getCartCount
} = useCart();

// Add course to cart
const courseData = {
  id, title, image, price, regularPrice, author, review, lesson
};
addToCart(courseData);
```

**Cart Features:**
- Add/remove items
- Persistent state (localStorage)
- Live count badge in header
- Slide-out sidebar UI
- Proceeds to multi-item checkout

### Wishlist
Similar to cart but for saving courses for later:

```javascript
const {
  wishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  moveToCart
} = useCart();
```

**Wishlist Features:**
- Save courses for later
- Heart icon on course cards
- Dedicated wishlist page
- Move items to cart
- Persistent state

### Checkout Flow
The checkout page handles TWO scenarios:

**1. Cart Checkout** (multiple items)
- Access via cart sidebar "Proceed to Checkout"
- Shows all cart items
- Enrolls in all courses
- Clears cart after purchase

**2. Single Item Checkout** (Buy Now)
- Access via "Buy Now" button on course card
- Uses URL params: `?lessonId=X&lessonTitle=Y&price=Z`
- Enrolls in one course
- Doesn't affect cart

### Coupon System
Hardcoded coupon codes in [CheckoutMain.js](src/pages/checkout/CheckoutMain.js):

```javascript
const validCoupons = {
  'GOSPEL10': 10,   // 10% off
  'SAVE20': 20,     // 20% off
  'WELCOME15': 15   // 15% off
};
```

Add new coupons by editing this object. Discounts apply to cart subtotal.

### Course Card E-Commerce Buttons
[SingleCourseFour.js](src/components/Course/SingleCourseFour.js) now includes:
- **Add to Cart** - Adds to cart with notification
- **Buy Now** - Direct checkout
- **Wishlist Heart** - Toggle wishlist (image overlay)
- Visual states: enrolled, in cart, in wishlist

## Important Notes

- The app uses **React Router v6** syntax (`element` prop, `Routes` component)
- Always import from services/hooks/utils rather than duplicating logic
- Password hashing uses crypto-js SHA-256 (client-side only - not production-grade)
- Component variations use numbered names: `SingleCourse`, `SingleCourseTwo`, etc.
- Static assets in `src/assets/images/` organized by feature
- All data operations should go through the services layer
- **Cart and wishlist** persist to localStorage automatically via CartContext
- **Checkout supports** both cart checkout and single-item checkout
- **Coupon codes** are case-insensitive and validated on apply

## Removed Features

The following template features have been removed as they're not needed:
- Blog pages and components
- Event pages and components
- Instructor pages and components
- Service components
- Coming soon page

If you need these features, they can be found in the original echooling-react template.

## E-Commerce Quick Reference

**Adding Item to Cart:**
```javascript
const { addToCart } = useCart();
addToCart({ id, title, image, price, regularPrice, author, review, lesson });
```

**Checking if Item in Cart:**
```javascript
const { isInCart } = useCart();
const inCart = isInCart(courseId); // returns boolean
```

**Opening Cart Sidebar:**
- User clicks cart icon in header
- Controlled by `cartOpen` state in Header component

**Checkout Flow:**
1. User adds items to cart OR clicks "Buy Now"
2. Redirects to `/checkout` (with or without URL params)
3. User fills payment form
4. Optional: Apply coupon code
5. Submit → enrolls in course(s)
6. Redirects to `/my-lessons?enrolled=true`
7. Cart clears (if cart checkout)

**Testing Coupons:**
- GOSPEL10 (10% off)
- SAVE20 (20% off)
- WELCOME15 (15% off)

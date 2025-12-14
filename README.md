
# Insta clone

## 🔧 Functionality

### Public Pages
- **Signup (`/signup`)**  
  Allows a new user to create an account.

- **Login (`/login`)**  
  Authenticates the user and stores the login token locally.

---

### Protected Pages (Login Required)

All protected pages are wrapped with `ProtectedRoute`.  
If the user is not logged in, they are redirected to the login page.

- **Home Feed (`/`)**  
  Displays posts from all users.  
  Clicking a post opens its detail page.

- **User Profile (`/profile/:userId`)**  
  Shows user information and their posts.  
  Users can follow or unfollow other users.

- **Create Post (`/create-post`)**  
  Allows logged-in users to create a new post.

- **Post Detail (`/post/:postId`)**  
  Shows a single post with full details.  
  Users can like or interact with the post.

- **Search User (`/search`)**  
  Allows searching for other users by username.

---

### Route Protection
- `ProtectedRoute` checks whether the user is authenticated.
- If authenticated → requested page is rendered.
- If not authenticated → user is redirected to `/login`.

---

##  How to Run the Project

### 1. Install Dependencies
```bash
npm install

npm run dev


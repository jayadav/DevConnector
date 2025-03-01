export const routes = [
  { name: "Login", path: "/login", type: "public" },
  { name: "Register", path: "/register", type: "public" },
  { name: "Dashboard", path: "/dashboard", type: "private" },
  { name: "Logout", path: "/logout", type: "private" },
  { name: "Posts", path: "/posts", type: "private" },
  { name: "Profile", path: "/profile/:id", type: "private" },
  { name: "Edit Profile", path: "/edit-profile", type: "private" },
  { name: "Create Post", path: "/create-post", type: "private" },
  { name: "Edit Post", path: "/edit-post/:id", type: "private" },
  { name: "404", path: "/404", type: "public" },
  { name: "Home", path: "/", type: "public" },
];


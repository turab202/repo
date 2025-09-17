import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [

  index("routes/Register.tsx"),
  // Register routes
  route("/register", "routes/register-page.tsx"),
  // Login routes
  route("/login", "routes/login-page.tsx"),
    route("/employee-dashboard", "routes/employee-dashboard-page.tsx"),
  route("/employer-dashboard", "routes/employer-dashboard-page.tsx")
] satisfies RouteConfig;




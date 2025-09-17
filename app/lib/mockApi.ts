// Mock API function to simulate backend calls
export const mockPostJson = async <T,>(
  path: string,
  body: unknown,
  init?: RequestInit
): Promise<T> => {
  console.log("Mock API call:", path, body);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (path === "/api/auth/register") {
    const { name, email, role } = body as any;
    
    // Validate inputs
    if (!name || !email || !body.hasOwnProperty('password')) {
      throw new Error("Name, email and password are required");
    }
    
    if (!email.includes('@')) {
      throw new Error("Please enter a valid email address");
    }
    
    // Return mock success response
    return {
      user: {
        id: Math.floor(Math.random() * 1000),
        name,
        email,
        role
      },
      accessToken: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    } as T;
  }
  
  if (path === "/api/auth/login") {
    const { email, password } = body as any;
    
    // Validate inputs
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    
    if (!email.includes('@')) {
      throw new Error("Please enter a valid email address");
    }
    
    // Check if user exists in localStorage (previously registered)
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      
      // Simple mock validation - in real app, verify password hash
      if (userData.email === email) {
        return {
          user: userData,
          accessToken: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now()
        } as T;
      }
    }
    
    // If no stored user, create a mock one based on email
    // This allows testing without going through registration first
    const role = email.includes('company') || email.includes('employer') 
      ? "employer" 
      : "applicant";
    
    return {
      user: {
        id: Math.floor(Math.random() * 1000),
        name: email.split('@')[0],
        email,
        role
      },
      accessToken: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    } as T;
  }
  
  throw new Error(`Mock API error: No handler for ${path}`);
};
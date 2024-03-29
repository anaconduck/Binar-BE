interface LoginRequest {
    email: string;
    password: string;
  }
  
  interface RegisterRequest {
    email: string;
    name: string;
    password: string;
    profile_picture_url: string;
    role: string;
  }
  
  export { LoginRequest, RegisterRequest };
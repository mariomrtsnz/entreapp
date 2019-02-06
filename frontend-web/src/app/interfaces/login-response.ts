export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
    picture: string;
    language: string;
  };

}

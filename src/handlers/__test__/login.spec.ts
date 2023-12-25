import request from "supertest";
import app from "../../app";

describe('POST /api/auth/login', () => {
  it('should response with 200 as status code and return login data', async () => {
    const loginData = {
      email: 'alex@gmail.com',
      password: 'alex12345',
    };

    return request(app)
      .post('/api/auth/login')
      .set('Content-type', 'application/json')
      .send(loginData)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('OK');
        expect(res.body.message).toBe('User logged in succesfully');
        expect(res.body.data).toHaveProperty("access_token");
        console.log(res.body);
      });
      
  });

  
});
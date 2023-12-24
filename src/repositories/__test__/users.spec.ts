import UserRepository from "../users";

describe("find user by email", () => {
    it('should return user:', async ()=> {
        const testEmail = "alex@gmail.com"
        const findUser = await UserRepository.getUserByEmail(testEmail);
        expect(findUser).not.toBeNull();
    });
});
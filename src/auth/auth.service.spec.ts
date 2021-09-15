import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from './users.repository';

const mockUserRepository = () => ({
createUser : jest.fn()
});

const mockUser = {
  email: 'ariel@com',
  password: 'cfif1992',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    authService = module.get(AuthService);
    userRepository = module.get(UserRepository);
  });

  
  describe('createUser', () => {
    it('calls UserRepository.createUser and returns the result', async () => {
      userRepository.createUser.mockResolvedValue('createdUser');
      const result = await authService.signUp(mockUser);
      expect(result).toEqual('createdUser');
    });
  });
});

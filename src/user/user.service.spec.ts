import { Test, TestingModule } from '@nestjs/testing';
import { UserDatabase } from './database/user.database';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

describe('UserService', () => {

    let userService: UserService

    let mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        findOneAndUpdate: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserDatabase,
                    useValue: mockRepository
                },
            ]
        }).compile();

        userService = module.get<UserService>(UserService);

    });

    describe("list", () => {

        it('should return a list of users', async () => {

            const users = [
                {
                    name: '',
                    email: '',
                    password: '',
                    isActive: true
                },
                {
                    name: '',
                    email: '',
                    password: '',
                    isActive: true
                }
            ]

            mockRepository.find.mockReturnValue(users);

            let result = await userService.list()

            expect(result).toEqual(users);
        });


        it('Should return an emprty array list', async () => {

            const users = [
            ]

            mockRepository.find.mockReturnValue(users);

            let result = await userService.list()

            expect(result).toEqual([]);

        })


        it('Should return a user with the same email', async () => {

            const user = {
                name: 'teste@teste.com',
                email: '',
                password: '',
                isActive: true
            }

            mockRepository.findOne.mockReturnValue(user);

            let result = await userService.findByEmail('teste@teste.com')

            expect(result.email).toEqual(user.email);

        })


        it('Should return null when a user exists', async () => {

            const user = {
                name: 'teste@teste.com',
                email: '',
                password: '',
                isActive: true
            }

            const userDto: CreateUserDto = {
                email: 'teste@teste.com',
                password: 'teste',
                name: 'tester'
            }

            mockRepository.findOne.mockReturnValue(user);

            let result = await userService.create(userDto)

            expect(result).toBeUndefined();

        })

    });

})
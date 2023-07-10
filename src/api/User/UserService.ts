import { dataSource } from '@services/database/dataSource'
import { User } from './User.entity'

class UserService {
    private userRepository = dataSource.getRepository(User)

    async deleteUser(id: number) {
        await this.userRepository.update(id, { isDeleted: true })
    }
}

export const instanceUserService = new UserService()

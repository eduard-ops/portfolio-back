import { dataSource } from '@services/database/dataSource'

import { IAuth } from './Auth.dto'

import { User } from '@api/User/User.entity'

class AuthService {
    private userRepository = dataSource.getRepository(User)

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        return user
    }

    async createUser(obj: IAuth) {
        await this.userRepository.save(obj)
    }

    async setTokenUser(id: number, accessToken: string) {
        await this.userRepository.update(id, { accessToken })
    }

    async findById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } })
        return user
    }

    async unsetToken(id: number) {
        await this.userRepository.update(id, { accessToken: null })
    }
}

export const instanceAuthService = new AuthService()

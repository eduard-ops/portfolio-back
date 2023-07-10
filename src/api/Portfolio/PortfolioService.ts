import { Portfolio } from './Portfolio.entity'

import { IPortfolio } from './Portfolio.dto'

import { dataSource } from '@services/database/dataSource'

class PortfolioService {
    private portfolioRepository = dataSource.getRepository(Portfolio)

    async createPortfolio(
        portfolio: IPortfolio
    ): Promise<Portfolio | undefined> {
        const result = await this.portfolioRepository.save(portfolio)
        return result
    }

    async deletePortfolio(portfolio_id: number) {
        const result = await this.portfolioRepository.delete(portfolio_id)
        return result
    }

    async findPotfolio(id: number, user_id: number) {
        const portfolio = await this.portfolioRepository.findOne({
            where: { user: { id: user_id }, id: id },
        })

        return portfolio
    }
}

export const instancePortfolioService = new PortfolioService()

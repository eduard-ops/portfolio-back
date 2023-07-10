import { Portfolio } from '@api/Portfolio/Portfolio.entity'
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('varchar')
    email: string

    @Column('varchar')
    password: string

    @Column({ type: 'varchar', default: null })
    accessToken: string | null

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean

    @OneToMany(() => Portfolio, (portfolio) => portfolio.user, {
        cascade: true,
    })
    portfolio: Portfolio

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at: Date
}

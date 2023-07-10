import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
} from 'typeorm'

import { User } from '@api/User/User.entity'

import { Image } from '@api/Image/Image.entity'

@Entity()
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'character varying' })
    name: string

    @Column({ type: 'character varying' })
    description: string

    @ManyToOne(() => User, (user) => user.portfolio)
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => Image, (image) => image.portfolio)
    images: Image[]

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

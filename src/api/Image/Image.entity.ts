import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm'

import { Portfolio } from '@api/Portfolio/Portfolio.entity'

@Entity({ name: 'images' })
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'character varying' })
    name: string

    @Column({ type: 'character varying' })
    description: string

    @Column({ type: 'character varying' })
    url: string

    @Column({ type: 'character varying', nullable: true })
    cloudinary_id: string

    @ManyToOne(() => Portfolio, (potrfolio) => potrfolio.images, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'portfolio_id' })
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

    toResponseObject(): Partial<Image> {
        const { name, description, url, portfolio } = this
        return {
            name,
            description,
            url,
            portfolio,
        }
    }
}

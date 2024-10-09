import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    AutoIncrement
} from 'sequelize-typescript';
import { User } from './user'; 
import { Product } from './product'; 

@Table
export class Cart extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @ForeignKey(() => User)
    @Column
    declare userId: number;

    @ForeignKey(() => Product)
    @Column
    declare productId: number;

    @Column
    declare quantity: number;

    @BelongsTo(() => User)
    user!: User;    

    @BelongsTo(() => Product)
    product!: Product; 
}

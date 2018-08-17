import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { Order } from './sale';

@JsonApiModelConfig({ type: 'usertypes' })
export class UserType extends JsonApiModel {
	@Attribute() name: string;
}

@JsonApiModelConfig({ type: 'users' })
export class User extends JsonApiModel {
	@Attribute() email: string;
	@Attribute() first_name: string;
	@Attribute() last_name: string;

	@BelongsTo() usertype: UserType;
	@HasMany() orders: Order[];
}
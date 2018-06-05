import { Component } from '@angular/core';
import { AuthService } from '../../models/auth.service';
import { User } from '../../models/user';
import { Order } from '../../models/sale';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html'
})
export class AccountComponent {
	me: User;
	loading: boolean = false;

	constructor(private authService: AuthService) {
		this.authService.getUser('usertype,orders,orders.sale,orders.orderlines,orders.orderlines.item').subscribe(
			(user: User) => this.me = user,
			err => console.warn(err),
			() => this.loading = false
		);
	}
	generatePDF(order: Order) { }
}

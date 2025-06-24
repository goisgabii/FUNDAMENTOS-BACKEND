import { Injectable } from "@nestjs/common";
import { Order, Prisma } from "@prisma/client";
import { UserRepository } from "../repository/users.repository";
import { ProfileRepository } from "src/profile/repository/profile.repository";

export interface UserOrders {
	orders: Order;
}

interface GetUserByIdServiceRequest {
	id: string;
}

@Injectable()
export class GetOrderByUserIdService {
	constructor(private userRepository: UserRepository) {}

	async execute({ id }: GetUserByIdServiceRequest) {
		const userOrders = await this.userRepository.findOrdersByUserId(id);

		if (!userOrders) {
			throw new Error("User not have orders");
		}

		return {
			orders: userOrders,
		};
	}
}

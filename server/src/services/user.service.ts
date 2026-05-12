import { User } from "../models/user";
import { QueryOptions } from "../utils/pagination";
import { IUser } from "../interface/IUser";
import { AppError } from "../utils/app-error";

interface PaginatedResult<T> {
  users: T[];
  total?: number;
  totalPages?: number;
  page?: number;
}

class UserService {
  async getAllUsers(query: QueryOptions) {
    const { page, limit, skip, search, sortBy, order } = query;

    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filter)
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    return {
        data: users,
        total,
        page,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 1
        
    };
  }

  async getUserById(userId: string){
    const user = await User.findById(userId).select({
        name: 1,
        email: 1,
        role: 1,
        isActive: 1
    })

    if(!user){
        throw new AppError('No user found', 404)
    }

    return {
        data: user
    }
  }

  async softDeleteUser(userId: string) {

        const user = await User.findById(userId)

        if (!user) {
            throw new AppError("User not found", 404);
        }

        await User.updateOne(
            {_id:userId},
            {isActive: false}
        )
        return true
    }

    async restoreUser(userId: string){
        const user = await User.findById(userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (user.isActive = true) {
            throw new AppError("User is not archived", 400);
        }

        await User.updateOne(
            {_id: userId},
            {isActive: true}
        );

        return true
    }

    async permanentDeleteUser(userId: string) {

        const user = await User.findById(userId);

        if (!user) {
            throw new AppError("user not found", 404)
        }

        await User.deleteOne({_id:userId})

        return true
    }
}

export default UserService;
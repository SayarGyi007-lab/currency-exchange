import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import { User } from "../models/user";

const createAdmin = async () => {
    try {
        const adminEmail = config.SUPER_ADMIN_EMAIL!;
        const adminPassword = config.SUPER_ADMIN_PASSWORD!;
        const phone = "0000000000";

        const existed = await User.findOne({ email: adminEmail });

        if (existed) {
            console.log("Super admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await User.create({
            name: "Super Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "super_admin",
        });

        console.log("Super admin successfully created");
    } catch (err) {
        console.error("Error creating super admin:", err);
    }
};

const runSeed = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI!);

        console.log("MongoDB connected");

        await createAdmin();

        console.log("Seeding completed");

        process.exit(0);
    } catch (err) {
        console.error("Seed failed:", err);
        process.exit(1);
    }
};

runSeed();
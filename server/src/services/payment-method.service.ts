import { PaymentMethod } from "../models/payment-method";
import { IPaymentMethod, IUpdatePaymentMethod } from "../interface/IPaymentMethod";
import { Currency } from "../models/currency";
import { AppError } from "../utils/app-error";
import { QueryOptions } from "../utils/pagination";

class PaymentService {
  // CREATE
  async create(data: IPaymentMethod) {
    const existing = await PaymentMethod.findOne({
      currencyId: data.currencyId,
    });

    if (existing) {
      throw new AppError("Payment method already exists for this currency", 409);
    }

    const paymentMethod = await PaymentMethod.create(data);
    return paymentMethod;
  }

  // GET BY CURRENCY
  async getPaymentByCurrency(currencyId: string) {
    const existingCurrency = await Currency.findById(currencyId);

    if (!existingCurrency) {
      throw new AppError("No Currency found", 404);
    }

    const payment = await PaymentMethod.find({ currencyId: currencyId }).populate(
      "currencyId",
      "code name"
    );

    return payment;
  }

  // GET BY ID
  async getPaymentById(paymentId: string) {
    const payment = await PaymentMethod.findById(paymentId).populate(
      "currencyId",
      "code name"
    );

    if (!payment) {
      throw new AppError("No Payment Method found", 404);
    }

    return payment;
  }

  // UPDATE
  async updatePaymentById(paymentId: string, data: IUpdatePaymentMethod) {
    const existingPayment = await PaymentMethod.findById(paymentId);

    if (!existingPayment) {
      throw new AppError("No Payment Method found", 404);
    }

    const updatedPayment = await PaymentMethod.findByIdAndUpdate(
      paymentId,
      { $set: data },
      { new: true }
    ).populate("currencyId", "code name");

    return updatedPayment;
  }

  // GET ALL WITH PAGINATION + SEARCH
  async getAll(query: QueryOptions) {
    const { page, limit, skip, search, sortBy, order, isActive } = query;

    const filter: any = {isActive: isActive ?? true};

    if (search) {
      const currencies = await Currency.find({
        code: { $regex: search, $options: "i" },
      }).select("_id");

      filter.currencyId = {
        $in: currencies.map((c) => c._id),
      };
    }

    const total = await PaymentMethod.countDocuments(filter);

    const data = await PaymentMethod.find(filter)
      .populate("currencyId", "code name")
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    return {
        data,
        total,
        page,
        totalPages: limit === 0 ? 1 : Math.ceil(total / limit),
    };
  }
}

export default PaymentService;
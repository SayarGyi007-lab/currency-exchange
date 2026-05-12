export type TxStatus = "pending" | "received" | "processing" | "completed" | "cancelled";

export const statusConfig: Record<TxStatus, {
  title: string;
  message: string;
  color: string;
}> = {
  pending: {
    title: "Transaction Submitted",
    message: "We’ve received your request and it is waiting for review.",
    color: "#c3c0ff",
  },
  received: {
    title: "Payment Received",
    message: "Your payment has been received. We’ll begin processing shortly.",
    color: "#8affec",
  },
  processing: {
    title: "Processing Transaction",
    message: "Your transaction is currently being processed securely.",
    color: "#645efb",
  },
  completed: {
    title: "Transaction Completed",
    message: "Your funds have been successfully transferred.",
    color: "#00ffae",
  },
  cancelled: {
    title: "Transaction Cancelled",
    message: "This transaction has been cancelled. Contact support if needed.",
    color: "#ff6b6b",
  },
};
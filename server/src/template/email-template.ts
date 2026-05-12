import { statusConfig } from "./email-status";

export const transactionEmailTemplate = ({
  transactionId,
  statusUrl,
  status,
}: {
  transactionId: string;
  statusUrl: string;
  status: "pending" | "received" | "processing" | "completed" | "cancelled";
}) => {
  const config = statusConfig[status];

  return `
  <div style="font-family: Arial, sans-serif; background:#060e20; padding:40px; color:#fff;">
    
    <div style="max-width:600px; margin:auto; background:#0c1934; padding:30px; border-radius:16px;">
      
      <h2 style="color:${config.color}; margin-bottom:10px;">
        ${config.title}
      </h2>

      <p style="color:#9baad6; font-size:14px;">
        ${config.message}
      </p>

      <div style="margin:20px 0; padding:15px; background:#142449; border-radius:10px;">
        <p style="margin:0; font-size:12px; color:#9baad6;">Transaction ID</p>
        <p style="margin:0; font-weight:bold; letter-spacing:1px;">
          ${transactionId}
        </p>
      </div>

      ${
        status !== "cancelled"
          ? `
      <a href="${statusUrl}" 
         style="
           display:inline-block;
           margin-top:20px;
           padding:12px 20px;
           background:linear-gradient(to right,#c3c0ff,#645efb);
           color:#060e20;
           text-decoration:none;
           border-radius:8px;
           font-weight:bold;
         ">
        Track Your Transaction
      </a>
      `
          : ""
      }

      <p style="margin-top:30px; font-size:12px; color:#6b7bbd;">
        This is an automated update regarding your transaction.
      </p>

    </div>

  </div>
  `;
};
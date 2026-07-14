import axios from "axios";
import { env } from "../config/env.js";

export interface KhaltiInitiateParams {
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
  return_url: string;
  website_url: string;
}

export interface KhaltiInitiateResponse {
  pidx: string;
  payment_url: string;
  [key: string]: unknown;
}

export interface KhaltiVerifyResponse {
  status: string;
  [key: string]: unknown;
}

export const verifyKhaltiPayment = async ({ pidx }: { pidx: string }): Promise<KhaltiVerifyResponse> => {
  try {
    const response = await axios.post<KhaltiVerifyResponse>(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      { pidx: pidx.trim() },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key ${env.KHALTI_SECRET_KEY}`,
        },
      },
    );

    console.log("✅ Khalti Response:", response.data);
    return response.data;
  } catch (error) {
    const details: unknown = axios.isAxiosError(error) ? (error.response?.data ?? error.message) : error;
    console.error("❌ Khalti Verification Error:", details);
    throw error;
  }
};

export async function initializeKhaltiPayment(
  details: KhaltiInitiateParams,
): Promise<KhaltiInitiateResponse> {
  const headersList = {
    Authorization: `Key ${env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const reqOptions = {
    url: `${env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
    method: "POST" as const,
    headers: headersList,
    data: JSON.stringify(details),
  };
  console.log("reqOptions", reqOptions);

  try {
    const response = await axios.request<KhaltiInitiateResponse>(reqOptions);
    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log("error initializing Khalti payment:", message);
    throw error;
  }
}

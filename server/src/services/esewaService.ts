import crypto from "crypto";
import axios from "axios";
import { env } from "../config/env.js";

export interface EsewaPaymentHashParams {
  amount: number;
  transaction_uuid: string;
}

export interface EsewaPaymentHashResult {
  signature: string;
  signed_field_names: string;
  transaction_uuid: string;
}

export function getEsewaPaymentHash({
  amount,
  transaction_uuid,
}: EsewaPaymentHashParams): EsewaPaymentHashResult {
  try {
    if (!amount || !transaction_uuid) {
      throw new Error("Amount and transaction_uuid are required.");
    }

    if (Number.isNaN(amount) || amount <= 0) {
      throw new Error("Invalid amount. It must be a positive number.");
    }

    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${env.ESEWA_PRODUCT_CODE}`;

    const secretKey = env.ESEWA_SECRET_KEY;
    if (!secretKey) {
      throw new Error("ESEWA_SECRET_KEY is not defined in environment variables.");
    }

    const hash = crypto.createHmac("sha256", secretKey).update(data).digest("base64");

    return {
      signature: hash,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      transaction_uuid,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error generating eSewa payment hash:", message);
    throw new Error("Failed to generate eSewa payment hash.", { cause: error });
  }
}

export interface EsewaDecodedData {
  total_amount: number | string;
  transaction_uuid: string;
  signed_field_names: string;
  signature: string;
  [key: string]: unknown;
}

export async function verifyEsewaPayment(
  encodedData: string,
): Promise<{ response: unknown; decodedData: EsewaDecodedData }> {
  console.log("Encoded Data:", encodedData);
  try {
    if (!encodedData || typeof encodedData !== "string") {
      throw new Error("Invalid encodedData format");
    }

    const decodedData = JSON.parse(atob(encodedData)) as EsewaDecodedData;
    console.log("Decoded Data:", decodedData);

    const data = `total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;
    const hash = crypto
      .createHmac("sha256", env.ESEWA_SECRET_KEY ?? "")
      .update(data)
      .digest("base64");

    console.log("Generated Hash:", hash);
    console.log("Provided Signature:", decodedData.signature);

    if (hash !== decodedData.signature) {
      throw new Error("Signature mismatch");
    }

    const response = await axios.request<{ status: string; [key: string]: unknown }>({
      url: `${env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/`,
      method: "GET",
      params: {
        product_code: env.ESEWA_PRODUCT_CODE,
        total_amount: decodedData.total_amount,
        transaction_uuid: decodedData.transaction_uuid,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Response from eSewa:", response.data);

    if (response.data.status !== "COMPLETE") {
      throw new Error("Payment not completed");
    }

    return { response: response.data, decodedData };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error verifying eSewa payment:", error);
    throw new Error(message || "Payment verification failed", { cause: error });
  }
}

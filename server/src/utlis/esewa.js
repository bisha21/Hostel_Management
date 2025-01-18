import crypto from 'crypto';
import axios from 'axios';
// async function getEsewaPaymentHash({ amount, transaction_uuid }) {
//   try {
//     const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;

//     const secretKey = process.env.ESEWA_SECRET_KEY;
//     const hash = crypto
//       .createHmac("sha256", secretKey)
//       .update(data)
//       .digest("base64");

//     return {
//       signature: hash,
//       signed_field_names: "total_amount,transaction_uuid,product_code",
//     };
//   } catch (error) {
//     throw error;
//   }
// }

async function getEsewaPaymentHash({ amount, transaction_uuid }) {
  try {
    // Validate required fields
    if (!amount || !transaction_uuid) {
      throw new Error("Amount and transaction_uuid are required.");
    }

    // Ensure the amount is a valid number
    if (isNaN(amount) || amount <= 0) {
      throw new Error("Invalid amount. It must be a positive number.");
    }

    // Prepare the data string for hashing
    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;

    // Secret key for hashing
    const secretKey = process.env.ESEWA_SECRET_KEY;

    if (!secretKey) {
      throw new Error("ESEWA_SECRET_KEY is not defined in environment variables.");
    }

    // Generate hash using HMAC with sha256
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    // Return the signature and field names
    return {
      signature: hash,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      transaction_uuid

    };
  } catch (error) {
    // Log the error details (for debugging purposes)
    console.error("Error generating eSewa payment hash:", error.message);
    throw new Error("Failed to generate eSewa payment hash.");
  }
}


async function verifyEsewaPayment(encodedData) {
  console.log("Encoded Data:", encodedData);
  try {

    if (!encodedData || typeof encodedData !== "string") {
      throw new Error("Invalid encodedData format");
    }

    // Decode and parse the data
    let decodedData = atob(encodedData); // Base64 decode the string
    decodedData = JSON.parse(decodedData);

    console.log("Decoded Data:", decodedData);

    // Prepare data string for hashing
    const data = `total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;
    const hash = crypto
      .createHmac("sha256", process.env.ESEWA_SECRET_KEY)
      .update(data)
      .digest("base64");

    console.log("Generated Hash:", hash);
    console.log("Provided Signature:", decodedData.signature);

    if (hash !== decodedData.signature) {
      throw new Error("Signature mismatch");
    }

    // Verify transaction with eSewa
    const reqOptions = {
      url: `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/`,
      method: "GET",
      params: {
        product_code: process.env.ESEWA_PRODUCT_CODE,
        total_amount: decodedData.total_amount,
        transaction_uuid: decodedData.transaction_uuid,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(reqOptions);

    console.log("Response from eSewa:", response.data);

    if (response.data.status !== "COMPLETE") {
      throw new Error("Payment not completed");
    }

    return { response: response.data, decodedData };

  } catch (error) {
    console.error("Error verifying eSewa payment:", error);
    throw new Error(error.message || "Payment verification failed");
  }
}



export { getEsewaPaymentHash, verifyEsewaPayment }
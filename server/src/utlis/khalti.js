import axios from "axios";
// Function to verify Khalti Payment


export const verifyKhaltiPayment = async ({ token, amount, pidx }) => {
  try {
    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/lookup/", // ✅ Ensure correct URL
      {
        pidx: pidx.trim() // ✅ Use correct `pidx` format (as a string)
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,

        },
      }
    );

    console.log("✅ Khalti Response:", response.data); // ✅ Debug Response
    return response.data;
  } catch (error) {
    console.error("❌ Khalti Verification Error:", error.response?.data || error.message);
    throw error;
  }
};


// Function to initialize Khalti Payment
export async function initializeKhaltiPayment(details) {
  const headersList = {
    "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify(details);

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  console.log("reqOptions", reqOptions);

  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    // console.error("Error initializing Khalti payment:", error);
    console.log("error initializing Khalti payment:", error.message);
    throw error;
  }
}


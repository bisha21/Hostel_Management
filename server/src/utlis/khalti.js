import axios from "axios";
// Function to verify Khalti Payment
export async function verifyKhaltiPayment(pidx) {
  const headersList = {
    "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({ pidx });

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error("Error verifying Khalti payment:", error);
    throw error;
  }
}

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
  console.log("reqOptions",reqOptions);

  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    // console.error("Error initializing Khalti payment:", error);
    console.log("error initializing Khalti payment:", error.message);
    throw error;
  }
}


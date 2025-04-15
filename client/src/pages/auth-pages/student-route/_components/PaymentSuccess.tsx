import { useEffect } from "react";
import { useCompletePaymentMutation } from "../../../../api/mutations/payment.mutation";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router";
const PaymentSuccess = () => {
  const completePaymentMutation = useCompletePaymentMutation();
  const navigate = useNavigate();
  useEffect(() => {
    completePaymentMutation.mutate(); // ✅ Trigger the mutation when component loads
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-2xl p-12 mx-4 text-center transition-all transform bg-white shadow-md rounded-xl hover:shadow-lg border border-slate-200">
        {/* Success Icon */}
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-emerald-100 rounded-full">
          <svg
            className="w-12 h-12 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Main Content */}
        <h1 className="mb-6 text-4xl font-extrabold text-emerald-600">
          Payment Successful!
        </h1>
        <p className="mb-8 text-xl text-slate-600">
          Thank you for your purchase.
        </p>

        <Button
          onClick={() => navigate("/student/rooms")}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Go to your Room
        </Button>

        {/* Contact Information */}
        <div className="pt-8 mt-8 border-t border-slate-200">
          <p className="text-lg text-slate-600">
            Have questions? Contact us at:
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

import { AlarmClock, Calendar, CheckCircle } from "lucide-react";
import { useState } from "react";
import { usePaymentMutation } from "../../../../api/mutations/payment.mutation";
import { Button } from "../../../../components/ui/button";

const MonthlyPaymentSection = ({ booking }: { booking: any }) => {
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const { mutate: paymentMutation, isLoading: isLoadingPayment } =
    usePaymentMutation({ bookingId: booking.id || "" });

  const handlePayment = async () => {
    paymentMutation(undefined, {
      onSuccess: () => {
        setShowPaymentAlert(true);

        // Hide the alert after 5 seconds
        setTimeout(() => {
          setShowPaymentAlert(false);
        }, 5000);
      },
    });
  };
  // Check if payment is due (30 days after start date)
  const isPaymentDue = () => {
    const startDate = new Date(booking.startDate);
    const currentDate = new Date();
    const thirtyDaysAfterStart = new Date(startDate);
    thirtyDaysAfterStart.setDate(startDate.getDate() + 30);

    return currentDate >= thirtyDaysAfterStart;
  };

  // Format date function
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate next payment date (30 days after start date)
  const calculateNextPaymentDate = () => {
    const startDate = new Date(booking.startDate);
    const nextPaymentDate = new Date(startDate);
    nextPaymentDate.setDate(startDate.getDate() + 30);
    return formatDate(nextPaymentDate);
  };

  return (
    <div className="mt-8 bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 p-6">
        <h2 className="text-2xl text-slate-800 font-medium flex items-center gap-2">
          <Calendar size={24} className="text-emerald-500" />
          Monthly Payment
        </h2>
      </div>

      <div className="p-6 text-slate-600">
        {/* Payment Alert */}
        {showPaymentAlert && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="text-emerald-500" size={24} />
            <p className="text-emerald-600">
              Your payment has been processed successfully!
            </p>
          </div>
        )}

        {/* Payment Due Alert */}
        {isPaymentDue() && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlarmClock className="text-red-500" size={24} />
            <p className="text-red-600">
              Your monthly payment is due! Please make your payment to continue
              your stay.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-500 text-sm">Next Payment Date</p>
            <p className="text-xl font-semibold text-slate-800">
              {calculateNextPaymentDate()}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Monthly Fee</p>
            <p className="text-xl font-semibold text-slate-800">
              Rs {booking.total_amount}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-slate-600">
              Make your monthly payment using Khalti for a hassle-free
              experience.
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Payment is due every 30 days from your check-in date.
            </p>
          </div>

          <Button
            disabled={isLoadingPayment}
            loading={isLoadingPayment}
            onClick={handlePayment}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            Pay Now with Khalti
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="text-lg text-slate-800 mb-3">Payment History</h3>
          <div className="bg-slate-50 rounded-lg p-4">
            <table className="w-full">
              <thead>
                <tr className="text-slate-500 text-sm">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="py-3 text-slate-600">
                    {formatDate(booking.booking_date)}
                  </td>
                  <td className="py-3 text-slate-600">
                    Rs {booking.total_amount}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs">
                      Paid
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPaymentSection;

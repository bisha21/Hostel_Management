import { AlarmClock, Calendar, CheckCircle } from "lucide-react";
import { useState } from "react";

const MonthlyPaymentSection = ({ booking }:{booking:any}) => {
    const [showPaymentAlert, setShowPaymentAlert] = useState(false);

    // Check if payment is due (30 days after start date)
    const isPaymentDue = () => {
        const startDate = new Date(booking.startDate);
        const currentDate = new Date();
        const thirtyDaysAfterStart = new Date(startDate);
        thirtyDaysAfterStart.setDate(startDate.getDate() + 30);

        return currentDate >= thirtyDaysAfterStart;
    };

    // Format date function
    const formatDate = (dateString:Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Calculate next payment date (30 days after start date)
    const calculateNextPaymentDate = () => {
        const startDate = new Date(booking.startDate);
        const nextPaymentDate = new Date(startDate);
        nextPaymentDate.setDate(startDate.getDate() + 30);
        return formatDate(nextPaymentDate);
    };

    // Handle Khalti payment
    const handleKhaltiPayment = () => {
        // Khalti payment integration would go here
        // This is a placeholder for the actual implementation
        console.log("Processing Khalti payment");

        // After successful payment, you would update the payment status
        // For now, we'll just show a success message
        setShowPaymentAlert(true);

        // Hide the alert after 5 seconds
        setTimeout(() => {
            setShowPaymentAlert(false);
        }, 5000);
    };

    return (
        <div className="mt-8 bg-[#1a2631] rounded-xl overflow-hidden">
            <div className="bg-[#c69963]/10 border-b border-[#c69963]/20 p-6">
                <h2 className="text-2xl text-[#c69963] font-medium flex items-center gap-2">
                    <Calendar size={24} />
                    Monthly Payment
                </h2>
            </div>

            <div className="p-6 text-slate-200">
                {/* Payment Alert */}
                {showPaymentAlert && (
                    <div className="bg-green-800/30 border border-green-600 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={24} />
                        <p className="text-green-400">Your payment has been processed successfully!</p>
                    </div>
                )}

                {/* Payment Due Alert */}
                {isPaymentDue() && (
                    <div className="bg-red-800/30 border border-red-600 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <AlarmClock className="text-red-500" size={24} />
                        <p className="text-red-400">Your monthly payment is due! Please make your payment to continue your stay.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-slate-400 text-sm">Next Payment Date</p>
                        <p className="text-xl font-semibold">{calculateNextPaymentDate()}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Monthly Fee</p>
                        <p className="text-xl font-semibold">Rs {booking.total_amount}</p>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-slate-300">Make your monthly payment using Khalti for a hassle-free experience.</p>
                        <p className="text-slate-400 text-sm mt-1">Payment is due every 30 days from your check-in date.</p>
                    </div>

                    <button
                        onClick={handleKhaltiPayment}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        Pay Now with Khalti
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700">
                    <h3 className="text-lg text-[#c69963] mb-3">Payment History</h3>
                    <div className="bg-[#141c24] rounded-lg p-4">
                        <table className="w-full">
                            <thead>
                                <tr className="text-slate-400 text-sm">
                                    <th className="text-left py-2">Date</th>
                                    <th className="text-left py-2">Amount</th>
                                    <th className="text-left py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-slate-700">
                                    <td className="py-3">{formatDate(booking.booking_date)}</td>
                                    <td className="py-3">Rs {booking.total_amount}</td>
                                    <td className="py-3">
                                        <span className="px-2 py-1 bg-green-800/30 text-green-400 rounded-full text-xs">
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
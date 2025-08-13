import React, { useState, useEffect } from "react";

export default function DonationForm() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Load Paystack script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleAmountClick = (value) => {
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /*if (!amount || !email) {
      alert("Please enter amount and email");
      return;
    }*/

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: "pk_test_568bd30ecad6c94a0194ed791c5c393296ac8063", // Replace with your public key
      email,
      amount: amount * 100, // Paystack works in kobo (multiply by 100)
      currency: "GHS", // or"NGN", "GHS", "USD" etc.
      ref: "" + Math.floor(Math.random() * 1000000000 + 1), // unique reference
      onClose: function () {
        setLoading(false);
        // alert("Transaction was cancelled");
      },
      callback: function (response) {
        setLoading(false);

        // Reset form
        setAmount("");
        setEmail("");

        // Send thank you + admin email
        fetch("/api/send-donation-emails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, email }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Email status:", data);
          })
          .catch((err) => console.error("Email error:", err));
      },
    });

    handler.openIframe();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Donation Amount Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Donation Amount (USD)
        </label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[100, 500, 1000].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleAmountClick(val)}
              className={`donation-amount-btn border-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
                amount === val
                  ? "bg-emerald-300 border-emerald-500 text-emerald-900"
                  : "bg-emerald-100 border-emerald-300 text-emerald-800 hover:bg-emerald-200"
              }`}
            >
              ${val.toLocaleString()}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            id="custom-amount"
            placeholder="Other amount"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Email Address */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">🔒</span>
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium">Secure Payment</p>
            <p className="text-xs text-gray-600">
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>

      {/* Donate Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Donate Securely"}
      </button>
    </form>
  );
}
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyOtp({ setStep, otpEmail }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputs = [];

  function handleChange(idx, val) {
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 5 && inputs[idx + 1]) {
      inputs[idx + 1].focus();
    }
  }

  function handleKeyDown(idx, e) {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputs[idx - 1].focus();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (otp.join("").length !== 6) {
      setError("Enter 6 digit code");
    } else {
      setError("");
      setStep("reset");
    }
  }

  return (
    <form
      className="w-full max-w-sm lg:mt-20 mx-auto flex flex-col items-center space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="text-4xl text-blue-500">📩</div>
      <h2 className="sm:text-3xl text-2xl font-semibold tracking-tight mb-1">
        Verify your Email
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        We have sent a verification code to your email
        <br />
        <span className="font-semibold">{otpEmail}</span>
      </p>
      <div className="flex space-x-2">
        {[...Array(6)].map((_, idx) => (
          <Input
            key={idx}
            type="text"
            maxLength={1}
            className="sm:w-10 w-9 sm:h-10 h-9 text-center border rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={otp[idx]}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            ref={(el) => (inputs[idx] = el)}
          />
        ))}
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
      <Button
        className="w-full py-2 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600"
        type="submit"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
      <div className="grid grid-cols-2 gap-4 w-full">
        <Button type="button" onClick={() => setOtp(Array(6).fill(""))}>
          Resend
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          type="button"
          onClick={() => setStep("login")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

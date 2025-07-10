import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forgotPassword } from "@/machine/auth";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function ForgotPassword({
  setStep,
  setResetEmail,
  setOtpEmail,
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email");
    } else {
      setError("");
      setApiError("");
      setLoading(true);
      try {
        await forgotPassword(email);
        setResetEmail(email);
        setOtpEmail(email);
        setStep("verifyOtp");
      } catch (err) {
        setApiError(
          err?.response?.data?.message || "Failed to send code. Try again."
        );
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6 lg:mt-22 w-full max-w-sm mx-auto ")}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col  gap-2">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to reset your password
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <span className="text-red-500 text-xs">{error}</span>}
          {apiError && <span className="text-red-500 text-xs">{apiError}</span>}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send verification Code"}
        </Button>
      </div>
      <div className="text-center text-sm">
        If you already have an account?
        <button
          type="button"
          className="text-link font-semibold"
          onClick={() => setStep("login")}
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TypographyH1, TypographyMuted } from "@/components/custom/Typography";
import { resetPassword } from "@/machine/auth";
import { Eye, EyeOff } from "lucide-react";

const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );

export default function ResetPassword({ setStep, resetEmail }) {
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [values, setValues] = useState({ password: "", confPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const eObj = {};
    if (!validatePassword(values.password))
      eObj.password =
        "Password must be 8+ chars, upper, lower, number, special";
    if (values.password !== values.confPassword)
      eObj.confPassword = "Passwords do not match";
    setErrors(eObj);
    if (Object.keys(eObj).length === 0) {
      setLoading(true);
      setApiError("");
      try {
        const token = "dummy-token";
        await resetPassword(token, values.password);
        setStep("login");
      } catch (err) {
        setApiError(
          err?.response?.data?.message || "Failed to reset password."
        );
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <form
      className="w-full space-y-2 max-w-sm mx-auto lg:mt-20"
      onSubmit={handleSubmit}
    >
      <TypographyH1>Enter New Password</TypographyH1>
      <TypographyMuted>Confirm code and enter new password.</TypographyMuted>
      <div className="grid gap-2">
        <Label>Email</Label>
        <Input type="email" disabled value={resetEmail || "user@email.com"} />
      </div>
      <div className="grid gap-2 relative">
        <Label>Password</Label>
        <Input
          id="password"
          name="password"
          type={showPass ? "text" : "password"}
          value={values.password}
          onChange={(e) =>
            setValues((v) => ({ ...v, password: e.target.value }))
          }
          className="pr-10"
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-gray-500"
          tabIndex={-1}
          onClick={() => setShowPass((v) => !v)}
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password}</span>
        )}
        <span className="text-xs text-muted-foreground mt-1">
          Password must be at least 8 characters and include uppercase,
          lowercase, number, and special character.
        </span>
      </div>
      <div className="grid gap-2 relative">
        <Label>Confirm Password</Label>
        <Input
          id="confPassword"
          name="confPassword"
          type={showConf ? "text" : "password"}
          value={values.confPassword}
          onChange={(e) =>
            setValues((v) => ({ ...v, confPassword: e.target.value }))
          }
          className="pr-10"
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-gray-500"
          tabIndex={-1}
          onClick={() => setShowConf((v) => !v)}
        >
          {showConf ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.confPassword && (
          <span className="text-red-500 text-xs">{errors.confPassword}</span>
        )}
      </div>
      {apiError && <span className="text-red-500 text-xs">{apiError}</span>}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Continue"}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => setStep("forgot")}
        >
          Resend
        </Button>
      </div>
      <Button
        className="w-full mt-2"
        variant="secondary"
        type="button"
        onClick={() => setStep("login")}
      >
        Cancel & Go To Sign In
      </Button>
    </form>
  );
}

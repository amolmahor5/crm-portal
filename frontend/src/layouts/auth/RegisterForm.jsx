import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthWithSocials from "./AuthWithSocials";
import { register } from "@/machine/auth";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );

export default function RegisterForm({ setStep, setOtpEmail }) {
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    email: "",
    password: "",
    confPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function validate(v) {
    const e = {};
    if (!v.firstName.trim()) e.firstName = "First name is required";
    if (!validateEmail(v.email)) e.email = "Invalid email";
    if (!validatePassword(v.password))
      e.password = "Password must be 8+ chars, upper, lower, number, special";
    if (v.password !== v.confPassword)
      e.confPassword = "Passwords do not match";
    if (!v.terms) e.terms = "Accept terms";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setApiError("");
    try {
      await register({
        name: values.firstName,
        email: values.email,
        password: values.password,
      });
      setOtpEmail(values.email);
    } catch (err) {
      const exists =
        err?.response?.status === 409 ||
        (err?.response?.data?.error &&
          err.response.data.error.toLowerCase().includes("already exists"));
      setErrors(err.response.data.error);
      if (!exists) {
        setStep("verifyOtp");
      } else {
        setApiError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Registration failed. Try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
      <AuthWithSocials step="register" setStep={setStep} />
      <div className="grid gap-4">
        {/* First Name */}
        <div className="grid gap-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs">{errors.firstName}</span>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-1 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type={showPass ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-7 text-gray-500"
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

        {/* Confirm Password */}
        <div className="grid gap-1 relative">
          <Label htmlFor="confPassword">Confirm Password</Label>
          <Input
            id="confPassword"
            name="confPassword"
            type={showConf ? "text" : "password"}
            value={values.confPassword}
            onChange={handleChange}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-7 text-gray-500"
            tabIndex={-1}
            onClick={() => setShowConf((v) => !v)}
          >
            {showConf ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confPassword && (
            <span className="text-red-500 text-xs">{errors.confPassword}</span>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="terms"
            name="terms"
            checked={values.terms}
            onCheckedChange={(checked) =>
              setValues((v) => ({ ...v, terms: checked }))
            }
          />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        {errors.terms && (
          <span className="text-red-500 text-xs">{errors.terms}</span>
        )}

        {/* API Error */}
        {apiError && <span className="text-red-500 text-xs">{apiError}</span>}

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthWithSocials from "./AuthWithSocials";
import { login } from "@/machine/auth";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );

export default function LoginForm({ setStep, setUserData, setLoginError }) {
  const [showPass, setShowPass] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function validate(v) {
    const e = {};
    if (!validateEmail(v.email)) e.email = "Invalid email";
    if (!validatePassword(v.password))
      e.password = "Password must be 8+ chars, upper, lower, number, special";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setLoginError("");
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      });
      const user = res.data.user;
      setUserData(user);

      if (!user.organization) {
        setStep("createOrg");
      } else if (
        user.organization &&
        user.organization.subscription &&
        user.organization.subscription.status !== "active"
      ) {
        setStep("pricing");
      } else {
        // window.location.href = "/dashboard";
      }
    } catch (err) {
      if (
        err?.response?.data?.error === "User does not exist" ||
        err?.response?.data?.error === "Invalid credentials"
      ) {
        setLoginError("User does not exist or invalid credentials.");
      } else {
        setLoginError(err?.response?.data?.error || "Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="w-full max-w-sm mx-auto lg:mt-16" onSubmit={handleSubmit}>
      <AuthWithSocials step="login" setStep={setStep} />
      <div className="grid gap-6">
        <div className="grid gap-6">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="m@example.com"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>
          <div className="grid gap-1 relative">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                className="ml-auto text-sm underline-offset-4 hover:underline"
                onClick={() => setStep("forgot")}
              >
                Forgot your password?
              </button>
            </div>
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
              className="absolute right-3 top-8 text-gray-500"
              tabIndex={-1}
              onClick={() => setShowPass((v) => !v)}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>
          {/* loginError should be shown in parent */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="underline underline-offset-4"
            onClick={() => setStep("register")}
          >
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
}

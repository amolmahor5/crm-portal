import React, { useState } from "react";
import { CheckIcon, GalleryVerticalEnd, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { version } from "@/../package.json";

const plans = [
    { title: "Monthly Plan", currency: "SGD", monthlyRate: 3, yearlyRate: 29, isYearly: false, country: "SGD" },
    { title: "Yearly Plan", currency: "INR", monthlyRate: 199, yearlyRate: 1799, isYearly: true, country: "INR" },
    { title: "Monthly Plan", currency: "INR", monthlyRate: 199, yearlyRate: 1799, isYearly: false, country: "INR" },
    { title: "Yearly Plan", currency: "SGD", monthlyRate: 3, yearlyRate: 29, isYearly: true, country: "SGD" },
];

// Validation helpers
const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// Strong password: min 8 chars, upper, lower, number, special char
const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

function AuthWithSocials({ step, setStep }) {
    return (
        <div className="w-full max-w-sm mx-auto ">
            <div className="flex items-center justify-center sm:gap-10 mb-4 text-sm font-medium">
                <button
                    type="button"
                    onClick={() => setStep("login")}
                    className={`${step === "login" && "text-blue-700 bg-gray-100"} p-2 px-6 cursor-pointer rounded-md`}
                >
                    Sign In
                </button>
                <button
                    onClick={() => setStep("register")}
                    type="button"
                    className={`${step === "register" && "text-blue-700 bg-gray-100"} p-2 px-6 cursor-pointer rounded-md`}
                >
                    Create Account
                </button>
            </div>
            <div className="flex flex-col gap-2 mb-4">
                <Button variant="outline" className="w-full" type="button">
                    <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M21.805 10.023h-9.765v3.955h5.617c-.242 1.236-1.482 3.627-5.617 3.627-3.377 0-6.13-2.797-6.13-6.25s2.753-6.25 6.13-6.25c1.922 0 3.213.82 3.953 1.527l2.703-2.637c-1.73-1.613-3.953-2.613-6.656-2.613-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.027 9.547-9.723 0-.652-.07-1.148-.156-1.613z" /></svg>
                    Continue with Google
                </Button>
                <Button variant="outline" className="w-full" type="button">
                    <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24"><path fill="#1877F3" d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.124v-3.622h3.124v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.732 0 1.324-.593 1.324-1.326v-21.349c0-.734-.592-1.326-1.324-1.326" /></svg>
                    Continue with Facebook
                </Button>
            </div>
            <div className="after:border-border mt-3 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                </span>
            </div>
        </div>
    );
}

function useForm(initial, validate) {
    const [values, setValues] = useState(initial);
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
        setErrors((e) => ({ ...e, [name]: undefined }));
    };
    const handleSubmit = (cb) => (e) => {
        e.preventDefault();
        const errs = validate(values);
        setErrors(errs);
        if (Object.keys(errs).length === 0) cb(values);
    };
    return { values, errors, handleChange, handleSubmit };
}

export default function AuthLayout() {
    const [step, setStep] = useState("welcome");
    const [resetEmail, setResetEmail] = useState(""); // for passing email between steps
    const [otpEmail, setOtpEmail] = useState(""); // for OTP verification

    function WelcomePage() {
        return (
            <div className="text-center grid gap-8 sm:w-[80%] mx-auto sm:mt-10">
                <h1 className="sm:text-5xl text-3xl font-extrabold tracking-tight">
                    UC Services : Super app for your business
                </h1>
                <p className="text-muted-foreground sm:text-lg">
                    UC Services is the ultimate all-in-one super app for businesses, streamlining HR, recruitment, tasks, goals, sales, marketing, appraisal, and finance. Say goodbye to multiple platforms, enjoy convenience in one place.
                </p>
                <div className="flex items-center gap-4 justify-center">
                    <Button size='sm' className="px-8 bg-black hover:bg-black/80" onClick={() => setStep("login")}>
                        Sign In
                    </Button>
                    <Button size='sm' className="px-8 bg-black hover:bg-black/80" onClick={() => setStep("register")}>
                        Sign UP
                    </Button>
                </div>
            </div>
        );
    }

    function RegisterForm() {
        const [showPass, setShowPass] = useState(false);
        const [showConf, setShowConf] = useState(false);
        const { values, errors, handleChange, handleSubmit } = useForm(
            { name: "", email: "", password: "", confPassword: "", terms: false },
            (v) => {
                const e = {};
                if (!v.name.trim()) e.name = "Name is required";
                if (!validateEmail(v.email)) e.email = "Invalid email";
                if (!validatePassword(v.password)) e.password = "Password must be 8+ chars, upper, lower, number, special";
                if (v.password !== v.confPassword) e.confPassword = "Passwords do not match";
                if (!v.terms) e.terms = "Accept terms";
                return e;
            }
        );
        return (
            <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit((vals) => console.log(vals))}>
                <AuthWithSocials step="register" setStep={setStep} />
                <div className="grid gap-4">
                    <div className="grid gap-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={values.name} onChange={handleChange} />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" value={values.email} onChange={handleChange} />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                    </div>
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
                        {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                        <span className="text-xs text-muted-foreground mt-1">
                            Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                        </span>
                    </div>
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
                        {errors.confPassword && <span className="text-red-500 text-xs">{errors.confPassword}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox id="terms" name="terms" checked={values.terms} onCheckedChange={(v) => handleChange({ target: { name: "terms", type: "checkbox", checked: v } })} />
                        <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>
                    {errors.terms && <span className="text-red-500 text-xs">{errors.terms}</span>}
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </div>
            </form>
        );
    }

    function LoginForm() {
        const [showPass, setShowPass] = useState(false);
        const { values, errors, handleChange, handleSubmit } = useForm(
            { email: "", password: "" },
            (v) => {
                const e = {};
                if (!validateEmail(v.email)) e.email = "Invalid email";
                if (!v.password) e.password = "Password required";
                return e;
            }
        );
        return (
            <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit((vals) => console.log(vals))}>
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
                            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
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
                            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <button type="button" className="underline underline-offset-4" onClick={() => setStep("register")}>
                            Sign up
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    function ForgotPassword() {
        const [email, setEmail] = useState("");
        const [error, setError] = useState("");
        function handleSubmit(e) {
            e.preventDefault();
            if (!validateEmail(email)) {
                setError("Invalid email");
            } else {
                setError("");
                setResetEmail(email);
                setOtpEmail(email);
                setStep("verifyOtp");
            }
        }
        return (
            <form className={cn("flex flex-col gap-6 w-full max-w-sm mx-auto ")} onSubmit={handleSubmit}>
                <div className="flex flex-col  gap-2">
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your email below to reset your password
                    </p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                        {error && <span className="text-red-500 text-xs">{error}</span>}
                    </div>
                    <Button type="submit" className="w-full">
                        Send verification Code
                    </Button>
                </div>
                <div className="text-center text-sm">
                    If you already have an account?
                    <button type="button" className="text-link font-semibold" onClick={() => setStep("login")}>
                        Sign In
                    </button>
                </div>
            </form>
        );
    }

    function VerifyOtp() {
        const [otp, setOtp] = useState(Array(6).fill(""));
        const [error, setError] = useState("");
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

        function handleSubmit(e) {
            e.preventDefault();
            if (otp.join("").length !== 6) {
                setError("Enter 6 digit code");
            } else {
                setError("");
                setStep("reset");
            }
        }

        return (
            <form className="w-full max-w-sm mx-auto flex flex-col items-center space-y-6" onSubmit={handleSubmit}>
                <div className="text-4xl text-blue-500">📩</div>
                <h2 className="sm:text-3xl text-2xl font-semibold tracking-tight mb-1">
                    Verify your Email
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                    We have sent a verification code to your email<br />
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
                            onChange={e => handleChange(idx, e.target.value)}
                            onKeyDown={e => handleKeyDown(idx, e)}
                            ref={el => inputs[idx] = el}
                        />
                    ))}
                </div>
                {error && <span className="text-red-500 text-xs">{error}</span>}
                <Button className="w-full py-2 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600" type="submit">
                    Verify
                </Button>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <Button type="button" onClick={() => setOtp(Array(6).fill(""))}>
                        Resend
                    </Button>
                    <Button variant='secondary' className="w-full" type="button" onClick={() => setStep("login")}>
                        Cancel
                    </Button>
                </div>
            </form>
        );
    }

    function ResetPassword() {
        const [showPass, setShowPass] = useState(false);
        const [showConf, setShowConf] = useState(false);
        const [values, setValues] = useState({ password: "", confPassword: "" });
        const [errors, setErrors] = useState({});
        function handleChange(e) {
            const { name, value } = e.target;
            setValues(v => ({ ...v, [name]: value }));
            setErrors(e => ({ ...e, [name]: undefined }));
        }
        function handleSubmit(e) {
            e.preventDefault();
            const eObj = {};
            if (!validatePassword(values.password)) eObj.password = "Password must be 8+ chars, upper, lower, number, special";
            if (values.password !== values.confPassword) eObj.confPassword = "Passwords do not match";
            setErrors(eObj);
            if (Object.keys(eObj).length === 0) {
                setStep("login");
            }
        }
        return (
            <form className="w-full max-w-sm mx-auto " onSubmit={handleSubmit}>
                <h2 className="sm:text-3xl text-2xl font-semibold tracking-tight mb-1">
                    Enter New Password
                </h2>
                <p className="text-muted-foreground text-sm mb-4">Confirm code and enter new password.</p>
                <div className="grid gap-2">
                    <Label >Email</Label>
                    <Input type="email" disabled value={resetEmail || "user@email.com"} />
                </div>
                <div className="grid gap-2 relative">
                    <Label>Password</Label>
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
                        className="absolute right-3 top-9 text-gray-500"
                        tabIndex={-1}
                        onClick={() => setShowPass(v => !v)}
                    >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                    <span className="text-xs text-muted-foreground mt-1">
                        Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                    </span>
                </div>
                <div className="grid gap-2 relative">
                    <Label>Confirm Password</Label>
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
                        className="absolute right-3 top-6 text-gray-500"
                        tabIndex={-1}
                        onClick={() => setShowConf(v => !v)}
                    >
                        {showConf ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.confPassword && <span className="text-red-500 text-xs">{errors.confPassword}</span>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button type="submit">
                        Continue
                    </Button>
                    <Button variant="outline" type="button" onClick={() => setStep("forgot")}>
                        Resend
                    </Button>
                </div>
                <Button className="w-full mt-2" variant="secondary" type="button" onClick={() => setStep("login")}>
                    Cancel & Go To Sign In
                </Button>
            </form>
        );
    }

    function CreateOrganizationForm() {
        const [org, setOrg] = useState("");
        const [error, setError] = useState("");
        function handleSubmit(e) {
            e.preventDefault();
            if (!org.trim()) setError("Workspace name required");
            else {
                setError("");
                console.log({ organizationName: org });
            }
        }
        return (
            <form className="sm:mt-36 w-full max-w-sm mx-auto " onSubmit={handleSubmit}>
                <div>
                    <h2 className="taxt-lg sm:text-3xl font-semibold tracking-tight">
                        Name your Workspace
                    </h2>
                    <div className="mt-6 grid gap-2">
                        <Input
                            id="organizationName"
                            type="text"
                            placeholder="Workspace Name"
                            value={org}
                            onChange={e => setOrg(e.target.value)}
                        />
                        <small className="text-xs leading-none font-medium">- Try the name of your company or organization.</small>
                        {error && <span className="text-red-500 text-xs">{error}</span>}
                    </div>
                    <Button className="w-full mt-4" type="submit">
                        Continue
                    </Button>
                </div>
            </form>
        );
    }

    function PricingPlanes() {
        const [users, setUsers] = useState(1);
        return (
            <div className="sm:px-6">
                <div className="grid gap-4 text-center w-full">
                    <h2 className="text-indigo-600 font-semibold text-base">Pricing</h2>
                    <h1 className="text-2xl sm:text-5xl font-extrabold text-balance">
                        Plans for teams of all sizes
                    </h1>
                    <p className="text-muted-foreground text-md sm:text-lg">
                        Choose your best plan
                    </p>
                    <div className="mb-4 grid gap-2 w-full">
                        <Label htmlFor="users">Number of Users:</Label>
                        <Input
                            id="users"
                            type="number"
                            min="1"
                            max="50"
                            className="w-64"
                            value={users}
                            onChange={e => setUsers(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {plans.map((plan, idx) => (
                        <Card key={idx} className='p-6 rounded-3xl'>
                            <h3 className="scroll-m-20 sm:text-xl text-lg font-semibold tracking-tight">
                                {plan.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">Pricing plan for {plan.currency} currency.</p>
                            <ul className="grid gap-3 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <CheckIcon className="mt-1 h-4 w-4 text-indigo-800" />
                                    <span>0 {plan.currency} Free (Up to 5 Team Members)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckIcon className="mt-1 h-4 w-4 text-indigo-800" />
                                    <span>
                                        {plan.isYearly
                                            ? `${plan.yearlyRate} ${plan.currency}`
                                            : `${plan.monthlyRate} ${plan.currency}`} (Per Team Member)
                                    </span>
                                </li>
                            </ul>
                            <h3 className="sm:text-xl text-md font-semibold text-indigo-800 tracking-tight">
                                Total: <span className="font-extrabold">
                                    {users <= 5 ? "0.00" : ((plan.isYearly ? plan.yearlyRate : plan.monthlyRate) * users).toFixed(2)} {plan.currency}
                                </span>
                            </h3>
                            <Button variant='outline' className="w-full text-indigo-800 hover:underline underline-offset-4 underline-indigo-800 hover:text-indigo-800 font-semibold py-3">
                                Switch to this Plan
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2 bg-black">
            <Card className="sm:min-h-svh sm:m-6 m-3 shadow-none">
                <div className="px-4 border-b pb-2 text-base flex justify-between">
                    <Link to="#" className="flex items-center gap-2 font-medium text-sm">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-3 sm:size-4" />
                        </div>
                        UC Services
                    </Link>
                    <p className="font-medium">Welcome</p>
                </div>
                <div className="py-6 sm:py-16 px-6">
                    {step === "welcome" && <WelcomePage />}
                    {step === "register" && <RegisterForm />}
                    {step === "verifyOtp" && <VerifyOtp />}
                    {step === "login" && <LoginForm />}
                    {step === "forgot" && <ForgotPassword />}
                    {step === "reset" && <ResetPassword />}
                    {step === "createOrg" && <CreateOrganizationForm />}
                    {step === "pricing" && <PricingPlanes />}
                </div>
            </Card>
            <div className="w-full max-w-xl sm:text-center mx-auto py-6 sm:py-14 px-6">
                <div className="grid gap-3">
                    <h2 className="sm:text-4xl text-3xl font-bold tracking-tight text-white">
                        With UC Services from chaos to peace of mind !
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Effortlessly managing her business with confidence.
                    </p>
                    <p className="text-muted-foreground text-sm">
                        Boost your productivity and get the peace of mind you deserve. Try UCServices today and take control of your business with ease!
                    </p>
                </div>
                <p className="text-white my-3 text-start text-sm">
                    Copyright © 2025 Umbakrar Tech Pvt Ltd.. All rights reserved. Version : {version}
                </p>
            </div>
        </div>
    );
}
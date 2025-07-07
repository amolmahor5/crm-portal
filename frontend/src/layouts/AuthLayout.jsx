import { CheckIcon, GalleryVerticalEnd, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useState } from "react";
import { version } from "@/../package.json"

const plans = [
    { title: 'Monthly Plan', currency: 'SGD', monthlyRate: 3, yearlyRate: 29, isYearly: false, country: 'SGD' },
    { title: 'Yearly Plan', currency: 'INR', monthlyRate: 199, yearlyRate: 1799, isYearly: true, country: 'INR' },
    { title: 'Monthly Plan', currency: 'INR', monthlyRate: 199, yearlyRate: 1799, isYearly: false, country: 'INR' },
    { title: 'Yearly Plan', currency: 'SGD', monthlyRate: 3, yearlyRate: 29, isYearly: true, country: 'SGD' }
];

// Reusable Social Auth component
function AuthWithSocials({ step, setStep, onGoogle, onFacebook }) {
    return (
        <div className="w-full max-w-sm mx-auto ">
            <div className="flex items-center justify-center gap-10 mb-4 text-sm font-medium">
                <button
                    type="button"
                    onClick={() => setStep("login")}
                    className={`${step === "login" && "text-blue-700 bg-gray-100"} p-2 px-6 cursor-pointer rounded-md`}
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={() => setStep("register")}
                    className={`${step === "register" && "text-blue-700 bg-gray-100"} p-2 px-6 cursor-pointer rounded-md`}
                >
                    Create Account
                </button>
            </div>
            <div className="flex flex-col gap-2 mb-4">
                <Button variant="outline" className="w-full" type="button" onClick={onGoogle}>
                    <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M21.805 10.023h-9.765v3.955h5.617c-.242 1.236-1.482 3.627-5.617 3.627-3.377 0-6.13-2.797-6.13-6.25s2.753-6.25 6.13-6.25c1.922 0 3.213.82 3.953 1.527l2.703-2.637c-1.73-1.613-3.953-2.613-6.656-2.613-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.027 9.547-9.723 0-.652-.07-1.148-.156-1.613z" /></svg>
                    Continue with Google
                </Button>
                <Button variant="outline" className="w-full" type="button" onClick={onFacebook}>
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

// Validation helpers
const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) =>
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

const validateName = (name) =>
    name.trim().length >= 2;

export default function AuthLayout() {
    const [step, setStep] = useState("welcome");
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confPassword: "", terms: false });
    const [registerErrors, setRegisterErrors] = useState({});
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loginErrors, setLoginErrors] = useState({});
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotError, setForgotError] = useState("");
    const [resetData, setResetData] = useState({ code: Array(6).fill(""), password: "", confPassword: "" });
    const [resetErrors, setResetErrors] = useState({});
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [orgName, setOrgName] = useState("");
    const [orgError, setOrgError] = useState("");
    const [users, setUsers] = useState("1"); // string
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Social handlers (for demo, just log)
    const handleGoogle = () => console.log("Google Auth Clicked");
    const handleFacebook = () => console.log("Facebook Auth Clicked");

    // Welcome Page
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
        )
    }

    // Register Form
    function RegisterForm() {
        const [showPassword, setShowPassword] = useState(false);
        const [showConfPassword, setShowConfPassword] = useState(false);

        const handleChange = (e) => {
            const { id, value, type, checked } = e.target;
            setRegisterData((prev) => ({
                ...prev,
                [id]: type === "checkbox" ? checked : value
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            let errors = {};
            if (!validateName(registerData.name)) errors.name = "Name must be at least 2 characters.";
            if (!validateEmail(registerData.email)) errors.email = "Invalid email.";
            if (!validatePassword(registerData.password)) errors.password = "Password must be 8+ chars, 1 uppercase, 1 number.";
            if (registerData.password !== registerData.confPassword) errors.confPassword = "Passwords do not match.";
            if (!registerData.terms) errors.terms = "You must accept terms.";
            setRegisterErrors(errors);
            if (Object.keys(errors).length === 0) {
                console.log("Register Data:", registerData);
                setStep("verifyOtp");
            }
        };

        return (
            <form className="w-full max-w-sm mx-auto " onSubmit={handleSubmit}>
                <AuthWithSocials step={step} setStep={setStep} onGoogle={handleGoogle} onFacebook={handleFacebook} />
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" value={registerData.name} onChange={handleChange} required />
                        {registerErrors.name && <span className="text-red-500 text-xs">{registerErrors.name}</span>}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={registerData.email} onChange={handleChange} required />
                        {registerErrors.email && <span className="text-red-500 text-xs">{registerErrors.email}</span>}
                    </div>
                    <div className="grid gap-3 relative">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={registerData.password}
                            onChange={handleChange}
                            required
                            className="pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500"
                            tabIndex={-1}
                            onClick={() => setShowPassword(v => !v)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {registerErrors.password && <span className="text-red-500 text-xs">{registerErrors.password}</span>}
                    </div>
                    <div className="grid gap-3 relative">
                        <Label htmlFor="confPassword">Confirm Password</Label>
                        <Input
                            id="confPassword"
                            type={showConfPassword ? "text" : "password"}
                            value={registerData.confPassword}
                            onChange={handleChange}
                            required
                            className="pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500"
                            tabIndex={-1}
                            onClick={() => setShowConfPassword(v => !v)}
                        >
                            {showConfPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {registerErrors.confPassword && <span className="text-red-500 text-xs">{registerErrors.confPassword}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox id="terms" checked={registerData.terms} onCheckedChange={val => setRegisterData(d => ({ ...d, terms: !!val }))} />
                        <Label htmlFor="terms">Accept terms and conditions</Label>
                        {registerErrors.terms && <span className="text-red-500 text-xs">{registerErrors.terms}</span>}
                    </div>
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </div>
            </form>
        )
    }

    // Login Form
    function LoginForm() {
        const [showPassword, setShowPassword] = useState(false);

        const handleChange = (e) => {
            const { id, value } = e.target;
            setLoginData((prev) => ({
                ...prev,
                [id]: value
            }));
        };
        const handleSubmit = (e) => {
            e.preventDefault();
            let errors = {};
            if (!validateEmail(loginData.email)) errors.email = "Invalid email.";
            if (!validatePassword(loginData.password)) errors.password = "Password must be 8+ chars, 1 uppercase, 1 number.";
            setLoginErrors(errors);
            if (Object.keys(errors).length === 0) {
                console.log("Login Data:", loginData);
                setStep("createOrg");
            }
        };
        return (
            <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
                <AuthWithSocials step={step} setStep={setStep} onGoogle={handleGoogle} onFacebook={handleFacebook} />
                <div className="grid gap-6">
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={loginData.email}
                                onChange={handleChange}
                                required
                            />
                            {loginErrors.email && <span className="text-red-500 text-xs">{loginErrors.email}</span>}
                        </div>
                        <div className="grid gap-3 relative">
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
                                type={showPassword ? "text" : "password"}
                                value={loginData.password}
                                onChange={handleChange}
                                required
                                className="pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 text-gray-500"
                                tabIndex={-1}
                                onClick={() => setShowPassword(v => !v)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            {loginErrors.password && <span className="text-red-500 text-xs">{loginErrors.password}</span>}
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
        )
    }

    function VerifyOtp() {
        const handleChange = (idx, val) => {
            if (!/^[0-9]?$/.test(val)) return;
            const newOtp = [...otp];
            newOtp[idx] = val;
            setOtp(newOtp);
        };
        const handleSubmit = (e) => {
            e.preventDefault();
            if (otp.some(c => c === "")) return;
            console.log("OTP Verified:", otp.join(""));
            setStep("login");
        };
        return (
            <form className="w-full max-w-sm mx-auto flex flex-col items-center space-y-6" onSubmit={handleSubmit}>
                <div className="text-4xl text-blue-500">📩</div>
                <h2 className="sm:text-3xl text-2xl font-semibold tracking-tight mb-1">
                    Verify your Email
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                    We have sent a verification code to your email<br />
                    Enter this code to verify your account
                </p>
                <div className="flex space-x-2">
                    {otp.map((char, idx) => (
                        <Input
                            key={idx}
                            type="text"
                            maxLength={1}
                            value={char}
                            onChange={e => handleChange(idx, e.target.value)}
                            className="sm:w-10 w-9 sm:h-10 h-9 text-center border rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
                <Button
                    disabled={otp.includes("")}
                    className={`w-full py-2 rounded-md text-white font-semibold ${otp.includes("") ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    type="submit"
                >
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
        )
    }

    function ForgotPassword() {
        const handleSubmit = (e) => {
            e.preventDefault();
            if (!validateEmail(forgotEmail)) {
                setForgotError("Invalid email.");
                return;
            }
            setForgotError("");
            console.log("Forgot Password Email:", forgotEmail);
            setStep("reset");
        };
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
                        <Input id="email" type="email" placeholder="m@example.com" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
                        {forgotError && <span className="text-red-500 text-xs">{forgotError}</span>}
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
        )
    }

    function ResetPassword() {
        const [showPassword, setShowPassword] = useState(false);
        const [showConfPassword, setShowConfPassword] = useState(false);

        const handleCodeChange = (idx, val) => {
            if (!/^[0-9]?$/.test(val)) return;
            const newCode = [...resetData.code];
            newCode[idx] = val;
            setResetData(d => ({ ...d, code: newCode }));
        };
        const handleChange = (e) => {
            const { id, value } = e.target;
            setResetData(d => ({ ...d, [id]: value }));
        };
        const handleSubmit = (e) => {
            e.preventDefault();
            let errors = {};
            if (resetData.code.some(c => c === "")) errors.code = "Enter all code digits.";
            if (!validatePassword(resetData.password)) errors.password = "Password must be 8+ chars, 1 uppercase, 1 number.";
            if (resetData.password !== resetData.confPassword) errors.confPassword = "Passwords do not match.";
            setResetErrors(errors);
            if (Object.keys(errors).length === 0) {
                console.log("Reset Password Data:", resetData);
                setStep("login");
            }
        };
        return (
            <form className="w-full max-w-sm mx-auto " onSubmit={handleSubmit}>
                <h2 className="sm:text-3xl text-2xl font-semibold tracking-tight mb-1">
                    Enter New Password
                </h2>
                <p className="text-muted-foreground text-sm mb-4">Confirm code and enter new password.</p>
                <div className="grid gap-2">
                    <Label >Email</Label>
                    <Input
                        type="email"
                        value={forgotEmail}
                        disabled
                    />
                </div>
                <div className=" flex justify-between gap-2">
                    {resetData.code.map((digit, idx) => (
                        <Input
                            key={idx}
                            id={`code-${idx}`}
                            type="text"
                            value={digit}
                            maxLength={1}
                            onChange={e => handleCodeChange(idx, e.target.value)}
                        />
                    ))}
                </div>
                {resetErrors.code && <span className="text-red-500 text-xs">{resetErrors.code}</span>}
                <div className="grid gap-2 relative">
                    <Label>Password</Label>
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={resetData.password}
                        onChange={handleChange}
                        className="pr-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-500"
                        tabIndex={-1}
                        onClick={() => setShowPassword(v => !v)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {resetErrors.password && <span className="text-red-500 text-xs">{resetErrors.password}</span>}
                </div>
                <div className="grid gap-2 relative">
                    <Label>Confirm Password</Label>
                    <Input
                        id="confPassword"
                        type={showConfPassword ? "text" : "password"}
                        value={resetData.confPassword}
                        onChange={handleChange}
                        className="pr-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-500"
                        tabIndex={-1}
                        onClick={() => setShowConfPassword(v => !v)}
                    >
                        {showConfPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {resetErrors.confPassword && <span className="text-red-500 text-xs">{resetErrors.confPassword}</span>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button type="submit">
                        Continue
                    </Button>
                    <Button variant="outline" type="button" onClick={() => setResetData(d => ({ ...d, code: Array(6).fill("") }))}>
                        Resend
                    </Button>
                </div>
                <Button className="w-full mt-2" variant="secondary" type="button" onClick={() => setStep("login")}>
                    Cancel & Go To Sign In
                </Button>
            </form>
        )
    }

    function CreateOrganizationForm() {
        const handleSubmit = (e) => {
            e.preventDefault();
            if (!validateName(orgName)) {
                setOrgError("Workspace name must be at least 2 characters.");
                return;
            }
            setOrgError("");
            console.log("Organization Name:", orgName);
            setStep("pricing");
        };
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
                            value={orgName}
                            onChange={e => setOrgName(e.target.value)}
                        />
                        <small className="text-xs leading-none font-medium">- Try the name of your company or organization.</small>
                        {orgError && <span className="text-red-500 text-xs">{orgError}</span>}
                    </div>
                    <Button className="w-full mt-4" type="submit">
                        Continue
                    </Button>
                </div>
            </form>
        )
    }

    function PricingPlanes() {
        const getTotal = (plan) => {
            const userCount = parseInt(users, 10) || 0;
            if (userCount <= 5) return 0;
            return plan.isYearly ? (plan.yearlyRate * (userCount - 5)) : (plan.monthlyRate * (userCount - 5));
        };
        const handleSelect = (plan) => {
            setSelectedPlan(plan);
            console.log("Selected Plan:", { plan, users: parseInt(users, 10) || 0 });
        };
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
                            value={users}
                            onChange={e => {
                                let val = e.target.value;
                                // Allow empty string for typing, clamp between 1 and 50 if not empty
                                if (val === "") {
                                    setUsers("");
                                } else if (/^\d+$/.test(val)) {
                                    // Remove leading zeros
                                    val = val.replace(/^0+/, "");
                                    // Clamp between 1 and 50
                                    let num = Math.max(1, Math.min(50, Number(val)));
                                    setUsers(num.toString());
                                }
                            }}
                            className="w-64"
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
                                Total: <span className="font-extrabold">{getTotal(plan).toFixed(2)} {plan.currency}</span>
                            </h3>
                            <Button variant='outline' className="w-full text-indigo-800 hover:underline underline-offset-4 underline-indigo-800 hover:text-indigo-800 font-semibold py-3"
                                onClick={() => handleSelect(plan)}>
                                Switch to this Plan
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    // Main render
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
                <p className="text-white my-3 text-start text-sm">Copyright © 2025 Umbakrar Tech Pvt Ltd.. All rights reserved. Version : {version}</p>
            </div>
        </div>
    );
}
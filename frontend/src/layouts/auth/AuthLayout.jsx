import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { version } from "@/../package.json";
import {
  TypographyH1,
  TypographyLead,
  TypographyMuted,
  TypographyP,
} from "@/components/custom/Typography";
import RegisterForm from "./RegisterForm";
import VerifyOtp from "./VerifyOtp";
import LoginForm from "./LoginForm";
import ForgotPassword from "./ForgotPassword";
import CreateOrganizationForm from "./CreateOrganizationForm";
import PricingPlanes from "./PricingPlanes";
import PaymentStep from "./PaymentStep";
import ResetPassword from "./ResetPassword";

function WelcomePage({ setStep }) {
  return (
    <div className="text-center grid gap-8 sm:w-[80%] mx-auto lg:mt-22">
      <h1 className="sm:text-5xl text-3xl font-extrabold tracking-tight">
        UC Services : Super app for your business
      </h1>
      <TypographyLead>
        UC Services is the ultimate all-in-one super app for businesses,
        streamlining HR, recruitment, tasks, goals, sales, marketing, appraisal,
        and finance. Say goodbye to multiple platforms, enjoy convenience in one
        place.
      </TypographyLead>
      <div className="flex items-center gap-4 justify-center">
        <button
          className="px-8 py-2 bg-black text-white rounded hover:bg-black/80"
          onClick={() => setStep("login")}
        >
          Sign In
        </button>
        <button
          className="px-8 py-2 bg-black text-white rounded hover:bg-black/80"
          onClick={() => setStep("register")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default function AuthLayout() {
  const [step, setStep] = useState("welcome");
  const [resetEmail, setResetEmail] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-black">
      <Card className="sm:min-h-svh sm:m-6 m-3 shadow-none">
        <div className="border-b pb-2 text-base flex justify-between">
          <Link to="#" className="flex items-center gap-2 font-medium text-sm">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded">
              U
            </div>
            Technology
          </Link>
          <p className="font-medium">Welcome</p>
        </div>
        <div className="py-4 px-3 sm:px-0">
          {step === "welcome" && <WelcomePage setStep={setStep} />}
          {step === "register" && (
            <RegisterForm setStep={setStep} setOtpEmail={setOtpEmail} />
          )}
          {step === "verifyOtp" && (
            <VerifyOtp setStep={setStep} otpEmail={otpEmail} />
          )}
          {step === "login" && (
            <>
              <LoginForm
                setStep={setStep}
                setUserData={setUserData}
                setLoginError={setLoginError}
              />
              {loginError && (
                <span className="text-red-500 text-xs">{loginError}</span>
              )}
            </>
          )}
          {step === "forgot" && (
            <ForgotPassword
              setStep={setStep}
              setResetEmail={setResetEmail}
              setOtpEmail={setOtpEmail}
            />
          )}
          {step === "reset" && (
            <ResetPassword setStep={setStep} resetEmail={resetEmail} />
          )}
          {step === "createOrg" && <CreateOrganizationForm setStep={setStep} />}
          {step === "pricing" && (
            <PricingPlanes
              users={users}
              setUsers={setUsers}
              setSelectedPlan={setSelectedPlan}
              selectedPlan={selectedPlan}
              setStep={setStep}
            />
          )}
          {step === "payment" && (
            <PaymentStep
              selectedPlan={selectedPlan}
              users={users}
              setStep={setStep}
            />
          )}
        </div>
      </Card>
      <div className="w-full max-w-2xl sm:text-center px-6 sm:px-0 mx-auto py-6 sm:py-14">
        <div className="grid max-w-xl sm:text-center mx-auto gap-3">
          <TypographyH1 className="text-white">
            With U Technology from chaos to peace of mind !
          </TypographyH1>
          <TypographyMuted>
            Effortlessly managing her business with confidence.
          </TypographyMuted>
          <TypographyMuted>
            Boost your productivity and get the peace of mind you deserve. Try U
            Technology today and take control of your business with ease!
          </TypographyMuted>
        </div>
        <div className="w-full hidden lg:h-[500px] lg:block mt-2">
          <img
            src="https://thumbs.dreamstime.com/b/business-customer-crm-management-analysis-service-concept-tablet-pc-screen-held-businessman-hands-online-top-67519995.jpg?w=768"
            alt="welcome img"
            className="rounded-2xl w-full h-full object-cover shadow-lg"
          />
        </div>
        <TypographyP className="text-white my-3 text-start text-sm">
          Copyright © {new Date().getFullYear()} Umbakrar Tech Pvt Ltd.. All
          rights reserved. Version : {version}
        </TypographyP>
      </div>
    </div>
  );
}

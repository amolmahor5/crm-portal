import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon } from "lucide-react";
import {
  TypographyH1,
  TypographyH4,
  TypographyH5,
} from "@/components/custom/Typography";

const plans = [
  {
    id: 1,
    title: "Monthly Plan (SGD)",
    currency: "SGD",
    monthlyRate: 3,
    yearlyRate: 29,
    isYearly: false,
  },
  {
    id: 2,
    title: "Yearly Plan (INR)",
    currency: "INR",
    monthlyRate: 199,
    yearlyRate: 1799,
    isYearly: true,
  },
  {
    id: 3,
    title: "Monthly Plan (INR)",
    currency: "INR",
    monthlyRate: 199,
    yearlyRate: 1799,
    isYearly: false,
  },
  {
    id: 4,
    title: "Yearly Plan (SGD)",
    currency: "SGD",
    monthlyRate: 3,
    yearlyRate: 29,
    isYearly: true,
  },
];

export default function PricingPlanes({
  setStep,
  users,
  setUsers,
  setSelectedPlan,
  selectedPlan,
}) {
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    setStep("payment");
  };

  const getTotalCost = (plan) => {
    if (!plan) return "0.00";
    const rate = plan.isYearly ? plan.yearlyRate : plan.monthlyRate;
    return (rate * users).toFixed(2);
  };

  console.log("selectedPlan----", selectedPlan);

  return (
    <div className="sm:px-8">
      <div className="grid gap-4 text-center w-full">
        <TypographyH5 className="text-indigo-600">Pricing</TypographyH5>
        <TypographyH1>Plans for teams of all sizes</TypographyH1>
        <p className="text-muted-foreground text-md sm:text-lg">
          Choose your best plan
        </p>
        <div className="mb-4 grid gap-2 w-full place-items-center">
          <Label htmlFor="users">Number of Users:</Label>
          <Input
            id="users"
            type="number"
            min="1"
            max="50"
            className="w-64"
            value={users}
            onChange={(e) => setUsers(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plans.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;
          const rate = plan.isYearly ? plan.yearlyRate : plan.monthlyRate;
          const total = (users * rate).toFixed(2);

          return (
            <Card
              key={plan.id}
              className={`transition-all cursor-pointer ${
                isSelected ? "border-2 border-indigo-600 shadow-md" : ""
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              <TypographyH4>{plan.title}</TypographyH4>
              <p className="text-muted-foreground text-sm">
                Pricing in {plan.currency}
              </p>
              <ul className="grid gap-3 text-sm text-muted-foreground mt-4">
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 text-indigo-800" />
                  <span>
                    {rate} {plan.currency} per user /{" "}
                    {plan.isYearly ? "year" : "month"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 text-indigo-800" />
                  <span>
                    {users} user{users > 1 ? "s" : ""} selected
                  </span>
                </li>
              </ul>
              <div className="mt-4 text-indigo-800 font-semibold sm:text-lg text-md">
                Total:{" "}
                <span className="font-extrabold">
                  {total} {plan.currency}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedPlan && (
        <div className="text-center mt-4 text-sm text-muted-foreground">
          You selected:{" "}
          <span className="text-indigo-600 font-medium">
            {selectedPlan.title}
          </span>{" "}
          for {users} user{users > 1 ? "s" : ""} ={" "}
          <span className="font-semibold text-indigo-800">
            {getTotalCost(selectedPlan)} {selectedPlan.currency}
          </span>
        </div>
      )}

      <Button
        className="w-full mt-6"
        disabled={!selectedPlan}
        onClick={handleContinue}
      >
        Continue to Payment
      </Button>
    </div>
  );
}

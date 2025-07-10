import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TypographyH3,
  TypographyMuted,
  TypographyH5,
  TypographyP,
} from "@/components/custom/Typography";
import { CreditCard, Calendar, Shield, SkipBack } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function PaymentStep({ selectedPlan, users, setStep }) {
  if (!selectedPlan || !users) {
    return (
      <div className="w-full max-w-sm mx-auto text-center mt-10">
        <TypographyP>
          Please select a plan before proceeding to payment.
        </TypographyP>
      </div>
    );
  }

  const rate = selectedPlan.isYearly
    ? selectedPlan.yearlyRate
    : selectedPlan.monthlyRate;

  const total = (rate * users).toFixed(2);

  const formik = useFormik({
    initialValues: {
      name: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Cardholder name is required"),
      cardNumber: Yup.string()
        .matches(/^(\d{4} ){3}\d{4}$/, "Card number must be 16 digits")
        .required("Card number is required"),
      expiry: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
        .required("Expiry date is required"),
      cvv: Yup.string()
        .matches(/^\d{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
    }),
    onSubmit: (values) => {
      console.log("Payment Successful");
      console.log("Plan:", selectedPlan.title);
      console.log("Users:", users);
      console.log("Total:", total);
      console.log("Card Info:", values);
      setStep("login");
    },
  });

  // Format card number to: 1234 5678 1234 5678
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formatted = value.replace(/(\d{4})/g, "$1 ").trim();
    formik.setFieldValue("cardNumber", formatted);
  };

  // Format expiry date to: MM/YY
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2);
    formik.setFieldValue("expiry", value);
  };

  // Limit CVV to 3 digits
  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    formik.setFieldValue("cvv", value);
  };

  const handleSkipChange = () => {
    localStorage.setItem("cognitoEntryToken", true);
    useAuth();
  };

  return (
    <div className="w-full mx-auto max-w-xs flex flex-col gap-4">
      <TypographyH3>Payments</TypographyH3>
      <TypographyMuted>
        Review your selected plan before completing the payment.
      </TypographyMuted>
      <TypographyH5 className="text-indigo-600">
        {selectedPlan?.title} - User-{users}
      </TypographyH5>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Cardholder Name */}
        <div className="grid gap-1">
          <Label>Cardholder Name</Label>
          <Input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        {/* Card Number */}
        <div className="grid gap-1">
          <Label>Card Number</Label>
          <div className="relative">
            <Input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 1234 5678"
              onChange={handleCardNumberChange}
              onBlur={formik.handleBlur}
              value={formik.values.cardNumber}
            />
            <CreditCard
              size={18}
              className="absolute top-2 right-3 text-gray-400"
            />
          </div>
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <div className="text-red-500 text-sm">
              {formik.errors.cardNumber}
            </div>
          )}
        </div>

        {/* Expiry & CVV */}
        <div className="flex gap-4">
          {/* Expiry */}
          <div className="w-1/2 grid gap-1">
            <Label>Expiry Date</Label>
            <div className="relative">
              <Input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                onChange={handleExpiryChange}
                onBlur={formik.handleBlur}
                value={formik.values.expiry}
              />
              <Calendar
                size={18}
                className="absolute top-2 right-3 text-gray-400"
              />
            </div>
            {formik.touched.expiry && formik.errors.expiry && (
              <div className="text-red-500 text-sm">{formik.errors.expiry}</div>
            )}
          </div>

          {/* CVV */}
          <div className="w-1/2 grid gap-1">
            <Label>CVV</Label>
            <div className="relative">
              <Input
                type="text"
                name="cvv"
                placeholder="123"
                onChange={handleCVVChange}
                onBlur={formik.handleBlur}
                value={formik.values.cvv}
              />
              <Shield
                size={18}
                className="absolute top-2 right-3 text-gray-400"
              />
            </div>
            {formik.touched.cvv && formik.errors.cvv && (
              <div className="text-red-500 text-sm">{formik.errors.cvv}</div>
            )}
          </div>
        </div>

        {/* Total & Submit */}
        <Button type="submit" className="w-full mt-4">
          Pay {total} {selectedPlan.currency}
        </Button>
      </form>
      <Button
        className="w-fit"
        onClick={handleSkipChange}
        size="sm"
        variant="secondary"
      >
        <SkipBack />
        Skip
      </Button>
    </div>
  );
}

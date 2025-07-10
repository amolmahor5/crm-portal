import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateOrganizationForm({ setStep }) {
  const [org, setOrg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!org.trim()) {
      setError("Workspace name required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // TODO: Call your backend API to create organization and get orgId
      // const res = await createOrganization({ name: org });
      setStep("pricing");
    } catch (err) {
      setError("Failed to create organization. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="sm:mt-36 w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-lg sm:text-3xl font-semibold tracking-tight">
          Name your Workspace
        </h2>
        <div className="mt-6 grid gap-2">
          <Input
            id="organizationName"
            type="text"
            placeholder="Workspace Name"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          />
          <small className="text-xs leading-none font-medium">
            - Try the name of your company or organization.
          </small>
          {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
        <Button className="w-full mt-4" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Continue"}
        </Button>
      </div>
    </form>
  );
}

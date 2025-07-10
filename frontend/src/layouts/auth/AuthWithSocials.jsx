import { Button } from "@/components/ui/button";

export default function AuthWithSocials({ step, setStep }) {
  return (
    <div className="w-full max-w-sm mx-auto ">
      <div className="flex items-center justify-center sm:gap-10 mb-4 text-sm font-medium">
        <button
          type="button"
          onClick={() => setStep("login")}
          className={`${
            step === "login" && "text-blue-700 bg-gray-100"
          } p-2 px-6 cursor-pointer rounded-md`}
        >
          Sign In
        </button>
        <button
          onClick={() => setStep("register")}
          type="button"
          className={`${
            step === "register" && "text-blue-700 bg-gray-100"
          } p-2 px-6 cursor-pointer rounded-md`}
        >
          Create Account
        </button>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <Button variant="outline" className="w-full" type="button">
          <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M21.805 10.023h-9.765v3.955h5.617c-.242 1.236-1.482 3.627-5.617 3.627-3.377 0-6.13-2.797-6.13-6.25s2.753-6.25 6.13-6.25c1.922 0 3.213.82 3.953 1.527l2.703-2.637c-1.73-1.613-3.953-2.613-6.656-2.613-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.027 9.547-9.723 0-.652-.07-1.148-.156-1.613z"
            />
          </svg>
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full" type="button">
          <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#1877F3"
              d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.124v-3.622h3.124v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.732 0 1.324-.593 1.324-1.326v-21.349c0-.734-.592-1.326-1.324-1.326"
            />
          </svg>
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

import { signIn } from "@/lib/auth";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-800 border border-surface-700 rounded-3xl p-8 shadow-xl text-center">
        <h1 className="font-display font-bold text-3xl mb-4">You don't need an account.</h1>
        <p className="text-text-secondary mb-8">
          Anonymous checking is fully supported. An account just helps you track your progress over time.
        </p>

        <div className="space-y-6">
          <Link 
            href="/check"
            className="w-full bg-surface-700 hover:bg-surface-600 text-text-primary font-medium px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Continue without account <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface-800 text-text-tertiary">or</span>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button 
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-400 text-surface-900 font-bold px-6 py-4 rounded-xl transition-all duration-200 shadow-lg"
            >
              Continue with Google
            </button>
          </form>

          <p className="text-sm text-text-tertiary flex items-center justify-center gap-1.5 mt-8">
            <Lock className="w-4 h-4" /> We never share your health data
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { loginWithGoogle, loginWithGithub } from "../../store/feature/auth/authThunks";
import { toast } from "sonner";

interface LoginModalProps {
  children: React.ReactNode;
  mode?: "login" | "signup";
}

export function LoginModal({ children, mode = "login" }: LoginModalProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const { loading } = useTypedSelector((state) => state.auth);

  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap();
      toast.success("Successfully signed in with Google!");
      setOpen(false);
      router.push("/");
    } catch (error) {
      toast.error("Failed to sign in with Google");
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      await dispatch(loginWithGithub()).unwrap();
      toast.success("Successfully signed in with GitHub!");
      setOpen(false);
      router.push("/");
    } catch (error) {
      toast.error("Failed to sign in with GitHub");
    }
  };

  const handleEmailLogin = () => {
    // Redirect to appropriate page based on mode
    if (mode === "login") {
      router.push("/login");
    } else {
      router.push("/signup");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[35.125rem] bg-background border-border text-card-foreground p-[4.75rem]">
        <DialogTitle className="sr-only">Login Modal</DialogTitle>
        <div className="flex flex-col items-left space-y-6.5">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded opacity-90"></div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-lg font-bold text-primary">
              Let&apos;s Get Started
            </h1>
            <p className="text-secondary text-sm font-normal leading-[1.125rem]">
              {mode === "login"
                ? "Log in to unlock tailored content and stay connected"
                : "Create your account to unlock tailored content and stay connected"
              }
            </p>
          </div>

          <div className="w-full space-y-3">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full bg-white dark:bg-black border-border text-primary hover:bg-white/80 hover:text-primary/80 h-12 cursor-pointer"
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-8" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>

            <Button
              onClick={handleLinkedInLogin}
              variant="outline"
              className="w-full bg-white dark:bg-black border-border text-primary hover:bg-white/80 hover:text-primary/80 h-12 cursor-pointer"
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-8" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>Continue with LinkedIn</span>
            </Button>

            <div className="flex items-center justify-center my-4">
              <div className="border-t border-border flex-1"></div>
              <span className="px-3 text-muted-foreground text-sm">OR</span>
              <div className="border-t border-border flex-1"></div>
            </div>

            <Button
              onClick={handleEmailLogin}
              className="w-full bg-white dark:bg-black border-border text-primary hover:bg-white/80 hover:text-primary/80 h-12 cursor-pointer"
              disabled={loading}
            >
              Continue with email
            </Button>
          </div>

          {/* Terms and Privacy Policy - Only show for signup */}
          {mode === "signup" && (
            <div className="text-center mt-4">
              <p className="text-muted-foreground text-sm leading-5">
                By continuing, you agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                and
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

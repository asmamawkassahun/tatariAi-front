"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    loginWithGithub,
    clearError
} from "../../store/feature/authSlice";
import { toast } from "sonner";

interface AuthPageProps {
    mode: "login" | "signup";
    onModeChange?: (mode: "login" | "signup") => void;
}

export function AuthPage({ mode, onModeChange }: AuthPageProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPasswordForm, setShowPasswordForm] = React.useState(false);
    const router = useRouter();
    const dispatch = useTypedDispatch();
    const { loading, error } = useTypedSelector((state) => state.auth);

    React.useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleGoogleSignIn = async () => {
        try {
            await dispatch(loginWithGoogle()).unwrap();
            toast.success("Successfully signed in with Google!");
            router.push("/");
        } catch (error) {
            toast.error("Failed to sign in with Google");
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await dispatch(loginWithGithub()).unwrap();
            toast.success("Successfully signed in with GitHub!");
            router.push("/");
        } catch (error) {
            toast.error("Failed to sign in with GitHub");
        }
    };

    const handleContinue = () => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        setShowPasswordForm(true);
    };

    const handleEmailAuth = async () => {
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }


        try {
            if (mode === "login") {
                await dispatch(loginWithEmail({ email, password })).unwrap();
                toast.success("Successfully logged in!");
            } else {
                await dispatch(signupWithEmail({ email, password, confirmPassword: password })).unwrap();
                toast.success("Account created successfully!");
            }
            router.push("/");
        } catch (error) {
            // Error is handled by the useEffect above
        }
    };

    const toggleMode = () => {
        if (mode === "login") {
            router.push("/signup");
        } else {
            router.push("/login");
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Column - Auth Form */}
            <div className="flex-1 flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    {/* Logo */}
                    <div className="flex justify-left">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 bg-white rounded-sm opacity-90"></div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-left">
                        <h1 className="text-2xl font-bold text-primary mb-2">
                            {mode === "login" ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-secondary text-sm font-normal leading-[1.125rem]">
                            {mode === "login"
                                ? "Log in to unlock tailored content and stay connected"
                                : "Create your account to unlock tailored content and stay connected"
                            }
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                        <Button
                            onClick={handleGoogleSignIn}
                            variant="outline"
                            className="w-full bg-white dark:bg-black border-border text-primary hover:bg-white/80 hover:text-primary/80 h-12 cursor-pointer"
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
                            <span>Continue with Google </span>
                        </Button>

                        <Button
                            onClick={handleGithubSignIn}
                            variant="outline"
                            className="w-full bg-white dark:bg-black border-border text-primary hover:bg-white/80 hover:text-primary/80 h-12 cursor-pointer"
                        >
                            <svg className="w-5 h-5 mr-8" fill="#0A66C2" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            <span>Continue with LinkedIn </span>

                        </Button>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-primary">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12"
                            disabled={loading}
                        />
                    </div>

                    {/* Password Fields - Show when user clicks continue */}
                    {showPasswordForm && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-primary">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12"
                                    disabled={loading}
                                />
                            </div>

                        </>
                    )}

                    {/* Terms and Privacy Policy - Only show for signup */}
                    {mode === "signup" && (
                        <div className="text-center">
                            <p className="text-muted-foreground text-xs leading-4">
                                By continuing, you agree to the{" "}
                                <Link href="/terms" className="text-primary hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-primary hover:underline">
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </div>
                    )}

                    {/* Continue/Submit Button */}
                    <Button
                        onClick={showPasswordForm ? handleEmailAuth : handleContinue}
                        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                {mode === "login" ? "Signing in..." : "Creating account..."}
                            </div>
                        ) : showPasswordForm ? (
                            mode === "login" ? "Sign In" : "Create Account"
                        ) : (
                            "Continue"
                        )}
                    </Button>

                    {/* Login/Signup Toggle */}
                    <div className="text-center">
                        <p className="text-sm text-secondary">
                            {mode === "login"
                                ? "Don't have an account? "
                                : "Already have an account? "}
                            <button
                                onClick={toggleMode}
                                className="text-primary hover:underline font-medium"
                            >
                                {mode === "login" ? "Sign up" : "Login"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column - Promotional Section */}
            <div className="hidden lg:flex lg:flex-1 relative overflow-hidden rounded-xl">
                <div className="absolute inset-6">
                    <Image
                        src="/assets/auth.svg"
                        alt="Auth Background"
                        loading="lazy"
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
}

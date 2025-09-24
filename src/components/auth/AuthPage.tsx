"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
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
    verifyEmail,
    resendVerification,
} from "../../store/feature/auth/authThunks";
import { clearError } from "../../store/feature/auth/authSlice";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { authService } from "../../services/authService";

interface AuthPageProps {
    mode: "login" | "signup";
    onModeChange?: (mode: "login" | "signup") => void;
}

export function AuthPage({ mode, onModeChange }: AuthPageProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [showPasswordForm, setShowPasswordForm] = React.useState(false);
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [firstNameError, setFirstNameError] = React.useState("");
    const [lastNameError, setLastNameError] = React.useState("");

    // Email verification state
    const [showVerification, setShowVerification] = React.useState(false);
    const [verificationEmail, setVerificationEmail] = React.useState("");
    const [verificationMode, setVerificationMode] = React.useState<'signup' | 'login'>('signup');
    const [otp, setOtp] = React.useState("");
    const [timeLeft, setTimeLeft] = React.useState(60);
    const router = useRouter();
    const dispatch = useTypedDispatch();
    const { loading, error } = useTypedSelector((state) => state.auth);
    const { resolvedTheme } = useTheme();


    React.useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError("Email is required");
            return false;
        }
        if (!emailRegex.test(email.trim())) {
            setEmailError("Please enter a valid email address");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePassword = (password: string): boolean => {
        if (!password) {
            setPasswordError("Password is required");
            return false;
        }
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const validateFirstName = (firstName: string): boolean => {
        if (!firstName.trim()) {
            setFirstNameError("First name is required");
            return false;
        }
        setFirstNameError("");
        return true;
    };

    const validateLastName = (lastName: string): boolean => {
        if (!lastName.trim()) {
            setLastNameError("Last name is required");
            return false;
        }
        setLastNameError("");
        return true;
    };

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
        setFirstNameError("");
        setLastNameError("");
    };

    // Timer for resend button
    React.useEffect(() => {
        if (timeLeft > 0 && showVerification) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, showVerification]);

    // Reset timer when verification screen opens
    React.useEffect(() => {
        if (showVerification) {
            setTimeLeft(60);
            setOtp("");
        }
    }, [showVerification]);


    // Email verification handlers
    const handleVerifyEmail = async () => {
        if (otp.length !== 6) {
            toast.error('Please enter the complete 6-digit code');
            return;
        }

        try {
            await dispatch(verifyEmail({ email: verificationEmail, otp })).unwrap();
            toast.success("Email verified successfully!");

            if (verificationMode === 'signup') {
                // Redirect to login page after successful signup verification
                toast.success("Account verified! Please log in.");
                setShowVerification(false);
                onModeChange?.('login');
            } else {
                // For login verification, try to login again
                await dispatch(loginWithEmail({ email: verificationEmail, password })).unwrap();
                toast.success("Successfully logged in!");
                router.push("/");
            }
        } catch (error) {
            // Error is handled by the useEffect above
        }
    };

    const handleResendVerification = async () => {
        if (timeLeft > 0) return;

        try {
            await dispatch(resendVerification({ email: verificationEmail })).unwrap();
            toast.success("Verification code sent!");
            setTimeLeft(60);
            setOtp("");
        } catch (error) {
            // Error is handled by the useEffect above
        }
    };

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
        clearErrors();
        if (validateEmail(email)) {
            setShowPasswordForm(true);
        }
    };

    // Real-time validation for email
    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (emailError && value.trim()) {
            setEmailError("");
        }
    };

    // Real-time validation for password
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (passwordError && value.length >= 6) {
            setPasswordError("");
        }
    };

    const handleEmailAuth = async () => {
        clearErrors();

        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        let isFirstNameValid = true;
        let isLastNameValid = true;

        // Only validate names for signup
        if (mode === "signup") {
            isFirstNameValid = validateFirstName(firstName);
            isLastNameValid = validateLastName(lastName);
        }

        if (!isEmailValid || !isPasswordValid || !isFirstNameValid || !isLastNameValid) {
            return;
        }

        try {
            if (mode === "login") {
                await dispatch(loginWithEmail({ email: email.trim(), password })).unwrap();
                toast.success("Successfully logged in!");
                router.push("/");
            } else {
                // For signup, just call the API directly without updating Redux state
                const signupData = {
                    email: email.trim(),
                    password,
                    firstName: firstName.trim(),
                    lastName: lastName.trim()
                };

                try {
                    const response = await authService.signup(signupData);

                    console.log('Signup response:', response);
                    // If we reach here, the API call was successful (status 200)
                    toast.success("Account created successfully!");

                    // Show verification screen after successful signup
                    setVerificationEmail(email.trim());
                    setVerificationMode('signup');
                    setShowVerification(true);
                } catch (error: any) {
                    // Handle different types of errors
                    if (error?.response?.data?.message) {
                        toast.error(error.response.data.message);
                    } else if (error?.response?.data?.error) {
                        toast.error(error.response.data.error);
                    } else if (error?.message) {
                        toast.error(error.message);
                    } else {
                        toast.error('Signup failed. Please try again.');
                    }
                }
            }
        } catch (error: any) {
            // Check if it's an email verification error
            if (error?.message?.toLowerCase().includes('email') && error?.message?.toLowerCase().includes('verify')) {
                // Show verification screen for email verification during login
                setVerificationEmail(email.trim());
                setVerificationMode('login');
                setShowVerification(true);
            } else {
                // Other errors are handled by the useEffect above
            }
        }
    };

    const toggleMode = () => {
        if (mode === "login") {
            router.push("/signup");
        } else {
            router.push("/login");
        }
    };

    // Verification UI Component
    const renderVerificationUI = () => (
        <div className="flex-1 flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
            <div className="mx-auto w-full max-w-sm space-y-8">
                {/* Logo */}
                <div className="flex justify-left">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-sm opacity-90"></div>
                    </div>
                </div>

                {/* Title */}
                <div className="text-left">
                    <h1 className="text-2xl font-bold text-primary mb-2">
                        Verification
                    </h1>
                    <p className="text-secondary text-sm font-normal leading-[1.125rem]">
                        Enter the OTP code we sent to <span className="font-semibold text-primary">{verificationEmail}</span>.
                    </p>
                    <p className="text-secondary text-sm font-normal leading-[1.125rem] mt-1">
                        Don't share your code with anyone.
                    </p>
                </div>

                {/* OTP Input */}
                <div className="space-y-6">
                    <div className="flex justify-center">
                        <InputOTP
                            value={otp}
                            onChange={setOtp}
                            maxLength={6}
                            disabled={loading}
                        >
                            <InputOTPGroup className="gap-3">
                                <InputOTPSlot index={0} className={`w-12 h-12 text-lg font-semibold rounded-lg border-2 ${resolvedTheme === 'dark'
                                    ? 'bg-transparent border-white/20 text-white focus:border-white/40'
                                    : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                                    } transition-colors`} />
                                <InputOTPSlot index={1} className={`w-12 h-12 text-lg font-semibold rounded-lg border-2 ${resolvedTheme === 'dark'
                                    ? 'bg-transparent border-white/20 text-white focus:border-white/40'
                                    : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                                    } transition-colors`} />
                                <InputOTPSlot index={2} className={`w-12 h-12 text-lg font-semibold rounded-lg border-2 ${resolvedTheme === 'dark'
                                    ? 'bg-transparent border-white/20 text-white focus:border-white/40'
                                    : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                                    } transition-colors`} />
                                <InputOTPSlot index={3} className={`w-12 h-12 text-lg font-semibold rounded-lg border-2 ${resolvedTheme === 'dark'
                                    ? 'bg-transparent border-white/20 text-white focus:border-white/40'
                                    : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                                    } transition-colors`} />
                                <InputOTPSlot index={4} className={`w-12 h-12 text-lg font-semibold rounded-lg border-2 ${resolvedTheme === 'dark'
                                    ? 'bg-transparent border-white/20 text-white focus:border-white/40'
                                    : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                                    } transition-colors`} />
                                <InputOTPSlot index={5} className={`w-12 h-12 text-lg font-semibold rounded-lg border-2 ${resolvedTheme === 'dark'
                                    ? 'bg-transparent border-white/20 text-white focus:border-white/40'
                                    : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                                    } transition-colors`} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    {/* Verify Button */}
                    <Button
                        onClick={handleVerifyEmail}
                        disabled={loading || otp.length !== 6}
                        className={`w-full h-12 rounded-lg font-medium ${resolvedTheme === 'dark'
                            ? 'bg-white text-black hover:bg-gray-100'
                            : 'bg-black text-white hover:bg-gray-800'
                            } transition-colors`}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className={`animate-spin rounded-full h-4 w-4 border-b-2 mr-2 ${resolvedTheme === 'dark' ? 'border-black' : 'border-white'
                                    }`}></div>
                                Verifying...
                            </div>
                        ) : (
                            "Verify Email"
                        )}
                    </Button>

                    {/* Resend Button */}
                    <div className="text-center">
                        <button
                            onClick={handleResendVerification}
                            disabled={timeLeft > 0 || loading}
                            className="text-sm text-secondary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {timeLeft > 0 ? `Resend code in ${timeLeft}s` : 'Resend code'}
                        </button>
                    </div>

                    {/* Back to login/signup */}
                    <div className="text-center pt-4">
                        <button
                            onClick={() => setShowVerification(false)}
                            className="text-sm text-secondary hover:text-primary transition-colors"
                        >
                            ← Back to {verificationMode === 'signup' ? 'signup' : 'login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex">
            {/* Left Column - Auth Form or Verification */}
            {showVerification ? renderVerificationUI() : (
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
                                onChange={(e) => handleEmailChange(e.target.value)}
                                className={`h-12 ${emailError ? "border-red-500 focus:border-red-500" : ""}`}
                                disabled={loading}
                            />
                            {emailError && (
                                <p className="text-sm text-red-500 mt-1">{emailError}</p>
                            )}
                        </div>

                        {/* Name Fields - Only show for signup */}
                        {mode === "signup" && showPasswordForm && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-sm font-medium text-primary">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            if (firstNameError && e.target.value.trim()) {
                                                setFirstNameError("");
                                            }
                                        }}
                                        className={`h-12 ${firstNameError ? "border-red-500 focus:border-red-500" : ""}`}
                                        disabled={loading}
                                    />
                                    {firstNameError && (
                                        <p className="text-sm text-red-500 mt-1">{firstNameError}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-sm font-medium text-primary">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            if (lastNameError && e.target.value.trim()) {
                                                setLastNameError("");
                                            }
                                        }}
                                        className={`h-12 ${lastNameError ? "border-red-500 focus:border-red-500" : ""}`}
                                        disabled={loading}
                                    />
                                    {lastNameError && (
                                        <p className="text-sm text-red-500 mt-1">{lastNameError}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Password Fields - Show when user clicks continue */}
                        {showPasswordForm && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-primary">
                                        Password
                                        {mode === "signup" && (
                                            <span className="text-muted-foreground text-xs ml-1">
                                                (minimum 6 characters)
                                            </span>
                                        )}
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        className={`h-12 ${passwordError ? "border-red-500 focus:border-red-500" : ""}`}
                                        disabled={loading}
                                    />
                                    {passwordError && (
                                        <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                                    )}
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
            )}

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

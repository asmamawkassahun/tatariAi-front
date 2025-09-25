"use client";

import { Button } from "../ui/button";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { logout } from "../../store/feature/auth/authThunks";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg";
    className?: string;
}

export function LogoutButton({
    variant = "outline",
    size = "default",
    className = ""
}: LogoutButtonProps) {
    const dispatch = useTypedDispatch();
    const { loading } = useTypedSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            const result = await dispatch(logout()).unwrap();
            toast.success(result.message || "Successfully logged out!");
        } catch (error: any) {
            toast.error(error?.message || "Failed to log out");
        }
    };

    return (
        <Button
            onClick={handleLogout}
            variant={variant}
            size={size}
            className={className}
            disabled={loading}
        >
            {loading ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Logging out...
                </div>
            ) : (
                <div className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </div>
            )}
        </Button>
    );
}

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

export function AuthGuard({
    children,
    requireAuth = true,
    redirectTo = '/login'
}: AuthGuardProps) {
    const { loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (requireAuth && !isAuthenticated) {
                router.push(redirectTo);
            } else if (!requireAuth && isAuthenticated) {
                router.push('/');
            }
        }
    }, [loading, isAuthenticated, requireAuth, redirectTo, router]);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Don't render children if auth state doesn't match requirements
    if (requireAuth && !isAuthenticated) {
        return null;
    }

    if (!requireAuth && isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}

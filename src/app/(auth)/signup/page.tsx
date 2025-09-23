import { AuthPage } from "@/components/auth/AuthPage";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function SignupPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/">
      <AuthPage mode="signup" />
    </AuthGuard>
  );
}
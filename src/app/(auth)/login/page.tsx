import { AuthPage } from "@/components/auth/AuthPage";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/">
      <AuthPage mode="login" />
    </AuthGuard>
  );
}

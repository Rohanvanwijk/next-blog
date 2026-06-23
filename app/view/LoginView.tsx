import { auth0 } from "../lib/auth0";

export default async function LoginView() {
  // Check if user is authenticated
  const session = await auth0.getSession();

  if (!session) {
    return (
      <div className="flex gap-2">
        {/* Redirects to Auth0 to sign up */}
        <a href="/auth/login?screen_hint=signup" className="p-1">
          Signup
        </a>
        {/* Redirects to Auth0 to log in */}
        <a href="/auth/login" className="bg-slate-800 text-white p-1 rounded">
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <a href="/auth/profile">{session.user.name}</a>

      <a href="/auth/logout" className="underline">
        Logout
      </a>
    </div>
  );
}

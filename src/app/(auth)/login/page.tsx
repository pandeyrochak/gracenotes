"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { login, loginWithGoogle } from "@/server-actions/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/component/ThemeToggleIcon";

export default function LoginComponent() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await login(formData);
    if (result.error) {
      setError(result.error);
    }
    if (result.success) {
      router.push("/");
    }
  };
  // handle sign in with google
  const handleSignInWithGoogle = async () => {
    const result = await loginWithGoogle();
    if (result.error) {
      setError(result.error);
    }
    window.alert("Login success");
  };

  return (
    <div className="grid h-screen w-full place-items-center bg-background">
      <div className="absolute top-3 right-5">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-lg space-y-4 rounded-lg border bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <Separator className="my-4" />
        <p className={`text-sm text-destructive ${error ? "block" : "hidden"}`}>
          {error}
        </p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" required />
          </div>
          {/* Button to login */}
          <Button className="w-full" type="submit">
            Login
          </Button>
          <div className="flex justify-between">
            <Link href="#" className="text-sm underline" prefetch={false}>
              Forgot password?
            </Link>
            <Link
              href="/register"
              className="text-sm underline"
              prefetch={false}
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </form>

        {/* google and github buttons */}
        <Separator className="mt-7 mb-5" />
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            <GithubIcon className="mr-2 h-4 w-4" />
            Sign in with Github
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignInWithGoogle}
          >
            <MailIcon className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

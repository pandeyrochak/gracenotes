"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/server-actions/actions";

export default function Component() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const cnfPassword = formData.get("cnf_password") as string;

    if (password !== cnfPassword) {
      setError("Passwords do not match");
      return;
    }
    const result = await signup(formData);
    console.log(result);
    if (result.error) {
      setError(result.error);
    }
    if (result.success) {
      router.push("/");
    }
  };
  return (
    <div className="grid h-screen w-full place-items-center bg-background">
      <div className="w-full max-w-lg space-y-4 rounded-lg border bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create account</h2>
        </div>
        <Separator className="my-4" />
        <p className={`text-sm text-destructive ${error ? "block" : "hidden"}`}>
          {error}
        </p>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                type="text"
                name="first_name"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                type="text"
                name="last_name"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
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
            <Input
              id="password"
              type="password"
              name="password"
              required
              placeholder="**********"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="cnf_password"
              type="password"
              name="cnf_password"
              required
              placeholder="**********"
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          <div className="flex justify-end">
            <Link href="/login" className="text-sm underline" prefetch={false}>
              Already registered? Login
            </Link>
          </div>
        </form>
        {/* google and github buttons */}
        <Separator className="mt-7 mb-5" />
        <div className="space-y-4">
          {/* <Button variant="outline" className="w-full">
            <GithubIcon className="mr-2 h-4 w-4" />
            Continue with Github
          </Button> */}
          <Button variant="outline" className="w-full">
            <MailIcon className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

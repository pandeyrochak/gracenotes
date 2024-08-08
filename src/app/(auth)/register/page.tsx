import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, MailIcon } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="grid h-screen w-full place-items-center bg-background">
      <div className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create account</h2>
        </div>
        <Separator className="my-4" />
        <form className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Fullname</Label>
            <Input id="fullname" type="text" placeholder="John Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="**********"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="cnf_password"
              type="password"
              required
              placeholder="**********"
            />
          </div>
          <Button className="w-full">Register</Button>
          <div className="flex justify-end">
            <Link href="/login" className="text-sm underline" prefetch={false}>
              Already registered? Login
            </Link>
          </div>
        </form>
        {/* google and github buttons */}
        <Separator className="mt-7 mb-5" />
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            <GithubIcon className="mr-2 h-4 w-4" />
            Continue with Github
          </Button>
          <Button variant="outline" className="w-full">
            <MailIcon className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

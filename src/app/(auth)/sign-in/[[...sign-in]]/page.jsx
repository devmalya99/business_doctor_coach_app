// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';


export default function SignInPage() {
  return <div ><SignIn 
  path="/sign-in"
  signInFallbackRedirectUrl="/dashboard"
   /></div>
}
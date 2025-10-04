import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <FormControl 
        placeholder="username" 
        className="wd-username mb-2" />
      <FormControl 
        placeholder="password" 
        type="password" 
        className="wd-password mb-2" />
      <FormControl 
        placeholder="verify password"
        type="password" 
        className="wd-password-verify mb-2" />
      <Link  
        id="wd-signout-btn"
        className="btn btn-primary w-100 mb-2"
        href="/Account/Profile" > Sign up </Link><br />
      <Link  href="/Account/Signin" > Sign in </Link>
    </div>
);}
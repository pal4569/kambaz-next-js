import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="d-flex flex-column">
      <Link href="/Account/Signin" className="mb-2 text-danger text-decoration-none">
        Signin
      </Link>
      <Link href="/Account/Signup" className="mb-2 text-danger text-decoration-none">
        Signup
      </Link>
      <Link href="/Account/Profile" className="mb-2 text-danger text-decoration-none">
        Profile
      </Link>
    </div>
  );
}

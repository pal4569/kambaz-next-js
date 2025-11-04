"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useAppSelector } from "../hooks";


export default function AccountPage() {
 const { currentUser } = useAppSelector((state) => state.accountReducer);
 if (!currentUser) {
   redirect("/Account/Signin");
 } else {
   redirect("/Account/Profile");
 }
}

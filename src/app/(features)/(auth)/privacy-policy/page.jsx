import PrivacyPolicy from "./privacy-policy";
import { metadata } from "@/app/layout";


export default function PrivacyPolicyPage () {
    metadata.title = "Privacy Policy | Runtah";
    return <PrivacyPolicy />
}
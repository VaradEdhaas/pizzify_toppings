import LegalLayout from "@/components/LeagalLayout";

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy">
      <p>Effective Date: June 25, 2025</p>

      <h2 className="text-xl font-medium text-white">1. What Are Cookies?</h2>
      <p>Cookies are small files that store preferences or login state in your browser.</p>

      <h2 className="text-xl font-medium text-white">2. Types of Cookies</h2>
      <ul className="list-disc list-inside">
        <li>Essential Cookies</li>
        <li>Analytics Cookies</li>
        <li>Marketing Cookies</li>
      </ul>

      <h2 className="text-xl font-medium text-white">3. Managing Cookies</h2>
      <p>You can disable cookies in your browser, but the app may not function properly.</p>

      <h2 className="text-xl font-medium text-white">4. Contact</h2>
      <p>Email us at <span className="text-emerald-400">support@pizzify.app</span></p>
    </LegalLayout>
  );
}

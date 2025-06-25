import LegalLayout from "@/components/LeagalLayout";

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service">
      <p>Effective Date: June 25, 2025</p>

      <h2 className="text-xl font-medium text-white">1. Use of Our Services</h2>
      <p>By using Pizzify, you agree to follow these terms. You must be 13+ to place orders.</p>

      <h2 className="text-xl font-medium text-white">2. Orders & Payments</h2>
      <p>Orders are confirmed only after successful payment. Refunds are governed by our refund policy.</p>

      <h2 className="text-xl font-medium text-white">3. Intellectual Property</h2>
      <p>All content and trademarks are owned by Pizzify. Don’t copy, resell, or misuse.</p>

      <h2 className="text-xl font-medium text-white">4. Limitation of Liability</h2>
      <p>We’re not liable for allergies, delivery delays, or service interruptions.</p>

      <h2 className="text-xl font-medium text-white">5. Contact</h2>
      <p>Email us at <span className="text-emerald-400">support@pizzify.app</span></p>
    </LegalLayout>
  );
}

import LegalLayout from "@/components/LeagalLayout";

export default function PrivacyPolicyPage() {
    return (
        <LegalLayout title="Privacy Policy">
            <p>Effective Date: June 25, 2025</p>
            <h2 className="text-xl font-medium text-white">1. Information We Collect</h2>
            <p>We collect personal and usage data to enhance your experience. This includes your name, email, address, and payment information.</p>

            <h2 className="text-xl font-medium text-white">2. How We Use It</h2>
            <p>Your data helps us deliver orders, personalize content, and improve our platform.</p>

            <h2 className="text-xl font-medium text-white">3. Sharing</h2>
            <p>We don’t sell your data. We may share info with delivery partners, payment providers, or authorities when necessary.</p>

            <h2 className="text-xl font-medium text-white">4. Your Rights</h2>
            <p>You may request access or deletion of your data at any time.</p>

            <h2 className="text-xl font-medium text-white">5. Contact</h2>
            <p>Questions? Email us at <span className="text-emerald-400">support@pizzify.app</span></p>
        </LegalLayout>
    );
}

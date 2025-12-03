
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the Terms of Service for SiRa Editor to understand the rules and guidelines for using our online photo sheet maker and collage creator.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="flex-grow w-full px-4 py-8 flex flex-col items-center gap-8 bg-slate-50">
        <div className="w-full max-w-4xl space-y-8">
            <header className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">Terms of Service</h1>
                <p className="mt-2 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>1. Agreement to Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>By using SiRa Editor (the "Application"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Application. We may modify these terms at any time, and such modifications will be effective immediately upon posting.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>2. Use of the Application</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>SiRa Editor provides a free service to create photo sheets. You agree to use the Application only for lawful purposes. You are responsible for any content you upload, and you must have the rights to use and reproduce any images you process through the Application.</p>
                    <p>You may not use the Application to create content that is illegal, defamatory, obscene, or that infringes on the intellectual property rights of others.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>3. User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>You may use the Application without an account. However, to save your history, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>4. Disclaimer of Warranties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>The Application is provided "as is" and "as available" without any warranties of any kind, express or implied. We do not warrant that the Application will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>5. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>In no event shall SiRa Editor be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Application.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>6. Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

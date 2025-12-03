
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Review the Privacy Policy for SiRa Editor to understand how we handle your data, protect your privacy, and ensure the security of your information.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-grow w-full px-4 py-8 flex flex-col items-center gap-8 bg-slate-50">
        <div className="w-full max-w-4xl space-y-8">
            <header className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">Privacy Policy</h1>
                <p className="mt-2 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>1. Introduction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Welcome to SiRa Editor. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>2. Collection of Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <h3 className="font-semibold text-foreground">Personal Data</h3>
                    <p>If you create an account, we collect personal information such as your name, email address, and profile picture that you voluntarily give us. You are under no obligation to provide us with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the application.</p>
                    
                    <h3 className="font-semibold text-foreground">Uploaded Images</h3>
                    <p>If you are not logged in, images you upload are processed directly in your browser and are never sent to or stored on our servers. If you are logged in, the final generated photosheets are saved to your private, secure history to allow you to access them later. Uploaded source images are not stored.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>3. Use of Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the application to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Create and manage your account.</li>
                        <li>Save your generated photosheet history for your personal access.</li>
                        <li>Monitor and analyze usage and trends to improve your experience with the application.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>4. Security of Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. We use Firebase Authentication and Firestore Security Rules to ensure that only you can access your own data. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>5. Policy for Children</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>6. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@siraeditor.com" className="text-primary hover:underline">privacy@siraeditor.com</a></p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

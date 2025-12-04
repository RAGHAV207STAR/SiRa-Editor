
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Download, Zap, Printer, Settings, ShieldCheck, Gift, FileQuestion, ArrowRight } from 'lucide-react';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from 'react';
import HomepageHeader from '@/components/app/homepage-header';
import { HomepageHero } from '@/components/app/homepage-hero';
import { Input } from '@/components/ui/input';

const copyOptions = [1, 2, 4, 6, 8, 10, 12, 20, 30];

const features = [
    { 
      icon: Gift, 
      title: "Completely Free", 
      description: "Create unlimited passport photo sheets without any cost or hidden charges. Our tool is 100% free." 
    },
    { 
      icon: Zap, 
      title: "Fast and Easy", 
      description: "From photo upload to a print-ready A4 sheet in under a minute. Our streamlined process saves you time and effort." 
    },
    { 
      icon: Printer,
      title: "Print-Ready A4 Sheets",
      description: "We automatically arrange your photos on a standard A4 size sheet, perfectly optimized for printing at home or at a shop." 
    },
    { 
      icon: Settings, 
      title: "Customizable Layouts", 
      description: "Easily adjust spacing, borders, and photo sizes to meet specific requirements for visas, exams, or ID cards." 
    },
    { 
      icon: ShieldCheck, 
      title: "Privacy Focused", 
      description: "Your photos are processed in your browser and are never stored on our servers if you are not logged in." 
    }
];

export default function Home() {
  const [selectedCopies, setSelectedCopies] = useState<number | null>(null);
  const [customCopies, setCustomCopies] = useState<string>('');
  const router = useRouter();
  const { canInstall, install } = usePWAInstall();
  const { toast } = useToast();

  const handleInstallClick = () => {
    if (canInstall) {
      install();
    } else {
      toast({
        title: "Installation Not Available",
        description: "Your browser does not support PWA installation, or it's not ready. Please try again later.",
      });
    }
  }

  const handleSelect = (num: number) => {
    setSelectedCopies(num);
    const params = new URLSearchParams();
    params.set('copies', num.toString());
    router.push(`/editor?${params.toString()}`);
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(customCopies, 10);
    if (!isNaN(num) && num > 0) {
        handleSelect(num);
        return;
    } else {
        toast({
            variant: 'destructive',
            title: 'Invalid Number',
            description: 'Please enter a valid number of copies.'
        })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 overflow-x-hidden">
        <header className="relative w-full text-white">
          <div className="relative h-64 md:h-80 w-full">
            <HomepageHero />
            <div className="absolute inset-0 bg-black/30 flex flex-col">
              <HomepageHeader />
            </div>
          </div>
        </header>

        <main className="flex-grow w-full px-4 py-8 flex flex-col items-center gap-8">
            {canInstall && (
              <div className="py-4 flex justify-center">
                  <Button onClick={handleInstallClick} size="lg" className="rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg transform transition-all hover:scale-105">
                      <Download className="mr-2 h-4 w-4"/>
                      Install App for a Better Experience
                  </Button>
              </div>
            )}

            <div className="w-full max-w-4xl">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 p-1 shadow-2xl"
              >
                <Card className="w-full bg-white/80 backdrop-blur-lg border-0 rounded-xl relative overflow-hidden">
                  <div className="absolute -top-1/2 -left-1/3 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-glowMove -z-10" />
                  <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-glowMove animation-delay-3000 -z-10" />

                  <div className="rounded-xl p-6">
                      <CardHeader className="text-center p-0 pb-6">
                        <CardTitle as="h1" className="text-3xl font-extrabold tracking-tight animate-gradient-shift bg-[length:200%_auto] text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-blue-700">Free Passport Size Photo Maker for A4 Sheet</CardTitle>
                        <CardDescription className="text-slate-600">Quickly arrange your passport or ID photos onto a print-ready A4 layout.</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <form 
                            className="mb-4 flex items-stretch justify-center gap-2"
                            onSubmit={handleCustomSubmit}
                        >
                            <Input 
                                type="number"
                                placeholder="Enter custom number, e.g. 15"
                                className="h-14 text-center text-lg font-semibold flex-grow"
                                value={customCopies}
                                onChange={(e) => setCustomCopies(e.target.value)}
                                min={1}
                            />
                            <Button type="submit" size="icon" className="h-14 w-14 bg-slate-800 text-white hover:bg-slate-700 shadow-md">
                                <span className="sr-only">Go</span>
                                <ArrowRight className="h-6 w-6"/>
                            </Button>
                        </form>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white/80 px-2 text-muted-foreground backdrop-blur-sm">Or choose a preset number of copies</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 w-full">
                          {copyOptions.map((num) => (
                            <Button
                              key={num}
                              variant={'secondary'}
                              className={cn(
                                "py-6 text-xl font-bold rounded-lg transition-all duration-300 transform shadow-md hover:scale-105 hover:shadow-lg"
                              )}
                              onClick={() => handleSelect(num)}
                            >
                              {num}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                  </div>
                </Card>
              </motion.div>
            </div>

            <section className="w-full max-w-4xl mx-auto py-12 px-4 md:px-0 text-slate-800" aria-labelledby="features-heading">
                <div className="text-center">
                    <h2 id="features-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl animate-gradient-shift bg-[length:200%_auto] text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-blue-700">
                        Your All-in-One Photo Layout Tool
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Welcome to SiRa Editor, the simplest way to prepare photos for printing. Instantly create print-ready A4 sheets for passport photos, visa applications, ID cards, and job applications. No software, no sign-ups, no hassle.
                    </p>
                    <p className="mt-2 text-lg text-slate-600">
                        Whether you need a sheet of official photos for your documents or multiple copies of a standard ID photo, our powerful online tool has you covered. The intuitive editor guides you through uploading and arranging your images on an A4 layout, giving you professional results instantly.
                    </p>
                </div>

                <div className="mt-12">
                    <h3 className="text-3xl font-bold text-center mb-8 animate-gradient-shift bg-[length:200%_auto] text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-blue-700">Why Choose Our A4 Photo Layout Tool?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                          <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                              <div className="p-2 bg-gradient-to-br from-blue-100 to-sky-200 rounded-lg">
                                <feature.icon className="h-6 w-6 text-blue-600" />
                              </div>
                              <CardTitle as="h4" className="text-lg font-semibold">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-600">{feature.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                </div>

                <div className="mt-16" role="region" aria-labelledby="faq-heading">
                    <div className="flex flex-col items-center text-center mb-8">
                        <FileQuestion className="h-10 w-10 mb-2 text-blue-600" />
                        <h3 id="faq-heading" className="text-3xl font-bold text-center animate-gradient-shift bg-[length:200%_auto] text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-blue-700">Frequently Asked Questions</h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                         <AccordionItem value="item-1" className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg">
                            <AccordionTrigger className="px-6 text-left">How do I make a passport photo on an A4 sheet?</AccordionTrigger>
                            <AccordionContent className="px-6">
                            Simply choose the number of copies you need, upload your photo, and our tool automatically arranges it on a standard A4 sheet. You can then download the sheet as a high-quality PNG file and print it.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg">
                            <AccordionTrigger className="px-6 text-left">Can I create an Indian passport size photo layout?</AccordionTrigger>
                            <AccordionContent className="px-6">
                            Yes, absolutely. Our editor is fully customizable. In the editor's "Page Setup", you can set the photo dimensions to the specific requirements for an Indian passport size photo (typically 3.5cm x 4.5cm) and our tool will create the perfect sheet for you.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg">
                            <AccordionTrigger className="px-6 text-left">Is this passport photo maker really free?</AccordionTrigger>
                            <AccordionContent className="px-6">
                            Yes, 100%! SiRa Editor is a completely free online tool. You can create, customize, and download as many A4 photo sheets as you need without any charges, sign-ups, or watermarks.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg">
                            <AccordionTrigger className="px-6 text-left">Are my uploaded photos safe?</AccordionTrigger>
                            <AccordionContent className="px-6">
                            Your privacy is our priority. Photos are processed directly in your browser. If you are not logged in, your images are never uploaded or stored on our servers. If you are logged in, your final sheets are saved to your private history for easy reprinting.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-4" className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg">
                            <AccordionTrigger className="px-6 text-left">What's the best way to print the A4 photo sheet?</AccordionTrigger>
                            <AccordionContent className="px-6">
                            For best results, download the generated PNG file and print it on A4 size photo paper. In your printer settings, ensure you select '100%' scale or 'Actual Size' to avoid any resizing issues and maintain the correct photo dimensions.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                
                <div className="mt-16 w-full">
                    <Card className="bg-gradient-to-r from-blue-500 to-sky-500 text-white border-0 shadow-2xl animate-gradient-shift bg-[length:200%_auto]">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                            <h3 className="text-3xl font-bold">Ready to Create Your Photo Sheet?</h3>
                            <p className="mt-2 text-lg text-blue-100">Get your perfect A4 photo layout now — it’s fast and free!</p>
                            <Button asChild size="lg" className="mt-6 bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all">
                                <Link href="/editor">Create Photo Sheet Now</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
      
      <footer className="py-6 px-4 text-center text-sm w-full">
        <p className="font-semibold text-blue-900/60">&copy; {new Date().getFullYear()} SiRa Editor. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

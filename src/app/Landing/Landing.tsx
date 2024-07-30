"use client";

import React, { useEffect, useRef , RefObject , useState} from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import ConnectButton from '@/components/ui/ConnectButton';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import ContactForm from '../ContactForm/ContactForm';
import logo from '../../../public/assets/logo.png'; // Update this with the actual path to your logo image
import Spinner from '@/components/ui/Spinner';
import Team from '../Team';
// Update in Landing component


export function Landing() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (document) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";

      document.head.appendChild(stylesheet);
    }
  }, []);
  // Create references for each section
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const teamRef = useRef(null);

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard'); // Redirect to the Dashboard page
    }
  }, [isConnected, router]);

  // Function to scroll to a specific section
  const scrollToSection = (ref: RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">

      <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Image src={logo} alt="Mode Score Logo" width={100} height={100} /> {/* Adjust width and height as needed */}
        </Link>

        <nav className="ml-auto flex gap-4 sm:gap-6 pr-4">
          <Button onClick={() => scrollToSection(featuresRef)} className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Button>
          <Button onClick={() => scrollToSection(aboutRef)} className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Button>
          <Button onClick={() => scrollToSection(teamRef)} className="text-sm font-medium hover:underline underline-offset-4">
            Team
          </Button>
          <Button onClick={() => scrollToSection(contactRef)} className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Button>
        </nav>
        <ConnectButton />
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Introducing Mode Score
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Mode Score helps crypto investors like you manage and optimize your portfolios, ensuring you get the
                    best capital efficiency.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                  onClick={() => router.push('/LearnMore')}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                  Learn More
                  </Button>
                </div>
                </div>
              </div>
              <Image
                src="/assets/BCAMP_1.jpg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section ref={featuresRef} id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unlock Your Crypto Potential</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mode Score provides you with the tools and insights to optimize your crypto portfolio and maximize
                  your capital efficiency.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/assets/BCAMP_2.jpg"
                width={550}
                height={310}
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Cross-Platform Visibility</h3>
                      <p className="text-muted-foreground">
                        Easily connect your wallets and see your entire crypto portfolio in one place.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Capital Efficiency Scoring</h3>
                      <p className="text-muted-foreground">
                        Get a personalized score to understand how efficiently you&apos;re using your capital.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Optimization Recommendations</h3>
                      <p className="text-muted-foreground">
                        Receive tailored suggestions to improve your capital efficiency and portfolio performance.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section ref={aboutRef} id="about" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Mode Score</div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Empowering Crypto Investors
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Mode Score was founded by a team of web3 developers who wanted to help inexperienced crypto investors
                  like you manage and optimize your portfolios. We&apos;re dedicated to providing you with the tools and
                  insights you need to succeed in the ever-evolving crypto market.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Approach</div>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  At Mode Score, we believe that the key to successful crypto investing is not just about picking the
                  right assets, but also about managing your capital efficiently. That&apos;s why we developed our
                  proprietary scoring system to help you understand how well you&apos;re utilizing your funds and where you
                  can improve.
                </p>
                <Button
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => scrollToSection(contactRef)}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
        <br/>
        <section ref={teamRef} id="team">
        <Team />
        <br/>
        </section>
        <section ref={contactRef} id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Contact Us
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  If you have any queries or feedback, feel free to reach out to us. We&apos;re here to help you succeed in
                  the crypto market.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  At Mode Score, we believe that the key to successful crypto investing is not just about picking the
                  right assets, but also about managing your capital efficiently. That&apos;s why we developed our
                  proprietary scoring system to help you understand how well you&apos;re utilizing your funds and where you
                  can improve.
                </p>
                <ContactForm />
            </div>
          </div>
            
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Mode Score. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 p-3 bg-blue-500 text-white rounded-full shadow-lg transition-opacity hover:opacity-80"
        >
          ↑
        </button>
      )}
    </div>
  );
}


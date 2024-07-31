import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../public/assets/logo.png'; // Update this with the actual path to your logo image
import optimizeImage from '../../public/assets/digital-assets.webp'; // Example image for optimization section
import integrationImage from '../../public/assets/investment-opportunities.webp'; // Example image for integration section
import recommendationImage from '../../public/assets/investments.webp'; // Example image for recommendation section
const LearnMore = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-black"> {/* Ensure the background is set to white */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Button onClick={handleBack} className="text-sm font-medium hover:underline underline-offset-4">
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-center flex-1 fancy-text">
              Discover Mode Score
            </h1>
        <div className="ml-auto">
          <Image src={logo} alt="Mode Score Logo" width={100} height={100} /> {/* Adjust width and height as needed */}
        </div>
      </header>

      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-9 text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <Image src={integrationImage} alt="Integration" className="mx-auto" width={300} height={300} />
              <p className="max-w-[500px] mx-auto text-muted-foreground md:text-xl">
                People with digital assets often aren't using them to their full potential, especially if those assets are spread across different platforms. This makes it hard to keep track of everything, manage risk, and make good investment decisions. But most importantly, it makes it difficult for users who are particularly new to DeFi, unaware of how much more efficient they could be with their digital assets.
              </p>
              <p className="max-w-[500px] mx-auto text-muted-foreground md:text-xl">
                Consolidate users' assets from all ecosystems into a user-friendly interface, and suggest investment opportunities for this idle capital, such as Mode staking, Yield Farming or other options.
              </p>
              <Image src={optimizeImage} alt="Optimize" className="mx-auto" width={300} height={300} />
              <Image src={recommendationImage} alt="Recommendation" className="mx-auto" width={300} height={300} />
              <p className="max-w-[500px] mx-auto text-muted-foreground md:text-xl">
                Introducing Mode Score, a dApp where you can connect your wallet and receive a score that reflects your capital efficiency on multiple ecosystems. Alongside your score, we will provide personalized recommendations on how to optimize your portfolio for greater capital efficiency.
              </p>
            </div>

            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl">
              Mode Score is a dApp that evaluates and optimizes your digital assets across multiple ecosystems with a capital efficiency score, and a user-friendly interface. It integrates wallets, recommends opportunities, and is especially helpful for newcomers to DeFi.
            </p>
          </div>
        </div>
      </main>
      <br/>
    </div>
  );
};

export default LearnMore;
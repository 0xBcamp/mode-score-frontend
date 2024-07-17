import Image from "next/image";
import { Landing } from "@/components/Landing";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <> <Dashboard/> </>
      </main>
  ); 
};

import Image from "next/image";
import Landing from "./Landing/page";
// import CovalentForm from "@/components/CovalentForms";
// import { Dashboard } from "@/components/Dashboard"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <> <Landing/> </>
      <div>
      {/* <h1>Covalent Credit Score</h1>
      <CovalentForm /> */}
    </div>
      </main>
  ); 
};


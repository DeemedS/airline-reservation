import Cta from "@/components/cta/cta";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("../components/hero/hero"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
    <Hero />
    </>
  )
}


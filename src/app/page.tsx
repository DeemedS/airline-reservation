import Nav from "@/components/nav/nav";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("../components/hero/hero"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
    <Nav />
    <Hero />
    </>
  )
}


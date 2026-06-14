import TrustedBy from "../../components/landing/TrustedBy";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";
import Features from "../../components/landing/HomeFeatures";
import Hero from "../../components/landing/Hero";

export default function LandingPage() {
    return (
        <>
            <Hero />
            <Features />
            <TrustedBy />
            <CTA />
            <Footer />
        </>
    );
}
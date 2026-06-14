import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="no-underline">
                    <div className="text-3xl font-bold text-blue-600">
                        File Manager
                    </div>
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-10">
                    <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 no-underline">
                        Features
                    </a>

                    <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 no-underline">
                        Pricing
                    </a>

                    <a href="#faq" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 no-underline">
                        FAQ
                    </a>
                </nav>

                {/* CTA */}
                <Link to="/dashboard">
                    <Button type="primary" size="large" className="!h-11 !px-6 !rounded-xl">
                        Get Started
                    </Button>
                </Link>

            </div>
        </header>
    );
}
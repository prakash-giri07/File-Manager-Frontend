import {
    CloudUploadOutlined,
    GithubOutlined,
    LinkedinOutlined,
    TwitterOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="py-12 flex flex-col lg:flex-row items-center justify-between gap-8">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 no-underline hover:no-underline"
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className="
                    h-14 w-14
                    rounded-2xl
                    overflow-hidden
                    flex items-center justify-center
                  "
                        >
                            <img
                                src="/nexadrive-logo.png"
                                alt="NexaDrive"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="no-underline">
                            <h4 className="m-0 text-lg font-bold text-slate-900 no-underline">
                                NexaDrive
                            </h4>
                            <p className="m-0 text-xs text-slate-500 hidden sm:block">
                                Cloud Storage Platform
                            </p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">

                        <Link
                            to="/"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                            style={{ textDecoration: "none" }}
                        >
                            Home
                        </Link>

                        <Link
                            to="/features"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                            style={{ textDecoration: "none" }}
                        >
                            Features
                        </Link>

                        <Link
                            to="/pricing"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                            style={{ textDecoration: "none" }}
                        >
                            Pricing
                        </Link>

                        <Link
                            to="/faq"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                            style={{ textDecoration: "none" }}
                        >
                            FAQ
                        </Link>

                        <Link
                            to="/contact"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                            style={{ textDecoration: "none" }}
                        >
                            Contact
                        </Link>

                    </div>

                    {/* Social */}
                    <div className="flex items-center gap-3">

                        <a
                            href="#"
                            className="h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                        >
                            <GithubOutlined />
                        </a>

                        <a
                            href="#"
                            className="h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                        >
                            <LinkedinOutlined />
                        </a>

                        <a
                            href="#"
                            className="h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                        >
                            <TwitterOutlined />
                        </a>

                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-slate-200 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} NexaDrive. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm">

                        <Link
                            to="/privacy"
                            className="text-slate-500 hover:text-blue-600 transition-colors"
                            style={{ textDecoration: "none" }}
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            to="/terms"
                            className="text-slate-500 hover:text-blue-600 transition-colors"
                            style={{ textDecoration: "none" }}
                        >
                            Terms of Service
                        </Link>

                    </div>

                </div>

            </div>
        </footer>
    );
}
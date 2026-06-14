import { Button, Drawer } from "antd";
import { MenuOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header
                className="
                sticky top-0 z-50
                bg-white/80
                backdrop-blur-xl
                border-b border-slate-200
                "
            >
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-20 flex items-center justify-between">

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

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-10">
                            <Link
                                to="/"
                                className="text-slate-600 hover:text-blue-600 transition no-underline font-medium"
                                style={{ textDecoration: "none" }}
                            >
                                Home
                            </Link>

                            <Link
                                href="#features"
                                className="text-slate-600 hover:text-blue-600 transition no-underline font-medium"
                                style={{ textDecoration: "none" }}
                            >
                                Features
                            </Link>

                            <Link
                                href="#pricing"
                                className="text-slate-600 hover:text-blue-600 transition no-underline font-medium"
                                style={{ textDecoration: "none" }}
                            >
                                Pricing
                            </Link>

                            <Link
                                href="#faq"
                                className="text-slate-600 hover:text-blue-600 transition no-underline font-medium"
                                style={{ textDecoration: "none" }}
                            >
                                FAQ
                            </Link>

                            <Link
                                href="#contact"
                                className="text-slate-600 hover:text-blue-600 transition no-underline font-medium"
                                style={{ textDecoration: "none" }}
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-2">
                            <Link to="/login">
                                <Button
                                    type="text"
                                    size="large"
                                    className="!font-medium"
                                >
                                    Login
                                </Button>
                            </Link>

                            <Link to="/signup">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="
                                    !h-11
                                    !px-6
                                    !rounded-xl
                                    !font-medium
                                    "
                                >
                                    Sign Up Free
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            className="lg:!hidden"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <Drawer
                placement="right"
                open={open}
                onClose={() => setOpen(false)}
                width={280}
                title="NexaDrive"
            >
                <div className="flex flex-col gap-5">

                    <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className="text-slate-700 no-underline"
                    >
                        Home
                    </Link>

                    <Link
                        href="#features"
                        onClick={() => setOpen(false)}
                        className="text-slate-700 no-underline"
                    >
                        Features
                    </Link>

                    <Link
                        href="#pricing"
                        onClick={() => setOpen(false)}
                        className="text-slate-700 no-underline"
                    >
                        Pricing
                    </Link>

                    <Link
                        href="#faq"
                        onClick={() => setOpen(false)}
                        className="text-slate-700 no-underline"
                    >
                        FAQ
                    </Link>

                    <Link
                        href="#contact"
                        onClick={() => setOpen(false)}
                        className="text-slate-700 no-underline"
                    >
                        Contact
                    </Link>

                    <div className="border-t pt-5 flex flex-col gap-3">
                        <Link to="/login">
                            <Button block size="large">
                                Login
                            </Button>
                        </Link>

                        <Link to="/signup">
                            <Button
                                block
                                type="primary"
                                size="large"
                            >
                                Sign Up Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </Drawer>
        </>
    );
}
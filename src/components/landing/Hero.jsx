import {
    CloudUploadOutlined,
    FolderOpenOutlined,
    SafetyCertificateOutlined,
} from "@ant-design/icons";

import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-[calc(100vh-80px)] flex items-center">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

            <div className="relative max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-20">

                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] items-center gap-12 xl:gap-20">

                    {/* LEFT SIDE */}
                    <div className="text-center lg:text-left">

                        <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-green-700 text-sm font-medium">
                            Secure. Reliable. Always with you.
                        </div>

                        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-slate-900">
                            Your Files.
                            <br />
                            <span className="text-blue-600">
                                Organized.
                            </span>
                            <br />
                            Accessible.
                        </h1>

                        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                            Store, organize and access your files from anywhere. Fast, secure and built for everyone. Upload, manage and share files effortlessly with a modern cloud-first experience.
                        </p>

                        {/* CTA BUTTONS */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

                            <Link to="/dashboard">
                                <Button type="primary" size="large" className="!h-12 !px-8 !rounded-xl">
                                    Get Started Free
                                </Button>
                            </Link>

                            <Button size="large" className="!h-12 !px-8 !rounded-xl">
                                Watch Demo
                            </Button>

                        </div>

                        {/* FEATURES */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                            <div className="flex items-center gap-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                    <CloudUploadOutlined className="text-[22px] leading-none text-blue-600" />
                                </div>

                                <div>
                                    <h4 className="text-base font-semibold whitespace-nowrap text-slate-900">
                                        Easy Upload
                                    </h4>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Upload files in seconds
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                                    <SafetyCertificateOutlined className="text-[22px] leading-none text-green-600" />
                                </div>

                                <div>
                                    <h4 className="text-base font-semibold whitespace-nowrap text-slate-900">
                                        Secure Storage
                                    </h4>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Enterprise-grade security
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                                    <FolderOpenOutlined className="text-[22px] leading-none text-purple-600" />
                                </div>

                                <div>
                                    <h4 className="text-base font-semibold whitespace-nowrap text-slate-900">
                                        Access Anywhere
                                    </h4>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Available on every device
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative flex justify-center lg:justify-end">

                        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />

                        <img
                            src="/hero-dashboard.png"
                            alt="File Manager Dashboard"
                            className="relative w-full max-w-[950px] h-auto object-contain rounded-[32px] border border-white/80 shadow-[0_40px_120px_rgba(37,99,235,0.25)] transition-all duration-500 hover:scale-[1.02]"
                        />

                    </div>

                </div>

            </div>
        </section>
    );
}

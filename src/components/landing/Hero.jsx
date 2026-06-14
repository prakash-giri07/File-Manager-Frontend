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

            <div className="relative max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-20">

                <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] items-center gap-12 xl:gap-10">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col justify-center items-center text-center max-w-4xl mx-auto">

                        {/* Heading */}
                        <h1 className="mt-6 font-bold leading-[0.95] tracking-tight text-slate-900">
                            <span className="block text-5xl sm:text-6xl lg:text-7xl">
                                Your Files
                            </span>

                            <span className="block text-blue-600 text-6xl sm:text-7xl lg:text-8xl">
                                Organized
                            </span>

                            <span className="block text-5xl sm:text-6xl lg:text-7xl">
                                Accessible
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                            Store, organize and access your files from anywhere.
                            Upload, manage and share files effortlessly with a
                            modern cloud-first experience built for speed and security.
                        </p>

                        {/* CTA */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

                            <Link to="/dashboard">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="!h-12 !px-8 !rounded-xl"
                                >
                                    Get Started Free
                                </Button>
                            </Link>

                            <Button
                                size="large"
                                className="!h-12 !px-8 !rounded-xl"
                            >
                                Watch Demo
                            </Button>

                        </div>
                        {/* Feature Pills */}
                        <div className="mt-10 flex flex-wrap gap-3 justify-center w-full">

                            <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-gradient-to-r from-white/80 via-blue-50/80 to-indigo-50/80 backdrop-blur-md px-5 py-3 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                    <CloudUploadOutlined className="text-blue-600" />
                                </div>

                                <span className="text-sm font-medium text-slate-700">
                                    Easy Upload
                                </span>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-gradient-to-r from-white/80 via-blue-50/80 to-indigo-50/80 backdrop-blur-md px-5 py-3 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
                                    <SafetyCertificateOutlined className="text-emerald-600" />
                                </div>

                                <span className="text-sm font-medium text-slate-700">
                                    Secure Storage
                                </span>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-gradient-to-r from-white/80 via-blue-50/80 to-indigo-50/80 backdrop-blur-md px-5 py-3 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                                    <FolderOpenOutlined className="text-violet-600" />
                                </div>

                                <span className="text-sm font-medium text-slate-700">
                                    Access Anywhere
                                </span>
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

import {
    Form,
    Input,
    Button,
    Divider,
} from "antd";

import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    CloudUploadOutlined,
    FolderOpenOutlined,
    SafetyCertificateOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <div className="h-[calc(100vh-81px)] bg-slate-50 overflow-hidden">

            <div className="grid h-full lg:grid-cols-2">

                {/* LEFT SIDE */}
                <div
                    className="
                    hidden lg:flex
                    relative
                    overflow-hidden
                    bg-gradient-to-br
                    from-blue-600
                    via-indigo-600
                    to-violet-700
                    items-center
                    justify-center
                    px-10
                    py-8
                "
                >
                    {/* Glow Effects */}
                    <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

                    <div className="relative w-full max-w-2xl text-white">

                        <div className="text-center mb-6">
                            <h2 className="text-5xl font-bold leading-tight">
                                Start Managing
                                <br />
                                Files Smarter
                            </h2>

                            <p className="mt-4 text-lg text-blue-100">
                                Secure cloud storage platform trusted by
                                thousands of users worldwide.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 mb-8">

                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                                <FolderOpenOutlined className="text-3xl mb-4" />

                                <h4 className="text-xl font-semibold mb-2">
                                    Organize
                                </h4>

                                <p className="text-sm text-blue-100">
                                    Keep all files structured and accessible.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                                <SafetyCertificateOutlined className="text-3xl mb-4" />

                                <h4 className="text-xl font-semibold mb-2">
                                    Secure
                                </h4>

                                <p className="text-sm text-blue-100">
                                    End-to-end encrypted cloud storage.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                                <CloudUploadOutlined className="text-3xl mb-4" />

                                <h4 className="text-xl font-semibold mb-2">
                                    Upload
                                </h4>

                                <p className="text-sm text-blue-100">
                                    Upload and access files instantly.
                                </p>
                            </div>

                        </div>

                        {/* Dashboard */}
                        <div className="flex justify-center">
                            <img
                                src="/hero-dashboard.png"
                                alt="Dashboard"
                                className="
                                w-full
                                max-w-[620px]
                                rounded-3xl
                                shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                                border
                                border-white/20
                            "
                            />
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center justify-center px-6">

                    <div className="w-full max-w-[560px]">

                        <div
                            className="
                            bg-white
                            rounded-[32px]
                            border
                            border-slate-200
                            p-10
                            shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                        "
                        >

                            {/* Logo */}
                            <div className="flex items-center gap-3 mb-8">

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

                                <div>
                                    <h4 className="m-0 text-2xl font-bold">
                                        NexaDrive
                                    </h4>

                                    <p className="m-0 text-slate-500 text-sm">
                                        Cloud Storage Platform
                                    </p>
                                </div>

                            </div>

                            {/* Heading */}
                            <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                                Create Account
                            </h1>

                            <p className="mt-3 text-lg text-slate-500">
                                Create your account and start managing
                                files securely.
                            </p>

                            <Form
                                layout="vertical"
                                className="mt-8"
                            >
                                <Form.Item
                                    label="Full Name"
                                    name="name"
                                >
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined />}
                                        placeholder="Enter your full name"
                                        className="h-14 rounded-xl"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Email Address"
                                    name="email"
                                >
                                    <Input
                                        size="large"
                                        prefix={<MailOutlined />}
                                        placeholder="Enter your email"
                                        className="h-14 rounded-xl"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                >
                                    <Input.Password
                                        size="large"
                                        prefix={<LockOutlined />}
                                        placeholder="Create a password"
                                        className="h-14 rounded-xl"
                                    />
                                </Form.Item>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    size="large"
                                    className="
                                    h-14
                                    rounded-xl
                                    text-base
                                    font-semibold
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-blue-500
                                    border-0
                                "
                                >
                                    Create Account
                                </Button>

                                <Divider className="my-8">
                                    OR
                                </Divider>

                                <Button
                                    block
                                    size="large"
                                    className="
                                    h-14
                                    rounded-xl
                                    border-slate-300
                                    text-base
                                "
                                >
                                    <img
                                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                        alt="Google"
                                        className="w-5 h-5 mr-2"
                                    />
                                    Continue with Google
                                </Button>

                                <div className="mt-8 text-center">
                                    <span className="text-slate-500">
                                        Already have an account?
                                    </span>

                                    <Link
                                        to="/login"
                                        className="ml-2 font-semibold text-blue-600"
                                    >
                                        Login
                                    </Link>
                                </div>

                            </Form>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
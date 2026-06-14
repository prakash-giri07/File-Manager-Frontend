import { Form, Input, Button } from "antd";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <div className="min-h-[calc(100vh-80px)] grid lg:grid-cols-2">

            <div className="flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-md">

                    <h1 className="text-4xl font-bold text-slate-900">
                        Create Account
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Start managing your files today.
                    </p>

                    <Form
                        layout="vertical"
                        className="mt-8"
                    >
                        <Form.Item label="Full Name">
                            <Input
                                size="large"
                                prefix={<UserOutlined />}
                                placeholder="Enter Full Name"
                            />
                        </Form.Item>

                        <Form.Item label="Email">
                            <Input
                                size="large"
                                prefix={<MailOutlined />}
                                placeholder="Enter your email"
                            />
                        </Form.Item>

                        <Form.Item label="Password">
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined />}
                                placeholder="Enter password"
                            />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                        >
                            Create Account
                        </Button>

                        <p className="text-center mt-5">
                            Already have an account?{" "}
                            <Link to="/login">
                                Login
                            </Link>
                        </p>
                    </Form>
                </div>
            </div>

            <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
                <img
                    src="/hero-dashboard.png"
                    alt="Dashboard"
                    className="w-[80%] rounded-3xl shadow-2xl"
                />
            </div>
        </div>
    );
}
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function CTA() {
    return (
        <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="max-w-4xl mx-auto px-6 text-center">

                <h2 className="text-4xl font-bold text-white">
                    Ready to manage your files smarter ?
                </h2>

                <p className="mt-4 text-lg text-blue-100">
                    Upload, organize and access your files securely from anywhere.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <Link to="/login">
                        <Button
                            size="large"
                            className="!h-12 !px-8 !rounded-xl"
                        >
                            <span className="font-semibold">
                                Login
                            </span>
                        </Button>
                    </Link>

                    <Link to="/signup">
                        <Button
                            type="primary"
                            size="large"
                            className="!h-12 !px-8 !rounded-xl !bg-white !text-blue-600 !border-white hover:!bg-blue-50"
                        >
                            <span className="font-semibold">
                                Sign Up Free
                            </span>
                        </Button>
                    </Link>

                </div>

            </div>
        </section>
    );
}
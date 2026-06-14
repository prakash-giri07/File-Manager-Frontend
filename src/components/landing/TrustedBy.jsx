import {
    FaGoogle,
    FaMicrosoft,
    FaDropbox,
    FaSlack,
    FaGithub,
} from "react-icons/fa";

import { SiNotion } from "react-icons/si";

export default function TrustedBy() {
    const companies = [
        "Google",
        "Microsoft",
        "Dropbox",
        "Slack",
        "GitHub",
        "Notion",
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-transparent to-slate-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center">
                    <p className="text-lg text-slate-500">
                        Trusted by individuals and teams worldwide
                    </p>
                </div>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">

                    <div className="flex items-center gap-2 text-slate-800">
                        <FaGoogle className="text-4xl" />
                        <span className="text-4xl font-semibold">Google</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-800">
                        <FaMicrosoft className="text-4xl" />
                        <span className="text-4xl font-semibold">Microsoft</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-800">
                        <FaDropbox className="text-4xl" />
                        <span className="text-4xl font-semibold">Dropbox</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-800">
                        <FaSlack className="text-4xl" />
                        <span className="text-4xl font-semibold">Slack</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-800">
                        <FaGithub className="text-4xl" />
                        <span className="text-4xl font-semibold">GitHub</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-800">
                        <SiNotion className="text-4xl" />
                        <span className="text-4xl font-semibold">Notion</span>
                    </div>

                </div>

            </div>
        </section>
    );
}
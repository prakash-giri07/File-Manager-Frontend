import {
    FolderOpenOutlined,
    SafetyCertificateOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
    ArrowRightOutlined,
} from "@ant-design/icons";

export default function Features() {
    const features = [
        {
            icon: <FolderOpenOutlined />,
            title: "Organize Effortlessly",
            description:
                "Create folders, rename, move, and keep everything in order.",
            bg: "bg-blue-100",
            color: "text-blue-600",
        },
        {
            icon: <SafetyCertificateOutlined />,
            title: "Built-in Security",
            description:
                "Advanced encryption keeps your data private and protected.",
            bg: "bg-green-100",
            color: "text-green-600",
        },
        {
            icon: <ClockCircleOutlined />,
            title: "Recent Access",
            description:
                "Quickly find your recently accessed files in one place.",
            bg: "bg-purple-100",
            color: "text-purple-600",
        },
        {
            icon: <DeleteOutlined />,
            title: "Trash Recovery",
            description:
                "Restore deleted files anytime within the trash section.",
            bg: "bg-orange-100",
            color: "text-orange-500",
        },
    ];

    return (
        <section
            id="features"
            className="py-10 bg-gradient-to-b from-slate-50 to-white"
        >
            <div className="max-w-full mx-20 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="
                                group
                                bg-white
                                border
                                border-slate-200
                                rounded-2xl
                                p-5
                                shadow-sm
                                hover:shadow-md
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            "
                        >
                            <div
                                className={`
                                    w-12 h-12
                                    rounded-xl
                                    flex items-center justify-center
                                    text-2xl
                                    ${item.bg}
                                    ${item.color}
                                `}
                            >
                                {item.icon}
                            </div>

                            <h3 className="mt-3 text-lg font-semibold text-slate-900">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-sm text-slate-600 leading-6">
                                {item.description}
                            </p>

                            <div className="mt-4 flex justify-end">
                                <ArrowRightOutlined
                                    className="
                                        text-base
                                        text-slate-400
                                        group-hover:text-blue-600
                                        group-hover:translate-x-1
                                        transition-all
                                    "
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
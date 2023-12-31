import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({
    children,
    modal,
}: {
    children: React.ReactNode,
    modal: React.ReactNode,
}) {

    return (
        <div className="w-full min-h-max">
            <div className="max-w-7xl mx-auto min-h-screen flex flex-col md:flex-row gap-2">
                <Sidebar />
                {modal}
                <div className="mt-8  w-full h-full">{children}</div>
            </div>
        </div>
    );
};
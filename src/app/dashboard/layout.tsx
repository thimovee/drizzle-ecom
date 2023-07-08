import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className="w-full min-h-max">
            <div className="max-w-7xl mx-auto  flex gap-2">
                <Sidebar />
                <div className="mt-8 ml-4 w-full h-full">{children}</div>
            </div>
        </div>
    );
};
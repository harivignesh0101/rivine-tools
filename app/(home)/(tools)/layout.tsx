import {Card} from "@/components/ui/card";
import {QrMenu} from "@/components/custom/qr-code/qr-menu";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="container mx-auto p-4 md:p-8">
                <Card className="overflow-hidden py-0 backdrop-blur-sm bg-background">
                    <div className="flex flex-col md:flex-row">
                        <QrMenu />
                        <div className="flex-1 p-0">{children}</div>
                    </div>
                </Card>
            </div>
        </>
    )
}

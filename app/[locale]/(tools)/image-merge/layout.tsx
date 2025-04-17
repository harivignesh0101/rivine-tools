import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {QrMenu} from "@/components/custom/qr-code/qr-menu";
import ImageMergerDocumentation from "@/components/custom/image-merger/image-merge-docs";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="mx-auto p-4 md:p-8">
                <Card className="overflow-hidden bg-background backdrop-blur-sm">
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
                <div className="mt-4">
                    <ImageMergerDocumentation/>
                </div>
            </div>
        </>
    )
}

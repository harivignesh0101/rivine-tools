import {Card, CardContent} from "@/components/ui/card";
import TextToHandwritingDocumentation from "@/components/custom/text-to-handwriting/text-to-handwriting-docs";

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
                    <TextToHandwritingDocumentation/>
                </div>
            </div>
        </>
    )
}

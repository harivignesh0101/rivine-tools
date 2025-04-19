import {Card, CardContent} from "@/components/ui/card";
import TextCompareDocumentation from "@/components/custom/text-compare/text-compare-docs";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="mx-auto p-4 md:p-8">
                <Card className="overflow-hidden backdrop-blur-sm">
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
                <div className="mt-4">
                    <TextCompareDocumentation/>
                </div>
            </div>
        </>
    )
}

import {Card, CardContent} from "@/components/ui/card";
import InstagramPostGeneratorDocumentation from "@/components/custom/instagram/instagram-post-generator-docs";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="container mx-auto p-4 md:p-8">
                <Card className="overflow-hidden backdrop-blur-sm">
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
                <div className="mt-4">
                    <InstagramPostGeneratorDocumentation/>
                </div>
            </div>
        </>
    )
}

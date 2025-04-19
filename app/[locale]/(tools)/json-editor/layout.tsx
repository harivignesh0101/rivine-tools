import {Card, CardContent, CardHeader} from "@/components/ui/card";
import JSONEditorDocumentation from "@/components/custom/json/json-editor-docs";

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
                    <JSONEditorDocumentation/>
                </div>
            </div>
        </>
    )
}

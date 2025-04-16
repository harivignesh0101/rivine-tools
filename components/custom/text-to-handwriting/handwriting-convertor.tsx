"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Download, RefreshCw, Trash, Book, FileText, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { jsPDF } from "jspdf"
import { toPng } from "html-to-image"
import "./handwritten-fonts.css"
import {ColorPickerPopover} from "@/components/custom/text-to-handwriting/color-picker";
import {textToHandwriting} from "@/config/i18n-constants";
import {useTranslations} from "use-intl";
import {Alert, AlertDescription} from "@/components/ui/alert";

const HANDWRITING_FONTS = [
    { name: "Dawning of a New Day", value: "Dawning of a New Day" },
    { name: "Caveat", value: "Caveat" },
    { name: "Mistral Handwritten", value: "MistralSingleLineOutline-Regular"},
    { name: "Signatura Monoline", value: "signatura-monoline" },
    { name: "Child", value: "Parkinsons" },
    { name: "Dwayne Dylan", value: "DwayneDylan" },
    { name: "Quetine", value: "Quetine" },
    { name: "Brandise Signature", value: "BrandiseSignature" },
    { name: "Singlong", value: "Singlong" },
    { name: "Indie Flower", value: "Indie Flower" },
    { name: "Kalam", value: "Kalam" },
    { name: "Shadows Into Light", value: "Shadows Into Light" },
    { name: "Homemade Apple", value: "Homemade Apple" },
    { name: "Reenie Beanie", value: "Reenie Beanie" },
    { name: "Kristi", value: "Kristi" },
    { name: "Marck Script", value: "Marck Script" },
]

const PAGE_SIZES = {
    A4: { width: 210, height: 297 }, // mm
    Letter: { width: 216, height: 279 }, // mm
    Legal: { width: 216, height: 356 }, // mm
    A5: { width: 148, height: 210 }, // mm
}

type BookPage = {
    id: string
    type: "text" | "image"
    content: string
    imageUrl?: string
}

export default function HandwritingConverter() {
    const [text, setText] = useState("Hello world")
    const [font, setFont] = useState("Dawning of a New Day")
    const [fontSize, setFontSize] = useState(18)
    const [inkColor, setInkColor] = useState("#1a237e")
    const [pageSize, setPageSize] = useState("A4")
    const [verticalPosition, setVerticalPosition] = useState(6)
    const [wordSpacing, setWordSpacing] = useState(0)
    const [letterSpacing, setLetterSpacing] = useState(0)
    const [leftMargin, setLeftMargin] = useState(50)
    const [topMargin, setTopMargin] = useState(50)
    const [showMargin, setShowMargin] = useState(true)
    const [showPageLines, setShowPageLines] = useState(true)
    const [pageBackground, setPageBackground] = useState("#ffffff")
    const [marginColor, setMarginColor] = useState("#ff0000")
    const [lineColor, setLineColor] = useState("#aaccff")
    const [lineSpacing, setLineSpacing] = useState(24)
    const [loading, setLoading] = useState(false)
    const [bookPages, setBookPages] = useState<BookPage[]>([])

    const t = useTranslations()

    const pageRef = useRef<HTMLDivElement>(null)

    // Calculate page dimensions in pixels (assuming 96 DPI)
    const mmToPx = (mm: number) => Math.round(mm * 3.7795275591)
    const pageWidth = mmToPx(PAGE_SIZES[pageSize as keyof typeof PAGE_SIZES].width)
    const pageHeight = mmToPx(PAGE_SIZES[pageSize as keyof typeof PAGE_SIZES].height)

    const handleDownload = () => {
        if (!pageRef.current) return

        // Add this to suppress specific console errors related to fonts
        const originalConsoleError = console.error;
        console.error = (...args) => {
            // Filter out font/CSS related errors
            if (args[0] && typeof args[0] === 'string' &&
                (args[0].includes('css file') ||
                    args[0].includes('CSS rules') ||
                    args[0].includes('Error inlining remote css file'))) {
                return; // Ignore these specific errors
            }
            originalConsoleError.apply(console, args);
        };

        toPng(pageRef.current, {
            width: pageWidth,
            height: pageHeight,
            backgroundColor: pageBackground,
            pixelRatio: 2, // Equivalent to scale: 2 in html2canvas
            cacheBust: true,
        }).then((dataUrl) => {
            // Create download link
            const link = document.createElement("a")
            link.download = "handwritten-text.png"
            link.href = dataUrl
            link.click()

            // Restore original console.error
            console.error = originalConsoleError;
        }).catch((error) => {
            // Restore original console.error
            console.error = originalConsoleError;
            console.error("Error generating image:", error)
        })
    }

    const addToBook = async () => {
        if (!pageRef.current) return;

        // Add this to suppress specific console errors related to fonts
        const originalConsoleError = console.error;
        console.error = (...args) => {
            if (
                args[0] && typeof args[0] === "string" &&
                (args[0].includes("css file") ||
                    args[0].includes("CSS rules") ||
                    args[0].includes("Error inlining remote css file"))
            ) {
                return; // Ignore these specific errors
            }
            originalConsoleError.apply(console, args);
        };

        try {
            const dataUrl = await toPng(pageRef.current, {
                width: pageWidth,
                height: pageHeight,
                backgroundColor: pageBackground,
                pixelRatio: 2,
                cacheBust: true,
            });

            setBookPages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    type: "text",
                    content: text,
                    imageUrl: dataUrl,
                },
            ]);
            scrollToCard()
            // setActiveTab("book");
        } catch (error) {
            console.error("Error generating image for book:", error);
        } finally {
            console.error = originalConsoleError;
        }
    };

    const addImageToBook = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const imageUrl = event.target?.result as string
            setBookPages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    type: "image",
                    content: "",
                    imageUrl,
                },
            ])
            scrollToCard()
            // setActiveTab("book")
        }
        reader.readAsDataURL(file)
    }

    const removeBookPage = (id: string) => {
        setBookPages((prev) => prev.filter((page) => page.id !== id))
    }

    const downloadBookAsPDF = async () => {
        if (bookPages.length === 0) return

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: pageSize,
        })

        for (let i = 0; i < bookPages.length; i++) {
            const page = bookPages[i]
            if (i > 0) pdf.addPage()

            // Add image to PDF
            if (page.imageUrl) {
                pdf.addImage(
                    page.imageUrl,
                    "PNG",
                    0,
                    0,
                    PAGE_SIZES[pageSize as keyof typeof PAGE_SIZES].width,
                    PAGE_SIZES[pageSize as keyof typeof PAGE_SIZES].height,
                )
            }
        }

        pdf.save("handwritten-book.pdf")
    }

    const downloadBookAsImages = () => {
        if (bookPages.length === 0) return

        bookPages.forEach((page, index) => {
            if (page.imageUrl) {
                const link = document.createElement("a")
                link.download = `handwritten-page-${index + 1}.png`
                link.href = page.imageUrl
                link.click()
            }
        })
    }

    const scrollToCard = () => {
        const cardElement = document.getElementById("book");
        if (cardElement) {
            cardElement.scrollIntoView({
                behavior: "smooth", // For smooth scrolling
                block: "start",     // Aligns the element to the top of the viewport
            });
        }
    };

    return (
        <div className="flex flex-col">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-center">{t(`${textToHandwriting}.page.title`)}</h2>
                <p className="text-center text-sm text-muted-foreground">{t(`${textToHandwriting}.page.description`)}</p>
            </div>

            {/*Editor*/}
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/3 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="text">{t(`${textToHandwriting}.page.yourText`)}</Label>
                        <Textarea id="text" value={text} onChange={(e) => setText(e.target.value)} className="min-h-[150px]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="font">{t(`${textToHandwriting}.page.font`)}</Label>
                            <Select value={font} onValueChange={setFont}>
                                <SelectTrigger id="font">
                                    <SelectValue placeholder={t(`${textToHandwriting}.page.selFont`)} />
                                </SelectTrigger>
                                <SelectContent>
                                    {HANDWRITING_FONTS.map((fontObj) => (
                                        <SelectItem
                                            key={fontObj.value}
                                            value={fontObj.value}
                                            style={{ fontFamily: fontObj.value }}
                                        >
                                            {fontObj.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pageSize">{t(`${textToHandwriting}.page.pageSize`)}</Label>
                            <Select value={pageSize} onValueChange={setPageSize}>
                                <SelectTrigger id="pageSize">
                                    <SelectValue placeholder={t(`${textToHandwriting}.page.pageSize`)} />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(PAGE_SIZES).map((size) => (
                                        <SelectItem key={size} value={size}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fontSize">{t(`${textToHandwriting}.page.fontSize`)}: {fontSize}px</Label>
                            <Slider
                                id="fontSize"
                                min={8}
                                max={36}
                                step={1}
                                value={[fontSize]}
                                onValueChange={(value) => setFontSize(value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lineSpacing">{t(`${textToHandwriting}.page.lineSpacing`)}: {lineSpacing}px</Label>
                            <Slider
                                id="lineSpacing"
                                min={16}
                                max={48}
                                step={1}
                                value={[lineSpacing]}
                                onValueChange={(value) => setLineSpacing(value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="verticalPosition">{t(`${textToHandwriting}.page.verticalPosition`)}: {verticalPosition}px</Label>
                            <Slider
                                id="verticalPosition"
                                min={0}
                                max={100}
                                step={1}
                                value={[verticalPosition]}
                                onValueChange={(value) => setVerticalPosition(value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="wordSpacing">{t(`${textToHandwriting}.page.wordSpacing`)}: {wordSpacing}px</Label>
                            <Slider
                                id="wordSpacing"
                                min={0}
                                max={20}
                                step={1}
                                value={[wordSpacing]}
                                onValueChange={(value) => setWordSpacing(value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="letterSpacing">{t(`${textToHandwriting}.page.letterSpacing`)}: {letterSpacing}px</Label>
                            <Slider
                                id="letterSpacing"
                                min={0}
                                max={10}
                                step={0.5}
                                value={[letterSpacing]}
                                onValueChange={(value) => setLetterSpacing(value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="leftMargin">{t(`${textToHandwriting}.page.leftMargin`)}: {leftMargin}px</Label>
                            <Slider
                                id="leftMargin"
                                min={0}
                                max={100}
                                step={1}
                                value={[leftMargin]}
                                onValueChange={(value) => setLeftMargin(value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="topMargin">{t(`${textToHandwriting}.page.topMargin`)}: {topMargin}px</Label>
                            <Slider
                                id="topMargin"
                                min={0}
                                max={100}
                                step={1}
                                value={[topMargin]}
                                onValueChange={(value) => setTopMargin(value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            {/*<Label htmlFor="topBorder">Top Border: {topBorder}px</Label>*/}
                            {/*<Slider*/}
                            {/*    id="topBorder"*/}
                            {/*    min={0}*/}
                            {/*    max={100}*/}
                            {/*    step={1}*/}
                            {/*    value={[topBorder]}*/}
                            {/*    onValueChange={(value) => setTopBorder(value[0])}*/}
                            {/*/>*/}
                        </div>

                        <div className="space-y-2">
                            <ColorPickerPopover
                                label={t(`${textToHandwriting}.page.inkColor`)}
                                value={inkColor}
                                onChange={setInkColor}
                                presets={["#1a237e", "#c82705", "#059f20",
                                    "#3357FF", "#ff334b", "#0ff337"]}
                            />
                        </div>


                        <div className="space-y-2">
                            <ColorPickerPopover
                                label={t(`${textToHandwriting}.page.pageBackground`)}
                                value={pageBackground}
                                onChange={setPageBackground}
                                presets={["#ffffff", "#d6d5d5", "#e1dbbb"]}
                            />
                        </div>

                        <div className="space-y-2">
                            <ColorPickerPopover
                                label={t(`${textToHandwriting}.page.marginColor`)}
                                value={marginColor}
                                onChange={setMarginColor}
                                presets={["#ff0000", "#aaccff", "#000000"]}
                            />
                        </div>

                        <div className="space-y-2">
                            <ColorPickerPopover
                                label={t(`${textToHandwriting}.page.lineColor`)}
                                value={lineColor}
                                onChange={setLineColor}
                                presets={["#aaccff", "#ff0000", "#000000"]}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center space-x-2">
                            <Switch id="showMargin" checked={showMargin} onCheckedChange={setShowMargin} />
                            <Label htmlFor="showMargin">{t(`${textToHandwriting}.page.showMargin`)}</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch id="showPageLines" checked={showPageLines} onCheckedChange={setShowPageLines} />
                            <Label htmlFor="showPageLines">{t(`${textToHandwriting}.page.showPageLines`)}</Label>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-2/3 flex items-center flex-col">
                    <div className="flex space-x-2 justify-end">
                        <Button onClick={addToBook} variant="outline">
                            <Book className="mr-2 h-4 w-4" /> {t(`${textToHandwriting}.page.addToBook`)}
                        </Button>
                        <Button onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" /> {t(`${textToHandwriting}.page.downloadAsImage`)}
                        </Button>
                        {/*<div className="relative">*/}
                        {/*    <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">*/}
                        {/*        <ImageIcon className="mr-2 h-4 w-4" /> Add Image to Book*/}
                        {/*    </Button>*/}
                        {/*    <input type="file" ref={fileInputRef} onChange={addImageToBook} accept="image/*" className="hidden" />*/}
                        {/*</div>*/}
                    </div>
                    <div className="my-2">
                        <Alert variant="default">
                            <Info/>
                            <AlertDescription>
                                {t(`${textToHandwriting}.page.note`)}
                            </AlertDescription>
                        </Alert>
                    </div>
                    <div className="relative overflow-auto max-h-[80vh] border rounded-md p-4 bg-[var(--muted)]">
                        {loading ? (
                            <div className="flex items-center justify-center" style={{ width: pageWidth, height: pageHeight }}>
                                <RefreshCw className="animate-spin h-8 w-8 text-gray-500" />
                            </div>
                        ) : (
                            <div
                                ref={pageRef}
                                style={{
                                    width: `${pageWidth}px`,
                                    height: `${pageHeight}px`,
                                    backgroundColor: pageBackground,
                                    position: "relative",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                {showMargin && (
                                    <>
                                        {/* Left margin line */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: `${leftMargin}px`,
                                                width: "1px",
                                                height: "100%",
                                                backgroundColor: marginColor,
                                                pointerEvents: "none",
                                            }}
                                        />
                                        {/* Top margin line */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: `${topMargin}px`,
                                                left: 0,
                                                width: "100%",
                                                height: "1px",
                                                backgroundColor: marginColor,
                                                pointerEvents: "none",
                                            }}
                                        />
                                    </>
                                )}

                                {/* Top border line */}
                                {(showMargin && topMargin > 0) && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: `${topMargin}px`,
                                            left: 0,
                                            zIndex: 1,
                                            width: "100%",
                                            height: "1px",
                                            backgroundColor: marginColor,
                                            pointerEvents: "none",
                                        }}
                                    />
                                )}

                                {showPageLines && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: `${Math.max(topMargin, topMargin)}px`,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            pointerEvents: "none",
                                        }}
                                    >
                                        {Array.from({
                                            length: Math.floor((pageHeight - Math.max(topMargin, topMargin)) / lineSpacing),
                                        }).map((_, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    position: "absolute",
                                                    top: `${index * lineSpacing}px`,
                                                    left: 0,
                                                    right: 0,
                                                    height: "1px",
                                                    backgroundColor: lineColor,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}

                                <div
                                    style={{
                                        position: "absolute",
                                        top: `${topMargin + verticalPosition}px`,
                                        left: `${leftMargin + 5}px`,
                                        maxWidth: `${pageWidth - leftMargin - 20}px`,
                                        fontFamily: font,
                                        fontSize: `${fontSize}px`,
                                        color: inkColor,
                                        wordSpacing: `${wordSpacing}px`,
                                        letterSpacing: `${letterSpacing}px`,
                                        whiteSpace: "pre-wrap",
                                        overflowWrap: "break-word",
                                        lineHeight: `${lineSpacing}px`,
                                    }}
                                >
                                    {text}
                                </div>


                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/*Result*/}
            <div id="book" className="py-10">
                <Card className="bg-background">
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-4 justify-end">
                                <Button onClick={downloadBookAsPDF} disabled={bookPages.length === 0}>
                                    <FileText className="mr-2 h-4 w-4" /> {t(`${textToHandwriting}.page.downloadAsPdf`)}
                                </Button>
                                <Button onClick={downloadBookAsImages} disabled={bookPages.length === 0} variant="outline">
                                    <Download className="mr-2 h-4 w-4" /> {t(`${textToHandwriting}.page.downloadAllImages`)}
                                </Button>
                            </div>

                            {bookPages.length === 0 ? (
                                <div className="text-center py-12 border rounded-md">
                                    <Book className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                    <h3 className="text-lg font-medium">{t(`${textToHandwriting}.page.emptyBook`)}</h3>
                                    <p className="text-muted-foreground">{t(`${textToHandwriting}.page.empBookDes`)}</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {bookPages.map((page, index) => (
                                        <Card key={page.id} className="overflow-hidden">
                                            <div className="relative aspect-[3/4] bg-gray-100">
                                                {page.imageUrl && (
                                                    <img
                                                        src={page.imageUrl || "/placeholder.svg"}
                                                        alt={`Page ${index + 1}`}
                                                        className="w-full h-full object-contain"
                                                    />
                                                )}
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2 h-8 w-8"
                                                    onClick={() => removeBookPage(page.id)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <CardContent className="p-4">
                                                <p className="font-medium">{t(`${textToHandwriting}.page.page`)} {index + 1}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {page.type === "text" ? t(`${textToHandwriting}.page.handwrittenText`) : t(`${textToHandwriting}.page.image`)}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

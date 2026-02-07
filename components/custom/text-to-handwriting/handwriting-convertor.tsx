"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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
import {Alert, AlertDescription} from "@/components/ui/alert";
import {ColorPickerPopover} from "@/components/custom/text-to-handwriting/color-picker";

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
    const [paginatedText, setPaginatedText] = useState<string[]>([])
    const [currentPreviewPage, setCurrentPreviewPage] = useState(0)

    const pageRef = useRef<HTMLDivElement>(null)
    const measureRef = useRef<HTMLDivElement>(null)

    // Calculate page dimensions in pixels (assuming 96 DPI)
    const mmToPx = (mm: number) => Math.round(mm * 3.7795275591)
    const pageWidth = mmToPx(PAGE_SIZES[pageSize as keyof typeof PAGE_SIZES].width)
    const pageHeight = mmToPx(PAGE_SIZES[pageSize as keyof typeof PAGE_SIZES].height)

    // Calculate available space for text
    const availableWidth = pageWidth - leftMargin - 20
    const availableHeight = pageHeight - topMargin - verticalPosition - 20

    // Paginate text when settings change
    useEffect(() => {
        paginateText()
    }, [text, font, fontSize, lineSpacing, wordSpacing, letterSpacing, leftMargin, topMargin, verticalPosition, pageWidth, pageHeight])

    const paginateText = () => {
        if (!text.trim()) {
            setPaginatedText([])
            setCurrentPreviewPage(0)
            return
        }

        // Split by newlines first to preserve them
        const lines = text.split('\n')
        const pages: string[] = []
        let currentPage = ""

        // Create a temporary element to measure text
        const measureDiv = document.createElement('div')
        measureDiv.style.position = 'absolute'
        measureDiv.style.visibility = 'hidden'
        measureDiv.style.fontFamily = font
        measureDiv.style.fontSize = `${fontSize}px`
        measureDiv.style.wordSpacing = `${wordSpacing}px`
        measureDiv.style.letterSpacing = `${letterSpacing}px`
        measureDiv.style.lineHeight = `${lineSpacing}px`
        measureDiv.style.width = `${availableWidth}px`
        measureDiv.style.whiteSpace = 'pre-wrap'
        measureDiv.style.overflowWrap = 'break-word'
        document.body.appendChild(measureDiv)

        for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
            const line = lines[lineIdx]

            // Handle empty lines (newlines)
            if (line === '') {
                const testText = currentPage + '\n'
                measureDiv.textContent = testText

                if (measureDiv.offsetHeight > availableHeight) {
                    // Page is full, start new page
                    pages.push(currentPage)
                    currentPage = '\n'
                } else {
                    currentPage = testText
                }
                continue
            }

            // Process line word by word
            const words = line.split(/\s+/)

            for (let wordIdx = 0; wordIdx < words.length; wordIdx++) {
                const word = words[wordIdx]
                const isLastWordInLine = wordIdx === words.length - 1
                const isLastLine = lineIdx === lines.length - 1

                // Add word with appropriate spacing
                const separator = isLastWordInLine && !isLastLine ? '\n' : ' '
                const testText = currentPage + (currentPage && !currentPage.endsWith('\n') ? separator : '') + word
                measureDiv.textContent = testText

                if (measureDiv.offsetHeight > availableHeight) {
                    // Current page is full, start a new page
                    if (currentPage) {
                        pages.push(currentPage.trimEnd())
                        currentPage = word
                        measureDiv.textContent = word
                    } else {
                        // Single word is too long, split it anyway
                        currentPage = word
                        pages.push(currentPage)
                        currentPage = ""
                    }
                } else {
                    currentPage = testText
                }
            }

            // Add newline at end of line if not the last line
            if (lineIdx < lines.length - 1) {
                const testText = currentPage + '\n'
                measureDiv.textContent = testText

                if (measureDiv.offsetHeight > availableHeight) {
                    pages.push(currentPage)
                    currentPage = '\n'
                } else {
                    currentPage = testText
                }
            }
        }

        if (currentPage.trim() || currentPage.includes('\n')) {
            pages.push(currentPage)
        }

        document.body.removeChild(measureDiv)
        const finalPages = pages.length > 0 ? pages : [text]
        setPaginatedText(finalPages)

        // Reset to first page if current page is out of bounds
        if (currentPreviewPage >= finalPages.length) {
            setCurrentPreviewPage(0)
        }
    }

    const capturePageAsImage = async (pageElement: HTMLDivElement): Promise<string> => {
        const originalConsoleError = console.error;
        console.error = (...args) => {
            if (args[0] && typeof args[0] === 'string' &&
                (args[0].includes('css file') ||
                    args[0].includes('CSS rules') ||
                    args[0].includes('Error inlining remote css file'))) {
                return;
            }
            originalConsoleError.apply(console, args);
        };

        try {
            const dataUrl = await toPng(pageElement, {
                width: pageWidth,
                height: pageHeight,
                backgroundColor: pageBackground,
                pixelRatio: 2,
                cacheBust: true,
            });
            return dataUrl;
        } finally {
            console.error = originalConsoleError;
        }
    }

    const handleDownload = async () => {
        const pageElement = document.querySelector('.preview-page');

        if (!pageElement) return;

        const dataUrl = await capturePageAsImage(pageElement as HTMLDivElement);
        const link = document.createElement("a");
        const fileName = paginatedText.length > 1
            ? `handwritten-text-page-${currentPreviewPage + 1}.png`
            : "handwritten-text.png";
        link.download = fileName;
        link.href = dataUrl;
        link.click();
    }

    const downloadAllPages = async () => {
        // Temporarily show all pages to capture them
        const originalPage = currentPreviewPage;

        for (let i = 0; i < paginatedText.length; i++) {
            setCurrentPreviewPage(i);
            // Wait for render
            await new Promise(resolve => setTimeout(resolve, 100));

            const pageElement = document.querySelector('.preview-page');
            if (pageElement) {
                const dataUrl = await capturePageAsImage(pageElement as HTMLDivElement);
                const link = document.createElement("a");
                link.download = `handwritten-text-page-${i + 1}.png`;
                link.href = dataUrl;
                link.click();
                // Small delay between downloads
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        // Restore original page
        setCurrentPreviewPage(originalPage);
    }

    const addToBook = async () => {
        const originalPage = currentPreviewPage;

        for (let i = 0; i < paginatedText.length; i++) {
            setCurrentPreviewPage(i);
            // Wait for render
            await new Promise(resolve => setTimeout(resolve, 100));

            const pageElement = document.querySelector('.preview-page');
            if (pageElement) {
                const dataUrl = await capturePageAsImage(pageElement as HTMLDivElement);
                setBookPages((prev) => [
                    ...prev,
                    {
                        id: `${Date.now()}-${i}`,
                        type: "text",
                        content: paginatedText[i],
                        imageUrl: dataUrl,
                    },
                ]);
            }
        }

        // Restore original page
        setCurrentPreviewPage(originalPage);
        scrollToCard();
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
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const renderPage = (pageText: string, pageIndex: number) => (
        <div
            key={pageIndex}
            className="preview-page"
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

            {showPageLines && (
                <div
                    style={{
                        position: "absolute",
                        top: `${topMargin}px`,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: "none",
                    }}
                >
                    {Array.from({
                        length: Math.floor((pageHeight - topMargin) / lineSpacing),
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
                    maxWidth: `${availableWidth}px`,
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
                {pageText}
            </div>

            {/*{paginatedText.length > 1 && (*/}
            {/*    <div*/}
            {/*        style={{*/}
            {/*            position: "absolute",*/}
            {/*            bottom: "10px",*/}
            {/*            right: "20px",*/}
            {/*            fontSize: "12px",*/}
            {/*            color: inkColor,*/}
            {/*            opacity: 0.5,*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        Page {pageIndex + 1} of {paginatedText.length}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );

    return (
        <div className="flex flex-col">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-center">Text to Handwriting</h2>
                <p className="text-center text-sm text-muted-foreground">Easily convert typed text into realistic handwriting</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/3 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="text">Your Text</Label>
                        <Textarea id="text" value={text} onChange={(e) => setText(e.target.value)} className="min-h-[150px] max-h-[500px]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="font">Handwriting Font</Label>
                            <Select value={font} onValueChange={setFont}>
                                <SelectTrigger id="font" className="w-[100%]">
                                    <SelectValue placeholder="Select font" />
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
                            <Label htmlFor="pageSize">Page Size</Label>
                            <Select value={pageSize} onValueChange={setPageSize}>
                                <SelectTrigger id="pageSize">
                                    <SelectValue placeholder="Select page size" />
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
                            <Label htmlFor="fontSize">Font Size: {fontSize}px</Label>
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
                            <Label htmlFor="lineSpacing">Line Spacing: {lineSpacing}px</Label>
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
                            <Label htmlFor="verticalPosition">Vertical Position: {verticalPosition}px</Label>
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
                            <Label htmlFor="wordSpacing">Word Spacing: {wordSpacing}px</Label>
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
                            <Label htmlFor="letterSpacing">Letter Spacing: {letterSpacing}px</Label>
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
                            <Label htmlFor="leftMargin">Left Margin: {leftMargin}px</Label>
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
                            <Label htmlFor="topMargin">Top Margin: {topMargin}px</Label>
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
                        </div>

                        <div className="space-y-2">
                            <ColorPickerPopover
                                label="Ink Color"
                                value={inkColor}
                                onChange={setInkColor}
                                presets={["#1a237e", "#c82705", "#059f20",
                                    "#3357FF", "#ff334b", "#0ff337"]}
                            />
                        </div>

                        <div className="space-y-2">
                            <ColorPickerPopover
                                label="Page Background"
                                value={pageBackground}
                                onChange={setPageBackground}
                                presets={["#ffffff", "#d6d5d5", "#e1dbbb"]}
                            />
                        </div>

                        <div className="space-y-2">
                            <ColorPickerPopover
                                label="Margin Color"
                                value={marginColor}
                                onChange={setMarginColor}
                                presets={["#ff0000", "#aaccff", "#000000"]}
                            />
                        </div>

                        <div className="space-y-2">
                            <ColorPickerPopover
                                label="Line Color"
                                value={lineColor}
                                onChange={setLineColor}
                                presets={["#aaccff", "#ff0000", "#000000"]}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center space-x-2">
                            <Switch id="showMargin" checked={showMargin} onCheckedChange={setShowMargin} />
                            <Label htmlFor="showMargin">Show Margin</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch id="showPageLines" checked={showPageLines} onCheckedChange={setShowPageLines} />
                            <Label htmlFor="showPageLines">Show Page Lines</Label>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-2/3 flex items-center flex-col max-w-full">
                    <div className="flex space-x-2 justify-end w-full mb-2">
                        <Button onClick={addToBook} variant="outline">
                            <Book className="mr-2 h-4 w-4" /> Add {paginatedText.length > 1 ? 'All Pages' : 'to Book'}
                        </Button>
                        <Button onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" /> Download Current Page
                        </Button>
                        {paginatedText.length > 1 && (
                            <Button onClick={downloadAllPages} variant="outline">
                                <Download className="mr-2 h-4 w-4" /> Download All {paginatedText.length} Pages
                            </Button>
                        )}
                    </div>
                    <div className="my-2 w-full">
                        <Alert variant="default">
                            <Info/>
                            <AlertDescription>
                                {paginatedText.length > 1
                                    ? `Your text has been split into ${paginatedText.length} pages. Use the navigation buttons to preview each page.`
                                    : "If lines or text overlap, adjust the settings. To download multiple pages, use \"Add to Book\" and scroll down to download."
                                }
                            </AlertDescription>
                        </Alert>
                    </div>

                    {/* Pagination Controls */}
                    {paginatedText.length > 1 && (
                        <div className="flex items-center gap-4 mb-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPreviewPage(Math.max(0, currentPreviewPage - 1))}
                                disabled={currentPreviewPage === 0}
                            >
                                Previous
                            </Button>
                            <span className="text-sm font-medium">
                                Page {currentPreviewPage + 1} of {paginatedText.length}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPreviewPage(Math.min(paginatedText.length - 1, currentPreviewPage + 1))}
                                disabled={currentPreviewPage === paginatedText.length - 1}
                            >
                                Next
                            </Button>
                        </div>
                    )}

                    <div className="relative overflow-auto max-h-[1172px] border rounded-md p-4 max-w-full bg-[var(--muted)]">
                        {loading ? (
                            <div className="flex items-center justify-center" style={{ width: pageWidth, height: pageHeight }}>
                                <RefreshCw className="animate-spin h-8 w-8 text-gray-500" />
                            </div>
                        ) : (
                            <>
                                {renderPage(paginatedText[currentPreviewPage] || text, currentPreviewPage)}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div id="book" className="py-10">
                <Card className="bg-background">
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-4 justify-end">
                                <Button onClick={downloadBookAsPDF} disabled={bookPages.length === 0}>
                                    <FileText className="mr-2 h-4 w-4" /> Download as PDF
                                </Button>
                                <Button onClick={downloadBookAsImages} disabled={bookPages.length === 0} variant="outline">
                                    <Download className="mr-2 h-4 w-4" /> Download All Images
                                </Button>
                            </div>

                            {bookPages.length === 0 ? (
                                <div className="text-center py-12 border rounded-md">
                                    <Book className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                    <h3 className="text-lg font-medium">Your book is empty</h3>
                                    <p className="text-muted-foreground">Add pages from the editor or upload images to create your book</p>
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
                                                <p className="font-medium">Page {index + 1}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {page.type === "text" ? "Handwritten Text" : "Image"}
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
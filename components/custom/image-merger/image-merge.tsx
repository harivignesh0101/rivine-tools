"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Upload, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useTranslations} from "use-intl";
import {imageMerge} from "@/config/i18n-constants";

export default function ImageMerger() {
    const [imageCount, setImageCount] = useState(2)
    const [images, setImages] = useState<(string | null)[]>(Array(2).fill(null))
    const [position, setPosition] = useState("horizontal")
    const [borderWidth, setBorderWidth] = useState(0)
    const [borderColor, setBorderColor] = useState("#000000")
    const [borderStyle, setBorderStyle] = useState("solid")
    const [borderType, setBorderType] = useState("around-all") // "between", "around-each", or "around-all"
    const [sizeNormalization, setSizeNormalization] = useState("smallest") // "none", "largest", "smallest"
    const [imageSizes, setImageSizes] = useState<string[]>(Array(2).fill("original"))
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [mergedImageUrl, setMergedImageUrl] = useState<string | null>(null)

    const t = useTranslations()

    const handleImageUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (event) => {
                if (event.target) {
                    const newImages = [...images]
                    newImages[index] = event.target.result as string
                    setImages(newImages)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleImageSizeChange = (index: number, size: string) => {
        const newSizes = [...imageSizes]
        newSizes[index] = size
        setImageSizes(newSizes)
    }

    const handleImageCountChange = (count: number) => {
        setImageCount(count)
        setImages((prev) => {
            const newImages = [...prev]
            if (count > prev.length) {
                // Add null entries for new images
                return [...newImages, ...Array(count - prev.length).fill(null)]
            } else {
                // Remove excess images
                return newImages.slice(0, count)
            }
        })
        setImageSizes((prev) => {
            const newSizes = [...prev]
            if (count > prev.length) {
                // Add "original" entries for new images
                return [...newSizes, ...Array(count - prev.length).fill("original")]
            } else {
                // Remove excess sizes
                return newSizes.slice(0, count)
            }
        })
    }

    useEffect(() => {
        if (images.some((img) => img) && canvasRef.current) {
            mergeImages()
        }
    }, [images, position, borderWidth, borderColor, borderStyle, borderType, imageSizes, sizeNormalization])

    const mergeImages = () => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx: any = canvas.getContext("2d")
        if (!ctx) return

        // Load all images
        const imgElements: HTMLImageElement[] = []
        let loadedCount = 0

        images.forEach((src, index) => {
            if (!src) return

            const img = new Image()
            img.crossOrigin = "anonymous"
            img.onload = () => {
                imgElements[index] = img
                loadedCount++

                // Once all images are loaded, draw them
                if (loadedCount === images.filter(Boolean).length) {
                    drawImages(imgElements)
                }
            }
            img.src = src
        })

        function drawImages(imgElements: HTMLImageElement[]) {
            // Find dimensions for normalization if needed
            let normWidth = 0
            let normHeight = 0

            if (sizeNormalization !== "none") {
                // Get all original dimensions
                const originalDimensions = imgElements.map((img) => ({
                    width: img.width,
                    height: img.height,
                    aspectRatio: img.width / img.height,
                }))

                if (sizeNormalization === "largest") {
                    // Find largest width and height
                    normWidth = Math.max(...originalDimensions.map((d) => d.width))
                    normHeight = Math.max(...originalDimensions.map((d) => d.height))
                } else if (sizeNormalization === "smallest") {
                    // Find smallest width and height
                    normWidth = Math.min(...originalDimensions.map((d) => d.width))
                    normHeight = Math.min(...originalDimensions.map((d) => d.height))
                }
            }

            // Calculate dimensions and positions
            const imgDimensions = imgElements.map((img, index) => {
                let width = img.width
                let height = img.height

                // Apply normalization if needed
                if (sizeNormalization !== "none") {
                    if (sizeNormalization === "largest" || sizeNormalization === "smallest") {
                        // Preserve aspect ratio while normalizing
                        const aspectRatio = img.width / img.height

                        if (aspectRatio > normWidth / normHeight) {
                            // Width constrained
                            width = normWidth
                            height = width / aspectRatio
                        } else {
                            // Height constrained
                            height = normHeight
                            width = height * aspectRatio
                        }
                    }
                }

                // Apply size adjustments after normalization
                if (imageSizes[index] === "magnify") {
                    width *= 1.5
                    height *= 1.5
                } else if (imageSizes[index] === "crop") {
                    width *= 0.8
                    height *= 0.8
                }

                return { width, height }
            })

            let canvasWidth = 0
            let canvasHeight = 0

            if (position === "horizontal") {
                // For horizontal layout
                canvasWidth = imgDimensions.reduce((sum, dim) => sum + dim.width, 0)
                // Add space for borders between images
                if (borderType === "between") {
                    canvasWidth += borderWidth * (imgElements.length - 1)
                } else if (borderType === "around-each") {
                    canvasWidth += borderWidth * 2 * imgElements.length
                }

                canvasHeight = Math.max(...imgDimensions.map((dim) => dim.height))
                if (borderType === "around-each" || borderType === "around-all") {
                    canvasHeight += borderWidth * 2
                }
            } else {
                // For vertical layout
                canvasWidth = Math.max(...imgDimensions.map((dim) => dim.width))
                if (borderType === "around-each" || borderType === "around-all") {
                    canvasWidth += borderWidth * 2
                }

                canvasHeight = imgDimensions.reduce((sum, dim) => sum + dim.height, 0)
                // Add space for borders between images
                if (borderType === "between") {
                    canvasHeight += borderWidth * (imgElements.length - 1)
                } else if (borderType === "around-each") {
                    canvasHeight += borderWidth * 2 * imgElements.length
                }
            }

            // Add border around all if needed
            if (borderType === "around-all") {
                canvasWidth += borderWidth * 2
                canvasHeight += borderWidth * 2
            }

            // Set canvas dimensions
            canvas.width = canvasWidth
            canvas.height = canvasHeight

            // Clear canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)

            // Draw border around all if needed
            if (borderType === "around-all") {
                ctx.strokeStyle = borderColor
                ctx.lineWidth = borderWidth

                // Set border style
                if (borderStyle === "dashed") {
                    ctx.setLineDash([borderWidth * 2, borderWidth])
                } else if (borderStyle === "dotted") {
                    ctx.setLineDash([borderWidth, borderWidth])
                } else {
                    ctx.setLineDash([])
                }

                ctx.strokeRect(borderWidth / 2, borderWidth / 2, canvasWidth - borderWidth, canvasHeight - borderWidth)
            }

            // Draw images
            let currentX = borderType === "around-all" ? borderWidth : 0
            let currentY = borderType === "around-all" ? borderWidth : 0

            imgElements.forEach((img, index) => {
                const { width, height } = imgDimensions[index]

                // Draw border around each image if needed
                if (borderType === "around-each") {
                    ctx.strokeStyle = borderColor
                    ctx.lineWidth = borderWidth

                    // Set border style
                    if (borderStyle === "dashed") {
                        ctx.setLineDash([borderWidth * 2, borderWidth])
                    } else if (borderStyle === "dotted") {
                        ctx.setLineDash([borderWidth, borderWidth])
                    } else {
                        ctx.setLineDash([])
                    }

                    if (position === "horizontal") {
                        ctx.strokeRect(currentX, 0, width + borderWidth * 2, canvasHeight)
                        currentX += borderWidth
                    } else {
                        ctx.strokeRect(0, currentY, canvasWidth, height + borderWidth * 2)
                        currentY += borderWidth
                    }
                }

                // Draw image
                ctx.drawImage(img, currentX, currentY, width, height)

                // Update position for next image
                if (position === "horizontal") {
                    currentX += width

                    // Add border between images if needed
                    if (borderType === "between" && index < imgElements.length - 1) {
                        ctx.fillStyle = borderColor
                        ctx.fillRect(currentX, 0, borderWidth, canvasHeight)
                        currentX += borderWidth
                    } else if (borderType === "around-each") {
                        currentX += borderWidth
                    }
                } else {
                    currentY += height

                    // Add border between images if needed
                    if (borderType === "between" && index < imgElements.length - 1) {
                        ctx.fillStyle = borderColor
                        ctx.fillRect(0, currentY, canvasWidth, borderWidth)
                        currentY += borderWidth
                    } else if (borderType === "around-each") {
                        currentY += borderWidth
                    }
                }
            })

            // Update merged image URL
            setMergedImageUrl(canvas.toDataURL("image/png"))
        }
    }

    const handleDownload = () => {
        if (mergedImageUrl) {
            const link = document.createElement("a")
            link.href = mergedImageUrl
            link.download = "merged-image.png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-center">{t(`${imageMerge}.page.title`)}</h2>
            <p className="text-center text-sm text-muted-foreground">{t(`${imageMerge}.page.description`)}</p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 mt-6">
                {/* Images Section - 8/12 columns on desktop */}
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {Array.from({ length: imageCount }).map((_, index) => (
                            <Card key={index}>
                                <CardContent>
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-semibold">{t(`${imageMerge}.page.image`)} {index + 1}</h2>

                                        {/* Clickable upload box */}
                                        <div className="flex justify-center">
                                            <label className="w-full cursor-pointer">
                                                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-1 h-40">
                                                    {images[index] ? (
                                                        <img
                                                            src={images[index] || "/placeholder.svg"}
                                                            alt={`Image ${index + 1} preview`}
                                                            className="max-h-full max-w-full object-contain"
                                                        />
                                                    ) : (
                                                        <div className="text-center">
                                                            <Upload className="mx-auto h-8 w-8" />
                                                            <p className="mt-2 text-sm">{t(`${imageMerge}.page.upload`)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload(index)}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        {/* Image-specific size settings */}
                                        <div className="space-y-2">
                                            <Label htmlFor={`size-${index}`}>{t(`${imageMerge}.page.size`)}</Label>
                                            <Select
                                                value={imageSizes[index] || "original"}
                                                onValueChange={(value) => handleImageSizeChange(index, value)}
                                            >
                                                <SelectTrigger id={`size-${index}`}>
                                                    <SelectValue placeholder={t(`${imageMerge}.page.selectSize`)} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="original">{t(`${imageMerge}.page.sizeOriginal`)}</SelectItem>
                                                    <SelectItem value="magnify">{t(`${imageMerge}.page.sizeMagnify`)}</SelectItem>
                                                    <SelectItem value="crop">{t(`${imageMerge}.page.sizeCrop`)}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                    </div>
                </div>

                {/* Settings Section - 4/12 columns on desktop */}
                <div className="lg:col-span-4">
                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="text-xl font-bold mb-4">{t(`${imageMerge}.page.settings`)}</h2>

                            {/* Moved Number of Images control here */}
                            <div className="space-y-4 mb-6">
                                <div className="space-y-2">
                                    <Label htmlFor="image-count">{t(`${imageMerge}.page.noImages`)}</Label>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleImageCountChange(Math.max(2, imageCount - 1))}
                                            disabled={imageCount <= 2}
                                        >
                                            -
                                        </Button>
                                        <span className="w-8 text-center">{imageCount}</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleImageCountChange(imageCount + 1)}
                                            disabled={imageCount >= 10}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Tabs defaultValue="position" className="mb-4">
                                <TabsList className="grid grid-cols-2 w-full">
                                    <TabsTrigger value="position">{t(`${imageMerge}.page.positionTab`)}</TabsTrigger>
                                    <TabsTrigger value="border">{t(`${imageMerge}.page.borderTab`)}</TabsTrigger>
                                </TabsList>

                                <TabsContent value="position" className="mt-4">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="position">{t(`${imageMerge}.page.imagePosition`)}</Label>
                                            <Select value={position} onValueChange={setPosition}>
                                                <SelectTrigger id="position">
                                                    <SelectValue placeholder={t(`${imageMerge}.page.selectPosition`)} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="horizontal">{t(`${imageMerge}.page.horizontal`)}</SelectItem>
                                                    <SelectItem value="vertical">{t(`${imageMerge}.page.vertical`)}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="size-normalization">{t(`${imageMerge}.page.sizeNor`)}</Label>
                                            <Select value={sizeNormalization} onValueChange={setSizeNormalization}>
                                                <SelectTrigger id="size-normalization">
                                                    <SelectValue placeholder={t(`${imageMerge}.page.selNorm`)} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">{t(`${imageMerge}.page.selNone`)}</SelectItem>
                                                    <SelectItem value="largest">{t(`${imageMerge}.page.largest`)}</SelectItem>
                                                    <SelectItem value="smallest">{t(`${imageMerge}.page.smallest`)}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="border" className="mt-4">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="border-type">{t(`${imageMerge}.page.borderType`)}</Label>
                                            <Select value={borderType} onValueChange={setBorderType}>
                                                <SelectTrigger id="border-type">
                                                    <SelectValue placeholder={t(`${imageMerge}.page.borderType`)} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="between">{t(`${imageMerge}.page.between`)}</SelectItem>
                                                    <SelectItem value="around-each">{t(`${imageMerge}.page.aroundEach`)}</SelectItem>
                                                    <SelectItem value="around-all">{t(`${imageMerge}.page.aroundAll`)}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="border-style">{t(`${imageMerge}.page.borderStyle`)}</Label>
                                            <Select value={borderStyle} onValueChange={setBorderStyle}>
                                                <SelectTrigger id="border-style">
                                                    <SelectValue placeholder={t(`${imageMerge}.page.selStyle`)} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="solid">{t(`${imageMerge}.page.solid`)}</SelectItem>
                                                    <SelectItem value="dashed">{t(`${imageMerge}.page.dashed`)}</SelectItem>
                                                    <SelectItem value="dotted">{t(`${imageMerge}.page.dotted`)}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="border-width">{t(`${imageMerge}.page.borderWidth`)}: {borderWidth}px</Label>
                                            <Slider
                                                id="border-width"
                                                min={0}
                                                max={20}
                                                step={1}
                                                value={[borderWidth]}
                                                onValueChange={(value) => setBorderWidth(value[0])}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="border-color">{t(`${imageMerge}.page.borderColor`)}</Label>
                                            <div className="flex space-x-2">
                                                <Input
                                                    type="color"
                                                    id="border-color"
                                                    value={borderColor}
                                                    onChange={(e) => setBorderColor(e.target.value)}
                                                    className="w-12 h-10 p-1"
                                                />
                                                <Input
                                                    type="text"
                                                    value={borderColor}
                                                    onChange={(e) => setBorderColor(e.target.value)}
                                                    className="flex-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Merged Result Section - Full width */}
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-center">{t(`${imageMerge}.page.result`)}</h2>
                        {mergedImageUrl && (
                            <div className="flex justify-between">
                                <p>{t(`${imageMerge}.page.tune`)}</p>
                                <Button onClick={handleDownload} className="flex items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    {t(`${imageMerge}.page.download`)}
                                </Button>
                            </div>
                        )}
                        <div className="flex flex-col items-center justify-center border rounded-lg p-4 min-h-64">
                            {images.some((img) => img) ? (
                                <div className="max-w-full overflow-auto">
                                    <canvas ref={canvasRef} className="max-w-full" style={{ display: "none" }}></canvas>
                                    {mergedImageUrl && (
                                        <img src={mergedImageUrl || "/placeholder.svg"} alt="Merged result" className="max-w-full" />
                                    )}
                                </div>
                            ) : (
                                <p>{t(`${imageMerge}.page.error`)}</p>
                            )}
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
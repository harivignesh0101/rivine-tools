"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import {CopyButton} from "@/components/ui/copy-button";
import {characterCounter} from "@/config/i18n-constants";
import {useTranslations} from "use-intl";

export function CharacterCounter() {
    const [text, setText] = useState("")
    const [stopAt, setStopAt] = useState("")
    const [ignoreChars, setIgnoreChars] = useState("")
    const [ignoreNumbers, setIgnoreNumbers] = useState(false)
    const [ignoreSymbols, setIgnoreSymbols] = useState(false)
    const [ignoreUppercase, setIgnoreUppercase] = useState(false)
    const [ignoreLowercase, setIgnoreLowercase] = useState(false)
    const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)
    const [trimText, setTrimText] = useState(false)
    const t = useTranslations()

    const [charCount, setCharCount] = useState(0)
    const [processedText, setProcessedText] = useState("")
    const prevCountRef = useRef(0)

    useEffect(() => {
        prevCountRef.current = charCount
    }, [charCount])

    useEffect(() => {
        let processedString = text

        // Apply trim if enabled
        if (trimText) {
            processedString = processedString.trim()
        }

        // Stop at specific letter or word
        if (stopAt) {
            const stopIndex = processedString.indexOf(stopAt)
            if (stopIndex !== -1) {
                processedString = processedString.substring(0, stopIndex)
            }
        }

        // Filter out ignored characters
        if (ignoreChars) {
            const ignoreArray = ignoreChars.split("")
            for (const char of ignoreArray) {
                processedString = processedString.split(char).join("")
            }
        }

        // Apply other filters
        if (ignoreNumbers) {
            processedString = processedString.replace(/[0-9]/g, "")
        }

        if (ignoreSymbols) {
            processedString = processedString.replace(/[^\w\s]/g, "")
        }

        if (ignoreUppercase) {
            processedString = processedString.replace(/[A-Z]/g, "")
        }

        if (ignoreLowercase) {
            processedString = processedString.replace(/[a-z]/g, "")
        }

        if (ignoreWhitespace) {
            processedString = processedString.replace(/\s/g, "")
        }

        setProcessedText(processedString)
        setCharCount(processedString.length)
    }, [
        text,
        stopAt,
        ignoreChars,
        ignoreNumbers,
        ignoreSymbols,
        ignoreUppercase,
        ignoreLowercase,
        ignoreWhitespace,
        trimText,
    ])

    // Animation for digits
    type AnimatedDigitProps = {
        digit: string;
        index: number;
    };

    const AnimatedDigit: React.FC<AnimatedDigitProps> = ({ digit, index }) => {
        return (
            <motion.div
                key={`${index}-${digit}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: index * 0.05
                }}
                className="relative inline-block w-12 h-16 mx-1"
            >
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yello-400 to-green-500 text-white rounded-lg shadow-lg text-3xl font-bold">
                    {digit}
                </div>
            </motion.div>
        )
    }

    // Direction indicator animation
    const DirectionIndicator = () => {
        const isIncreasing = charCount > prevCountRef.current
        const isDecreasing = charCount < prevCountRef.current

        return (
            <motion.div
                className="ml-4 text-lg font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                {isIncreasing && (
                    <motion.div
                        className="text-green-500 flex items-center"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m18 15-6-6-6 6"/>
                        </svg>
                        <span>{t(`${characterCounter}.countDisplay.increasing`)}</span>
                    </motion.div>
                )}
                {isDecreasing && (
                    <motion.div
                        className="text-red-500 flex items-center"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6"/>
                        </svg>
                        <span>{t(`${characterCounter}.countDisplay.decreasing`)}</span>
                    </motion.div>
                )}
            </motion.div>
        )
    }

    // Convert count to array of digits
    const countArray = String(charCount).padStart(1, '0').split('')

    return (
        <div>
            <h2 className="text-xl font-bold text-center">{t(`${characterCounter}.page.title`)}</h2>
            <p className="text-center text-sm mb-6 text-muted-foreground">{t(`${characterCounter}.page.description`)}</p>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left column - Text input and count */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="space-y-2">
                        <Label htmlFor="text">{t(`${characterCounter}.input.label`)}</Label>
                        <Textarea
                            id="text"
                            placeholder={t(`${characterCounter}.input.placeholder`)}
                            className="max-h-[300px] min-h-[200px]"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    {text && (
                        <div className="space-y-2">
                            <h3 className="font-medium">{t(`${characterCounter}.processedText.title`)}</h3>
                            <div className="p-3 bg-muted rounded-md whitespace-pre-wrap break-words min-h-[100px] max-h-[200px] overflow-auto">
                                {processedText || (
                                    <span className="text-muted-foreground italic">{t(`${characterCounter}.processedText.empty`)}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right column - Settings */}
                <div className="lg:col-span-2 space-y-6 mt-4">
                    <Card className="relative flex flex-col items-center justify-center py-6 from-slate-100 to-slate-200 rounded-lg">
                        <CardContent>
                          <span className="absolute right-[10px] top-[10px]">
                            <CopyButton value={charCount.toString()} />
                          </span>
                            <h3 className="text-lg font-medium mb-4 text-center">{t(`${characterCounter}.countDisplay.title`)}</h3>
                            <div className="flex items-center justify-center">
                                <div className="flex">
                                    <AnimatePresence mode="popLayout">
                                        {countArray.map((digit, index) => (
                                            <AnimatedDigit key={index} digit={digit} index={index} />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <AnimatePresence mode="wait">
                                    <DirectionIndicator />
                                </AnimatePresence>
                            </div>
                            <motion.div
                                className="h-1 bg-gradient-to-r from-green-500 to-yellow-600 mt-6 rounded-full"
                                initial={{ width: 0 }}
                                animate={{
                                    width: `${Math.min(100, charCount / 10)}%`
                                }}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            />
                        </CardContent>
                    </Card>
                    <div className="space-y-6">
                        <Separator className="lg:hidden" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="font-medium">{t(`${characterCounter}.options.counting.title`)}</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="stopAt">{t(`${characterCounter}.options.counting.stopAt.label`)}</Label>
                                    <Input
                                        id="stopAt"
                                        placeholder={t(`${characterCounter}.options.counting.stopAt.placeholder`)}
                                        value={stopAt}
                                        onChange={(e) => setStopAt(e.target.value)}
                                    />
                                    <p className="text-sm text-muted-foreground">{t(`${characterCounter}.options.counting.stopAt.help`)}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ignoreChars">{t(`${characterCounter}.options.counting.ignoreChars.label`)}</Label>
                                    <Input
                                        id="ignoreChars"
                                        placeholder={t(`${characterCounter}.options.counting.ignoreChars.placeholder`)}
                                        value={ignoreChars}
                                        onChange={(e) => setIgnoreChars(e.target.value)}
                                    />
                                    <p className="text-sm text-muted-foreground">{t(`${characterCounter}.options.counting.ignoreChars.help`)}</p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="trimText"
                                        checked={trimText}
                                        onCheckedChange={(checked) => setTrimText(checked === true)}
                                    />
                                    <Label htmlFor="trimText">{t(`${characterCounter}.options.counting.trim`)}</Label>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-medium">{t(`${characterCounter}.options.ignore.title`)}</h3>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="ignoreNumbers"
                                            checked={ignoreNumbers}
                                            onCheckedChange={(checked) => setIgnoreNumbers(checked === true)}
                                        />
                                        <Label htmlFor="ignoreNumbers">{t(`${characterCounter}.options.ignore.numbers`)}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="ignoreSymbols"
                                            checked={ignoreSymbols}
                                            onCheckedChange={(checked) => setIgnoreSymbols(checked === true)}
                                        />
                                        <Label htmlFor="ignoreSymbols">{t(`${characterCounter}.options.ignore.symbols`)}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="ignoreUppercase"
                                            checked={ignoreUppercase}
                                            onCheckedChange={(checked) => setIgnoreUppercase(checked === true)}
                                        />
                                        <Label htmlFor="ignoreUppercase">{t(`${characterCounter}.options.ignore.uppercase`)}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="ignoreLowercase"
                                            checked={ignoreLowercase}
                                            onCheckedChange={(checked) => setIgnoreLowercase(checked === true)}
                                        />
                                        <Label htmlFor="ignoreLowercase">{t(`${characterCounter}.options.ignore.lowercase`)}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="ignoreWhitespace"
                                            checked={ignoreWhitespace}
                                            onCheckedChange={(checked) => setIgnoreWhitespace(checked === true)}
                                        />
                                        <Label htmlFor="ignoreWhitespace">{t(`${characterCounter}.options.ignore.whitespace`)}</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { CopyButton } from "@/components/ui/copy-button"
import { wordCounter } from "@/config/i18n-constants"
import { useTranslations } from "use-intl"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function WordCounter() {
    const [text, setText] = useState("")
    const [stopAtWord, setStopAtWord] = useState("")
    const [minWordLength, setMinWordLength] = useState("")
    const [maxWordLength, setMaxWordLength] = useState("")
    const [ignoreCommonWords, setIgnoreCommonWords] = useState(false)
    const [countNumbers, setCountNumbers] = useState(true)
    const [countHyphenatedAsOne, setCountHyphenatedAsOne] = useState(true)
    const [countAbbreviations, setCountAbbreviations] = useState(true)
    const [trimText, setTrimText] = useState(false)
    const t = useTranslations()

    const [commonWordsText, setCommonWordsText] = useState("")
    const [commonWordsList, setCommonWordsList] = useState([
        "the", "a", "an", "and", "or", "but", "of", "to", "in", "it",
        "is", "that", "was", "for", "on", "with", "as", "at", "by", "i",
        "you", "he", "she", "they", "we", "this", "from", "have", "has", "had"
    ])
    const [isCommonWordsDialogOpen, setIsCommonWordsDialogOpen] = useState(false)

    const [wordCount, setWordCount] = useState(0)
    const [charCount, setCharCount] = useState(0)
    const [processedText, setProcessedText] = useState("")
    const prevCountRef = useRef(0)

    useEffect(() => {
        prevCountRef.current = wordCount
    }, [wordCount])

    useEffect(() => {
        // Initialize commonWordsText when component mounts
        setCommonWordsText(commonWordsList.join(", "))
    }, [])

    useEffect(() => {
        let processedString = text

        // Apply trim if enabled
        if (trimText) {
            processedString = processedString.trim()
        }

        // Calculate character count (do this before any word processing)
        setCharCount(processedString.length)

        // Split text into words, handling punctuation appropriately
        let words = processedString.split(/\s+/).filter(word => word.length > 0)

        // Stop at specific word
        if (stopAtWord) {
            const stopIndex = words.findIndex(word =>
                word.toLowerCase().includes(stopAtWord.toLowerCase())
            )
            if (stopIndex !== -1) {
                words = words.slice(0, stopIndex)
            }
        }

        // Preprocess words based on settings
        words = words.map(word => {
            // Remove punctuation from the end of words
            return word.replace(/[.,!?;:""''"""'()[\]{}]$/g, "")
        }).filter(word => word.length > 0)

        // Apply filters
        if (minWordLength) {
            const min = parseInt(minWordLength)
            if (!isNaN(min)) {
                words = words.filter(word => word.length >= min)
            }
        }

        if (maxWordLength) {
            const max = parseInt(maxWordLength)
            if (!isNaN(max)) {
                words = words.filter(word => word.length <= max)
            }
        }

        if (!countNumbers) {
            words = words.filter(word => !/^\d+$/.test(word))
        }

        if (!countHyphenatedAsOne) {
            // Split hyphenated words
            let expandedWords: any[] = []
            words.forEach(word => {
                if (word.includes('-')) {
                    expandedWords = expandedWords.concat(word.split('-').filter(w => w.length > 0))
                } else {
                    expandedWords.push(word)
                }
            })
            words = expandedWords
        }

        if (!countAbbreviations) {
            // Filter out words that are likely abbreviations (all caps with possible periods)
            words = words.filter(word => !/^[A-Z\.]+$/.test(word))
        }

        if (ignoreCommonWords) {
            words = words.filter(word => !commonWordsList.includes(word.toLowerCase()))
        }

        setProcessedText(words.join(' '))
        setWordCount(words.length)
    }, [
        text,
        stopAtWord,
        minWordLength,
        maxWordLength,
        ignoreCommonWords,
        countNumbers,
        countHyphenatedAsOne,
        countAbbreviations,
        trimText,
        commonWordsList,
    ])

    const saveCommonWords = () => {
        const words = commonWordsText
            .split(/,\s*/)
            .map(word => word.trim().toLowerCase())
            .filter(word => word.length > 0)

        setCommonWordsList(words)
        setIsCommonWordsDialogOpen(false)
    }

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
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-lg shadow-lg text-3xl font-bold">
                    {digit}
                </div>
            </motion.div>
        )
    }

    // Direction indicator animation
    const DirectionIndicator = () => {
        const isIncreasing = wordCount > prevCountRef.current
        const isDecreasing = wordCount < prevCountRef.current

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
                        <span>{t(`${wordCounter}.countDisplay.increasing`)}</span>
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
                        <span>{t(`${wordCounter}.countDisplay.decreasing`)}</span>
                    </motion.div>
                )}
            </motion.div>
        )
    }

    // Convert count to array of digits
    const countArray = String(wordCount).padStart(1, '0').split('')
    const charCountArray = String(charCount).padStart(1, '0').split('')

    return (
        <div>
            <h2 className="text-xl font-bold text-center">{t(`${wordCounter}.page.title`)}</h2>
            <p className="text-center text-sm mb-6 text-muted-foreground">{t(`${wordCounter}.page.description`)}</p>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left column - Text input and count */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="space-y-2">
                        <Label htmlFor="text">{t(`${wordCounter}.input.label`)}</Label>
                        <Textarea
                            id="text"
                            placeholder={t(`${wordCounter}.input.placeholder`)}
                            className="max-h-[300px] min-h-[200px]"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    {text && (
                        <div className="space-y-2">
                            <h3 className="font-medium">{t(`${wordCounter}.processedText.title`)}</h3>
                            <div className="p-3 bg-muted rounded-md whitespace-pre-wrap break-words min-h-[100px] max-h-[200px] overflow-auto">
                                {processedText || (
                                    <span className="text-muted-foreground italic">{t(`${wordCounter}.processedText.empty`)}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right column - Settings */}
                <div className="lg:col-span-2 space-y-6 mt-4">
                    <Card className="relative flex flex-col items-center justify-center py-6 from-slate-100 to-slate-200 rounded-lg">
                        <CardContent className="w-full">
                          <span className="absolute right-[10px] top-[10px]">
                            <CopyButton value={wordCount.toString()} />
                          </span>
                            <h3 className="text-lg font-medium mb-4 text-center">{t(`${wordCounter}.countDisplay.title`)}</h3>
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
                                className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-6 rounded-full"
                                initial={{ width: 0 }}
                                animate={{
                                    width: `${Math.min(100, wordCount * 2)}%`
                                }}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            />

                            {/* Character Count Display */}
                            <div className="mt-4 text-center">
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">{t(`${wordCounter}.countDisplay.char`)}</h4>
                                <div className="flex justify-center items-center">
                                    <div className="flex">
                                        <AnimatePresence mode="popLayout">
                                            {charCountArray.map((digit, index) => (
                                                <motion.span
                                                    key={`char-${index}-${digit}`}
                                                    initial={{ y: -5, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: 10, opacity: 0 }}
                                                    transition={{ delay: index * 0.03 }}
                                                    className="inline-block px-1 text-xl font-medium"
                                                >
                                                    {digit}
                                                </motion.span>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                    <span className="ml-2 text-xl">
                                        <CopyButton value={charCount.toString()} />
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="space-y-6">
                        <Separator className="lg:hidden" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="font-medium">{t(`${wordCounter}.options.counting.title`)}</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="stopAtWord">{t(`${wordCounter}.options.counting.stopAtWord.label`)}</Label>
                                    <Input
                                        id="stopAtWord"
                                        placeholder={t(`${wordCounter}.options.counting.stopAtWord.placeholder`)}
                                        value={stopAtWord}
                                        onChange={(e) => setStopAtWord(e.target.value)}
                                    />
                                    <p className="text-sm text-muted-foreground">{t(`${wordCounter}.options.counting.stopAtWord.help`)}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="minWordLength">{t(`${wordCounter}.options.counting.minWordLength.label`)}</Label>
                                    <Input
                                        id="minWordLength"
                                        type="number"
                                        min="1"
                                        placeholder={t(`${wordCounter}.options.counting.minWordLength.placeholder`)}
                                        value={minWordLength}
                                        onChange={(e) => setMinWordLength(e.target.value)}
                                    />
                                    <p className="text-sm text-muted-foreground">{t(`${wordCounter}.options.counting.minWordLength.help`)}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="maxWordLength">{t(`${wordCounter}.options.counting.maxWordLength.label`)}</Label>
                                    <Input
                                        id="maxWordLength"
                                        type="number"
                                        min="1"
                                        placeholder={t(`${wordCounter}.options.counting.maxWordLength.placeholder`)}
                                        value={maxWordLength}
                                        onChange={(e) => setMaxWordLength(e.target.value)}
                                    />
                                    <p className="text-sm text-muted-foreground">{t(`${wordCounter}.options.counting.maxWordLength.help`)}</p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="trimText"
                                        checked={trimText}
                                        onCheckedChange={(checked) => setTrimText(checked === true)}
                                    />
                                    <Label htmlFor="trimText">{t(`${wordCounter}.options.counting.trim`)}</Label>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-medium">{t(`${wordCounter}.options.wordTypes.title`)}</h3>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="ignoreCommonWords"
                                            checked={ignoreCommonWords}
                                            onCheckedChange={(checked) => setIgnoreCommonWords(checked === true)}
                                        />
                                        <div className="flex flex-col">
                                            <Label htmlFor="ignoreCommonWords">{t(`${wordCounter}.options.wordTypes.ignoreCommonWords`)}</Label>
                                            <Dialog open={isCommonWordsDialogOpen} onOpenChange={setIsCommonWordsDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button variant="link" className="h-auto p-0 text-xs text-blue-500 justify-start">
                                                        {t(`${wordCounter}.options.dialog.edit`)}
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle>{t(`${wordCounter}.options.dialog.title`)}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <p className="text-sm text-muted-foreground">
                                                            {t(`${wordCounter}.options.dialog.description`)}
                                                        </p>
                                                        <Textarea
                                                            value={commonWordsText}
                                                            onChange={(e) => setCommonWordsText(e.target.value)}
                                                            placeholder="the, a, an, and, or, but, etc."
                                                            className="min-h-[150px]"
                                                        />
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <Button type="button" onClick={saveCommonWords}>
                                                            {t(`${wordCounter}.options.dialog.save`)}
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="countNumbers"
                                            checked={countNumbers}
                                            onCheckedChange={(checked) => setCountNumbers(checked === true)}
                                        />
                                        <Label htmlFor="countNumbers">{t(`${wordCounter}.options.wordTypes.countNumbers`)}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="countHyphenatedAsOne"
                                            checked={countHyphenatedAsOne}
                                            onCheckedChange={(checked) => setCountHyphenatedAsOne(checked === true)}
                                        />
                                        <Label htmlFor="countHyphenatedAsOne">{t(`${wordCounter}.options.wordTypes.countHyphenatedAsOne`)}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="countAbbreviations"
                                            checked={countAbbreviations}
                                            onCheckedChange={(checked) => setCountAbbreviations(checked === true)}
                                        />
                                        <Label htmlFor="countAbbreviations">{t(`${wordCounter}.options.wordTypes.countAbbreviations`)}</Label>
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
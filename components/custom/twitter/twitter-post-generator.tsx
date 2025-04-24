"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, Heart, MessageCircle, Repeat2, BarChart2, CheckCircle2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toPng } from "html-to-image"

export default function TwitterPostGenerator() {
    const [name, setName] = useState("User Name")
    const [username, setUsername] = useState("username")
    const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg?height=40&width=40")
    const [verified, setVerified] = useState(false)
    const [tweetText, setTweetText] = useState("This is my awesome tweet! #Twitter #SocialMedia")
    const [imageUrl, setImageUrl] = useState("")
    const [likes, setLikes] = useState(42)
    const [retweets, setRetweets] = useState(5)
    const [replies, setReplies] = useState(3)
    const [views, setViews] = useState(1024)
    const [isLiked, setIsLiked] = useState(false)
    const [isRetweeted, setIsRetweeted] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [timeAgo, setTimeAgo] = useState("2h")
    const [date, setDate] = useState("10:30 AM · Apr 21, 2025")

    const handleDownload = () => {
        const element = document.getElementById("twitter-post")
        if (element) {
            toPng(element)
                .then((dataUrl) => {
                    const link = document.createElement("a")
                    link.download = `twitter-post-${username}.png`
                    link.href = dataUrl
                    link.click()
                })
                .catch((error) => {
                    console.error("Error generating image:", error)
                })
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImageUrl(e.target.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result) {
                    setAvatarUrl(e.target.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleClearImage = () => {
        setImageUrl("")
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Twitter Post Generator</h1>

            <Tabs defaultValue="edit">
                <TabsList className="mb-4">
                    <TabsTrigger value="edit">Edit Tweet</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="name">Display Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mb-4" />

                            <Label htmlFor="username">Username (@handle)</Label>
                            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-4" />

                            <Label htmlFor="avatar">Profile Picture</Label>
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
                                    <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarUpload} />
                            </div>

                            <div className="flex items-center space-x-2 mb-4">
                                <Switch id="verified" checked={verified} onCheckedChange={setVerified} />
                                <Label htmlFor="verified">Verified account</Label>
                            </div>

                            <Label htmlFor="tweetText">Tweet Text</Label>
                            <Textarea
                                id="tweetText"
                                value={tweetText}
                                onChange={(e) => setTweetText(e.target.value)}
                                className="mb-4"
                                rows={4}
                            />

                            <Label htmlFor="date">Date</Label>
                            <Input id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mb-4" />

                            <Label htmlFor="timeAgo">Time Ago</Label>
                            <Input id="timeAgo" value={timeAgo} onChange={(e) => setTimeAgo(e.target.value)} className="mb-4" />
                        </div>

                        <div>
                            <Label htmlFor="tweetImage">Tweet Image (optional)</Label>
                            <div className="mb-4">
                                {imageUrl && (
                                    <div className="relative mb-2">
                                        <div className="aspect-video overflow-hidden rounded-md">
                                            <Image
                                                src={imageUrl || "/placeholder.svg"}
                                                alt="Tweet image"
                                                width={400}
                                                height={225}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={handleClearImage}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                )}
                                <Input id="tweetImage" type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="likes">Likes: {likes.toLocaleString()}</Label>
                                <Slider
                                    id="likes"
                                    min={0}
                                    max={1000}
                                    step={1}
                                    value={[likes]}
                                    onValueChange={(value) => setLikes(value[0])}
                                    className="my-2"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="retweets">Retweets: {retweets.toLocaleString()}</Label>
                                <Slider
                                    id="retweets"
                                    min={0}
                                    max={500}
                                    step={1}
                                    value={[retweets]}
                                    onValueChange={(value) => setRetweets(value[0])}
                                    className="my-2"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="replies">Replies: {replies.toLocaleString()}</Label>
                                <Slider
                                    id="replies"
                                    min={0}
                                    max={200}
                                    step={1}
                                    value={[replies]}
                                    onValueChange={(value) => setReplies(value[0])}
                                    className="my-2"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="views">Views: {views.toLocaleString()}</Label>
                                <Slider
                                    id="views"
                                    min={0}
                                    max={10000}
                                    step={1}
                                    value={[views]}
                                    onValueChange={(value) => setViews(value[0])}
                                    className="my-2"
                                />
                            </div>

                            <div className="flex items-center space-x-2 mb-4">
                                <Switch id="liked" checked={isLiked} onCheckedChange={setIsLiked} />
                                <Label htmlFor="liked">Liked by you</Label>
                            </div>

                            <div className="flex items-center space-x-2 mb-4">
                                <Switch id="retweeted" checked={isRetweeted} onCheckedChange={setIsRetweeted} />
                                <Label htmlFor="retweeted">Retweeted by you</Label>
                            </div>

                            <div className="flex items-center space-x-2 mb-4">
                                <Switch id="bookmarked" checked={isBookmarked} onCheckedChange={setIsBookmarked} />
                                <Label htmlFor="bookmarked">Bookmarked by you</Label>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="preview" className="flex flex-col items-center">
                    <div
                        id="twitter-post"
                        className="max-w-lg w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden p-4"
                    >
                        <div className="flex">
                            <Avatar className="w-12 h-12 mr-3">
                                <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
                                <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex items-center">
                                    <span className="font-bold mr-1">{name}</span>
                                    {verified && <CheckCircle2 className="h-4 w-4 text-blue-500 fill-blue-500" />}
                                    <span className="text-gray-500 ml-1">
                    @{username} · {timeAgo}
                  </span>
                                </div>

                                <div className="mt-1 whitespace-pre-wrap">{tweetText}</div>

                                {imageUrl && (
                                    <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                                        <Image
                                            src={imageUrl || "/placeholder.svg"}
                                            alt="Tweet image"
                                            width={500}
                                            height={280}
                                            className="object-cover w-full"
                                        />
                                    </div>
                                )}

                                <div className="text-xs text-gray-500 mt-3">{date}</div>

                                <div className="flex justify-between mt-3 text-gray-500">
                                    <div className="flex items-center">
                                        <MessageCircle className="h-4 w-4 mr-1" />
                                        <span>{replies}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <Repeat2 className={`h-4 w-4 mr-1 ${isRetweeted ? "text-green-500" : ""}`} />
                                        <span className={isRetweeted ? "text-green-500" : ""}>{retweets}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <Heart className={`h-4 w-4 mr-1 ${isLiked ? "text-red-500 fill-red-500" : ""}`} />
                                        <span className={isLiked ? "text-red-500" : ""}>{likes}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <BarChart2 className="h-4 w-4 mr-1" />
                                        <span>{views}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <Bookmark className={`h-4 w-4 ${isBookmarked ? "text-blue-500 fill-blue-500" : ""}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button onClick={handleDownload} className="mt-6">
                        Download Tweet Image
                    </Button>
                </TabsContent>
            </Tabs>
        </div>
    )
}

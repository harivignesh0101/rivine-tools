"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MoreHorizontal, Trash2, CheckCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { toPng } from "html-to-image"
import { Icons } from "@/components/custom/icons/icons"
import { useTranslations } from "use-intl"
import {instagramPostGenerator, textCompare} from "@/config/i18n-constants"

export default function InstagramPostGenerator() {
    const t = useTranslations()

    const [username, setUsername] = useState("username")
    const [avatarUrl, setAvatarUrl] = useState("/tools/instagram-placeholder.svg?height=40&width=40")
    const [imageUrl, setImageUrl] = useState("/tools/instagram-placeholder.svg?height=600&width=600")
    const [caption, setCaption] = useState("This is my awesome Instagram post!")
    const [likes, setLikes] = useState(1024)
    const [commentCount, setCommentCount] = useState(1024)
    const [isLiked, setIsLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [comments, setComments] = useState([
        { username: "rivine.dev", text: "Amazing post! 😍" },
    ])
    const [newComment, setNewComment] = useState("")
    const [commentUsername, setCommentUsername] = useState("rivine.dev")
    const [location, setLocation] = useState("New York, NY")
    const [timeAgo, setTimeAgo] = useState("2 HOURS AGO")
    const [postTheme, setPostTheme] = useState("light")
    const [viewMode, setViewMode] = useState("mobile")

    const avatarInputRef = useRef<HTMLInputElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)

    // Fixed theme colors using black for dark theme
    const themes = {
        light: {
            background: "bg-white",
            text: "text-black",
            border: "border-gray-200",
            secondaryText: "text-gray-500",
            tertiaryText: "text-gray-400",
            verifiedBadge: "text-blue-500"
        },
        dark: {
            background: "bg-black",
            text: "text-white",
            border: "border-zinc-800",
            secondaryText: "text-zinc-300",
            tertiaryText: "text-zinc-500",
            verifiedBadge: "text-blue-400"
        }
    }

    const formatNumber = (num: number): string => {
        if (viewMode === "mobile") {
            if (num >= 1_000_000_000_000) {
                return (num / 1_000_000_000_000).toFixed(1) + "T";
            } else if (num >= 1_000_000_000) {
                return (num / 1_000_000_000).toFixed(1) + "B";
            } else if (num >= 1_000_000) {
                return (num / 1_000_000).toFixed(1) + "M";
            } else if (num >= 10_000) {
                return (num / 1_000).toFixed(1) + "K";
            }
            return num.toLocaleString(); // e.g., 9,345
        }
        return num.toLocaleString(); // Always commas in desktop view
    };

    const handleDownload = () => {
        const element = document.getElementById("instagram-post")
        if (element) {
            toPng(element)
                .then((dataUrl) => {
                    const link = document.createElement("a")
                    link.download = `instagram-post-${username}.png`
                    link.href = dataUrl
                    link.click()
                })
                .catch((error) => {
                    console.error("Error generating image:", error)
                })
        }
    }

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { username: commentUsername, text: newComment }])
            setNewComment("")
        }
    }

    const handleRemoveComment = (index: number) => {
        const updatedComments = [...comments]
        updatedComments.splice(index, 1)
        setComments(updatedComments)
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

    const triggerAvatarUpload = () => {
        if (avatarInputRef.current) {
            avatarInputRef.current.click()
        }
    }

    const triggerImageUpload = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click()
        }
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-xl font-bold text-center mb-6">{t(`${instagramPostGenerator}.page.title`)}</h2>
            <div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <div className="mb-4">
                            <Label htmlFor="username" className="block mb-2">{t(`${instagramPostGenerator}.userInfo.username.label`)}</Label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={t(`${instagramPostGenerator}.userInfo.username.placeholder`)}
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="avatar" className="block mb-2">{t(`${instagramPostGenerator}.userInfo.avatar.label`)}</Label>
                            <div className="flex items-center gap-4">
                                <Avatar className="w-12 h-12" onClick={triggerAvatarUpload}>
                                    <AvatarImage src={avatarUrl || "/tools/instagram-placeholder.svg"} alt={username} />
                                    <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <Input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    ref={avatarInputRef}
                                    className="hidden"
                                />
                                <Button onClick={triggerAvatarUpload}>{t(`${instagramPostGenerator}.userInfo.avatar.button`)}</Button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                            <Switch id="verified" checked={isVerified} onCheckedChange={setIsVerified} />
                            <Label htmlFor="verified">{t(`${instagramPostGenerator}.userInfo.verified.label`)}</Label>
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="location" className="block mb-2">{t(`${instagramPostGenerator}.userInfo.location.label`)}</Label>
                            <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder={t(`${instagramPostGenerator}.userInfo.location.placeholder`)}
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="caption" className="block mb-2">{t(`${instagramPostGenerator}.postContent.caption.label`)}</Label>
                            <Textarea
                                id="caption"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder={t(`${instagramPostGenerator}.postContent.caption.placeholder`)}
                                rows={3}
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="timeAgo" className="block mb-2">{t(`${instagramPostGenerator}.postContent.timeAgo.label`)}</Label>
                            <Input
                                id="timeAgo"
                                value={timeAgo}
                                onChange={(e) => setTimeAgo(e.target.value)}
                                placeholder={t(`${instagramPostGenerator}.postContent.timeAgo.placeholder`)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Label htmlFor="postTheme" className="block mb-2">{t(`${instagramPostGenerator}.appearance.theme.label`)}</Label>
                                <Select value={postTheme} onValueChange={setPostTheme}>
                                    <SelectTrigger id="postTheme">
                                        <SelectValue placeholder={t(`${instagramPostGenerator}.appearance.theme.label`)} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">{t(`${instagramPostGenerator}.appearance.theme.light`)}</SelectItem>
                                        <SelectItem value="dark">{t(`${instagramPostGenerator}.appearance.theme.dark`)}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="viewMode" className="block mb-2">{t(`${instagramPostGenerator}.appearance.viewMode.label`)}</Label>
                                <Select value={viewMode} onValueChange={setViewMode}>
                                    <SelectTrigger id="viewMode">
                                        <SelectValue placeholder={t(`${instagramPostGenerator}.appearance.viewMode.label`)} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="web">{t(`${instagramPostGenerator}.appearance.viewMode.web`)}</SelectItem>
                                        <SelectItem value="mobile">{t(`${instagramPostGenerator}.appearance.viewMode.mobile`)}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="likes" className="block mb-2">{t(`${instagramPostGenerator}.engagement.likes.label`)}</Label>
                            <Input
                                id="likes"
                                type="number"
                                min="0"
                                value={likes}
                                onChange={(e) => setLikes(parseInt(e.target.value) || 0)}
                                placeholder={t(`${instagramPostGenerator}.engagement.likes.placeholder`)}
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="comments" className="block mb-2">{t(`${instagramPostGenerator}.engagement.comments.label`)}</Label>
                            <Input
                                id="comments"
                                type="number"
                                min="0"
                                value={commentCount}
                                onChange={(e) => setCommentCount(parseInt(e.target.value) || 0)}
                                placeholder={t(`${instagramPostGenerator}.engagement.comments.placeholder`)}
                            />
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                            <Switch id="liked" checked={isLiked} onCheckedChange={setIsLiked} />
                            <Label htmlFor="liked">{t(`${instagramPostGenerator}.engagement.liked.label`)}</Label>
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="postImage" className="block mb-2">{t(`${instagramPostGenerator}.postContent.image.label`)}</Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    id="postImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    ref={imageInputRef}
                                    className="hidden"
                                />
                                <Button onClick={triggerImageUpload}>{t(`${instagramPostGenerator}.postContent.image.button`)}</Button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <Label className="block mb-2">{t(`${instagramPostGenerator}.engagement.comments.label2`)}</Label>
                            <div className="border rounded-md p-3 mb-4 max-h-[200px] overflow-y-auto">
                                {comments.map((comment, index) => (
                                    <div key={index} className="mb-2 flex justify-between items-center">
                                        <div>
                                            <span className="font-semibold">{comment.username}</span> <span>{comment.text}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveComment(index)}
                                            className="h-6 w-6 text-red-500 hover:bg-red-100"
                                            aria-label={t(`${instagramPostGenerator}.actions.removeComment`)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                                <div className="md:col-span-1">
                                    <Input
                                        placeholder={t(`${instagramPostGenerator}.engagement.comments.usernamePlaceholder`)}
                                        value={commentUsername}
                                        onChange={(e) => setCommentUsername(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder={t(`${instagramPostGenerator}.engagement.comments.addPlaceholder`)}
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                        <Button
                                            disabled={comments.length >= 2}
                                            onClick={handleAddComment}
                                        >
                                            {t(`${instagramPostGenerator}.engagement.comments.addButton`)}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <Button onClick={handleDownload} className="mb-6 w-full md:w-auto">
                            {t(`${instagramPostGenerator}.actions.download`)}
                        </Button>

                        <div
                            id="instagram-post"
                            className={`max-w-md w-full ${themes[postTheme as keyof typeof themes].background} ${themes[postTheme as keyof typeof themes].text} border ${themes[postTheme as keyof typeof themes].border} rounded-md overflow-hidden`}
                        >
                            <div className="p-3 flex items-center">
                                <div onClick={triggerAvatarUpload} className="cursor-pointer">
                                    <Avatar className="w-8 h-8 mr-3">
                                        <AvatarImage src={avatarUrl || "/tools/instagram-placeholder.svg"} alt={username} />
                                        <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold flex items-center">
                                        {username}
                                        {isVerified && (
                                            (() => {
                                                const Icon = Icons.InstagramVerified;
                                                return <Icon className="h-4 w-4 ml-1" />;
                                            })()
                                        )}
                                    </div>
                                    {location && <div className="text-xs">{location}</div>}
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </div>

                            <div
                                className="aspect-square relative cursor-pointer"
                                onClick={triggerImageUpload}
                            >
                                <Image src={imageUrl || "/tools/instagram-placeholder.svg"} alt="Post image" fill className="object-cover" />
                            </div>

                            <div className="p-3">
                                <div className="flex justify-between mb-2">
                                    <div className="flex space-x-4">
                                        <div className="flex items-center">
                                            <div onClick={e => setIsLiked(!isLiked)} className="cursor-pointer">
                                                {(() => {
                                                    const Icon = isLiked ? Icons.InstagramUnlike : Icons.InstagramLike;
                                                    return <Icon className="h-6 w-6 fill-white-500 text-white-500" />;
                                                })()}
                                            </div>
                                            {viewMode === "mobile" && <span className="pl-1 text-sm">{formatNumber(likes)}</span>}
                                        </div>
                                        <div className="flex items-center">
                                            {(() => {
                                                const Icon = Icons.InstagramComment;
                                                return <Icon className="h-6 w-6" />;
                                            })()}
                                            {viewMode === "mobile" && <span className="pl-1 text-sm">{formatNumber(commentCount)}</span>}
                                        </div>
                                        {(() => {
                                            const Icon = Icons.InstagramShare;
                                            return <Icon className="h-6 w-6" />;
                                        })()}
                                    </div>
                                    {(() => {
                                        const Icon = Icons.InstagramSave;
                                        return <Icon className="h-6 w-6" />;
                                    })()}
                                </div>

                                {viewMode === "web" && <div className="font-semibold mb-1">{formatNumber(likes)} likes</div>}


                                <div className="mb-1">
                                    <span className="font-semibold flex items-center inline-flex">
                                        {username}
                                        {isVerified && (
                                            <CheckCircle className={`ml-1 h-3 w-3 ${themes[postTheme as keyof typeof themes].verifiedBadge} fill-current`} />
                                        )}
                                    </span>
                                    <span className="ml-1">{caption}</span>
                                </div>

                                {comments.length > 0 && viewMode === "web" && (
                                    <div className={`${themes[postTheme as keyof typeof themes].secondaryText} mb-1`}>
                                        View all {comments.length} comments
                                    </div>
                                )}

                                {comments.slice(0, 2).map((comment, index) => (
                                    <div key={index} className="mb-1">
                                        <span className="font-semibold">{comment.username}</span> <span>{comment.text}</span>
                                    </div>
                                ))}

                                <div className={`text-xs ${themes[postTheme as keyof typeof themes].tertiaryText} mt-2`}>
                                    {timeAgo}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
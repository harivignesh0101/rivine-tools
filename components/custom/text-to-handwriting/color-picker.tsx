import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check } from "lucide-react"

interface ColorPickerPopoverProps {
    label: string
    value: string
    onChange: (color: string) => void
    presets?: string[]
}

function getLuminance(color: string): number {
    const rgb = color
        .substring(1)
        .match(/.{2}/g)
        ?.map((hex) => parseInt(hex, 16));

    if (!rgb) return 0;

    const [r, g, b] = rgb;

    // Using the luminance formula: 0.2126 * R + 0.7152 * G + 0.0722 * B
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance;
}

export function ColorPickerPopover({
                                       label,
                                       value,
                                       onChange,
                                       presets = ["#000000", "#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#F1C40F"],
                                   }: ColorPickerPopoverProps) {
    const luminance = getLuminance(value);
    const labelColor = luminance > 0.5 ? "black" : "white";

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Input
                        type="text"
                        value={value}
                        readOnly
                        className="cursor-pointer"
                        style={{ color: labelColor, backgroundColor: value }}
                    />
                </PopoverTrigger>
                <PopoverContent align="start" className="p-4 w-[250px] rounded-lg shadow-lg space-y-4">
                    <Label>Presets</Label>
                    <div className="flex gap-2 flex-wrap">
                        {presets.map((color) => (
                            <Button
                                key={color}
                                type="button"
                                variant="secondary"
                                onClick={() => onChange(color)}
                                className={`relative w-8 h-8 rounded-full p-0 ${value === color ? "border-2" : "border"}`}
                                style={{ backgroundColor: color }}
                            >
                                {value === color && (
                                    <Check className="absolute inset-0 w-4 h-4 m-auto drop-shadow" />
                                )}
                            </Button>
                        ))}
                    </div>
                    <Label>Custom</Label>
                    <div className="flex gap-2 items-center">
                        <Input
                            type="color"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-12 h-8 p-0 cursor-pointer"
                        />
                        <Input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="flex-1"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

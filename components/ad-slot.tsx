"use client"

interface AdSlotProps {
  position: "top" | "middle" | "bottom"
}

export function AdSlot({ position }: AdSlotProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-muted border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center max-w-2xl w-full">
        <p className="text-muted-foreground text-sm">
          Advertisement Space - {position.charAt(0).toUpperCase() + position.slice(1)}
        </p>
        <p className="text-xs text-muted-foreground mt-2">Google Ads integration ready</p>
      </div>
    </div>
  )
}

interface UserAvatarProps {
  name: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
}

export function UserAvatar({ name, size = "md" }: UserAvatarProps) {
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold flex-shrink-0`}>
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

import React from "react"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          {icon && <div className="w-8 h-8">{icon}</div>}
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        </div>
        {description && <p className="text-primary-foreground/90 text-lg max-w-2xl">{description}</p>}
      </div>
    </section>
  )
}

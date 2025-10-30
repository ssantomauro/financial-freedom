'use client'

import { HelpCircle } from 'lucide-react'

interface LabelWithTooltipProps {
  label: string
  tooltip: string
  htmlFor?: string
  className?: string
}

export function LabelWithTooltip({ label, tooltip, htmlFor, className }: LabelWithTooltipProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${className || 'block font-medium text-gray-700 mb-2 text-sm'}`}
    >
      <span className="flex items-center gap-1.5">
        {label}
        <div className="relative group">
          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 z-10">
            <div className="text-center">
              {tooltip}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </span>
    </label>
  )
}

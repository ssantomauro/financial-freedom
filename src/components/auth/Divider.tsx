export function Divider({ text = 'OR' }: { text?: string }) {
  return (
    <div className="relative flex items-center my-6">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="flex-shrink mx-4 text-sm text-gray-500 font-medium">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  )
}

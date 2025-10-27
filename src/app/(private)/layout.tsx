import { PrivateHeader } from '@/components/layout/PrivateHeader'
import { PrivateFooter } from '@/components/layout/PrivateFooter'

export default function PrivateLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
            <PrivateHeader />
            <main className="flex-1">
                {children}
            </main>
            <PrivateFooter />
        </div>
    )
}
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Contact Us
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/academy" className="text-blue-600 hover:underline">
            EdLight Academy
          </Link>
          <Link href="/labs" className="text-blue-600 hover:underline">
            EdLight Labs
          </Link>
          <Link href="/nexus" className="text-blue-600 hover:underline">
            EdLight Nexus
          </Link>
          <Link href="/eslp" className="text-blue-600 hover:underline">
            ESLP
          </Link>
        </div>
      </div>
    </main>
  )
}

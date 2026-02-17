'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-9xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Something Went Wrong
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          We&apos;re sorry, but something unexpected happened. Our team has been notified and is working on a fix.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Go Home
          </Link>
        </div>
        
        {error.digest && (
          <p className="mt-8 text-sm text-gray-500">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  )
}

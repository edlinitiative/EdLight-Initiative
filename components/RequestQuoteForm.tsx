"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  organization?: string
  currentWebsite?: string
  projectType: string
  budget: string
  timeline: string
  contentStatus: string
  keyFeatures: string
  additionalNotes?: string
}

interface RequestQuoteFormProps {
  onSuccess?: () => void
}

const projectTypes = [
  'New website build',
  'Website redesign',
  'Ongoing maintenance & support',
  'E-commerce experience',
  'Custom digital project',
]

const budgetRanges = [
  'Under $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  'Above $10,000',
]

const timelineOptions = [
  'As soon as possible',
  'Within 1 month',
  '1 - 3 months',
  '3 - 6 months',
  'Flexible / exploring options',
]

const contentStatuses = [
  'We have most content ready',
  'We need help creating content',
  'We will provide content later',
]

export default function RequestQuoteForm({ onSuccess }: RequestQuoteFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setErrorMessage(null)

    const payload = {
      ...data,
      requestType: 'Website Development',
    }

    try {
      const res = await fetch('/api/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || 'Unable to submit request right now.')
      }

      reset()
      alert('Thank you! Our team will review your website request and respond within 2-3 business days.')
      onSuccess?.()
    } catch (err: unknown) {
      console.error(err)
      let derivedMessage = 'Submission failed. Please try again later.'
      if (
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string'
      ) {
        const possibleMessage = (err as { message?: string }).message
        if (possibleMessage && possibleMessage.trim().length > 0) {
          derivedMessage = possibleMessage
        }
      }
      setErrorMessage(derivedMessage)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMessage && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Full name *</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Organization / Company</label>
          <input
            type="text"
            {...register('organization')}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
            placeholder="Organization name (optional)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Email address *</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
            placeholder="name@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Current website</label>
          <input
            type="url"
            {...register('currentWebsite')}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
            placeholder="https://"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Project type *</label>
          <select
            {...register('projectType', { required: 'Please select a project type' })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
            defaultValue=""
          >
            <option value="" disabled>
              Select one
            </option>
            {projectTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.projectType && <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Estimated budget *</label>
          <select
            {...register('budget', { required: 'Please select a budget range' })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
            defaultValue=""
          >
            <option value="" disabled>
              Choose a range
            </option>
            {budgetRanges.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Target launch timeline *</label>
          <select
            {...register('timeline', { required: 'Please share your target timeline' })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
            defaultValue=""
          >
            <option value="" disabled>
              Select timeline
            </option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.timeline && <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Content assets *</label>
          <select
            {...register('contentStatus', { required: 'Please share your content status' })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
            defaultValue=""
          >
            <option value="" disabled>
              Select content status
            </option>
            {contentStatuses.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.contentStatus && <p className="mt-1 text-sm text-red-600">{errors.contentStatus.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Project goals & key features *</label>
        <textarea
          rows={4}
          {...register('keyFeatures', {
            required: 'Please outline the goals or features for this project',
          })}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
          placeholder="Tell us about your goals, must-have features, integrations, or design inspiration."
        />
        {errors.keyFeatures && <p className="mt-1 text-sm text-red-600">{errors.keyFeatures.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Anything else we should know?</label>
        <textarea
          rows={3}
          {...register('additionalNotes')}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
          placeholder="Share context about stakeholders, decision timeline, or support needs."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary flex w-full justify-center"
        >
          {isSubmitting ? 'Sending…' : 'Submit website brief'}
        </button>
      </div>
    </form>
  )
}

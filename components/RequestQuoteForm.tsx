"use client"

import React from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  organization?: string
  email: string
  phone?: string
  program: string
  participants?: number
  startDate?: string
  message: string
}

export default function RequestQuoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || 'Unable to submit request')
      }

      alert('Request submitted — we will follow up shortly.')
      reset()
    } catch (err: unknown) {
      console.error(err)
      const message =
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string'
          ? (err as { message?: string }).message
          : 'Submission failed. Please try again later.'
      alert(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full name *</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
        <input
          type="text"
          {...register('organization')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Program *</label>
        <select
          {...register('program', { required: 'Please select a program' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a program</option>
          <option value="EdLight Labs">EdLight Labs</option>
          <option value="EdLight Nexus">EdLight Nexus</option>
          <option value="EdLight Academy">EdLight Academy</option>
          <option value="ESLP">ESLP</option>
          <option value="Other">Other</option>
        </select>
        {errors.program && <p className="mt-1 text-sm text-red-600">{errors.program.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Participants (estimate)</label>
          <input
            type="number"
            {...register('participants', { valueAsNumber: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            min={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Planned start date</label>
          <input
            type="date"
            {...register('startDate')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
        <textarea
          rows={5}
          {...register('message', { required: 'Message is required' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full justify-center"
        >
          {isSubmitting ? 'Sending…' : 'Request a Quote'}
        </button>
      </div>
    </form>
  )
}

# Security & Performance Configuration Guide

## Security Headers Implemented

The following security headers have been configured in `next.config.ts`:

### 1. X-DNS-Prefetch-Control
- **Value**: `on`
- **Purpose**: Controls DNS prefetching to improve performance
- **Impact**: Helps browsers resolve domain names faster

### 2. Strict-Transport-Security (HSTS)
- **Value**: `max-age=63072000; includeSubDomains; preload`
- **Purpose**: Forces HTTPS connections
- **Duration**: 2 years (63072000 seconds)
- **Scope**: All subdomains included
- **Preload**: Site can be submitted to browser HSTS preload lists

### 3. X-Frame-Options
- **Value**: `SAMEORIGIN`
- **Purpose**: Prevents clickjacking attacks
- **Effect**: Only allows framing from same origin

### 4. X-Content-Type-Options
- **Value**: `nosniff`
- **Purpose**: Prevents MIME type sniffing
- **Effect**: Browsers must respect Content-Type headers

### 5. X-XSS-Protection
- **Value**: `1; mode=block`
- **Purpose**: Enables XSS filtering in older browsers
- **Effect**: Blocks page if XSS attack detected

### 6. Referrer-Policy
- **Value**: `origin-when-cross-origin`
- **Purpose**: Controls referrer information
- **Effect**: Sends full URL for same-origin, only origin for cross-origin

### 7. Permissions-Policy
- **Value**: `camera=(), microphone=(), geolocation=()`
- **Purpose**: Disables unused browser features
- **Effect**: Camera, microphone, and geolocation disabled

## Environment Variables

### Required Variables

Create a `.env.local` file with the following variables:

```env
# Resend (Newsletter)
RESEND_API_KEY=your_resend_api_key
NEWSLETTER_INBOX=newsletter@edlight.org
NEWSLETTER_FROM_EMAIL=EdLight Initiative <onboarding@resend.dev>

# PayPal (Donations)
NEXT_PUBLIC_PAYPAL_BUTTON_ID=your_paypal_button_id

# Contact Form (Optional - if using email service)
CONTACT_EMAIL_TO=info@edlight.org
CONTACT_EMAIL_FROM=contact@edlight.org

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Build Information (Auto-populated by Vercel)
NEXT_PUBLIC_BUILD_COMMIT=
NEXT_PUBLIC_BUILD_BRANCH=
NEXT_PUBLIC_BUILD_REPO=
NEXT_PUBLIC_BUILD_TIME=
```

### Environment Variable Validation

Add this to your `lib/env.ts` (optional):

```typescript
export function validateEnv() {
  const required = [
    'RESEND_API_KEY',
    'NEWSLETTER_INBOX',
  ]

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`)
  }
}
```

## Rate Limiting Recommendations

### API Routes
Implement rate limiting on:
- `/api/newsletter` - 5 requests per minute per IP
- `/api/request-quote` - 3 requests per minute per IP
- `/api/admin/*` - 10 requests per minute per authenticated user

### Recommended Package
```bash
npm install express-rate-limit
```

### Implementation Example
```typescript
// lib/rate-limit.ts
import rateLimit from 'express-rate-limit'

export const newsletterLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: 'Too many requests, please try again later.'
})
```

## Content Security Policy (CSP)

### Recommended CSP Headers

Add to `next.config.ts` headers:

```typescript
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypalobjects.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.resend.com https://www.google-analytics.com",
    "frame-src 'self' https://www.paypal.com",
    "media-src 'self'",
  ].join('; ')
}
```

⚠️ **Note**: CSP can break functionality if not properly configured. Test thoroughly before deployment.

## CORS Configuration

### For API Routes

Create `middleware.ts` in the root directory:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', 'https://www.edlight.org')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  }

  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

## Performance Optimizations

### Image Optimization
Already configured in Next.js. Ensure all images use Next.js `<Image>` component:

```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false} // true for above-fold images
  loading="lazy" // or "eager" for critical images
/>
```

### Font Optimization
Google Fonts are automatically optimized by Next.js. Already configured in `layout.tsx`.

### Code Splitting
Automatic in Next.js. For additional optimization:

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // if component doesn't need server rendering
})
```

## Monitoring & Analytics

### Recommended Tools

1. **Error Tracking**: Sentry
   ```bash
   npm install @sentry/nextjs
   ```

2. **Analytics**: Google Analytics, Plausible, or Vercel Analytics
   ```bash
   npm install @vercel/analytics
   ```

3. **Performance**: Vercel Speed Insights
   ```bash
   npm install @vercel/speed-insights
   ```

### Implementation

Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

## Security Checklist

- [x] HTTPS enforced (via HSTS)
- [x] XSS protection headers
- [x] Clickjacking protection
- [x] MIME type sniffing prevention
- [ ] CSP configured (recommended, not yet implemented)
- [ ] Rate limiting implemented (recommended)
- [ ] CORS configured (if needed for API)
- [x] Sensitive routes protected (admin endpoints noted)
- [ ] Input validation on forms (basic validation implemented)
- [ ] SQL injection prevention (N/A - no database yet)
- [ ] Authentication for admin routes (recommended)

## Deployment Security

### Vercel Environment Variables

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Set appropriate scope (Production, Preview, Development)

### Secrets Management

- **Never commit** `.env.local` to Git
- **Never expose** API keys in client-side code
- **Use** `NEXT_PUBLIC_` prefix only for client-accessible variables
- **Rotate** API keys regularly

### Post-Deployment

1. Test all forms and API endpoints
2. Verify analytics tracking
3. Check error monitoring
4. Test payment processing
5. Verify email notifications
6. Monitor performance metrics
7. Check security headers with [securityheaders.com](https://securityheaders.com)

## Common Security Issues to Avoid

### ❌ Don't Do This
```typescript
// Exposing secrets
const API_KEY = 'sk_live_xxx' // Never hardcode

// Dangerous eval
eval(userInput) // XSS vulnerability

// Unvalidated redirects
redirect(req.query.url) // Open redirect vulnerability

// Raw HTML injection
dangerouslySetInnerHTML={{ __html: userInput }} // XSS vulnerability
```

### ✅ Do This Instead
```typescript
// Use environment variables
const API_KEY = process.env.API_KEY

// Validate input
const sanitizedInput = DOMPurify.sanitize(userInput)

// Whitelist redirects
const allowedUrls = ['/home', '/about']
if (allowedUrls.includes(req.query.url)) {
  redirect(req.query.url)
}

// Use safe rendering
<div>{userInput}</div> // React escapes by default
```

## Performance Budget

### Recommended Limits
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.8s
- **Total Blocking Time**: < 200ms
- **Cumulative Layout Shift**: < 0.1

### Lighthouse Score Targets
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 95

## Support & Resources

- **Next.js Security**: https://nextjs.org/docs/advanced-features/security-headers
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **Mozilla Observatory**: https://observatory.mozilla.org/
- **Security Headers**: https://securityheaders.com/

## Questions?

For security concerns or questions, contact: info@edlight.org


'use client'

import React, { useState } from 'react'
import ClipboardButton from '@/components/ui/ClipboardButton'
import { Link2, ExternalLink } from 'lucide-react'
import Card from '@/components/ui/Card'
import Field from '@/components/ui/Field'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'

const LinkShortenerForm: React.FC = () => {
  const [longUrl, setLongUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setShortUrl('')

    if (!longUrl.trim()) {
      setError('Please enter a URL to shorten')
      return
    }

    if (!validateUrl(longUrl)) {
      setError('Please enter a valid URL (including http:// or https://)')
      return
    }

    setIsLoading(true)

    // Simulate API call for demo purposes
    setTimeout(() => {
      const mockShortCode = customAlias || Math.random().toString(36).substring(7)
      setShortUrl(`https://lnk.sh/${mockShortCode}`)
      setIsLoading(false)
    }, 1000)
  }

  const handleReset = () => {
    setLongUrl('')
    setCustomAlias('')
    setShortUrl('')
    setError('')
  }

  return (
    <Card.Root
      variant="elevated"
      surfaceLevel="lowest"
      shadowElevation={2}
      padding="lg"
      className="mx-auto max-w-2xl"
    >
      <form onSubmit={handleShorten}>
        <div className="space-y-6">
          {/* Long URL Input */}
          <Field.Root required invalid={!!error && !shortUrl}>
            <Field.Label>Enter your long URL</Field.Label>
            <Input
              type="url"
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              leftIcon={<Link2 />}
              inputSize="lg"
              disabled={isLoading}
            />
            <Field.HelperText>
              Paste any long URL you want to shorten
            </Field.HelperText>
            <Field.ErrorText>{error}</Field.ErrorText>
          </Field.Root>

          {/* Custom Alias Input */}
          <Field.Root>
            <Field.Label>Custom alias (optional)</Field.Label>
            <Input
              type="text"
              placeholder="my-custom-link"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              inputSize="lg"
              disabled={isLoading}
            />
            <Field.HelperText>
              Create a memorable custom short link
            </Field.HelperText>
          </Field.Root>

          {/* Shorten Button */}
          <Button
            type="submit"
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            leftIcon={<Link2 />}
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </Button>

          {/* Success Result */}
          {shortUrl && (
            <Alert
              variant="tonal"
              color="success"
              size="md"
              title="Link shortened successfully!"
              message="Your short link is ready to share"
            />
          )}

          {/* Short URL Display */}
          {shortUrl && (
            <div className="space-y-3 rounded-lg bg-success-container/30 p-4">
              <p className="text-label-md font-medium text-on-success-container">
                Your shortened link:
              </p>
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg bg-surface-container-high px-4 py-3">
                  <p className="break-all text-body-md font-medium text-primary">
                    {shortUrl}
                  </p>
                </div>
                <ClipboardButton
                  text={shortUrl}
                  variant="filled"
                  color="success"
                  size="md"
                  successDuration={2000}
                  aria-label="Copy shortened link to clipboard"
                />
                <Button
                  variant="outline"
                  color="success"
                  size="md"
                  onClick={() => window.open(shortUrl, '_blank')}
                  leftIcon={<ExternalLink />}
                  aria-label="Open link"
                  iconOnly
                />
              </div>
              <Button
                variant="text"
                color="neutral"
                size="sm"
                onClick={handleReset}
                fullWidth
              >
                Create another short link
              </Button>
            </div>
          )}
        </div>
      </form>
    </Card.Root>
  )
}

export default LinkShortenerForm

import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LinkShortenerForm from '@/components/LinkShortenerForm'
import { Link2, Zap, Shield, TrendingUp } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'LinkShort - Free URL Shortener | Shorten Long Links Instantly',
  description:
    'Create short, memorable links in seconds. Free URL shortener with advanced analytics, custom aliases, and reliable link management. No registration required.',
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-display-lg font-bold text-on-surface md:text-display-lg">
              Shorten Your Links
              <br />
              <span className="text-primary">In Seconds</span>
            </h1>

            <p className="mb-12 text-body-lg text-on-surface-variant">
              Transform long, complex URLs into short, shareable links.
              <br className="hidden sm:block" />
              Perfect for social media, marketing campaigns, and more.
            </p>

            {/* Link Shortener Form */}
            <LinkShortenerForm />
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-outline-variant bg-surface-container py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-headline-lg font-semibold text-on-surface">
              Why Choose LinkShort?
            </h2>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              <Card.Root
                variant="elevated"
                surfaceLevel="lowest"
                shadowElevation={1}
                padding="lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary-container p-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <Card.Title as="h3" className="mb-3">
                    Lightning Fast
                  </Card.Title>
                  <Card.Body>
                    Create short links instantly. No account required, no
                    waiting. Just paste and go.
                  </Card.Body>
                </div>
              </Card.Root>

              <Card.Root
                variant="elevated"
                surfaceLevel="lowest"
                shadowElevation={1}
                padding="lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-success-container p-4">
                    <Shield className="h-8 w-8 text-success" />
                  </div>
                  <Card.Title as="h3" className="mb-3">
                    Safe & Reliable
                  </Card.Title>
                  <Card.Body>
                    Your links are secure and will always work. We monitor
                    uptime 24/7 for maximum reliability.
                  </Card.Body>
                </div>
              </Card.Root>

              <Card.Root
                variant="elevated"
                surfaceLevel="lowest"
                shadowElevation={1}
                padding="lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-info-container p-4">
                    <TrendingUp className="h-8 w-8 text-info" />
                  </div>
                  <Card.Title as="h3" className="mb-3">
                    Track Performance
                  </Card.Title>
                  <Card.Body>
                    Monitor clicks and engagement. Get insights into how your
                    links perform over time.
                  </Card.Body>
                </div>
              </Card.Root>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-headline-lg font-semibold text-on-surface">
              How It Works
            </h2>

            <div className="mx-auto max-w-3xl">
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-on-primary text-title-lg font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 text-title-lg font-semibold text-on-surface">
                      Paste Your Long URL
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      Copy the long URL you want to shorten and paste it into
                      the input field above.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-on-secondary text-title-lg font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2 text-title-lg font-semibold text-on-surface">
                      Customize (Optional)
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      Add a custom alias to make your link more memorable and
                      brandable.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-tertiary text-on-tertiary text-title-lg font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 text-title-lg font-semibold text-on-surface">
                      Share Anywhere
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      Copy your shortened link and share it on social media,
                      emails, or anywhere you need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-outline-variant bg-primary-container py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-headline-lg font-semibold text-on-primary-container">
              Ready to Shorten Your Links?
            </h2>
            <p className="mb-8 text-body-lg text-on-primary-container opacity-90">
              Join thousands of users who trust LinkShort for their URL
              shortening needs.
            </p>
            <Button
              as="a"
              href="#top"
              variant="filled"
              color="primary"
              size="lg"
              pill
              leftIcon={<Link2 className="h-5 w-5" />}
              className="px-8 py-4 hover:shadow-elevation-2"
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

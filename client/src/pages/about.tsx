import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Heart, Sparkles, Users, Award, Leaf } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-about">
      <TopBar />
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Crafting moments of warmth, comfort, and tranquility through premium scented candles and home decor
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                At HandOFine, we believe that your home should be a sanctuary—a place where you can unwind, recharge, 
                and create beautiful memories. Our journey began with a simple yet powerful idea: to transform ordinary 
                spaces into extraordinary experiences through the art of fragrance and design.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Every candle we create is handcrafted with love, using only the finest ingredients and sustainable 
                practices. We're not just selling products; we're curating moments of joy, peace, and connection for 
                you and your loved ones.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Crafted with Love</h3>
              <p className="text-sm text-muted-foreground">
                Each product is carefully handcrafted with attention to detail and a passion for excellence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                We source only the finest ingredients to ensure every candle delivers an exceptional experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Sustainable Practices</h3>
              <p className="text-sm text-muted-foreground">
                Committed to eco-friendly materials and processes that respect our planet.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Customer First</h3>
              <p className="text-sm text-muted-foreground">
                Your satisfaction and happiness are at the heart of everything we do.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Our Journey */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-8">Our Journey</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">The Beginning</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    HandOFine was born from a personal passion for creating beautiful, fragrant spaces. What started 
                    as a small home-based venture has grown into a beloved brand, bringing warmth and elegance to 
                    thousands of homes across India.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">Our Commitment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We are dedicated to continuous innovation, always exploring new fragrances, designs, and ways to 
                    enhance your home experience. Our team works tirelessly to bring you products that combine 
                    aesthetic beauty with functional excellence.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">Looking Forward</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    As we continue to grow, our mission remains unchanged: to help you create a home that reflects 
                    your personality and brings you joy. We're excited to be part of your journey and look forward 
                    to sharing many more beautiful moments together.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* What Sets Us Apart */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-8">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-lg">Artisan Craftsmanship</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Our candles are carefully hand-poured using traditional techniques, ensuring each one is unique 
                    and of the highest quality. We take pride in the craftsmanship that goes into every product.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-lg">Curated Fragrances</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Our fragrance collection is thoughtfully curated to offer a diverse range of scents, from 
                    calming lavender to invigorating citrus, each designed to evoke specific emotions and memories.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Leaf className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-lg">Eco-Conscious</h3>
                  </div>
                  <p className="text-muted-foreground">
                    We're committed to sustainability, using natural waxes, recyclable packaging, and 
                    environmentally-friendly practices throughout our production process.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-lg">Thoughtful Gifting</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Our products make perfect gifts for any occasion. We offer beautifully packaged gift sets 
                    that show you care, making every celebration and moment special.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="font-serif text-2xl md:text-3xl mb-4">Join Us on This Journey</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We'd love to have you as part of the HandOFine family. Explore our collections and discover how 
              our products can transform your home into a haven of comfort and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/shop" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Shop Our Collection
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md hover:bg-accent transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}


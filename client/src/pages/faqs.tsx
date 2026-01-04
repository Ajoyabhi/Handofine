import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { HelpCircle, MessageCircle } from 'lucide-react';

const faqCategories = [
  {
    title: 'General Questions',
    items: [
      {
        question: 'What is HandOFine?',
        answer: 'HandOFine is a premium home decor brand specializing in handcrafted scented candles and home accessories. We create beautifully designed products to help you transform your living space into a sanctuary of warmth and comfort.',
      },
      {
        question: 'Where are your products made?',
        answer: 'All our candles are handcrafted in India using traditional techniques. We work with skilled artisans and use only the finest quality materials to ensure each product meets our high standards.',
      },
      {
        question: 'Do you offer gift wrapping?',
        answer: 'Yes! We offer beautiful gift wrapping and packaging for all our products. You can add gift wrapping at checkout, and we also have specially curated gift sets that come in elegant packaging, perfect for any occasion.',
      },
      {
        question: 'Are your products suitable for gifting?',
        answer: 'Absolutely! Our products make perfect gifts for birthdays, anniversaries, housewarmings, festivals, and any special occasion. We offer various gift sets and packaging options to make your gift extra special.',
      },
    ],
  },
  {
    title: 'Products & Orders',
    items: [
      {
        question: 'How long do the candles burn?',
        answer: 'Our candles typically burn for 40-60 hours depending on the size. Smaller candles (100-150g) burn for approximately 40 hours, while larger candles (200-300g) can burn for 50-60 hours. Always follow the care instructions for best results.',
      },
      {
        question: 'What type of wax do you use?',
        answer: 'We use high-quality soy wax and natural waxes in our candles. These waxes are eco-friendly, clean-burning, and produce minimal soot. All our products are made with sustainability in mind.',
      },
      {
        question: 'Can I customize an order?',
        answer: 'Currently, we offer a curated selection of products. For bulk orders or special customization requests, please contact us directly at info@handofinegifts.com, and we\'ll be happy to discuss your requirements.',
      },
      {
        question: 'How do I track my order?',
        answer: 'Once your order is shipped, you\'ll receive an email confirmation with a tracking number. You can use this tracking number on the courier\'s website to monitor your shipment\'s progress. If you don\'t receive a tracking number within 3 business days, please contact us.',
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    items: [
      {
        question: 'Do you ship internationally?',
        answer: 'Currently, we ship only within India. We\'re working on expanding our shipping options, so stay tuned for updates!',
      },
      {
        question: 'How long does shipping take?',
        answer: 'Orders are typically processed within 1-2 business days. Delivery times vary by location: Metro cities (3-5 days), Tier 1 & 2 cities (5-7 days), and smaller towns (7-10 days). During peak seasons, delivery times may be extended.',
      },
      {
        question: 'What are your shipping charges?',
        answer: 'We offer FREE shipping on all orders above ₹999. Orders below ₹999 incur a standard shipping charge of ₹75. Express shipping options may be available for select locations at additional charges.',
      },
      {
        question: 'What if my order is delayed?',
        answer: 'If your order is delayed beyond the estimated delivery timeframe, please contact us immediately. We\'ll investigate with the courier partner and keep you updated. In case of significant delays, we\'ll work to resolve the issue promptly.',
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'You can return items within 7 days of delivery, provided they are unused, unopened, and in their original packaging with all tags and accessories. Please see our Returns Policy page for detailed information.',
      },
      {
        question: 'How do I initiate a return?',
        answer: 'Contact us within 7 days of delivery at info@handofinegifts.com or call +91 8867692183 with your order number. We\'ll provide you with a Return Authorization (RA) number and instructions for returning the item.',
      },
      {
        question: 'Who pays for return shipping?',
        answer: 'We offer FREE return shipping for items that are defective, damaged during transit, or incorrect items sent by us. For returns due to change of mind, return shipping charges are borne by the customer.',
      },
      {
        question: 'How long does a refund take?',
        answer: 'Once we receive and inspect your returned item (3-5 business days), we\'ll process your refund within 5-7 business days. Refunds are credited to your original payment method. Processing times vary by payment method: UPI (3-5 days), Cards (5-10 days), Net Banking (5-7 days).',
      },
    ],
  },
  {
    title: 'Care & Maintenance',
    items: [
      {
        question: 'How should I care for my candles?',
        answer: 'For best results: Trim the wick to 1/4 inch before each burn, allow the candle to burn until the wax pool reaches the edges (prevents tunneling), never leave a burning candle unattended, keep away from drafts and flammable materials, and burn for no more than 3-4 hours at a time.',
      },
      {
        question: 'How should I store my candles?',
        answer: 'Store candles in a cool, dry place away from direct sunlight. Keep them in their original packaging when not in use to preserve the fragrance. Avoid storing in areas with extreme temperature changes.',
      },
      {
        question: 'What should I do if my candle tunnels?',
        answer: 'If your candle has developed a tunnel, you can fix it by wrapping aluminum foil around the candle, leaving the top open, and burning it until the wax melts evenly to the edges. Then remove the foil and continue normal use.',
      },
      {
        question: 'Can I reuse the candle jars?',
        answer: 'Yes! Our candle jars can be cleaned and reused once the candle is finished. Simply remove any remaining wax, clean with warm soapy water, and use as decorative containers or planters.',
      },
    ],
  },
  {
    title: 'Payment & Security',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods including Credit/Debit Cards, UPI, Net Banking, and Digital Wallets. All transactions are secured with SSL encryption, and we use PCI DSS compliant payment gateways.',
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, absolutely. We use industry-standard SSL encryption and PCI DSS compliant payment processors. We never store your complete payment card information on our servers. All payment data is securely handled by our payment gateway partners.',
      },
      {
        question: 'What if my payment fails?',
        answer: 'If your payment fails, please check: sufficient funds in your account, correct card/bank details, card expiration date, and internet connection. If the issue persists, try a different payment method or contact your bank. You can also reach out to us for assistance.',
      },
    ],
  },
];

export default function FAQs() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-faqs">
      <TopBar />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <HelpCircle className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Frequently Asked Questions</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-12" />

        {/* Still have questions */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? We're here to help! Get in touch with our friendly 
              customer service team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="mailto:info@handofinegifts.com" 
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md hover:bg-accent transition-colors"
              >
                Send Email
              </a>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}


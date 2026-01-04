import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ReturnsPolicy() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-returns">
      <TopBar />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Returns & Refunds Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Return Policy Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                At HandOFine, we want you to be completely satisfied with your purchase. If you are not happy with your 
                order, we offer a hassle-free return and refund process. Please read this policy carefully to understand 
                our return procedures.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Return Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Return Window</h3>
                  <p>
                    You have <strong>7 days</strong> from the date of delivery to initiate a return request. Returns 
                    initiated after this period will not be accepted.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Conditions for Returns</h3>
                  <p>Items must be returned in their original condition:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Unused, unopened, and in original packaging</li>
                    <li>All tags, labels, and accessories included</li>
                    <li>No signs of wear, damage, or use</li>
                    <li>Original invoice or proof of purchase included</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Non-Returnable Items</h3>
                  <p>The following items cannot be returned:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Items damaged due to customer misuse or negligence</li>
                    <li>Items without original packaging or tags</li>
                    <li>Personalized or customized products</li>
                    <li>Items purchased during clearance sales (unless defective)</li>
                    <li>Gift cards or vouchers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Initiate a Return</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>To initiate a return, please follow these steps:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  Contact us within 7 days of delivery at{' '}
                  <a href="mailto:info@handofinegifts.com" className="text-primary hover:underline">
                    info@handofinegifts.com
                  </a>
                  {' '}or call{' '}
                  <a href="tel:+918867692183" className="text-primary hover:underline">
                    +91 8867692183
                  </a>
                  {' '}with your order number
                </li>
                <li>Provide the reason for return and attach photos if the item is damaged or defective</li>
                <li>Our customer service team will review your request and send you a Return Authorization (RA) number</li>
                <li>Pack the item securely in its original packaging with all accessories and tags</li>
                <li>Include the original invoice and write the RA number on the package</li>
                <li>Ship the package to the address provided by our team</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Return Shipping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Free Return Shipping</h3>
                  <p>
                    We offer <strong>FREE return shipping</strong> for items that are defective, damaged during transit, 
                    or incorrect items sent by us.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Customer-Paid Returns</h3>
                  <p>
                    For returns due to change of mind or other customer-initiated reasons, return shipping charges will 
                    be borne by the customer. The shipping cost will be deducted from your refund amount.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Return Address</h3>
                  <p>
                    The return address will be provided in your Return Authorization email. Please do not send returns 
                    to our office address without an RA number, as these packages may not be processed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Return Processing Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Once we receive your returned item, our team will inspect it within <strong>3-5 business days</strong>. 
                You will be notified via email once the inspection is complete.
              </p>
              <p>
                If the return is approved, your refund will be processed within <strong>5-7 business days</strong> after 
                inspection completion. The refund will be credited to your original payment method.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Refund Methods</h3>
                  <p>
                    Refunds will be processed to the same payment method used for the original purchase. Refund processing 
                    times vary by payment method:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Credit/Debit Cards: 5-10 business days</li>
                    <li>UPI: 3-5 business days</li>
                    <li>Net Banking: 5-7 business days</li>
                    <li>Wallets: 3-5 business days</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Refund Amount</h3>
                  <p>
                    The refund amount will include the product price paid, excluding:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Original shipping charges (unless return is due to our error)</li>
                    <li>Return shipping charges (for customer-initiated returns)</li>
                    <li>Any discounts or offers applied at the time of purchase</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Partial Refunds</h3>
                  <p>
                    If an item is returned in a condition that doesn't meet our return policy (minor wear, missing 
                    accessories, etc.), we may offer a partial refund. You will be notified before processing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exchange Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We currently do not offer direct exchanges. If you wish to exchange an item, please return the original 
                item for a refund and place a new order for the desired item.
              </p>
              <p>
                For defective or damaged items, we will replace them with the same product at no additional cost. 
                Replacement shipping will be free of charge.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Defective or Damaged Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you receive a defective or damaged item, please contact us immediately (within 48 hours of delivery) 
                with photos of the defect or damage. We will arrange for a replacement or full refund, including 
                return shipping costs.
              </p>
              <p>
                Please do not use or attempt to repair defective items, as this may void your return eligibility.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wrong Items Received</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you receive the wrong item, please contact us immediately. We will arrange for the correct item to 
                be shipped at no additional cost, and provide a prepaid return label for the incorrect item.
              </p>
              <p>
                You will not be charged for shipping in such cases, and we apologize for any inconvenience caused.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                You can cancel your order before it is shipped. To cancel, contact us with your order number. If the 
                order has not been processed, we will issue a full refund immediately.
              </p>
              <p>
                Once an order is shipped, it cannot be cancelled. You may return the item after receiving it, following 
                our standard return policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>For any questions about returns or refunds, please contact us:</p>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@handofinegifts.com" className="text-primary hover:underline">
                    info@handofinegifts.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+918867692183" className="text-primary hover:underline">
                    +91 8867692183
                  </a>
                </p>
                <p>
                  <strong>Address:</strong> First Floor, 222 Old No.87 Basement, Village Neb Sarai, 
                  New Delhi, South Delhi, Delhi, 110068
                </p>
              </div>
              <p className="mt-4">
                <strong>Business Hours:</strong> Monday - Saturday, 10:00 AM - 7:00 PM IST
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}


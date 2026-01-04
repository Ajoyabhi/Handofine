import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-shipping">
      <TopBar />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Shipping Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                At HandOFine, we are committed to delivering your premium scented candles and home decor products safely 
                and efficiently. This Shipping Policy outlines our shipping methods, delivery times, and related information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Methods and Carriers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We ship our products through reputable shipping partners including India Post, Delhivery, Blue Dart, and 
                other reliable courier services. The shipping method used will depend on your location and the weight of 
                your order.
              </p>
              <p>
                We use standard ground shipping for all orders within India. Express shipping options may be available 
                for select locations at checkout.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Costs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Free Shipping</h3>
                  <p>
                    We offer <strong>FREE SHIPPING</strong> on all orders above ₹999 within India. Orders below ₹999 
                    will incur a standard shipping charge of ₹75.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Shipping Charges</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Orders below ₹999: ₹75 (standard shipping)</li>
                    <li>Orders ₹999 and above: FREE shipping</li>
                    <li>Express shipping (if available): Additional charges apply</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processing Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                All orders are processed within <strong>1-2 business days</strong> (Monday through Friday, excluding 
                holidays) after payment confirmation. Orders placed on weekends or holidays will be processed on the next 
                business day.
              </p>
              <p>
                During peak seasons, festivals, or sale periods, processing times may extend to 3-5 business days. 
                You will be notified via email if there are any delays.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Timeframes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Metro Cities</h3>
                  <p>Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune: <strong>3-5 business days</strong></p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Tier 1 & Tier 2 Cities</h3>
                  <p>Most major cities: <strong>5-7 business days</strong></p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Tier 3 Cities & Remote Areas</h3>
                  <p>Smaller towns and remote locations: <strong>7-10 business days</strong></p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                <strong>Note:</strong> Delivery times are estimates and may vary based on courier service performance, 
                weather conditions, or other factors beyond our control. Delivery times are calculated from the date of 
                shipment, not the date of order.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Once your order is shipped, you will receive an email confirmation with a tracking number. You can use 
                this tracking number to monitor your shipment's progress on the courier's website.
              </p>
              <p>
                If you do not receive a tracking number within 3 business days of placing your order, please contact 
                us at{' '}
                <a href="mailto:info@handofinegifts.com" className="text-primary hover:underline">
                  info@handofinegifts.com
                </a>
                {' '}or call{' '}
                <a href="tel:+918867692183" className="text-primary hover:underline">
                  +91 8867692183
                </a>
                .
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Please ensure your shipping address is complete and accurate. We are not responsible for delays or 
                failed deliveries due to incorrect or incomplete addresses provided by the customer.
              </p>
              <p>
                If your order is returned to us due to an incorrect address, we will contact you to confirm the correct 
                address. Re-shipping charges may apply.
              </p>
              <p>
                We currently ship to addresses within India only. International shipping is not available at this time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Attempts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our courier partners typically make 2-3 delivery attempts. If delivery is unsuccessful after multiple 
                attempts, the package may be returned to the nearest courier facility. You will be notified and can 
                either:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Collect the package from the courier facility</li>
                <li>Schedule a re-delivery (charges may apply)</li>
                <li>Request a refund (if the package is returned to us)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Damaged or Lost Shipments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Damaged Packages</h3>
                  <p>
                    If your order arrives damaged, please contact us within 48 hours of delivery. Take photos of the 
                    damaged package and products, and we will arrange for a replacement or refund.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Lost Shipments</h3>
                  <p>
                    If your order does not arrive within the estimated delivery timeframe, please contact us. We will 
                    investigate with the courier partner and arrange for a replacement or refund if the package is confirmed 
                    as lost.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Holiday Shipping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                During festivals and holidays (Diwali, Christmas, New Year, etc.), shipping times may be extended due 
                to high order volumes and courier service delays. We recommend placing orders well in advance during 
                these periods.
              </p>
              <p>
                We will communicate any significant delays via email and provide updated delivery estimates.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multiple Items Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If your order contains multiple items, they may be shipped in separate packages if they are prepared 
                at different times. You will receive separate tracking numbers for each package. Shipping charges apply 
                once per order, not per item.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>If you have any questions about shipping, please contact us:</p>
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
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}


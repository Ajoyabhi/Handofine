import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-terms">
      <TopBar />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                By accessing or using the HandOFine website, you agree to be bound by these Terms of Service and all 
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from 
                using or accessing this site.
              </p>
              <p>
                The materials contained in this website are protected by applicable copyright and trademark law.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Permission is granted to temporarily download one copy of the materials on HandOFine's website for 
                personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, 
                and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
              <p>
                This license shall automatically terminate if you violate any of these restrictions and may be terminated 
                by HandOFine at any time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products and Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Product Descriptions</h3>
                  <p>
                    We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant 
                    that product descriptions or other content on this site is accurate, complete, reliable, current, 
                    or error-free.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Pricing</h3>
                  <p>
                    All prices are listed in Indian Rupees (INR) and are subject to change without notice. We reserve the 
                    right to modify prices at any time. If you are charged an incorrect price, we reserve the right to 
                    cancel your order and refund the amount charged.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Availability</h3>
                  <p>
                    We reserve the right to limit the quantity of items purchased per person, per household, or per order. 
                    We also reserve the right to discontinue any product at any time. All orders are subject to product 
                    availability.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders and Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Order Acceptance</h3>
                  <p>
                    Your order is an offer to purchase products from us. We reserve the right to accept or reject your 
                    order for any reason, including product availability, errors in pricing, or problems identified by 
                    our credit and fraud avoidance department.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Payment Terms</h3>
                  <p>
                    Payment must be received by us before we accept an order. We accept various payment methods as 
                    indicated on our checkout page. You represent and warrant that the payment information you provide 
                    is accurate and that you are authorized to use the payment method.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Order Confirmation</h3>
                  <p>
                    Upon receipt of your order, we will send you an email confirmation. This confirmation does not 
                    constitute acceptance of your order. We reserve the right to cancel your order at any time before 
                    shipment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping and Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Shipping terms, delivery times, and shipping costs are detailed in our Shipping Policy. We are not 
                responsible for delays caused by shipping carriers or customs clearance.
              </p>
              <p>
                Risk of loss and title for products purchased from HandOFine pass to you upon delivery to the carrier.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Returns and Refunds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our return and refund policy is detailed in our Returns Policy. By placing an order, you agree to our 
                return and refund terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you create an account on our website, you are responsible for maintaining the confidentiality of your 
                account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
              <p>
                We reserve the right to refuse service, terminate accounts, or remove or edit content at our sole discretion.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                The website and its original content, features, and functionality are owned by HandOFine and are protected 
                by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p>
                You may not use our trademarks, service marks, or logos without our prior written consent.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>You may not use our website:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To collect or track the personal information of others</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
                <li>To interfere with or circumvent the security features of the website</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                THE MATERIALS ON HANDOFINE'S WEBSITE ARE PROVIDED ON AN 'AS IS' BASIS. HANDOFINE MAKES NO WARRANTIES, 
                EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS AND NEGATES ALL OTHER WARRANTIES INCLUDING, WITHOUT LIMITATION, 
                IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT 
                OF INTELLECTUAL PROPERTY OR OTHER VIOLATION OF RIGHTS.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                In no event shall HandOFine or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the materials on HandOFine's website, even if HandOFine or a HandOFine authorized representative 
                has been notified orally or in writing of the possibility of such damage.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India and you 
                irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We reserve the right to revise these terms of service at any time without notice. By using this website, 
                you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>If you have any questions about these Terms of Service, please contact us:</p>
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


import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Shop from "@/pages/shop";
import Collections from "@/pages/collections";
import Collection from "@/pages/collection";
import NewArrivals from "@/pages/new-arrivals";
import Sale from "@/pages/sale";
import Checkout from "@/pages/checkout";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products";
import AdminCollections from "@/pages/admin/collections";
import AdminOrders from "@/pages/admin/orders";
import AdminBanners from "@/pages/admin/banners";
import PrivacyPolicy from "@/pages/privacy";
import TermsOfService from "@/pages/terms";
import ShippingPolicy from "@/pages/shipping";
import ReturnsPolicy from "@/pages/returns";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import FAQs from "@/pages/faqs";

function Router() {
  const [location] = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location}>
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/collections" component={Collections} />
          <Route path="/collections/:slug" component={Collection} />
          <Route path="/new-arrivals" component={NewArrivals} />
          <Route path="/sale" component={Sale} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/shipping" component={ShippingPolicy} />
          <Route path="/returns" component={ReturnsPolicy} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/faqs" component={FAQs} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/products" component={AdminProducts} />
          <Route path="/admin/collections" component={AdminCollections} />
          <Route path="/admin/orders" component={AdminOrders} />
          <Route path="/admin/banners" component={AdminBanners} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

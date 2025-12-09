import { useQuery } from "@tanstack/react-query";
import { Package, Layers, ShoppingCart, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "./layout";
import type { Product, Collection, Order, Banner } from "@shared/schema";

export default function AdminDashboard() {
  const { data: products = [] } = useQuery<Product[]>({ queryKey: ["/api/products"] });
  const { data: collections = [] } = useQuery<Collection[]>({ queryKey: ["/api/collections"] });
  const { data: orders = [] } = useQuery<Order[]>({ queryKey: ["/api/orders"] });
  const { data: banners = [] } = useQuery<Banner[]>({ queryKey: ["/api/banners"] });

  const stats = [
    { title: "Products", value: products.length, icon: Package, color: "text-blue-500" },
    { title: "Collections", value: collections.length, icon: Layers, color: "text-green-500" },
    { title: "Orders", value: orders.length, icon: ShoppingCart, color: "text-orange-500" },
    { title: "Banners", value: banners.length, icon: Image, color: "text-purple-500" },
  ];

  const recentOrders = orders.slice(0, 5);
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6" data-testid="page-admin-dashboard">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} data-testid={`stat-card-${stat.title.toLowerCase()}`}>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="font-medium">{orders.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending Orders</span>
                <span className="font-medium text-orange-500">{pendingOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="font-medium">Rs. {totalRevenue.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-sm">No orders yet</p>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{order.orderNumber}</span>
                      <span className="text-muted-foreground">{order.customerName}</span>
                      <span>Rs. {order.total.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

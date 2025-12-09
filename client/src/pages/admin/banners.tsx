import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import AdminLayout from "./layout";
import { insertBannerSchema, type Banner, type InsertBanner } from "@shared/schema";
import { z } from "zod";

const bannerFormSchema = insertBannerSchema.extend({
  sortOrder: z.coerce.number().int().min(0).optional(),
});

type BannerFormValues = z.infer<typeof bannerFormSchema>;

export default function AdminBanners() {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteBanner, setDeleteBanner] = useState<Banner | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      ctaText: "",
      ctaLink: "",
      image: "",
      type: "promotional",
      isActive: true,
      sortOrder: 0,
    },
  });

  useEffect(() => {
    if (editingBanner) {
      form.reset({
        title: editingBanner.title,
        subtitle: editingBanner.subtitle || "",
        ctaText: editingBanner.ctaText || "",
        ctaLink: editingBanner.ctaLink || "",
        image: editingBanner.image || "",
        type: editingBanner.type || "promotional",
        isActive: editingBanner.isActive ?? true,
        sortOrder: editingBanner.sortOrder ?? 0,
      });
    } else {
      form.reset({
        title: "",
        subtitle: "",
        ctaText: "",
        ctaLink: "",
        image: "",
        type: "promotional",
        isActive: true,
        sortOrder: 0,
      });
    }
  }, [editingBanner, form]);

  const { data: banners = [], isLoading } = useQuery<Banner[]>({
    queryKey: ["/api/banners"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertBanner) => apiRequest("POST", "/api/banners", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      setIsFormOpen(false);
      setEditingBanner(null);
      toast({ title: "Banner created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create banner", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertBanner> }) =>
      apiRequest("PUT", `/api/banners/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      setIsFormOpen(false);
      setEditingBanner(null);
      toast({ title: "Banner updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update banner", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/banners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      setDeleteBanner(null);
      toast({ title: "Banner deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete banner", variant: "destructive" });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      apiRequest("PUT", `/api/banners/${id}`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      toast({ title: "Banner visibility updated" });
    },
    onError: () => {
      toast({ title: "Failed to update banner", variant: "destructive" });
    },
  });

  const onSubmit = (data: BannerFormValues) => {
    const bannerData: InsertBanner = {
      ...data,
      subtitle: data.subtitle || null,
      ctaText: data.ctaText || null,
      ctaLink: data.ctaLink || null,
      image: data.image || null,
      sortOrder: data.sortOrder ?? 0,
    };

    if (editingBanner) {
      updateMutation.mutate({ id: editingBanner.id, data: bannerData });
    } else {
      createMutation.mutate(bannerData);
    }
  };

  const openEditForm = (banner: Banner) => {
    setEditingBanner(banner);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingBanner(null);
    setIsFormOpen(true);
  };

  const sortedBanners = [...banners].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  return (
    <AdminLayout title="Banners">
      <div className="space-y-4" data-testid="page-admin-banners">
        <div className="flex justify-end">
          <Button onClick={openCreateForm} data-testid="button-add-banner">
            <Plus className="h-4 w-4 mr-2" />
            Add Banner
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Banners ({banners.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : sortedBanners.length === 0 ? (
              <p className="text-muted-foreground">No banners found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preview</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBanners.map((banner) => (
                    <TableRow key={banner.id} data-testid={`row-banner-${banner.id}`}>
                      <TableCell>
                        {banner.image ? (
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className="h-12 w-24 object-cover rounded"
                          />
                        ) : (
                          <div className="h-12 w-24 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                            No img
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{banner.title}</div>
                          {banner.subtitle && (
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {banner.subtitle}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {banner.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{banner.sortOrder || 0}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActiveMutation.mutate({ id: banner.id, isActive: !banner.isActive })}
                          data-testid={`button-toggle-banner-${banner.id}`}
                        >
                          {banner.isActive ? (
                            <><Eye className="h-4 w-4 mr-1" /> Active</>
                          ) : (
                            <><EyeOff className="h-4 w-4 mr-1 text-muted-foreground" /> Hidden</>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditForm(banner)}
                            data-testid={`button-edit-banner-${banner.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteBanner(banner)}
                            data-testid={`button-delete-banner-${banner.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle data-testid="text-form-title">
                {editingBanner ? "Edit Banner" : "Add New Banner"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-banner-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} data-testid="input-banner-subtitle" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ctaText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Text</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} data-testid="input-banner-cta-text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ctaLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Link</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} data-testid="input-banner-cta-link" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} data-testid="input-banner-image" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select value={field.value || "promotional"} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger data-testid="select-banner-type">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hero">Hero</SelectItem>
                            <SelectItem value="promotional">Promotional</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sortOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort Order</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} data-testid="input-banner-sort-order" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value ?? true}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-banner-active"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Active (visible on site)</FormLabel>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} data-testid="button-cancel">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save-banner"
                  >
                    {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Banner"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deleteBanner} onOpenChange={() => setDeleteBanner(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Banner</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deleteBanner?.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteBanner && deleteMutation.mutate(deleteBanner.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-testid="button-confirm-delete"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}

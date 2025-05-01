import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  Blog,
  CreateBlogRequest,
  UpdateBlogRequest,
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/authContext";
import { Loader2, Plus, Pencil, Trash2, RefreshCw } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

// Predefined categories
const categories = [
  "Education",
  "Technology",
  "Health",
  "Environment",
  "Women Empowerment",
  "Rural Development",
  "Agriculture",
  "Social Impact",
  "Innovation",
  "Sustainability",
];

type FormData = Omit<CreateBlogRequest, 'seoKeywords' | 'tags'> & {
  seoKeywords: string;
  tags: string;
};

const AdminBlogs: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddBlogDialogOpen, setIsAddBlogDialogOpen] = useState(false);
  const [isEditBlogDialogOpen, setIsEditBlogDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [newBlog, setNewBlog] = useState<FormData>({
    title: "",
    category: "",
    content: "",
    status: "Draft",
    metaDescription: "",
    seoKeywords: "",
    tags: "",
    audioRequired: false,
    publishDate: new Date().toISOString(),
  });
  const [openCategory, setOpenCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);

  // Fetch blogs query
  const {
    data: blogsData,
    isLoading: isBlogsLoading,
    isError: isBlogsError,
    refetch: refetchBlogs,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  // Create blog mutation
  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast({
        title: "Blog created",
        description: "New blog has been successfully added",
      });
      setIsAddBlogDialogOpen(false);
      setNewBlog({
        title: "",
        category: "",
        content: "",
        status: "Draft",
        metaDescription: "",
        seoKeywords: "",
        tags: "",
        audioRequired: false,
        publishDate: new Date().toISOString(),
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating blog",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update blog mutation
  const updateBlogMutation = useMutation({
    mutationFn: ({ blogId, data }: { blogId: string; data: UpdateBlogRequest }) =>
      updateBlog(blogId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast({
        title: "Blog updated",
        description: "Blog has been successfully updated",
      });
      setIsEditBlogDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating blog",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete blog mutation
  const deleteBlogMutation = useMutation({
    mutationFn: (blogId: string) => deleteBlog(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast({
        title: "Blog deleted",
        description: "Blog has been successfully deleted",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting blog",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Filter blogs based on search term
  const filteredBlogs =
    blogsData?.blogs?.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.status.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleAddBlog = () => {
    const submitData: CreateBlogRequest = {
      ...newBlog,
      seoKeywords: newBlog.seoKeywords.split(',').map(item => item.trim()).filter(Boolean),
      tags: newBlog.tags.split(',').map(item => item.trim()).filter(Boolean),
    };
    createBlogMutation.mutate(submitData);
  };

  const handleUpdateBlog = (blogId: string, data: UpdateBlogRequest) => {
    const submitData: UpdateBlogRequest = {
      ...data,
      seoKeywords: typeof data.seoKeywords === 'string' 
        ? (data.seoKeywords as string).split(',').map((item: string) => item.trim()).filter(Boolean)
        : data.seoKeywords,
      tags: typeof data.tags === 'string'
        ? (data.tags as string).split(',').map((item: string) => item.trim()).filter(Boolean)
        : data.tags,
    };
    updateBlogMutation.mutate({ blogId, data: submitData });
  };

  const handleDeleteBlog = (blogId: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlogMutation.mutate(blogId);
    }
  };

  if (isBlogsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isBlogsError) {
    return <div>Error loading blogs</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Blog Management</CardTitle>
              <CardDescription>
                Manage your blog posts, create new ones, and update existing content.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => refetchBlogs()}
              disabled={isBlogsLoading}
            >
              <RefreshCw className={cn("h-4 w-4", isBlogsLoading && "animate-spin")} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Dialog open={isAddBlogDialogOpen} onOpenChange={setIsAddBlogDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Blog
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Blog</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddBlog} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={newBlog.title}
                      onChange={(e) =>
                        setNewBlog({ ...newBlog, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Popover open={openCategory} onOpenChange={setOpenCategory}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCategory}
                          className="w-full justify-between"
                        >
                          {newBlog.category || "Select category..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search category..." />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category}
                                value={category}
                                onSelect={() => {
                                  setNewBlog({ ...newBlog, category });
                                  setOpenCategory(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    newBlog.category === category ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {category}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      value={newBlog.content}
                      onChange={(e) =>
                        setNewBlog({ ...newBlog, content: e.target.value })
                      }
                      rows={8}
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={newBlog.status}
                      onValueChange={(value) =>
                        setNewBlog({ ...newBlog, status: value as Blog["status"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Review">Review</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Publish Date</Label>
                    <Input
                      type="datetime-local"
                      value={newBlog.publishDate?.split('.')[0]}
                      onChange={(e) =>
                        setNewBlog({ ...newBlog, publishDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Meta Description</Label>
                    <Textarea
                      value={newBlog.metaDescription}
                      onChange={(e) =>
                        setNewBlog({ ...newBlog, metaDescription: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoKeywords">SEO Keywords (comma-separated)</Label>
                    <Input
                      id="seoKeywords"
                      value={newBlog.seoKeywords}
                      onChange={(e) => setNewBlog({ ...newBlog, seoKeywords: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={newBlog.tags}
                      onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="audioRequired"
                      checked={newBlog.audioRequired}
                      onChange={(e) =>
                        setNewBlog({ ...newBlog, audioRequired: e.target.checked })
                      }
                    />
                    <Label htmlFor="audioRequired">Audio Required</Label>
                  </div>
                  <DialogFooter className="sticky bottom-0 bg-background pt-4">
                    <Button type="submit">Create Blog</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Read Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.category}</TableCell>
                  <TableCell>
                    <Select
                      value={blog.status}
                      onValueChange={(value) =>
                        handleUpdateBlog(blog._id, { status: value as Blog["status"] })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Review">Review</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{blog.estimatedReadTime}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedBlog(blog);
                          setIsEditBlogDialogOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBlog(blog._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditBlogDialogOpen} onOpenChange={setIsEditBlogDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
          </DialogHeader>
          {selectedBlog && (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateBlog(selectedBlog._id, {
                title: selectedBlog.title,
                category: selectedBlog.category,
                content: selectedBlog.content,
                status: selectedBlog.status,
                metaDescription: selectedBlog.metaDescription,
                seoKeywords: selectedBlog.seoKeywords,
                tags: selectedBlog.tags,
                audioRequired: selectedBlog.audioRequired,
                publishDate: selectedBlog.publishDate,
              });
            }} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={selectedBlog.title}
                  onChange={(e) =>
                    setSelectedBlog({ ...selectedBlog, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Category</Label>
                <Popover open={openEditCategory} onOpenChange={setOpenEditCategory}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openEditCategory}
                      className="w-full justify-between"
                    >
                      {selectedBlog.category || "Select category..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category}
                            value={category}
                            onSelect={() => {
                              setSelectedBlog({ ...selectedBlog, category });
                              setOpenEditCategory(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedBlog.category === category ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Content</Label>
                <Textarea
                  value={selectedBlog.content}
                  onChange={(e) =>
                    setSelectedBlog({ ...selectedBlog, content: e.target.value })
                  }
                  rows={8}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={selectedBlog.status}
                  onValueChange={(value) =>
                    setSelectedBlog({
                      ...selectedBlog,
                      status: value as Blog["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Publish Date</Label>
                <Input
                  type="datetime-local"
                  value={selectedBlog.publishDate?.split('.')[0]}
                  onChange={(e) =>
                    setSelectedBlog({ ...selectedBlog, publishDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea
                  value={selectedBlog.metaDescription}
                  onChange={(e) =>
                    setSelectedBlog({
                      ...selectedBlog,
                      metaDescription: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>SEO Keywords (comma-separated)</Label>
                <Input
                  value={selectedBlog.seoKeywords?.join(", ")}
                  onChange={(e) =>
                    setSelectedBlog({
                      ...selectedBlog,
                      seoKeywords: e.target.value.split(",").map((k) => k.trim()),
                    })
                  }
                />
              </div>
      <div>
                <Label>Tags (comma-separated)</Label>
                <Input
                  value={selectedBlog.tags?.join(", ")}
                  onChange={(e) =>
                    setSelectedBlog({
                      ...selectedBlog,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="editAudioRequired"
                  checked={selectedBlog.audioRequired}
                  onChange={(e) =>
                    setSelectedBlog({ ...selectedBlog, audioRequired: e.target.checked })
                  }
                />
                <Label htmlFor="editAudioRequired">Audio Required</Label>
              </div>
              <DialogFooter className="sticky bottom-0 bg-background pt-4">
                <Button type="submit">Update Blog</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      </div>
    );
  };

export default AdminBlogs; 
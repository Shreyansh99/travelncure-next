"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Bold,
  Italic,
  Underline,
  Image,
  List,
  Link,
  Code,
  Undo2,
  Redo2,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader2,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Constants ---
const INITIAL_FORMAT = {
  bold: false,
  italic: false,
  underline: false,
  heading: "normal",
  list: false,
  image: false,
  color: "#000000", // Default to black
  link: false,
  code: false,
};

const HEADING_OPTIONS = [
  { label: "Normal", value: "normal" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
];

// --- Helper Functions ---
const applyFormat = (content, format, selectionStart, selectionEnd) => {
  if (selectionStart === selectionEnd) {
    return { newContent: content, newFormat: { ...INITIAL_FORMAT, ...format } };
  }

  const newFormat = { ...INITIAL_FORMAT, ...format };
  const selectedText = content.substring(selectionStart, selectionEnd);
  let formattedText = selectedText;

  if (newFormat.bold) {
    formattedText = `<strong>${formattedText}</strong>`;
  }
  if (newFormat.italic) {
    formattedText = `<em>${formattedText}</em>`;
  }
  if (newFormat.underline) {
    formattedText = `<ins>${formattedText}</ins>`;
  }
  if (newFormat.heading === "h1") {
    formattedText = `<h1>${formattedText}</h1>`;
  } else if (newFormat.heading === "h2") {
    formattedText = `<h2>${formattedText}</h2>`;
  }
  if (newFormat.list) {
    formattedText = `<ul><li>${formattedText}</li></ul>`;
  }
  if (newFormat.code) {
    formattedText = `<code>${formattedText}</code>`;
  }
  if (newFormat.color) {
    formattedText = `<span style="color: ${newFormat.color}">${formattedText}</span>`;
  }
  if (newFormat.link) {
    const url = prompt("Enter the URL:"); // Basic prompt for demo
    if (url) {
      formattedText = `<a href="${url}" target="_blank" rel="noopener noreferrer">${formattedText}</a>`;
    }
  }

  const newContent =
    content.substring(0, selectionStart) +
    formattedText +
    content.substring(selectionEnd);

  return { newContent, newFormat };
};

const AdminWriteBlogsPage = () => {
  const [content, setContent] = useState("");
  const [format, setFormat] = useState(INITIAL_FORMAT);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [title, setTitle] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [status, setStatus] = useState("draft");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [error, setError] = useState(null);
  const editorRef = useRef(null);
  const [history, setHistory] = useState([""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // --- Refs ---
  const titleInputRef = useRef(null);

  // --- Effects ---
  // Focus title input on component mount
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  // --- Editor Handlers ---
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setSelection({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
    // Update history, but only if it's a new change
    if (history[historyIndex] !== newContent) {
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory([...newHistory, newContent]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleSelectionChange = (e) => {
    setSelection({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
  };

  const applyFormatting = useCallback(
    (formatChange) => {
      if (editorRef.current) {
        const { newContent, newFormat } = applyFormat(
          content,
          formatChange,
          selection.start,
          selection.end
        );
        setContent(newContent);
        setFormat(newFormat);
        // Restore selection after applying format.
        //  use a timeout to allow the DOM to update.
        setTimeout(() => {
          editorRef.current?.focus();
          editorRef.current?.setSelectionRange(selection.start, selection.end);
        }, 0);
      }
    },
    [content, format, selection.start, selection.end]
  );

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setContent(history[historyIndex - 1]);
      // Restore cursor position.  Difficult to do perfectly.
      setTimeout(() => {
        editorRef.current?.focus();
      }, 0);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setContent(history[historyIndex + 1]);
      setTimeout(() => {
        editorRef.current?.focus();
      }, 0);
    }
  };

  // --- Blog Management ---
  const handleSaveBlog = async () => {
    if (!title.trim()) {
      setError("Please enter a title for your blog.");
      return;
    }
    setIsSaving(true);
    setSaveMessage("Saving...");
    setError(null);

    try {
      const newBlog = {
        id: currentBlog?.id || `blog-${Date.now()}`, // Simple ID generation
        title: title.trim(),
        content,
        createdAt: currentBlog?.createdAt || Date.now(),
        updatedAt: Date.now(),
        status,
      };

      // Simulate API call (replace with actual API call when ready)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saved Blog:", newBlog); // Log the saved blog

      if (currentBlog) {
        // Update existing blog
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) => (b.id === newBlog.id ? newBlog : b))
        );
      } else {
        // Add new blog
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      }

      setCurrentBlog(newBlog); // Update current blog
      setSaveMessage("Blog saved successfully!");
      // Clear message after a few seconds
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to save blog.");
      setSaveMessage("Failed to save blog!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = (blogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    if (currentBlog?.id === blogId) {
      setCurrentBlog(null); // Clear editor if current blog is deleted
      setTitle("");
      setContent("");
      setStatus("draft");
    }
  };

  const handleCreateNew = () => {
    setCurrentBlog(null);
    setTitle("");
    setContent("");
    setStatus("draft");
    setFormat(INITIAL_FORMAT); // Reset formatting
    setHistory([""]);
    setHistoryIndex(0);
    titleInputRef.current?.focus();
  };

  const handleLoadBlog = (blog) => {
    setCurrentBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setStatus(blog.status);
    setFormat(INITIAL_FORMAT); //  Reset format.
    setHistory([blog.content]);
    setHistoryIndex(0);
    titleInputRef.current?.focus();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FileText className="h-6 w-6 text-gray-700" /> Write Blogs
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor Area */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Title</CardTitle>
              <CardDescription>
                Enter the title of your blog post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                ref={titleInputRef}
                type="text"
                placeholder="Enter blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-4"
              />

              <div className="flex flex-wrap gap-2 mb-4">
                <Button
                  variant={format.bold ? "secondary" : "outline"}
                  onClick={() => applyFormatting({ bold: !format.bold })}
                  className="h-8"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant={format.italic ? "secondary" : "outline"}
                  onClick={() => applyFormatting({ italic: !format.italic })}
                  className="h-8"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant={format.underline ? "secondary" : "outline"}
                  onClick={() =>
                    applyFormatting({ underline: !format.underline })
                  }
                  className="h-8"
                  title="Underline"
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <Select
                  value={format.heading}
                  onValueChange={(value) => applyFormatting({ heading: value })}
                >
                  <SelectTrigger className="w-[180px] h-8" title="Heading">
                    <SelectValue placeholder="Heading" />
                  </SelectTrigger>
                  <SelectContent>
                    {HEADING_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant={format.list ? "secondary" : "outline"}
                  onClick={() => applyFormatting({ list: !format.list })}
                  className="h-8"
                  title="List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => applyFormatting({ image: true })}
                  className="h-8"
                  title="Image"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => applyFormatting({ link: true })}
                  className="h-8"
                  title="Link"
                >
                  <Link className="h-4 w-4" />
                </Button>
                <Button
                  variant={format.code ? "secondary" : "outline"}
                  onClick={() => applyFormatting({ code: !format.code })}
                  className="h-8"
                  title="Code"
                >
                  <Code className="h-4 w-4" />
                </Button>
                <Input
                  type="color"
                  value={format.color}
                  onChange={(e) => applyFormatting({ color: e.target.value })}
                  className="h-8 w-8 p-0"
                  title="Color"
                />
                <Button onClick={handleUndo} className="h-8" title="Undo">
                  <Undo2 className="h-4 w-4" />
                </Button>
                <Button onClick={handleRedo} className="h-8" title="Redo">
                  <Redo2 className="h-4 w-4" />
                </Button>
              </div>

              <Textarea
                ref={editorRef}
                value={content}
                onChange={handleContentChange}
                onSelect={handleSelectionChange}
                className="min-h-[300px] w-full resize-y"
                placeholder="Write your blog content here..."
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Select
                onValueChange={(value) => setStatus(value)}
                value={status}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleSaveBlog}
                disabled={isSaving}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          {saveMessage && (
            <div
              className={cn(
                "mt-4 p-3 rounded-md border",
                saveMessage.startsWith("Failed")
                  ? "bg-red-100 text-red-800 border-red-400"
                  : "bg-green-100 text-green-800 border-green-400 flex items-center gap-2"
              )}
            >
              {saveMessage.startsWith("Failed") ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              {saveMessage}
            </div>
          )}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Blog Management Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Blogs</CardTitle>
              <CardDescription>
                View, edit, and delete existing blogs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCreateNew}
              >
                Create New Blog
              </Button>
              <div className="space-y-2">
                <h4 className="font-semibold">Existing Blogs:</h4>
                {blogs.length === 0 ? (
                  <div className="text-gray-500 italic">No blogs yet.</div>
                ) : (
                  <div className="space-y-1">
                    {blogs.map((blog) => (
                      <div
                        key={blog.id}
                        className={cn(
                          "p-2 rounded-md cursor-pointer hover:bg-gray-100 flex items-center justify-between",
                          currentBlog?.id === blog.id && "bg-gray-100" // Highlight selected
                        )}
                        onClick={() => handleLoadBlog(blog)}
                      >
                        <span className="truncate">{blog.title}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent loading blog
                            handleDeleteBlog(blog.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminWriteBlogsPage;

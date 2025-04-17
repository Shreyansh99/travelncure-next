"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  User,
  Users,
  Mail,
  Phone,
  Calendar,
  Trash2,
  Edit,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminRegisteredUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editUserMode, setEditUserMode] = useState("view");
  const [editedUser, setEditedUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatusMessage, setUpdateStatusMessage] = useState("");

  // Dummy user data for demonstration and testing.  Replace with actual API calls.
  // const generateDummyUsers = (count) => {
  //   const statuses = ["active", "inactive", "pending"];
  //   const users = [];
  //   for (let i = 1; i <= count; i++) {
  //     users.push({
  //       id: `user-${i}`,
  //       name: `User ${i}`,
  //       email: `user${i}@example.com`,
  //       phone: `+1-555-${1000 + i}`,
  //       dob: `${Math.floor(Math.random() * 30) + 1}-${
  //         Math.floor(Math.random() * 12) + 1
  //       }-${1990 + Math.floor(Math.random() * 10)}`,
  //       profilePicture: `https://randomuser.me/api/portraits/men/${i}.jpg`,
  //       status: statuses[Math.floor(Math.random() * statuses.length)],
  //     });
  //   }
  //   return users;
  // };

  // Simulate fetching user data from an API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Replace this with your actual API call
        // const response = await fetch('/api/admin/users');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch users');
        // }
        // const data = await response.json();
        // setUsers(data);

        // Use dummy data from a JSON file (simulated)
        const response = await fetch("/users.json"); //  <--  Important:  Create a users.json file
        if (!response.ok) {
          throw new Error("Failed to fetch users from JSON file.");
        }
        const data = await response.json();
        setUsers(data);

        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setEditUserMode("view"); // Start in view mode
    setEditedUser(user); // Initialize editedUser with the selected user's data
    setUpdateStatusMessage("");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = async (userId) => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real app, you'd call your delete API endpoint:
      // await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });

      // Update the UI
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setSelectedUser(null); // Clear selected user after deletion
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
      // Optionally set an error message to display to the user
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditUser = () => {
    if (selectedUser) {
      setEditUserMode("edit");
    }
  };

  const handleCancelEdit = () => {
    setEditUserMode("view");
    setEditedUser(selectedUser); // Reset editedUser to the original selectedUser
    setUpdateStatusMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleUpdateUser = async () => {
    if (!editedUser) return;

    setIsUpdating(true);
    setUpdateStatusMessage("Updating user...");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would send a PUT or PATCH request
      // await fetch(`/api/admin/users/${editedUser.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editedUser),
      // });

      // Update the user in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
      );
      setSelectedUser(editedUser); // Update selected user details
      setEditUserMode("view");
      setUpdateStatusMessage("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      setUpdateStatusMessage("Failed to update user.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Users className="h-6 w-6 text-gray-700" /> Registered Users
      </h1>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User List Table */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>User List</CardTitle>
              <CardDescription>
                View and manage registered users
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredUsers.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        whileHover={{
                          backgroundColor: "#f7fafc",
                          cursor: "pointer",
                        }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleUserClick(user)}
                      >
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "success"
                                : user.status === "inactive"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* User Details Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>User Details</CardTitle>
              <CardDescription>
                {selectedUser
                  ? "Information about the selected user"
                  : "Select a user to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedUser ? (
                <>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={selectedUser.profilePicture}
                        alt={selectedUser.name}
                      />
                      <AvatarFallback>
                        {selectedUser.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-lg">
                        {selectedUser.name}
                      </div>
                      <div className="text-sm text-gray-500">Patient</div>
                    </div>
                  </div>
                  {editUserMode === "view" ? (
                    <>
                      <div className="space-y-2">
                        <div className="font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-600" /> Email:
                        </div>
                        <div className="text-gray-700">
                          {selectedUser.email}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-600" /> Phone:
                        </div>
                        <div className="text-gray-700">
                          {selectedUser.phone}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" /> Date of
                          Birth:
                        </div>
                        <div className="text-gray-700">{selectedUser.dob}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-600" /> Status:
                        </div>
                        <Badge
                          variant={
                            selectedUser.status === "active"
                              ? "success"
                              : selectedUser.status === "inactive"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {selectedUser.status}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="edit-name" className="font-medium">
                          Name
                        </Label>
                        <Input
                          id="edit-name"
                          name="name"
                          value={editedUser?.name || ""}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email" className="font-medium">
                          Email
                        </Label>
                        <Input
                          id="edit-email"
                          name="email"
                          type="email"
                          value={editedUser?.email || ""}
                          onChange={handleInputChange}
                          className="mt-1 text-gray-500 bg-gray-100"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-phone" className="font-medium">
                          Phone
                        </Label>
                        <Input
                          id="edit-phone"
                          name="phone"
                          value={editedUser?.phone || ""}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-dob" className="font-medium">
                          Date of Birth
                        </Label>
                        <Input
                          id="edit-dob"
                          name="dob"
                          value={editedUser?.dob || ""}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-status" className="font-medium">
                          Status
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleInputChange({
                              target: { name: "status", value },
                            })
                          }
                          value={editedUser?.status}
                        >
                          <SelectTrigger
                            className="mt-1 w-full"
                            id="edit-status"
                          >
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-gray-500 italic">No user selected.</div>
              )}
              {updateStatusMessage && (
                <div
                  className={cn(
                    "mt-4 p-3 rounded-md border",
                    updateStatusMessage.startsWith("Failed")
                      ? "bg-red-100 text-red-800 border-red-400"
                      : "bg-green-100 text-green-800 border-green-400 flex items-center gap-2"
                  )}
                >
                  {updateStatusMessage.startsWith("Failed") ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  {updateStatusMessage}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {selectedUser && (
                <>
                  <AlertDialog
                    open={deleteConfirmationOpen}
                    onOpenChange={setDeleteConfirmationOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        disabled={isDeleting}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        {isDeleting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete user: <b>{selectedUser.name}</b> and all their
                          data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            if (selectedUser) {
                              handleDeleteUser(selectedUser.id);
                            }
                          }}
                          disabled={isDeleting}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            "Delete"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {editUserMode === "view" ? (
                    <Button
                      onClick={handleEditUser}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleUpdateUser}
                        disabled={isUpdating}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </>
                  )}
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminRegisteredUsersPage;

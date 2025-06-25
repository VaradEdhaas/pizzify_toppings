"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import apiService from "@/helper/apiService"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "react-toastify"
import { SignupForm } from "@/components/premium-signup-form"
import type { User } from "@/helper/constantProperties"

type UserFormValues = {
  fullname: string
  email: string
  password?: string
  phone: string
  address: string
  city: string
  zipcode: string
  marketing: boolean
}

const Userpage = () => {
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const queryClient = useQueryClient()

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["all-users"],
    queryFn: apiService.getAllUsers,
  })

  const updateUserMutation = useMutation<
    unknown,
    unknown,
    { id: string; userData: Partial<User> }
  >({
    mutationFn: ({ id, userData }) => apiService.updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] })
      toast.success("User updated successfully")
      setIsDialogOpen(false)
      setSelectedUser(null)
    },
    onError: (error) => {
      toast.error("Failed to update user")
      console.error(error)
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  const filteredUsers = users.filter((user) =>
    user.fullname?.toLowerCase().includes(search.toLowerCase())
  )

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const handleUpdateSubmit = async (
    values: UserFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!selectedUser) return
    try {
      await updateUserMutation.mutateAsync({
        id: selectedUser._id,
        userData: {
          fullname: values.fullname,
          email: values.email,
          password: values.password,
          phone: values.phone,
          address: values.address,
          city: values.city,
          zipcode: values.zipcode,
          role: selectedUser.role,
        },
      })
      resetForm()
    } catch (error) {
      console.error("Update failed:", error)
    }
  }

  return (
    <div className="p-6 space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold">Manage Users</h1>
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 h-12 pr-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-white placeholder-white/40"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card className="bg-white/5 border border-white/10 backdrop-blur-md shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-white">Total Users</CardTitle>
            <span className="text-xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-400">{users.length}</div>
            <p className="text-sm text-white/60 mt-1">All registered users</p>
          </CardContent>
        </Card>

        {/* New Users */}
        <Card className="bg-white/5 border border-white/10 backdrop-blur-md shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-white">New Users</CardTitle>
            <span className="text-xl">🆕</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-400">{users.slice(-7).length}</div>
            <p className="text-sm text-white/60 mt-1">Joined in last 7 days</p>
          </CardContent>
        </Card>

        {/* Admins */}
        <Card className="bg-white/5 border border-white/10 backdrop-blur-md shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-white">Admins</CardTitle>
            <span className="text-xl">🛡️</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              {users.filter((u) => u.role === "admin").length}
            </div>
            <p className="text-sm text-white/60 mt-1">Users with admin rights</p>
          </CardContent>
        </Card>

        {/* Guests */}
        <Card className="bg-white/5 border border-white/10 backdrop-blur-md shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-white">Guests</CardTitle>
            <span className="text-xl">🎫</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-400">
              {users.filter((u) => u.role !== "admin").length}
            </div>
            <p className="text-sm text-white/60 mt-1">Non-admin users</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl overflow-x-auto shadow-md">
        <Table className="min-w-full divide-y divide-white/10">
          <TableHeader>
            <TableRow className="bg-white/10">
              {["Name", "Email", "Phone", "City", "Address", "Zipcode", "Role", "Actions"].map(
                (heading) => (
                  <TableHead
                    key={heading}
                    className="px-6 py-3 text-left text-sm font-semibold text-white"
                  >
                    {heading}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user._id}
                className="hover:bg-white/5 transition duration-200 border-b border-white/5"
              >
                <TableCell className="px-6 py-4">{user.fullname}</TableCell>
                <TableCell className="px-6 py-4">{user.email}</TableCell>
                <TableCell className="px-6 py-4">{user.phone || "-"}</TableCell>
                <TableCell className="px-6 py-4">{user.city || "-"}</TableCell>
                <TableCell className="px-6 py-4">{user.address || "-"}</TableCell>
                <TableCell className="px-6 py-4">{user.zipcode || "-"}</TableCell>
                <TableCell className="px-6 py-4 capitalize">{user.role}</TableCell>
                <TableCell className="px-6 py-4 flex gap-2">
                  <Dialog
                    open={isDialogOpen && selectedUser?._id === user._id}
                    onOpenChange={(open) => {
                      setIsDialogOpen(open)
                      if (!open) setSelectedUser(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="1"
                        variant="ghost"
                        className="text-white/80 hover:text-white"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-900 text-white p-6 rounded-xl shadow-xl max-w-2xl w-full">
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>
                      <SignupForm
                        initialValues={{
                          fullname: selectedUser?.fullname || "",
                          email: selectedUser?.email || "",
                          password: selectedUser?.password?.toString() || "",
                          phone: selectedUser?.phone || "",
                          address: selectedUser?.address || "",
                          city: selectedUser?.city || "",
                          zipcode: selectedUser?.zipcode || "",
                          marketing: false,
                        }}
                        onSubmit={handleUpdateSubmit}
                        isUpdateMode
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="1"
                    variant="destructive"
                    onClick={() => setDeleteUserId(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
          <DialogContent className="bg-neutral-900 text-white p-6 rounded-xl shadow-xl max-w-md w-full">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end gap-4">
              <Button variant="ghost" onClick={() => setDeleteUserId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (deleteUserId) {
                    deleteUserMutation.mutate(deleteUserId);
                    setDeleteUserId(null);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Userpage
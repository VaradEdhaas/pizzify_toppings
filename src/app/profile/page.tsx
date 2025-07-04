"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Check, X } from "lucide-react";
import { DynamicBackgroundWrapper } from "@/components/layout/DynamicBackgroundWrapper";
import { getInitial } from "@/helper/helperFunction";
import apiService from "@/helper/apiService";
import { User } from "@/helper/constantProperties";

const ProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const router = useRouter();
    const userId = currentUser?.user?._id;

    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<Partial<User>>({});
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;
            try {
                const data = await apiService.getUserById(userId);
                setUser(data);
                setFormData({
                    fullname: data.fullname,
                    email: data.email,
                    phone: data.phone || "",
                    address: data.address || "",
                    city: data.city || "",
                    zipcode: data.zipcode || "",
                });
            } catch (err: any) {
                toast.error("Failed to fetch user data");
                if (err.response?.status === 401) {
                    logout();
                    router.push("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;
        setIsUpdating(true);

        try {
            const updated = await apiService.updateUser(userId, formData);
            setUser(updated);
            setEditMode(false);
            toast.success("Profile updated");

            localStorage.setItem(
                "currentUser",
                JSON.stringify({ ...currentUser, user: { ...currentUser?.user, ...updated } })
            );
        } catch (err: any) {
            toast.error("Update failed");
        } finally {
            setIsUpdating(false);
        }
    };

    if (!mounted || loading) {
        return (
            <DynamicBackgroundWrapper>
                <div className="max-w-4xl mx-auto p-6 min-h-screen text-white">
                    <Skeleton className="w-32 h-32 rounded-full mb-4" />
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 rounded-md mb-3" />
                    ))}
                </div>
            </DynamicBackgroundWrapper>
        );
    }

    if (!user) {
        return (
            <DynamicBackgroundWrapper>
                <div className="flex justify-center items-center min-h-screen text-white text-lg">
                    User not found
                </div>
            </DynamicBackgroundWrapper>
        );
    }

    return (
        <DynamicBackgroundWrapper>
            <div className="w-full max-w-4xl mx-auto px-6 py-10 text-white space-y-6 mt-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-20 h-20 border border-white/20">
                            <AvatarFallback className="bg-zinc-800 text-2xl font-bold">
                                {getInitial(user.fullname)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold">{user.fullname}</h2>
                            <p className="text-white/60">{user.email}</p>
                        </div>
                    </div>
                    <div>
                        {editMode ? (
                            <div className="flex gap-2">
                                <Button
                                    size="2"
                                    variant="outline"
                                    className="text-white"
                                    onClick={() => setEditMode(false)}
                                >
                                    <X className="w-4 h-4 mr-1" /> Cancel
                                </Button>
                                <Button
                                    size="2"
                                    className="bg-emerald-600"
                                    onClick={handleSubmit}
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? "Saving..." : <><Check className="w-4 h-4 mr-1" /> Save</>}
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="2"
                                variant="outline"
                                className="text-white"
                                onClick={() => setEditMode(true)}
                            >
                                <Pencil className="w-4 h-4 mr-1" /> Edit Profile
                            </Button>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card className="bg-zinc-900 border border-white/10 rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-lg">Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <InputField label="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} editable={editMode} required />
                            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} editable={editMode} required />
                        </CardContent>
                    </Card>

                    {/* Contact & Address */}
                    <Card className="bg-zinc-900 border border-white/10 rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-lg">Contact & Address</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} editable={editMode} />
                            <InputField label="Address" name="address" value={formData.address} onChange={handleChange} editable={editMode} />
                            <InputField label="City" name="city" value={formData.city} onChange={handleChange} editable={editMode} />
                            <InputField label="Zip Code" name="zipcode" value={formData.zipcode} onChange={handleChange} editable={editMode} />
                        </CardContent>
                    </Card>

                    {/* Account Settings Placeholder (future section) */}
                    <Card className="bg-zinc-900 border border-white/10 rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-lg">Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-white/60">More settings coming soon...</p>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </DynamicBackgroundWrapper>
    );
};

export default ProfilePage;

// Reusable Input Field Component
const InputField = ({
    label,
    name,
    value,
    onChange,
    editable,
    type = "text",
    required = false,
}: {
    label: string;
    name: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editable: boolean;
    type?: string;
    required?: boolean;
}) => (
    <div>
        <label className="block text-sm text-white/80 mb-1">{label}</label>
        {editable ? (
            <Input
                name={name}
                value={value || ""}
                onChange={onChange}
                type={type}
                required={required}
                className="bg-zinc-800 text-white"
            />
        ) : (
            <div className="bg-zinc-800 p-2 rounded-md border border-transparent">
                {value || "Not provided"}
            </div>
        )}
    </div>
);

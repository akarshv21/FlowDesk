import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import {
  useChangePassword,
  useUpdateUserProfile,
  useUserProfileQuery,
} from "@/hooks/use-user";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required",
    }),
    newPassword: z.string().min(8, {
      message: "New password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Please confirm your new password",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const profileSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  profilePicture: z.string().optional(),
  tagline: z
    .string()
    .max(120, "Tagline must be 120 characters or less")
    .optional(),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
});

const getInitial = (name?: string | null) => {
  const trimmedName = name?.trim();

  if (!trimmedName) {
    return "?";
  }

  return trimmedName.charAt(0).toUpperCase();
};

const Profile = () => {
  const { data: user, isPending } = useUserProfileQuery() as {
    data: {
      name?: string;
      email?: string;
      profilePicture?: string;
      tagline?: string;
      bio?: string;
    };
    isPending: boolean;
  };

  const navigate = useNavigate();

  const [savedName, setSavedName] = useState("");

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      profilePicture: "",
      tagline: "",
      bio: "",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    profileForm.reset({
      name: user.name || "",
      profilePicture: user.profilePicture || "",
      tagline: user.tagline || "",
      bio: user.bio || "",
    });

    setSavedName(user.name || "");
  }, [user, profileForm]);

  const watchedName = profileForm.watch("name");

  const displayName =
    watchedName?.trim() || savedName || user?.name || "";

  const {
    mutate: updateUserProfile,
    isPending: isUpdatingProfile,
  } = useUpdateUserProfile();

  const {
    mutate: changePassword,
    isPending: isChangingPassword,
    error,
  } = useChangePassword();

  const handleProfileFormSubmit = (values: {
    name: string;
    profilePicture?: string;
    tagline?: string;
    bio?: string;
  }) => {
    const nextName = values.name.trim();
    const nextTagline = values.tagline?.trim() || "";
    const nextBio = values.bio?.trim() || "";

    updateUserProfile(
      {
        name: nextName,
        tagline: nextTagline,
        bio: nextBio,
        profilePicture: user?.profilePicture || "",
      },
      {
        onSuccess: () => {
          setSavedName(nextName);

          localStorage.setItem(
            "flowdeskProfile",
            JSON.stringify({
              name: nextName,
              profilePicture: user?.profilePicture || "",
            })
          );

          window.dispatchEvent(
            new CustomEvent("flowdesk-profile-updated", {
              detail: {
                name: nextName,
                profilePicture: user?.profilePicture || "",
              },
            })
          );

          toast.success("Profile updated successfully");
        },

        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.error ||
            "Failed to update profile";

          toast.error(errorMessage);
        },
      }
    );
  };

  const handlePasswordChange = (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    changePassword(values, {
      onSuccess: () => {
        toast.success(
          "Password updated successfully. You will be logged out. Please login again."
        );

        passwordForm.reset();

        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
      },

      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.error ||
          "Failed to update password";

        toast.error(errorMessage);
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-5 -ml-2 h-9 gap-2 px-2.5 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Button>

        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600">
          Account
        </p>

        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-[30px]">
          Profile
        </h1>

        <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
          Manage your personal information and keep your account secure.
        </p>
      </div>

      {/* Profile identity */}
      <section className="overflow-hidden rounded-[22px] border border-[#E5E1D8] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
        <div className="h-1.5 bg-blue-600" />

        <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:px-7 sm:py-7">
          <div className="flex size-[68px] shrink-0 items-center justify-center rounded-[18px] bg-slate-950 text-xl font-semibold text-white">
            {getInitial(displayName)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-xl font-semibold tracking-tight text-slate-950">
                {displayName || "Your name"}
              </h2>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            <div className="mt-1.5 flex min-w-0 items-center gap-2 text-sm text-slate-500">
              <Mail className="size-4 shrink-0 text-slate-400" />
              <span className="truncate">
                {user?.email || "No email"}
              </span>
            </div>

            {user?.tagline && (
              <p className="mt-2 max-w-2xl truncate text-sm text-slate-500">
                {user.tagline}
              </p>
            )}
          </div>

          <div className="hidden shrink-0 border-l border-slate-100 pl-7 sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Account
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              Flowdesk member
            </p>
          </div>
        </div>
      </section>

      {/* Personal information + Security */}
      <div className="mt-8 grid items-start gap-7 lg:grid-cols-2">
        {/* Personal information */}
        <section>
          <div className="mb-3.5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <UserRound className="size-4" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Personal information
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Information associated with your Flowdesk account.
                </p>
              </div>
            </div>
          </div>

          <Card className="rounded-2xl border-[#E5E1D8] shadow-none">
            <CardContent className="p-5 sm:p-6">
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(
                    handleProfileFormSubmit
                  )}
                  className="space-y-5"
                >
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your name"
                            className="h-11 border-slate-200 bg-white text-sm focus-visible:border-blue-400 focus-visible:ring-4 focus-visible:ring-blue-50"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Email address</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                        <Input
                          value={user?.email || ""}
                          disabled
                          className="h-11 bg-slate-50 pl-10 text-sm text-slate-500"
                        />
                      </div>
                    </FormControl>

                    <p className="text-xs text-slate-400">
                      Your email address is used for account authentication.
                    </p>
                  </FormItem>

                  <FormField
                    control={profileForm.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-3">
                          <FormLabel>Tagline</FormLabel>

                          <span className="text-[11px] text-slate-400">
                            Optional
                          </span>
                        </div>

                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g. Building better workflows"
                            className="h-11 border-slate-200 bg-white text-sm focus-visible:border-blue-400 focus-visible:ring-4 focus-visible:ring-blue-50"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-3">
                          <FormLabel>Bio</FormLabel>

                          <span className="text-[11px] text-slate-400">
                            Optional
                          </span>
                        </div>

                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Tell your teammates a little about yourself..."
                            className="min-h-[108px] resize-none border-slate-200 bg-white text-sm focus-visible:border-blue-400 focus-visible:ring-4 focus-visible:ring-blue-50"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="bg-slate-100" />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-400">
                      Keep only the information you want to share.
                    </p>

                    <Button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="w-full sm:w-auto"
                    >
                      {isUpdatingProfile ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>

        {/* Security */}
        <section>
          <div className="mb-3.5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <ShieldCheck className="size-4" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Security
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Manage the password used to access your account.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <Alert
              variant="destructive"
              className="mb-4 rounded-xl"
            >
              <AlertCircle className="size-4" />

              <AlertDescription>
                {(error as any)?.response?.data?.error ||
                  "Failed to change password"}
              </AlertDescription>
            </Alert>
          )}

          <Card className="rounded-2xl border-[#E5E1D8] shadow-none">
            <CardHeader className="p-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">
                    Password
                  </CardTitle>

                  <CardDescription className="mt-1 leading-5">
                    Change your password whenever you need to.
                  </CardDescription>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                  <CheckCircle2 className="size-3" />
                  Protected
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(
                    handlePasswordChange
                  )}
                  className="space-y-5"
                >
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current password</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            autoComplete="current-password"
                            className="h-11 border-slate-200 focus-visible:border-blue-400 focus-visible:ring-4 focus-visible:ring-blue-50"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New password</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            autoComplete="new-password"
                            className="h-11 border-slate-200 focus-visible:border-blue-400 focus-visible:ring-4 focus-visible:ring-blue-50"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            autoComplete="new-password"
                            className="h-11 border-slate-200 focus-visible:border-blue-400 focus-visible:ring-4 focus-visible:ring-blue-50"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
                    <div className="flex gap-3">
                      <LockKeyhole className="mt-0.5 size-4 shrink-0 text-slate-500" />

                      <div>
                        <p className="text-xs font-medium text-slate-700">
                          Password requirements
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-slate-500">
                          Your new password must contain at least 8
                          characters.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <Button
                      type="submit"
                      disabled={isChangingPassword}
                      className="w-full sm:w-auto"
                    >
                      {isChangingPassword ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update password"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Danger zone */}
      <section className="mt-12 border-t border-slate-100 pt-10">
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="size-4" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-950">
                Danger Zone
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Irreversible account actions.
              </p>
            </div>
          </div>
        </div>

        <Card className="rounded-2xl border-red-200 bg-red-50/25 shadow-none">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-100 bg-white text-red-600">
                  <AlertTriangle className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Delete account
                  </p>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                    Permanently deleting your account will remove your
                    Flowdesk account and associated data. This action
                    cannot be undone.
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                disabled
                className="w-full shrink-0 border-red-200 bg-white text-red-600 hover:bg-red-50 sm:w-auto"
              >
                Coming soon
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Profile;
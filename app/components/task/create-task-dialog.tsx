import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateTaskMutation } from "@/hooks/use-task";
import { createTaskSchema } from "@/lib/schema";
import type { ProjectMemberRole, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Circle,
  Flag,
  ListTodo,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectMembers: { user: User; role: ProjectMemberRole }[];
}

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export const CreateTaskDialog = ({
  open,
  onOpenChange,
  projectId,
  projectMembers,
}: CreateTaskDialogProps) => {
  const form = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      dueDate: "",
      assignees: [],
    },
  });

  const { mutate, isPending } = useCreateTaskMutation();

  const onSubmit = (values: CreateTaskFormData) => {
    mutate(
      {
        projectId,
        taskData: values,
      },
      {
        onSuccess: () => {
          toast.success("Task created successfully");
          form.reset();
          onOpenChange(false);
        },
        onError: (error: any) => {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
          console.log(error);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-2xl gap-0 overflow-hidden rounded-2xl border border-[#E5E1D8] bg-white p-0 shadow-2xl">
        <DialogHeader className="border-b border-[#E5E1D8] px-6 py-5 sm:px-7">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#3158F5]/10 text-[#3158F5]">
              <ListTodo className="size-5" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold tracking-tight text-slate-900">
                Create task
              </DialogTitle>

              <p className="text-sm text-slate-500">
                Add a task and assign it to the right people.
              </p>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="max-h-[70vh] space-y-6 overflow-y-auto px-6 py-6 sm:px-7">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Task title
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Design the landing page"
                        className="h-11 rounded-lg border-slate-200 bg-white px-3.5 text-sm shadow-none transition-colors placeholder:text-slate-400 focus-visible:border-[#3158F5] focus-visible:ring-[#3158F5]/15"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Description
                      <span className="ml-1 font-normal text-slate-400">
                        (optional)
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add context, requirements, or anything the assignee should know..."
                        className="min-h-28 resize-none rounded-lg border-slate-200 bg-white px-3.5 py-3 text-sm shadow-none transition-colors placeholder:text-slate-400 focus-visible:border-[#3158F5] focus-visible:ring-[#3158F5]/15"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Circle className="size-3.5 text-slate-400" />
                        Status
                      </FormLabel>

                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-11 w-full rounded-lg border-slate-200 bg-white shadow-none focus:border-[#3158F5] focus:ring-[#3158F5]/15">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Flag className="size-3.5 text-slate-400" />
                        Priority
                      </FormLabel>

                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-11 w-full rounded-lg border-slate-200 bg-white shadow-none focus:border-[#3158F5] focus:ring-[#3158F5]/15">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <CalendarDays className="size-3.5 text-slate-400" />
                      Due date
                    </FormLabel>

                    <FormControl>
                      <Popover modal={true}>
                        <PopoverTrigger
                          render={
                            <Button
                              type="button"
                              variant="outline"
                              className={`h-11 w-full justify-between rounded-lg border-slate-200 bg-white px-3.5 text-left font-normal shadow-none hover:bg-slate-50 ${
                                !field.value
                                  ? "text-slate-400"
                                  : "text-slate-700"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <CalendarDays className="size-4 text-slate-400" />

                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a due date</span>
                                )}
                              </span>

                              <ChevronDown className="size-4 text-slate-400" />
                            </Button>
                          }
                        />

                        <PopoverContent
                          className="w-auto rounded-xl border-[#E5E1D8] p-2"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              field.value
                                ? new Date(field.value)
                                : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(
                                date?.toISOString() || undefined
                              );
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignees"
                render={({ field }) => {
                  const selectedMembers = field.value || [];

                  return (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Users className="size-3.5 text-slate-400" />
                        Assignees
                      </FormLabel>

                      <FormControl>
                        <Popover>
                          <PopoverTrigger
                            render={
                              <Button
                                type="button"
                                variant="outline"
                                className="h-auto min-h-11 w-full justify-between rounded-lg border-slate-200 bg-white px-3.5 py-2.5 text-left font-normal shadow-none hover:bg-slate-50"
                              >
                                <div className="flex min-w-0 items-center gap-2">
                                  <Users className="size-4 shrink-0 text-slate-400" />

                                  {selectedMembers.length === 0 ? (
                                    <span className="text-slate-400">
                                      Select assignees
                                    </span>
                                  ) : selectedMembers.length <= 2 ? (
                                    <span className="truncate text-slate-700">
                                      {selectedMembers
                                        .map((memberId) => {
                                          const member = projectMembers.find(
                                            (wm) =>
                                              wm.user._id === memberId
                                          );

                                          return member?.user.name;
                                        })
                                        .join(", ")}
                                    </span>
                                  ) : (
                                    <span className="text-slate-700">
                                      {selectedMembers.length} assignees
                                      selected
                                    </span>
                                  )}
                                </div>

                                <ChevronDown className="ml-2 size-4 shrink-0 text-slate-400" />
                              </Button>
                            }
                          />

                          <PopoverContent
                            className="w-[--radix-popover-trigger-width] min-w-72 max-h-72 overflow-y-auto rounded-xl border-[#E5E1D8] p-2"
                            align="start"
                          >
                            <div className="mb-2 px-2 py-1.5">
                              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                Project members
                              </p>
                            </div>

                            <div className="space-y-1">
                              {projectMembers.length === 0 ? (
                                <div className="px-3 py-6 text-center">
                                  <Users className="mx-auto mb-2 size-5 text-slate-300" />
                                  <p className="text-sm text-slate-500">
                                    No project members available
                                  </p>
                                </div>
                              ) : (
                                projectMembers.map((member) => {
                                  const selectedMember =
                                    selectedMembers.find(
                                      (m) => m === member.user?._id
                                    );

                                  return (
                                    <label
                                      key={member.user._id}
                                      htmlFor={`member-${member.user._id}`}
                                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50"
                                    >
                                      <Checkbox
                                        checked={!!selectedMember}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...selectedMembers,
                                              member.user._id,
                                            ]);
                                          } else {
                                            field.onChange(
                                              selectedMembers.filter(
                                                (m) =>
                                                  m !== member.user._id
                                              )
                                            );
                                          }
                                        }}
                                        id={`member-${member.user._id}`}
                                      />

                                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#3158F5]/10 text-xs font-semibold text-[#3158F5]">
                                        {member.user.name
                                          ?.charAt(0)
                                          .toUpperCase()}
                                      </div>

                                      <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-slate-700">
                                          {member.user.name}
                                        </p>

                                        <p className="truncate text-xs capitalize text-slate-400">
                                          {member.role}
                                        </p>
                                      </div>

                                      {selectedMember && (
                                        <Check className="size-4 shrink-0 text-[#3158F5]" />
                                      )}
                                    </label>
                                  );
                                })
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <DialogFooter className="border-t border-[#E5E1D8] bg-slate-50/60 px-6 py-4 sm:px-7">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
                className="rounded-lg px-4 text-slate-600 hover:bg-white hover:text-slate-900"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-[#3158F5] px-5 font-medium text-white shadow-sm hover:bg-[#2649d8]"
              >
                {isPending ? "Creating..." : "Create task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
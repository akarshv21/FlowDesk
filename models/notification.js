import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "task_assigned",
        "task_updated",
        "comment_added",
        "workspace_invite",
        "member_added",
        "general",
      ],
      default: "general",
    },

    resourceType: {
      type: String,
      enum: ["Task", "Project", "Workspace", "Comment", "User"],
    },

    resourceId: {
      type: Schema.Types.ObjectId,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;
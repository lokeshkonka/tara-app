import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

class NotificationService {
  private isInitialized = false;

  async init(): Promise<boolean> {
    if (this.isInitialized) return true;

    try {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("tara_daily_reminders", {
          name: "Daily Farming Reminders",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#006E1C",
          sound: "default",
        });

        await Notifications.setNotificationChannelAsync("tara_community_alerts", {
          name: "Community & Q&A Alerts",
          importance: Notifications.AndroidImportance.DEFAULT,
          sound: "default",
        });
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      this.isInitialized = finalStatus === "granted";
      return this.isInitialized;
    } catch (err) {
      console.warn("[NotificationService] Initialization error:", err);
      return false;
    }
  }

  /**
   * Schedule recurring daily farm practice reminder at specified time (e.g. "07:00 AM")
   */
  async scheduleDailyReminder(timeString: string): Promise<string | null> {
    const hasPermission = await this.init();
    if (!hasPermission) return null;

    try {
      // Cancel previous daily reminders
      await this.cancelAllReminders();

      // Parse time string e.g. "07:30 AM" or "06:00 PM"
      const [timePart, meridiem] = timeString.split(" ");
      const [hoursStr, minutesStr] = timePart.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr || "0", 10);

      if (meridiem === "PM" && hours < 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;

      const trigger: Notifications.DailyTriggerInput = {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: hours,
        minute: minutes,
      };

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "🌱 Good Morning Farmer!",
          body: "Tara here! Check your soil moisture and today's sustainable practice.",
          data: { screen: "practice" },
          sound: true,
        },
        trigger,
      });

      console.log(`[NotificationService] Scheduled daily reminder for ${hours}:${minutes} (ID: ${notificationId})`);
      return notificationId;
    } catch (err) {
      console.warn("[NotificationService] Schedule reminder error:", err);
      return null;
    }
  }

  /**
   * Send an instant local alert notification
   */
  async sendLocalAlert(title: string, body: string, data?: Record<string, any>): Promise<void> {
    const hasPermission = await this.init();
    if (!hasPermission) return;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
          sound: true,
        },
        trigger: null, // instant
      });
    } catch (err) {
      console.warn("[NotificationService] Send alert error:", err);
    }
  }

  /**
   * Cancel all pending scheduled notifications
   */
  async cancelAllReminders(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (err) {
      console.warn("[NotificationService] Cancel notifications error:", err);
    }
  }
}

export const notificationService = new NotificationService();

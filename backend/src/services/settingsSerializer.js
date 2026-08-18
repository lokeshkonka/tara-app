// PHASE 1: serializers for the /api/v1/settings/* endpoints.
// Each maps the embedded user.settings subdocument to the exact shape the
// mobile app's ISettingsRepository expects.

const toNotificationSettings = (s) => ({
    dailyReminders: s.dailyReminders ?? true,
    dailyReminderTime: s.dailyReminderTime || '07:00 AM',
    newLessons: s.newLessons ?? true,
    streakAlerts: s.streakAlerts ?? true,
    communityReplies: s.communityReplies ?? true,
    weeklyTips: s.weeklyTips ?? true,
    pushEnabled: s.pushEnabled ?? true,
    smsAlerts: s.smsAlerts ?? false,
    soundEnabled: s.soundEnabled ?? true
});

const toAccessibilitySettings = (s) => ({
    textScale: s.textScale || 'standard',
    highContrast: s.highContrast ?? false,
    screenReaderOptimized: s.screenReaderOptimized ?? false,
    audioAutoPlay: s.audioAutoPlay ?? true,
    voiceInputSensitivity: s.voiceInputSensitivity || 'normal',
    reducedMotion: s.reducedMotion ?? false
});

// Security settings + the user's active devices (from the Device collection).
// The raw PIN hash is never exposed; only the `pinEnabled` flag is returned.
const toSecuritySettings = (s, devices) => ({
    pinEnabled: s.pinEnabled ?? false,
    biometricsEnabled: s.biometricsEnabled ?? true,
    twoFactorEnabled: s.twoFactorEnabled ?? false,
    showNameOnLeaderboard: s.showNameOnLeaderboard ?? true,
    shareAnonymousImpact: s.shareAnonymousImpact ?? true,
    activeDevices: (devices || []).map((d, i) => ({
        id: d._id.toString(),
        name: d.name,
        type: d.type,
        location: d.location || '',
        // Relative label matching the app's dummy data ("Active Now", "2 days ago")
        lastActive: formatRelativeTime(d.lastActive),
        // Most recently active device is treated as "this device"
        isCurrent: i === 0
    }))
});

// Produces human-friendly relative timestamps for the device list.
const formatRelativeTime = (date) => {
    const diffMs = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Active Now';
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return days === 1 ? '1 day ago' : `${days} days ago`;
};

module.exports = {
    toNotificationSettings,
    toAccessibilitySettings,
    toSecuritySettings
};
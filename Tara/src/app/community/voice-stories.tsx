import React, { useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TactileButton } from "../../components/ui/TactileButton";
import { useCommunity } from "../../context/CommunityContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import type { ContributionCategory } from "../../types/community";

const CATEGORIES: { id: ContributionCategory | "all"; label: string; icon: string }[] = [
  { id: "all", label: "All Stories", icon: "all-inclusive" },
  { id: "water", label: "Water Saving", icon: "water-drop" },
  { id: "soil", label: "Soil Health", icon: "eco" },
  { id: "organic", label: "Organic Humus", icon: "compost" },
  { id: "pest", label: "Natural Pest Control", icon: "bug-report" },
];

export default function VoiceStoriesScreen() {
  const {
    voiceStories,
    activeStoryPlayingId,
    isPlayingAudio,
    playVoiceStory,
    pauseVoiceStory,
    toggleLikeStory,
    toggleBookmarkStory,
  } = useCommunity();

  const [selectedCat, setSelectedCat] = useState<ContributionCategory | "all">("all");
  const [recordModalVisible, setRecordModalVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [newStoryTitle, setNewStoryTitle] = useState("");
  const [selectedStoryForTranscript, setSelectedStoryForTranscript] = useState<string | null>(null);

  const filteredStories = voiceStories.filter((s) => {
    if (selectedCat === "all") return true;
    return s.category === selectedCat;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={8}
        >
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Farmer Voice Stories</Text>
        <Pressable
          style={styles.recordHeaderBtn}
          onPress={() => setRecordModalVisible(true)}
        >
          <MaterialIcons name="mic" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Card */}
        <View style={styles.introCard}>
          <View style={styles.taraAvatarMini}>
            <MaterialIcons name="record-voice-over" size={24} color={colors.primary} />
          </View>
          <View style={styles.introTextWrap}>
            <Text style={styles.introTitle}>Learn from Real Farmer Voices</Text>
            <Text style={styles.introSub}>
              Listen to practical successes, water-saving techniques, and soil biology tips from across India.
            </Text>
          </View>
        </View>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={[
                styles.filterChip,
                selectedCat === cat.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCat(cat.id)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedCat === cat.id && styles.filterChipTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Stories List */}
        <View style={styles.storiesList}>
          {filteredStories.map((story) => {
            const isPlayingThis =
              activeStoryPlayingId === story.id && isPlayingAudio;
            const showTranscript = selectedStoryForTranscript === story.id;

            return (
              <View key={story.id} style={styles.storyCard}>
                {/* Author Info */}
                <View style={styles.authorRow}>
                  <View style={styles.authorLeft}>
                    <View style={styles.authorAvatar}>
                      <Text style={styles.avatarLetter}>
                        {story.author.name.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.authorName}>{story.author.name}</Text>
                      <Text style={styles.authorLoc}>
                        {story.author.village}, {story.author.state}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.langPill}>
                    <MaterialIcons name="translate" size={12} color={colors.primary} />
                    <Text style={styles.langPillText}>
                      {story.author.languageName}
                    </Text>
                  </View>
                </View>

                {/* Title & Description */}
                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text style={styles.storyDesc}>{story.description}</Text>

                {/* Simulated Audio Waveform Player */}
                <View style={styles.audioPlayer}>
                  <Pressable
                    style={[
                      styles.playPauseBtn,
                      isPlayingThis && styles.playPauseBtnPlaying,
                    ]}
                    onPress={() =>
                      isPlayingThis
                        ? pauseVoiceStory()
                        : playVoiceStory(story.id)
                    }
                  >
                    <MaterialIcons
                      name={isPlayingThis ? "pause" : "play-arrow"}
                      size={24}
                      color={colors.white}
                    />
                  </Pressable>

                  <View style={styles.waveformContainer}>
                    {story.waveformSample.map((val, idx) => (
                      <View
                        key={idx}
                        style={[
                          styles.waveBar,
                          {
                            height: Math.max(4, (val / 100) * 22),
                            backgroundColor: isPlayingThis
                              ? colors.primary
                              : colors.outlineVariant,
                          },
                        ]}
                      />
                    ))}
                  </View>

                  <Text style={styles.durationText}>
                    {story.durationFormatted}
                  </Text>
                </View>

                {/* Tara AI Takeaway Box */}
                <View style={styles.taraTakeawayBox}>
                  <View style={styles.taraTakeawayHeader}>
                    <MaterialIcons name="auto-awesome" size={14} color="#D97706" />
                    <Text style={styles.taraTakeawayTag}>Tara Key Takeaway</Text>
                  </View>
                  <Text style={styles.taraTakeawayText}>
                    {story.taraTakeaway}
                  </Text>
                </View>

                {/* Transcript Collapsible */}
                {showTranscript && (
                  <View style={styles.transcriptBox}>
                    <Text style={styles.transcriptLabel}>Transcript:</Text>
                    <Text style={styles.transcriptText}>{story.transcript}</Text>
                  </View>
                )}

                {/* Footer Actions */}
                <View style={styles.storyFooter}>
                  <Pressable
                    style={styles.transcriptToggleBtn}
                    onPress={() =>
                      setSelectedStoryForTranscript(
                        showTranscript ? null : story.id
                      )
                    }
                  >
                    <MaterialIcons
                      name={showTranscript ? "expand-less" : "description"}
                      size={16}
                      color={colors.primary}
                    />
                    <Text style={styles.transcriptToggleText}>
                      {showTranscript ? "Hide Transcript" : "Read Transcript"}
                    </Text>
                  </Pressable>

                  <View style={styles.footerRightIcons}>
                    <Pressable
                      style={styles.footerIconBtn}
                      onPress={() => toggleLikeStory(story.id)}
                    >
                      <MaterialIcons
                        name={story.isLiked ? "favorite" : "favorite-border"}
                        size={20}
                        color={story.isLiked ? colors.error : colors.onSurfaceVariant}
                      />
                      <Text style={styles.footerIconText}>
                        {story.likesCount}
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.footerIconBtn}
                      onPress={() => toggleBookmarkStory(story.id)}
                    >
                      <MaterialIcons
                        name={story.isBookmarked ? "bookmark" : "bookmark-border"}
                        size={20}
                        color={
                          story.isBookmarked
                            ? colors.primary
                            : colors.onSurfaceVariant
                        }
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Record Story Floating Bar / CTA */}
      <View style={styles.floatingCtaBar}>
        <TactileButton
          title="Share Your Farm Story"
          icon="mic"
          variant="primary"
          onPress={() => setRecordModalVisible(true)}
        />
      </View>

      {/* Record Voice Story Modal */}
      <Modal
        visible={recordModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setRecordModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setRecordModalVisible(false)}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Record Voice Story</Text>
              <Pressable onPress={() => setRecordModalVisible(false)}>
                <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>

            <TextInput
              style={styles.inputField}
              placeholder="Story Title (e.g. My Bio-Pest Repellent Recipe)"
              placeholderTextColor={colors.outlineVariant}
              value={newStoryTitle}
              onChangeText={setNewStoryTitle}
            />

            {/* Record Mic Interface */}
            <View style={styles.recordMicBox}>
              <Pressable
                style={[
                  styles.recordCircleBtn,
                  isRecording && styles.recordCircleBtnActive,
                ]}
                onPress={() => {
                  if (isRecording) {
                    setIsRecording(false);
                  } else {
                    setIsRecording(true);
                    setRecordSeconds(0);
                  }
                }}
              >
                <MaterialIcons
                  name={isRecording ? "stop" : "mic"}
                  size={36}
                  color={colors.white}
                />
              </Pressable>
              <Text style={styles.recordStatusText}>
                {isRecording
                  ? `Recording... 0:${recordSeconds < 10 ? "0" : ""}${recordSeconds}`
                  : "Tap microphone to start speaking"}
              </Text>
              <Text style={styles.recordTip}>
                Tara will generate auto-transcripts in Marathi, Hindi, Telugu, and English.
              </Text>
            </View>

            <TactileButton
              title="Publish Voice Story"
              icon="upload"
              variant="primary"
              disabled={isRecording || !newStoryTitle}
              onPress={() => {
                setRecordModalVisible(false);
                setIsRecording(false);
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.3)",
  },
  backBtn: {
    padding: 6,
    borderRadius: rounded.full,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  recordHeaderBtn: {
    padding: 8,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  scrollContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 100,
    gap: spacing.md,
  },
  introCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.md,
  },
  taraAvatarMini: {
    width: 44,
    height: 44,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  introTextWrap: {
    flex: 1,
  },
  introTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  introSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
    marginTop: 2,
  },
  filterRow: {
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurface,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  storiesList: {
    gap: spacing.md,
  },
  storyCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  authorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
  },
  authorLoc: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  langPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  langPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
    lineHeight: 20,
  },
  storyDesc: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  audioPlayer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  playPauseBtn: {
    width: 40,
    height: 40,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  playPauseBtnPlaying: {
    backgroundColor: colors.secondary,
  },
  waveformContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    height: 24,
  },
  waveBar: {
    width: 3.5,
    borderRadius: 2,
  },
  durationText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  taraTakeawayBox: {
    backgroundColor: "rgba(217, 119, 6, 0.06)",
    borderRadius: rounded.lg,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: "#D97706",
    gap: 2,
  },
  taraTakeawayHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  taraTakeawayTag: {
    fontSize: 11,
    fontWeight: "700",
    color: "#B45309",
  },
  taraTakeawayText: {
    fontSize: 12,
    color: colors.onSurface,
    lineHeight: 16,
  },
  transcriptBox: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: spacing.sm,
    gap: 4,
  },
  transcriptLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  transcriptText: {
    fontSize: 12,
    color: colors.onSurface,
    lineHeight: 17,
    fontStyle: "italic",
  },
  storyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  transcriptToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  transcriptToggleText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  footerRightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  footerIconBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerIconText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  floatingCtaBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "rgba(190, 202, 185, 0.3)",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: rounded.xxl,
    borderTopRightRadius: rounded.xxl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  inputField: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  recordMicBox: {
    alignItems: "center",
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  recordCircleBtn: {
    width: 72,
    height: 72,
    borderRadius: rounded.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  recordCircleBtnActive: {
    backgroundColor: colors.error,
  },
  recordStatusText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
  },
  recordTip: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },
});

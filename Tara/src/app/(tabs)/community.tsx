import React, { useState } from "react";
import {
  FlatList,
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
import type { ContributionCategory, ContributionType } from "../../types/community";

export default function CommunityTab() {
  const {
    activePanchayat,
    panchayats,
    switchPanchayat,
    userImpact,
    voiceStories,
    contributions,
    activeStoryPlayingId,
    isPlayingAudio,
    playVoiceStory,
    pauseVoiceStory,
    toggleLikeStory,
    likeContribution,
    addContribution,
  } = useCommunity();

  const [panchayatModalVisible, setPanchayatModalVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);

  // New post form state
  const [newPostType, setNewPostType] = useState<ContributionType>("tip");
  const [newPostCategory, setNewPostCategory] =
    useState<ContributionCategory>("soil");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    addContribution({
      type: newPostType,
      category: newPostCategory,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
    });
    setNewPostTitle("");
    setNewPostContent("");
    setPostModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={styles.avatarWrap}>
            <MaterialIcons name="eco" size={24} color={colors.primary} />
          </View>
          <Text style={styles.screenTitle}>Community</Text>
        </View>
        <Pressable
          style={styles.notificationBtn}
          onPress={() => router.push("/settings/notifications")}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <MaterialIcons
            name="notifications-none"
            size={22}
            color={colors.onSurfaceVariant}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card: Your Panchayat */}
        <View style={styles.heroCard}>
          <View style={styles.heroCardHeader}>
            <View>
              <Text style={styles.heroSub}>YOUR PANCHAYAT</Text>
              <View style={styles.locationRow}>
                <MaterialIcons
                  name="location-on"
                  size={18}
                  color={colors.primary}
                />
                <Text style={styles.heroTitle}>{activePanchayat.name}</Text>
              </View>
            </View>
            <Pressable
              style={styles.switchPanchayatBtn}
              onPress={() => setPanchayatModalVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Switch Panchayat"
            >
              <MaterialIcons name="swap-horiz" size={20} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.heroMetricsRow}>
            <View style={styles.heroMetric}>
              <Text style={styles.heroMetricVal}>
                {activePanchayat.membersCount}
              </Text>
              <Text style={styles.heroMetricLabel}>Active Farmers</Text>
            </View>
            <View style={styles.heroMetricDivider} />
            <View style={styles.heroMetric}>
              <Text style={styles.heroMetricVal}>
                {activePanchayat.activePracticesCount}
              </Text>
              <Text style={styles.heroMetricLabel}>Practices Adopted</Text>
            </View>
            <View style={styles.heroMetricDivider} />
            <View style={styles.heroMetric}>
              <Text style={[styles.heroMetricVal, { color: colors.primary }]}>
                {activePanchayat.sustainabilityScore}/100
              </Text>
              <Text style={styles.heroMetricLabel}>Eco Score</Text>
            </View>
          </View>
        </View>

        {/* Community Impact Teaser Banner */}
        <Pressable
          style={styles.impactTeaserCard}
          onPress={() => router.push("/community/impact")}
          accessibilityRole="button"
          accessibilityLabel="View Community Impact"
        >
          <View style={styles.impactTeaserLeft}>
            <View style={styles.impactBadge}>
              <MaterialIcons name="local-police" size={20} color="#cda721" />
            </View>
            <View style={styles.impactTextWrap}>
              <View style={styles.rankRow}>
                <Text style={styles.rankText}>#{userImpact.communityRank}</Text>
                <Text style={styles.rankSub}> in your Panchayat</Text>
              </View>
              <Text style={styles.impactStatusText}>
                {userImpact.progressToMentorPct}% to Community Mentor
              </Text>
            </View>
          </View>
          <View style={styles.chevronWrap}>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={colors.primary}
            />
          </View>
        </Pressable>

        {/* 4 Quick Actions Grid */}
        <View style={styles.quickActionsGrid}>
          <Pressable
            style={styles.actionCard}
            onPress={() => router.push("/community/voice-stories")}
          >
            <View
              style={[
                styles.actionIconWrap,
                { backgroundColor: "rgba(0, 110, 28, 0.1)" },
              ]}
            >
              <MaterialIcons name="mic" size={24} color={colors.primary} />
            </View>
            <Text style={styles.actionLabel}>Voice Stories</Text>
            <Text style={styles.actionSub}>Listen & Share</Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => router.push("/community/contributions")}
          >
            <View
              style={[
                styles.actionIconWrap,
                { backgroundColor: "rgba(205, 167, 33, 0.15)" },
              ]}
            >
              <MaterialIcons name="forum" size={24} color="#B45309" />
            </View>
            <Text style={styles.actionLabel}>Discussions</Text>
            <Text style={styles.actionSub}>Q&A & Tips</Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => router.push("/community/leaderboard")}
          >
            <View
              style={[
                styles.actionIconWrap,
                { backgroundColor: "rgba(76, 175, 80, 0.15)" },
              ]}
            >
              <MaterialIcons
                name="emoji-events"
                size={24}
                color={colors.secondary}
              />
            </View>
            <Text style={styles.actionLabel}>Leaderboard</Text>
            <Text style={styles.actionSub}>Top Farmers</Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => setPostModalVisible(true)}
          >
            <View
              style={[
                styles.actionIconWrap,
                { backgroundColor: "rgba(2, 132, 199, 0.12)" },
              ]}
            >
              <MaterialIcons name="add-circle" size={24} color="#0284C7" />
            </View>
            <Text style={styles.actionLabel}>Share Practice</Text>
            <Text style={styles.actionSub}>Post a Tip</Text>
          </Pressable>
        </View>

        {/* Voice Stories Preview Carousel */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Farmer Voice Stories</Text>
          <Pressable
            onPress={() => router.push("/community/voice-stories")}
            hitSlop={8}
          >
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.voiceStoriesScroll}
        >
          {voiceStories.map((story) => {
            const isPlayingThis =
              activeStoryPlayingId === story.id && isPlayingAudio;
            return (
              <View key={story.id} style={styles.voiceStoryCard}>
                <View style={styles.storyTopRow}>
                  <View style={styles.storyAuthorWrap}>
                    <View style={styles.storyAvatar}>
                      <Text style={styles.storyAvatarInitial}>
                        {story.author.name.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.storyAuthorName}>
                        {story.author.name}
                      </Text>
                      <Text style={styles.storyAuthorLoc}>
                        {story.author.village}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.langTag}>
                    <Text style={styles.langTagText}>
                      {story.author.languageName}
                    </Text>
                  </View>
                </View>

                <Text style={styles.storyTitle} numberOfLines={2}>
                  {story.title}
                </Text>

                {/* Waveform Player Bar */}
                <View style={styles.playerBar}>
                  <Pressable
                    style={styles.playBtn}
                    onPress={() =>
                      isPlayingThis
                        ? pauseVoiceStory()
                        : playVoiceStory(story.id)
                    }
                  >
                    <MaterialIcons
                      name={isPlayingThis ? "pause" : "play-arrow"}
                      size={20}
                      color={colors.white}
                    />
                  </Pressable>
                  <View style={styles.waveSample}>
                    {story.waveformSample.slice(0, 10).map((h, i) => (
                      <View
                        key={i}
                        style={[
                          styles.waveBar,
                          {
                            height: Math.max(4, (h / 100) * 18),
                            backgroundColor: isPlayingThis
                              ? colors.primary
                              : colors.outlineVariant,
                          },
                        ]}
                      />
                    ))}
                  </View>
                  <Text style={styles.storyDuration}>
                    {story.durationFormatted}
                  </Text>
                </View>

                <View style={styles.storyFooterRow}>
                  <Pressable
                    style={styles.likeBtn}
                    onPress={() => toggleLikeStory(story.id)}
                  >
                    <MaterialIcons
                      name={story.isLiked ? "favorite" : "favorite-border"}
                      size={18}
                      color={story.isLiked ? colors.error : colors.onSurfaceVariant}
                    />
                    <Text style={styles.likeCountText}>{story.likesCount}</Text>
                  </Pressable>
                  <Text style={styles.playsCountText}>
                    {story.playsCount} listens
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Recent Community Questions & Tips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Community Q&A & Discussions</Text>
          <Pressable
            onPress={() => router.push("/community/contributions")}
            hitSlop={8}
          >
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>

        {contributions.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.contribCard}>
            <View style={styles.contribHeader}>
              <View style={styles.contribAuthorRow}>
                <View style={styles.contribAvatar}>
                  <Text style={styles.contribAvatarInitial}>
                    {item.author.name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.contribAuthorName}>
                    {item.author.name}
                  </Text>
                  <Text style={styles.contribMeta}>
                    {item.author.location} • {item.createdAt}
                  </Text>
                </View>
              </View>
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>
                  {item.type.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={styles.contribTitle}>{item.title}</Text>
            <Text style={styles.contribContent} numberOfLines={3}>
              {item.content}
            </Text>

            {item.taraVerifiedAnswer && (
              <View style={styles.taraVerifiedBox}>
                <View style={styles.taraVerifiedHeader}>
                  <MaterialIcons name="verified" size={16} color={colors.primary} />
                  <Text style={styles.taraVerifiedTitle}>
                    {item.taraVerifiedAnswer.verifiedBy}
                  </Text>
                </View>
                <Text style={styles.taraVerifiedText} numberOfLines={2}>
                  {item.taraVerifiedAnswer.text}
                </Text>
              </View>
            )}

            <View style={styles.contribFooter}>
              <Pressable
                style={styles.contribFooterBtn}
                onPress={() => likeContribution(item.id)}
              >
                <MaterialIcons
                  name={item.isLiked ? "thumb-up" : "thumb-up-off-alt"}
                  size={16}
                  color={item.isLiked ? colors.primary : colors.onSurfaceVariant}
                />
                <Text style={styles.contribFooterText}>{item.likesCount} Helpful</Text>
              </Pressable>
              <Pressable
                style={styles.contribFooterBtn}
                onPress={() => router.push("/community/contributions")}
              >
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={16}
                  color={colors.onSurfaceVariant}
                />
                <Text style={styles.contribFooterText}>
                  {item.repliesCount} Replies
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Switch Panchayat Modal */}
      <Modal
        visible={panchayatModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPanchayatModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setPanchayatModalVisible(false)}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select Your Panchayat</Text>
              <Pressable onPress={() => setPanchayatModalVisible(false)}>
                <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>
            {panchayats.map((p) => (
              <Pressable
                key={p.id}
                style={[
                  styles.panchayatOption,
                  p.id === activePanchayat.id && styles.panchayatOptionActive,
                ]}
                onPress={() => {
                  switchPanchayat(p.id);
                  setPanchayatModalVisible(false);
                }}
              >
                <View>
                  <Text style={styles.panchayatOptName}>{p.name}</Text>
                  <Text style={styles.panchayatOptSub}>
                    {p.district}, {p.state} • {p.membersCount} farmers
                  </Text>
                </View>
                {p.id === activePanchayat.id && (
                  <MaterialIcons name="check" size={22} color={colors.primary} />
                )}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* New Post Modal */}
      <Modal
        visible={postModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPostModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setPostModalVisible(false)}
        >
          <Pressable style={styles.postSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Share with Community</Text>
              <Pressable onPress={() => setPostModalVisible(false)}>
                <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>

            {/* Type selector */}
            <View style={styles.typeSelectorRow}>
              {(["practice", "tip", "question"] as ContributionType[]).map((t) => (
                <Pressable
                  key={t}
                  style={[
                    styles.typeSelectBtn,
                    newPostType === t && styles.typeSelectBtnActive,
                  ]}
                  onPress={() => setNewPostType(t)}
                >
                  <Text
                    style={[
                      styles.typeSelectText,
                      newPostType === t && styles.typeSelectTextActive,
                    ]}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <TextInput
              style={styles.titleInput}
              placeholder="Give your post a clear title..."
              placeholderTextColor={colors.outlineVariant}
              value={newPostTitle}
              onChangeText={setNewPostTitle}
            />

            <TextInput
              style={styles.contentInput}
              placeholder="Describe your farming experience, question, or technique..."
              placeholderTextColor={colors.outlineVariant}
              multiline
              numberOfLines={4}
              value={newPostContent}
              onChangeText={setNewPostContent}
            />

            <TactileButton
              title="Post to Community"
              icon="send"
              variant="primary"
              onPress={handleCreatePost}
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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  topBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  notificationBtn: {
    width: 38,
    height: 38,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  scrollContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  heroCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xxl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(190, 202, 185, 0.5)",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  heroCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  heroSub: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  switchPanchayatBtn: {
    padding: 6,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  heroMetricsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingVertical: spacing.sm,
  },
  heroMetric: {
    alignItems: "center",
  },
  heroMetricVal: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  heroMetricLabel: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  heroMetricDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.outlineVariant,
  },
  impactTeaserCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFDF5",
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(205, 167, 33, 0.3)",
  },
  impactTeaserLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  impactBadge: {
    width: 40,
    height: 40,
    borderRadius: rounded.full,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
  },
  impactTextWrap: {
    gap: 2,
  },
  rankRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  rankText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    fontFamily: typography.fontFamily.bold,
  },
  rankSub: {
    fontSize: 13,
    color: colors.onSurface,
  },
  impactStatusText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  chevronWrap: {
    padding: 4,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  actionCard: {
    width: "48%",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    gap: 4,
  },
  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: rounded.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
    fontFamily: typography.fontFamily.bold,
  },
  actionSub: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  voiceStoriesScroll: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  voiceStoryCard: {
    width: 250,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.sm,
  },
  storyTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storyAuthorWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  storyAvatar: {
    width: 32,
    height: 32,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  storyAvatarInitial: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  storyAuthorName: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurface,
  },
  storyAuthorLoc: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  langTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  langTagText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.primary,
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
    lineHeight: 18,
  },
  playerBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: 6,
    gap: spacing.xs,
  },
  playBtn: {
    width: 28,
    height: 28,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  waveSample: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    height: 20,
  },
  waveBar: {
    width: 3,
    borderRadius: 2,
  },
  storyDuration: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  storyFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 2,
  },
  likeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  likeCountText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  playsCountText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  contribCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.xs,
  },
  contribHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  contribAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  contribAvatar: {
    width: 34,
    height: 34,
    borderRadius: rounded.full,
    backgroundColor: "rgba(205, 167, 33, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  contribAvatarInitial: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.tertiary,
  },
  contribAuthorName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.onSurface,
  },
  contribMeta: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
  },
  contribTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
    marginTop: 2,
  },
  contribContent: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  taraVerifiedBox: {
    backgroundColor: "rgba(0, 110, 28, 0.05)",
    borderRadius: rounded.lg,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    marginTop: 4,
    gap: 2,
  },
  taraVerifiedHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  taraVerifiedTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  taraVerifiedText: {
    fontSize: 12,
    color: colors.onSurface,
    lineHeight: 16,
  },
  contribFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.md,
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(190, 202, 185, 0.3)",
  },
  contribFooterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  contribFooterText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
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
  postSheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: rounded.xxl,
    borderTopRightRadius: rounded.xxl,
    padding: spacing.lg,
    gap: spacing.md,
    maxHeight: "85%",
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: spacing.xs,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.onSurface,
    fontFamily: typography.fontFamily.bold,
  },
  panchayatOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  panchayatOptionActive: {
    borderColor: colors.primary,
    backgroundColor: "rgba(0, 110, 28, 0.05)",
  },
  panchayatOptName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
  },
  panchayatOptSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  typeSelectorRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  typeSelectBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
  },
  typeSelectBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeSelectText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurface,
  },
  typeSelectTextActive: {
    color: colors.white,
  },
  titleInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  contentInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    height: 100,
    textAlignVertical: "top",
  },
});

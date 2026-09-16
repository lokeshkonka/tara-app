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
import { useTranslation } from "../../hooks/useTranslation";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import type { ContributionCategory, ContributionType } from "../../types/community";

export default function CommunityTab() {
  const { t } = useTranslation();
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
          <Text style={styles.screenTitle}>{t("community.screenTitle")}</Text>
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
              <Text style={styles.heroSub}>{t("community.yourPanchayat")}</Text>
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
            <View style={styles.heroMetricPill}>
              <Text style={styles.heroMetricVal}>
                {activePanchayat.activePracticesCount}
              </Text>
              <Text style={styles.heroMetricLabel} numberOfLines={1}>
                Practices
              </Text>
            </View>

            <View style={styles.heroMetricPill}>
              <Text style={[styles.heroMetricVal, { color: colors.primary }]}>
                {activePanchayat.sustainabilityScore}/100
              </Text>
              <Text style={styles.heroMetricLabel} numberOfLines={1}>
                Eco Score
              </Text>
            </View>
          </View>
        </View>

        {/* Community Impact Teaser Banner */}
        <Pressable
          onPress={() => router.push("/community/impact")}
          accessibilityRole="button"
          accessibilityLabel="View Community Impact"
        >
          {({ pressed }) => (
            <View
              style={[
                styles.impactTeaserCard,
                pressed && styles.impactTeaserCardPressed,
              ]}
            >
              <View style={styles.impactTeaserLeft}>
                <View
                  style={[
                    styles.impactBadge,
                    pressed && { backgroundColor: "#FDE68A" },
                  ]}
                >
                  <MaterialIcons name="workspace-premium" size={22} color="#D97706" />
                </View>
                <View style={styles.impactTextWrap}>
                  <View style={styles.rankRow}>
                    <Text style={styles.rankText}>#{userImpact.communityRank}</Text>
                    <Text style={styles.rankSub}> Community Rank</Text>
                  </View>

                  {/* Progress bar to Community Mentor */}
                  <View style={styles.teaserProgressContainer}>
                    <View style={styles.teaserTrack}>
                      <View
                        style={[
                          styles.teaserFill,
                          { width: `${userImpact.progressToMentorPct}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.impactStatusText}>
                      {userImpact.progressToMentorPct}% to Mentor
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.chevronWrap}>
                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color={colors.primary}
                />
              </View>
            </View>
          )}
        </Pressable>

        {/* 4 Quick Actions Grid */}
        <View style={styles.quickActionsGrid}>
          {/* Card 1: Voice Stories */}
          <Pressable
            style={styles.actionCardPressable}
            onPress={() => router.push("/community/voice-stories")}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.actionCard,
                  pressed && styles.actionCardVoicePressed,
                ]}
              >
                <View
                  style={[
                    styles.actionIconWrap,
                    { backgroundColor: pressed ? colors.primary : "rgba(0, 110, 28, 0.1)" },
                  ]}
                >
                  <MaterialIcons
                    name="mic"
                    size={24}
                    color={pressed ? colors.white : colors.primary}
                  />
                </View>
                <Text
                  style={[
                    styles.actionLabel,
                    pressed && { color: colors.primary },
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Voice Stories
                </Text>
                <Text style={styles.actionSub} numberOfLines={1}>Listen & Share</Text>
              </View>
            )}
          </Pressable>

          {/* Card 2: Discussions */}
          <Pressable
            style={styles.actionCardPressable}
            onPress={() => router.push("/community/contributions")}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.actionCard,
                  pressed && styles.actionCardDiscussionsPressed,
                ]}
              >
                <View
                  style={[
                    styles.actionIconWrap,
                    { backgroundColor: pressed ? "#B45309" : "rgba(205, 167, 33, 0.15)" },
                  ]}
                >
                  <MaterialIcons
                    name="forum"
                    size={24}
                    color={pressed ? colors.white : "#B45309"}
                  />
                </View>
                <Text
                  style={[
                    styles.actionLabel,
                    pressed && { color: "#B45309" },
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Discussions
                </Text>
                <Text style={styles.actionSub} numberOfLines={1}>Q&A & Tips</Text>
              </View>
            )}
          </Pressable>

          {/* Card 3: Leaderboard */}
          <Pressable
            style={styles.actionCardPressable}
            onPress={() => router.push("/community/leaderboard")}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.actionCard,
                  pressed && styles.actionCardLeaderboardPressed,
                ]}
              >
                <View
                  style={[
                    styles.actionIconWrap,
                    { backgroundColor: pressed ? colors.secondary : "rgba(76, 175, 80, 0.15)" },
                  ]}
                >
                  <MaterialIcons
                    name="emoji-events"
                    size={24}
                    color={pressed ? colors.white : colors.secondary}
                  />
                </View>
                <Text
                  style={[
                    styles.actionLabel,
                    pressed && { color: colors.secondary },
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Leaderboard
                </Text>
                <Text style={styles.actionSub} numberOfLines={1}>Top Farmers</Text>
              </View>
            )}
          </Pressable>

          {/* Card 4: Share Practice */}
          <Pressable
            style={styles.actionCardPressable}
            onPress={() => setPostModalVisible(true)}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.actionCard,
                  pressed && styles.actionCardSharePressed,
                ]}
              >
                <View
                  style={[
                    styles.actionIconWrap,
                    { backgroundColor: pressed ? "#0284C7" : "rgba(2, 132, 199, 0.12)" },
                  ]}
                >
                  <MaterialIcons
                    name="add-circle"
                    size={24}
                    color={pressed ? colors.white : "#0284C7"}
                  />
                </View>
                <Text
                  style={[
                    styles.actionLabel,
                    pressed && { color: "#0284C7" },
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Share Practice
                </Text>
                <Text style={styles.actionSub} numberOfLines={1}>Post a Tip</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Voice Stories Preview Carousel */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <MaterialIcons name="graphic-eq" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Farmer Voice Stories</Text>
          </View>
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
              <Pressable
                key={story.id}
                onPress={() => router.push("/community/voice-stories")}
              >
                {({ pressed }) => (
                  <View
                    style={[
                      styles.voiceStoryCard,
                      pressed && styles.voiceStoryCardPressed,
                      isPlayingThis && styles.voiceStoryCardPlaying,
                    ]}
                  >
                    {/* Top Row: Author & Multilingual Badge */}
                    <View style={styles.storyTopRow}>
                      <View style={styles.storyAuthorWrap}>
                        <View
                          style={[
                            styles.storyAvatar,
                            isPlayingThis && { backgroundColor: "rgba(0, 110, 28, 0.2)" },
                          ]}
                        >
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
                        <MaterialIcons name="translate" size={11} color={colors.primary} />
                        <Text style={styles.langTagText}>
                          {story.author.languageName}
                        </Text>
                      </View>
                    </View>

                    {/* Story Title */}
                    <Text style={styles.storyTitle} numberOfLines={2}>
                      {story.title}
                    </Text>

                    {/* Modern Interactive Waveform Player Bar */}
                    <View
                      style={[
                        styles.playerBar,
                        isPlayingThis && styles.playerBarActive,
                      ]}
                    >
                      <Pressable
                        style={[
                          styles.playBtn,
                          isPlayingThis && styles.playBtnActive,
                        ]}
                        onPress={(e) => {
                          e.stopPropagation();
                          isPlayingThis ? pauseVoiceStory() : playVoiceStory(story.id);
                        }}
                      >
                        <MaterialIcons
                          name={isPlayingThis ? "pause" : "play-arrow"}
                          size={20}
                          color={colors.white}
                        />
                      </Pressable>

                      <View style={styles.waveSample}>
                        {story.waveformSample.slice(0, 12).map((h, i) => (
                          <View
                            key={i}
                            style={[
                              styles.waveBar,
                              {
                                height: isPlayingThis
                                  ? Math.max(5, ((h * (i % 2 === 0 ? 1.2 : 0.8)) / 100) * 20)
                                  : Math.max(4, (h / 100) * 16),
                                backgroundColor: isPlayingThis
                                  ? colors.primary
                                  : colors.outlineVariant,
                              },
                            ]}
                          />
                        ))}
                      </View>

                      <Text
                        style={[
                          styles.storyDuration,
                          isPlayingThis && { color: colors.primary, fontWeight: "700" },
                        ]}
                      >
                        {story.durationFormatted}
                      </Text>
                    </View>

                    {/* Tara Takeaway Banner */}
                    {story.taraTakeaway ? (
                      <View style={styles.miniTaraTakeaway}>
                        <MaterialIcons name="auto-awesome" size={12} color="#D97706" />
                        <Text style={styles.miniTaraTakeawayText} numberOfLines={1}>
                          {story.taraTakeaway}
                        </Text>
                      </View>
                    ) : null}

                    {/* Card Footer */}
                    <View style={styles.storyFooterRow}>
                      <Pressable
                        style={styles.likeBtn}
                        onPress={(e) => {
                          e.stopPropagation();
                          toggleLikeStory(story.id);
                        }}
                      >
                        <MaterialIcons
                          name={story.isLiked ? "favorite" : "favorite-border"}
                          size={18}
                          color={story.isLiked ? colors.error : colors.onSurfaceVariant}
                        />
                        <Text
                          style={[
                            styles.likeCountText,
                            story.isLiked && { color: colors.error, fontWeight: "700" },
                          ]}
                        >
                          {story.likesCount}
                        </Text>
                      </Pressable>

                      <View style={styles.listensRow}>
                        <MaterialIcons name="headset" size={14} color={colors.onSurfaceVariant} />
                        <Text style={styles.playsCountText}>
                          {story.playsCount}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Recent Community Questions & Tips */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <MaterialIcons name="forum" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Community Q&A & Discussions</Text>
          </View>
          <Pressable
            onPress={() => router.push("/community/contributions")}
            hitSlop={8}
          >
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>

        {contributions.slice(0, 3).map((item) => (
          <Pressable
            key={item.id}
            onPress={() => router.push("/community/contributions")}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.contribCard,
                  pressed && styles.contribCardPressed,
                ]}
              >
                {/* Author Header */}
                <View style={styles.contribHeader}>
                  <View style={styles.contribAuthorRow}>
                    <View style={styles.contribAvatar}>
                      <Text style={styles.contribAvatarInitial}>
                        {item.author.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.authorTextContainer}>
                      <Text style={styles.contribAuthorName} numberOfLines={1}>
                        {item.author.name}
                      </Text>
                      <Text style={styles.contribMeta} numberOfLines={1}>
                        {item.author.badge ? `${item.author.badge} • ` : ""}{item.author.location} • {item.createdAt}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.typeBadge,
                      item.type === "question" && { backgroundColor: "#E0F2FE" },
                      item.type === "tip" && { backgroundColor: "#FEF3C7" },
                      item.type === "practice" && { backgroundColor: "#DCFCE7" },
                    ]}
                  >
                    <MaterialIcons
                      name={
                        item.type === "question"
                          ? "help-outline"
                          : item.type === "tip"
                          ? "lightbulb-outline"
                          : "eco"
                      }
                      size={12}
                      color={
                        item.type === "question"
                          ? "#0284C7"
                          : item.type === "tip"
                          ? "#B45309"
                          : colors.primary
                      }
                    />
                    <Text
                      style={[
                        styles.typeBadgeText,
                        item.type === "question" && { color: "#0284C7" },
                        item.type === "tip" && { color: "#B45309" },
                        item.type === "practice" && { color: colors.primary },
                      ]}
                      numberOfLines={1}
                    >
                      {item.type.toUpperCase()}
                    </Text>
                  </View>
                </View>

                {/* Title & Body */}
                <Text style={styles.contribTitle}>{item.title}</Text>
                <Text style={styles.contribContent} numberOfLines={3}>
                  {item.content}
                </Text>

                {/* Tara AI Verified Answer Box */}
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
                    {item.taraVerifiedAnswer.actionableStep ? (
                      <View style={styles.taraActionRow}>
                        <MaterialIcons name="arrow-forward" size={13} color={colors.primary} />
                        <Text style={styles.taraActionText} numberOfLines={1}>
                          {item.taraVerifiedAnswer.actionableStep}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                )}

                {/* Footer Controls */}
                <View style={styles.contribFooter}>
                  <Pressable
                    style={[
                      styles.contribFooterBtn,
                      item.isLiked && styles.contribFooterBtnActive,
                    ]}
                    onPress={(e) => {
                      e.stopPropagation();
                      likeContribution(item.id);
                    }}
                  >
                    <MaterialIcons
                      name={item.isLiked ? "thumb-up" : "thumb-up-off-alt"}
                      size={16}
                      color={item.isLiked ? colors.primary : colors.onSurfaceVariant}
                    />
                    <Text
                      style={[
                        styles.contribFooterText,
                        item.isLiked && { color: colors.primary, fontWeight: "700" },
                      ]}
                    >
                      {item.likesCount} Helpful
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.contribFooterBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push("/community/contributions");
                    }}
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
            )}
          </Pressable>
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
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
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
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  heroMetricPill: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 2.5,
    borderBottomColor: componentColors.cardEdge,
  },
  heroMetricVal: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
    textAlign: "center",
  },
  heroMetricLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: 2,
  },
  impactTeaserCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFDF5",
    borderRadius: rounded.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "rgba(217, 119, 6, 0.35)",
    borderBottomWidth: 3.5,
    borderBottomColor: "#D97706",
shadowRadius: 6,
    elevation: 2,
  },
  impactTeaserCardPressed: {
    borderBottomWidth: 1,
    transform: [{ translateY: 2.5 }],
    backgroundColor: "#FEF9C3",
  },
  impactTeaserLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  impactBadge: {
    width: 42,
    height: 42,
    borderRadius: rounded.full,
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
    alignItems: "center",
    justifyContent: "center",
  },
  impactTextWrap: {
    flex: 1,
    gap: 3,
  },
  rankRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  rankText: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.primary,
    fontFamily: typography.fontFamily.bold,
  },
  rankSub: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.onSurface,
    fontFamily: typography.fontFamily.bold,
  },
  teaserProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  teaserTrack: {
    flex: 1,
    maxWidth: 100,
    height: 6,
    backgroundColor: "#FEF3C7",
    borderRadius: rounded.full,
    overflow: "hidden",
  },
  teaserFill: {
    height: "100%",
    backgroundColor: "#D97706",
    borderRadius: rounded.full,
  },
  impactStatusText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  chevronWrap: {
    paddingLeft: 6,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  actionCardPressable: {
    width: "48%",
  },
  actionCard: {
    width: "100%",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  actionCardVoicePressed: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    borderBottomColor: colors.primary,
    backgroundColor: "rgba(0, 110, 28, 0.06)",
    transform: [{ translateY: 2.5 }],
  },
  actionCardDiscussionsPressed: {
    borderBottomWidth: 1,
    borderColor: "#B45309",
    borderBottomColor: "#B45309",
    backgroundColor: "rgba(205, 167, 33, 0.1)",
    transform: [{ translateY: 2.5 }],
  },
  actionCardLeaderboardPressed: {
    borderBottomWidth: 1,
    borderColor: colors.secondary,
    borderBottomColor: colors.secondary,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    transform: [{ translateY: 2.5 }],
  },
  actionCardSharePressed: {
    borderBottomWidth: 1,
    borderColor: "#0284C7",
    borderBottomColor: "#0284C7",
    backgroundColor: "rgba(2, 132, 199, 0.08)",
    transform: [{ translateY: 2.5 }],
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
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
    width: 260,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    gap: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  voiceStoryCardPressed: {
    borderBottomWidth: 1,
    transform: [{ translateY: 2.5 }],
    backgroundColor: "rgba(0, 110, 28, 0.03)",
  },
  voiceStoryCardPlaying: {
    borderColor: colors.primary,
    borderBottomColor: colors.primary,
    backgroundColor: "#F4F9F2",
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
    fontWeight: "700",
    color: colors.onSurface,
  },
  storyAuthorLoc: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  langTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: "rgba(0, 110, 28, 0.15)",
  },
  langTagText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
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
    borderWidth: 1,
    borderColor: "transparent",
  },
  playerBarActive: {
    backgroundColor: colors.surfaceContainerLowest,
    borderColor: "rgba(0, 110, 28, 0.25)",
  },
  playBtn: {
    width: 30,
    height: 30,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  playBtnActive: {
    backgroundColor: colors.secondary,
  },
  waveSample: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    height: 22,
  },
  waveBar: {
    width: 3,
    borderRadius: 2,
  },
  storyDuration: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  miniTaraTakeaway: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(217, 119, 6, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.sm,
    borderLeftWidth: 2,
    borderLeftColor: "#D97706",
  },
  miniTaraTakeawayText: {
    flex: 1,
    fontSize: 11,
    fontWeight: "600",
    color: "#B45309",
  },
  storyFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: "rgba(190, 202, 185, 0.25)",
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
  listensRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  playsCountText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  contribCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    gap: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  contribCardPressed: {
    borderBottomWidth: 1,
    transform: [{ translateY: 2.5 }],
    backgroundColor: "rgba(0, 110, 28, 0.02)",
  },
  contribHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "relative",
    paddingRight: 85,
  },
  contribAuthorRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  authorTextContainer: {
    flex: 1,
  },
  contribAvatar: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  contribAvatarInitial: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  contribAuthorNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "nowrap",
  },
  contribAuthorName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
    flexShrink: 1,
  },
  authorBadgePill: {
    backgroundColor: "rgba(205, 167, 33, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: rounded.full,
  },
  authorBadgePillText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#B45309",
  },
  contribMeta: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  typeBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  typeBadgeText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 0.3,
  },
  contribTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
    marginTop: 2,
    lineHeight: 20,
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
    gap: 3,
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
  taraActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  taraActionText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  contribFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.md,
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(190, 202, 185, 0.3)",
  },
  contribFooterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  contribFooterBtnActive: {
    backgroundColor: "rgba(0, 110, 28, 0.08)",
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

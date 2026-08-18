import React, { useState } from "react";
import {
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

const TABS: { id: ContributionType | "all"; label: string }[] = [
  { id: "all", label: "All Posts" },
  { id: "practice", label: "Practices" },
  { id: "tip", label: "Tips" },
  { id: "question", label: "Questions" },
];

export default function ContributionsScreen() {
  const {
    contributions,
    likeContribution,
    addContribution,
    addReplyToContribution,
  } = useCommunity();

  const [activeTab, setActiveTab] = useState<ContributionType | "all">("all");
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [selectedContribId, setSelectedContribId] = useState<string | null>(null);

  // New post fields
  const [postType, setPostType] = useState<ContributionType>("practice");
  const [postCategory, setPostCategory] = useState<ContributionCategory>("soil");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  // Reply field
  const [replyText, setReplyText] = useState("");

  const filteredContributions = contributions.filter((c) => {
    if (activeTab === "all") return true;
    return c.type === activeTab;
  });

  const selectedContribution = contributions.find((c) => c.id === selectedContribId);

  const handleCreatePost = () => {
    if (!postTitle.trim() || !postContent.trim()) return;
    addContribution({
      type: postType,
      category: postCategory,
      title: postTitle.trim(),
      content: postContent.trim(),
    });
    setPostTitle("");
    setPostContent("");
    setPostModalVisible(false);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedContribId) return;
    addReplyToContribution(selectedContribId, replyText.trim());
    setReplyText("");
    setReplyModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Discussions & Q&A</Text>
        <Pressable
          style={styles.newPostBtn}
          onPress={() => setPostModalVisible(true)}
        >
          <MaterialIcons name="add" size={22} color={colors.white} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {TABS.map((tab) => (
          <Pressable
            key={tab.id}
            style={[styles.tabItem, activeTab === tab.id && styles.tabItemActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredContributions.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={styles.authorRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarLetter}>
                    {item.author.name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <View style={styles.nameRow}>
                    <Text style={styles.authorName}>{item.author.name}</Text>
                    {item.author.badge && (
                      <View style={styles.badgePill}>
                        <Text style={styles.badgePillText}>
                          {item.author.badge}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.metaText}>
                    {item.author.location} • {item.createdAt}
                  </Text>
                </View>
              </View>
              <View style={styles.typePill}>
                <Text style={styles.typePillText}>{item.type.toUpperCase()}</Text>
              </View>
            </View>

            {/* Title & Body */}
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.content}</Text>

            {/* Tara Verified Response Box */}
            {item.taraVerifiedAnswer && (
              <View style={styles.taraBox}>
                <View style={styles.taraHeader}>
                  <MaterialIcons name="verified" size={16} color={colors.primary} />
                  <Text style={styles.taraTag}>
                    {item.taraVerifiedAnswer.verifiedBy}
                  </Text>
                </View>
                <Text style={styles.taraAnswerText}>
                  {item.taraVerifiedAnswer.text}
                </Text>
                {item.taraVerifiedAnswer.actionableStep && (
                  <View style={styles.taraActionRow}>
                    <MaterialIcons name="arrow-forward" size={14} color={colors.primary} />
                    <Text style={styles.taraActionText}>
                      {item.taraVerifiedAnswer.actionableStep}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Replies Preview */}
            {item.replies.length > 0 && (
              <View style={styles.repliesList}>
                {item.replies.slice(0, 2).map((rep) => (
                  <View key={rep.id} style={styles.replyItem}>
                    <Text style={styles.replyAuthor}>{rep.authorName}:</Text>
                    <Text style={styles.replyText}>{rep.text}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Footer Buttons */}
            <View style={styles.cardFooter}>
              <Pressable
                style={styles.actionBtn}
                onPress={() => likeContribution(item.id)}
              >
                <MaterialIcons
                  name={item.isLiked ? "thumb-up" : "thumb-up-off-alt"}
                  size={18}
                  color={item.isLiked ? colors.primary : colors.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.actionBtnText,
                    item.isLiked && { color: colors.primary, fontWeight: "700" },
                  ]}
                >
                  {item.likesCount} Helpful
                </Text>
              </Pressable>

              <Pressable
                style={styles.actionBtn}
                onPress={() => {
                  setSelectedContribId(item.id);
                  setReplyModalVisible(true);
                }}
              >
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={18}
                  color={colors.onSurfaceVariant}
                />
                <Text style={styles.actionBtnText}>
                  {item.repliesCount} Replies
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

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
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>New Contribution</Text>
              <Pressable onPress={() => setPostModalVisible(false)}>
                <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>

            <View style={styles.pillRow}>
              {(["practice", "tip", "question"] as ContributionType[]).map((t) => (
                <Pressable
                  key={t}
                  style={[styles.typePillBtn, postType === t && styles.typePillBtnActive]}
                  onPress={() => setPostType(t)}
                >
                  <Text
                    style={[
                      styles.typePillBtnText,
                      postType === t && styles.typePillBtnTextActive,
                    ]}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Title of your post or question..."
              placeholderTextColor={colors.outlineVariant}
              value={postTitle}
              onChangeText={setPostTitle}
            />

            <TextInput
              style={[styles.input, { height: 110, textAlignVertical: "top" }]}
              placeholder="Share the details, practical tips, or questions for fellow farmers..."
              placeholderTextColor={colors.outlineVariant}
              multiline
              value={postContent}
              onChangeText={setPostContent}
            />

            <TactileButton
              title="Publish Contribution"
              icon="send"
              variant="primary"
              disabled={!postTitle.trim() || !postContent.trim()}
              onPress={handleCreatePost}
            />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Reply Sheet Modal */}
      <Modal
        visible={replyModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReplyModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setReplyModalVisible(false)}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>
                Replies to {selectedContribution?.author.name}
              </Text>
              <Pressable onPress={() => setReplyModalVisible(false)}>
                <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>

            <ScrollView style={{ maxHeight: 250 }}>
              {selectedContribution?.replies.map((r) => (
                <View key={r.id} style={styles.fullReplyCard}>
                  <View style={styles.replyHeader}>
                    <Text style={styles.replyAuthorName}>{r.authorName}</Text>
                    <Text style={styles.replyTime}>{r.createdAt}</Text>
                  </View>
                  <Text style={styles.replyContent}>{r.text}</Text>
                </View>
              ))}
              {selectedContribution?.replies.length === 0 && (
                <Text style={styles.noRepliesText}>
                  No replies yet. Be the first to share your experience!
                </Text>
              )}
            </ScrollView>

            <View style={styles.replyInputRow}>
              <TextInput
                style={styles.replyInputField}
                placeholder="Write a helpful response..."
                placeholderTextColor={colors.outlineVariant}
                value={replyText}
                onChangeText={setReplyText}
              />
              <Pressable style={styles.sendReplyBtn} onPress={handleSendReply}>
                <MaterialIcons name="send" size={20} color={colors.white} />
              </Pressable>
            </View>
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
  newPostBtn: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.3)",
    gap: spacing.xs,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabItemActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
  scrollContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  avatar: {
    width: 38,
    height: 38,
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
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
  },
  badgePill: {
    backgroundColor: "rgba(205, 167, 33, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: rounded.full,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#B45309",
  },
  metaText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  typePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLow,
  },
  typePillText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
    lineHeight: 20,
  },
  cardBody: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  taraBox: {
    backgroundColor: "rgba(0, 110, 28, 0.05)",
    borderRadius: rounded.lg,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    gap: 3,
  },
  taraHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  taraTag: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  taraAnswerText: {
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
  repliesList: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: spacing.xs,
    gap: 4,
  },
  replyItem: {
    flexDirection: "row",
    gap: 4,
  },
  replyAuthor: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onSurface,
  },
  replyText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.md,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: "rgba(190, 202, 185, 0.3)",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionBtnText: {
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
    maxHeight: "85%",
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  pillRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  typePillBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
  },
  typePillBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typePillBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurface,
  },
  typePillBtnTextActive: {
    color: colors.white,
  },
  input: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  fullReplyCard: {
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    gap: 2,
  },
  replyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  replyAuthorName: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.onSurface,
  },
  replyTime: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  replyContent: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  noRepliesText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    paddingVertical: spacing.md,
  },
  replyInputRow: {
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "center",
  },
  replyInputField: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 13,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  sendReplyBtn: {
    width: 42,
    height: 42,
    borderRadius: rounded.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

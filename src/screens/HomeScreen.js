import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ACTIVITIES, HERO_IMAGE } from '../data/activities';
import { useQuote } from '../context/QuoteContext';
import { COLORS } from '../theme';

export default function HomeScreen({ navigation }) {
  const { selected, toggleActivity, isSelected } = useQuote();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroSection}>
        <View style={styles.heroTextWrap}>
          <Text style={styles.heroTitle}>Discover Guided Outdoor Experiences in Western Cape</Text>
          <Text style={styles.heroSubtitle}>
            Hiking, ziplining, kayaking, and team challenges for all ages. Professional guides, breathtaking landscapes, and unforgettable memories await.
          </Text>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={styles.bookButtonText}>Explore Experiences</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={18}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <Image source={HERO_IMAGE} style={styles.heroImage} resizeMode="cover" />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Activities</Text>
      </View>

      <View style={styles.cardsGrid}>
        {ACTIVITIES.map((activity) => {
          const active = isSelected(activity.id);
          return (
            <View key={activity.id} style={styles.card}>
              <View style={styles.cardImageWrap}>
                <Image source={activity.image} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.priceBadge}>
                  <Text style={styles.priceText}>R{activity.price}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{activity.name}</Text>
                <Text style={styles.cardDescription}>{activity.description}</Text>

                <View style={styles.bulletList}>
                  <View style={styles.bulletRow}>
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={16}
                      color={COLORS.accent}
                    />
                    <Text style={styles.include}>{activity.duration}</Text>
                  </View>

                  {activity.includes.map((inc) => (
                    <View key={inc} style={styles.bulletRow}>
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={16}
                        color={COLORS.accent}
                      />
                      <Text style={styles.include}>{inc}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.selectButton, active && styles.selectButtonActive]}
                  onPress={() => toggleActivity(activity)}
                >
                  <MaterialCommunityIcons
                    name={active ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                    size={18}
                    color={active ? COLORS.white : COLORS.primary}
                  />
                  <Text
                    style={[
                      styles.selectButtonText,
                      active && styles.selectButtonTextActive,
                    ]}
                  >
                    {active ? 'Added to Quote' : 'Add to Quote'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f2' },
  content: { paddingBottom: 40 },

  heroSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 10,
    paddingBottom: 28,
    backgroundColor: '#f3f3f2',
    minHeight: 500,
  },
  heroTextWrap: {
    flex: 1,
    maxWidth: '48%',
    paddingRight: 20,
  },
  heroTitle: {
    fontSize: 58,
    lineHeight: 62,
    fontWeight: '700',
    color: '#133f34',
    letterSpacing: -1.5,
    marginBottom: 20,
  },
  heroSubtitle: {
    fontSize: 17,
    lineHeight: 30,
    color: '#4b5d57',
    marginBottom: 28,
    maxWidth: 560,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 26,
    paddingVertical: 18,
    borderRadius: 999,
    alignSelf: 'flex-start',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  bookButtonText: { fontSize: 18, fontWeight: '700', color: '#fff' },
  heroImage: {
    width: '46%',
    minWidth: 420,
    height: 520,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#dfe5e1',
    backgroundColor: '#dfe5e1',
  },

  sectionHeader: {
    paddingHorizontal: 32,
    marginTop: 8,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#133f34',
  },

  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 18,
    paddingHorizontal: 32,
  },
  card: {
    width: '48%',
    minWidth: 330,
    backgroundColor: '#f5f5f4',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#dfe5e1',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardImageWrap: {
    position: 'relative',
    height: 220,
    backgroundColor: '#eaf1ea',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eaf1ea',
  },
  priceBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#dff7e7',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  priceText: { color: COLORS.primary, fontWeight: '700', fontSize: 12 },
  cardBody: { padding: 18 },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#173f34',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4c564f',
    marginBottom: 14,
  },
  bulletList: {
    gap: 8,
    marginBottom: 14,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  include: { fontSize: 15, color: '#406355', lineHeight: 22 },

  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dfe5e1',
    backgroundColor: '#f7f7f6',
    gap: 8,
  },
  selectButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  selectButtonText: { color: '#1a3d33', fontWeight: '600', fontSize: 15 },
  selectButtonTextActive: { color: COLORS.white },
});

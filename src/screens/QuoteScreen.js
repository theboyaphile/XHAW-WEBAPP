import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuote } from '../context/QuoteContext';
import { COLORS } from '../theme';

export default function QuoteScreen({ navigation }) {
  const { selected, removeActivity, total } = useQuote();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Selected Activities</Text>
        <Text style={styles.subtitle}>
          Review, remove, or save your quote before submitting your booking request.
        </Text>
      </View>

      {selected.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            No activities selected yet. Visit the Home tab to build your quote.
          </Text>
        </View>
      ) : (
        selected.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>R{item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeActivity(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Quote Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>R{total}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Activities</Text>
          <Text style={styles.summaryValue}>{selected.length}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R{total}</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.primaryButtonText}>Add More Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Contact')}
        >
          <Text style={styles.secondaryButtonText}>Continue to Contact</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 32 },
  header: { marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: COLORS.primary, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', marginTop: 8 },

  emptyBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  emptyText: { color: COLORS.textMuted, textAlign: 'center' },

  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  itemName: { fontSize: 16, fontWeight: '600', color: COLORS.primary },
  itemPrice: { color: COLORS.secondary, marginTop: 4 },
  removeButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  removeButtonText: { color: COLORS.danger, fontWeight: '600' },

  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    marginTop: 12,
  },
  summaryTitle: { color: COLORS.white, fontSize: 20, fontWeight: '700', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { color: 'rgba(255,255,255,0.8)' },
  summaryValue: { color: COLORS.white },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.25)',
    paddingTop: 10,
    marginTop: 4,
  },
  totalLabel: { color: COLORS.white, fontWeight: '700', fontSize: 16 },
  totalValue: { color: COLORS.white, fontWeight: '700', fontSize: 16 },

  primaryButton: {
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButtonText: { color: COLORS.primary, fontWeight: '700' },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: { color: COLORS.white, fontWeight: '700' },
});

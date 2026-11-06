import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuote } from '../context/QuoteContext';
import { COLORS } from '../theme';

const GROUP_OPTIONS = ['Solo', 'Couple', 'Family', 'Corporate'];

export default function ContactScreen() {
  const { selected, total } = useQuote();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [groupType, setGroupType] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    const errors = [];

    if (!fullName.trim()) errors.push('• Full Name is required.');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim()))
      errors.push('• A valid email address is required.');

    if (date.trim()) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date.trim())) {
        errors.push('• Please use the format YYYY-MM-DD for the date.');
      } else {
        const selectedDate = new Date(date.trim());
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today)
          errors.push('• Preferred date cannot be in the past.');
      }
    }

    if (errors.length > 0) {
      Alert.alert('Please fix the following:', errors.join('\n'));
      return;
    }

    Alert.alert('Success', 'Your booking request has been submitted successfully!');
    setFullName('');
    setEmail('');
    setGroupType('');
    setDate('');
    setNotes('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Plan Your Next Escape</Text>
      <Text style={styles.subtitle}>
        Tell us what you want to do and our team will help you build the perfect experience.
      </Text>

      <View style={styles.quoteCard}>
        <Text style={styles.quoteCardTitle}>Your Selected Activities</Text>
        {selected.length === 0 ? (
          <Text style={styles.quoteEmpty}>No activities selected yet.</Text>
        ) : (
          selected.map((item) => (
            <View key={item.id} style={styles.quoteRow}>
              <Text style={styles.quoteName}>{item.name}</Text>
              <Text style={styles.quotePrice}>R{item.price}</Text>
            </View>
          ))
        )}
        <View style={[styles.quoteRow, styles.quoteTotalRow]}>
          <Text style={styles.quoteTotalLabel}>Total</Text>
          <Text style={styles.quoteTotalValue}>R{total}</Text>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Jane Doe"
          placeholderTextColor="#9ca3af"
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="jane@example.com"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Group Type</Text>
        <View style={styles.groupRow}>
          {GROUP_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.groupButton,
                groupType === option && styles.groupButtonActive,
              ]}
              onPress={() => setGroupType(option)}
            >
              <Text
                style={[
                  styles.groupButtonText,
                  groupType === option && styles.groupButtonTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Preferred Date (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="2025-12-31"
          placeholderTextColor="#9ca3af"
        />

        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Tell us about your group needs..."
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Booking Request</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Contact details</Text>
        <Text style={styles.contactLine}>📧 info@adventureescapesa.co.za</Text>
        <Text style={styles.contactLine}>📞 +27 (0)21 555 0199</Text>
        <Text style={styles.contactLine}>🕒 Mon – Sun, 07:00 – 18:00</Text>
        <Text style={styles.contactLine}>📍 Western Cape, South Africa</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 32 },

  title: { fontSize: 26, fontWeight: '700', color: COLORS.primary },
  subtitle: { fontSize: 14, color: COLORS.textMuted, marginTop: 6, marginBottom: 20 },

  quoteCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  quoteCardTitle: { color: COLORS.white, fontSize: 18, fontWeight: '700', marginBottom: 10 },
  quoteEmpty: { color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' },
  quoteRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  quoteName: { color: 'rgba(255,255,255,0.9)' },
  quotePrice: { color: 'rgba(255,255,255,0.9)' },
  quoteTotalRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.25)',
    paddingTop: 10,
    marginTop: 8,
  },
  quoteTotalLabel: { color: COLORS.white, fontWeight: '700' },
  quoteTotalValue: { color: COLORS.white, fontWeight: '700' },

  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 20,
  },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.textDark, marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textDark,
    backgroundColor: '#fff',
  },
  textArea: { height: 110, textAlignVertical: 'top' },

  groupRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  groupButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 8,
  },
  groupButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  groupButtonText: { color: COLORS.primary, fontWeight: '600' },
  groupButtonTextActive: { color: COLORS.white },

  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 22,
  },
  submitButtonText: { color: COLORS.white, fontWeight: '700', fontSize: 15 },

  contactCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  contactTitle: { fontSize: 18, fontWeight: '700', color: COLORS.primary, marginBottom: 10 },
  contactLine: { color: COLORS.textMuted, marginBottom: 6 },
});

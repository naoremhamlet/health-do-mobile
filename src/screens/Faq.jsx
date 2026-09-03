import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  LayoutAnimation, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, PADDINGS, SHADOWS, SIZES } from '../constants';
import TopHeader from '../components/TopHeader';


const TopSection = ({ navigation }) => {
    return (
        <TouchableOpacity 
          style={[styles.iconCircle, SHADOWS.medium]} 
          onPress={() => navigation.navigate('Support')}
        >
            <Ionicons name='chatbubble-ellipses-outline' size={24} />
        </TouchableOpacity>
    )
}

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity 
      style={[styles.faqCard, expanded && styles.activeCard]} 
      onPress={toggleExpand} 
      activeOpacity={0.7}
    >
      <View style={styles.questionRow}>
        <Text style={[styles.questionText, expanded && styles.activeQuestionText]}>
          {question}
        </Text>
        <Ionicons 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={18} 
          color={expanded ? COLORS.primary : COLORS.gray} 
        />
      </View>
      {expanded && (
        <View style={styles.answerContainer}>
          <View style={styles.divider} />
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function Faq({ navigation }) {
  const faqs = useSelector(state => state.content.faqs);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(item => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
  });

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader 
        title="FAQ" 
        goto={() => navigation.goBack()}
        component={<TopSection navigation={navigation} />} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.introHeader}>
          <Text style={styles.title}>Find answers to the most frequently asked questions about Health do!</Text>
          <Text style={styles.subTitle}>Tap a question below to expand the answer.</Text>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search FAQs..."
            placeholderTextColor={COLORS.placehoder}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>

        {filteredFaqs.length === 0 ? (
          <View style={styles.noResults}>
            <MaterialCommunityIcons name="file-search-outline" size={36} color={COLORS.gray2} />
            <Text style={styles.noResultsText}>No FAQs match "{search}"</Text>
          </View>
        ) : (
          filteredFaqs.map(item => (
            <FAQItem key={item.id} question={item.question} answer={item.answer} />
          ))
        )}

        {/* Support Section */}
        <View style={styles.supportCard}>
          <MaterialCommunityIcons name="chat-question-outline" size={32} color={COLORS.primary} />
          <Text style={styles.supportTitle}>Still have questions?</Text>
          <Text style={styles.supportDesc}>
            If you can't find what you're looking for, please{' '}
            <Text style={styles.supportAnchor} onPress={() => navigation.navigate('Support')}>contact</Text>
            {' '}our support team.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
},
  scrollContent: {
    paddingHorizontal: PADDINGS.horizonatal,
    paddingBottom: 40,
  },
  introHeader: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.black,
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 8,
    lineHeight: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray2,
  },
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  activeCard: {
    borderColor: COLORS.primary + '30',
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.black,
    flex: 1,
    paddingRight: 10,
  },
  activeQuestionText: {
    color: COLORS.primary,
  },
  answerContainer: {
    marginTop: 15,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginBottom: 12,
  },
  answerText: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 22,
    fontWeight: '500',
  },
  supportCard: {
    marginTop: 30,
    backgroundColor: COLORS.primary + '08',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '15',
    borderStyle: 'dashed',
  },
  supportTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.black,
    marginTop: 10,
  },
  supportDesc: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  supportAnchor: {
    textDecorationLine: 'underline',
    color: COLORS.primary,
    fontWeight: '900',
  }
});
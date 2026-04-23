import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import { COLORS, PADDINGS, SHADOWS, SIZES } from '../constants';
import TopHeader from '../components/TopHeader';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const TopSection = () => {
    return (
        <TouchableOpacity style={[styles.iconCircle, SHADOWS.medium]} >
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
  const faqs = [
    {
      id: 1,
      question: "How long does delivery take?",
      answer: "Our standard delivery time is 30-45 minutes depending on your location and the restaurant's preparation time."
    },
    {
      id: 2,
      question: "Can I customize my bowl ingredients?",
      answer: "Yes! While browsing, tap on 'Customize' to add or remove specific ingredients to suit your dietary needs."
    },
    {
      id: 3,
      question: "Are there any subscription plans?",
      answer: "We offer 'Health Pass' which gives you free delivery and 10% off on all orders for ₹199/month."
    },
    {
      id: 4,
      question: "How do I cancel my order?",
      answer: "You can cancel your order within 2 minutes of placing it. After that, the kitchen starts preparation."
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader 
        title="FAQ" 
        goto={() => navigation.goBack()}
        component={<TopSection />} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.introHeader}>
          <Text style={styles.title}>Find answers to the most frequently asked questions about Health do!</Text>
        </View>

        {faqs.map(item => (
          <FAQItem key={item.id} question={item.question} answer={item.answer} />
        ))}

        {/* Support Section */}
        <View style={styles.supportCard}>
          <MaterialCommunityIcons name="chat-question-outline" size={32} color={COLORS.primary} />
          <Text style={styles.supportTitle}>Still have questions?</Text>
          <Text style={styles.supportDesc}>If you can't find what you're looking for, please <Text style={styles.supportAnchor}>contact</Text> our support team.</Text>
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
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
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
    backgroundColor: '#F5F5F5',
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
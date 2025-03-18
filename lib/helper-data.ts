import { Brain, icons, ImageIcon, MessageSquare, Sparkles, Video } from "lucide-react";

export const featuresArray = [
  {
    title: 'AI Analysis',
    description: 'Deep Insights and analysis of your content',
    icon: Brain,
    iconBg: 'bg-blue-200',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Smart Transcription',
    description: 'Accurate Transcriptions and analysis of your videos. Create subtitles, blogs etc.',
    icon: MessageSquare,
    iconBg: 'bg-green-200',
    iconColor: 'text-green-600'
  },
  {
    title: 'Thumbnail Generation',
    description: 'Generate Insightful thumbnails for your content',
    icon: ImageIcon,
    iconBg: 'bg-purple-200',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Title Generation',
    description: 'Generate titles for your content',
    icon: MessageSquare,
    iconBg: 'bg-yellow-200',
    iconColor: 'text-yellow-600'
  },
  {
    title: 'Shot Script',
    description: 'Generate Shot scripts for your content',
    icon: Video,
    iconBg: 'bg-red-200',
    iconColor: 'text-red-600'
  },
  {
    title: 'Discuss with your Agent',
    description: 'Discuss your content with your AI Agent',
    icon: Sparkles,
    iconBg: 'bg-orange-200',
    iconColor: 'text-orange-600'
  }
];

export const stepsArray = [
  {
    title: '1. Connect your content',
    description: 'Share your Video URL and let the Agent take over',
    icon: Video
  },
  {
    title: '2. AI Agent Analysis',
    description: 'Let your Agent analyze your content to generate insights',
    icon: Brain
  },
  {
    title: '3. Receive Intelligence',
    description: 'Get Actionable Insights and strategic recommendations',
    icon: MessageSquare
  },
]
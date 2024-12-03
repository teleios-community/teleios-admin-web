export type CourseType = {
  id: number;
  learning_objectives: string[];
  published_at: string;
  description: string;
  status: 'draft';
  created_by: number;
  short_description: string;
  slug: string;
  last_updated_by: number;
  thumbnail_url: string;
  tags: string[];
  difficulty_level: DifficultyLevelType;
  syllabus: null;
  estimated_hours: number;
  resources: null;
  prerequisites: string;
  created_at: Date;
  title: string;
  updated_at: Date;
};

type DifficultyLevelType = 'beginner' | 'intermediate';

export type LearningPathType = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  difficulty_level: DifficultyLevelType;
  estimated_hours: number;
  learning_objectives: string[];
  prerequisites: string;
  status: 'draft' | 'archived';
  created_at: Date;
  updated_at: Date;
  created_by: number;
  last_updated_by: number;
  slug: string;
};

export type SectionType = {
  id: number;
  title: string;
  description: string;
  order: number;
  estimated_minutes: string;
  is_free: boolean;
  course_id: number;
  estimated_hours: number;
  created_at: Date;
  updated_at: Date;
  lessons: [];
};

export type LessonType = {
  id: number;
  title: string;
  content_type: 'text';
  content: string;
  video_url: string;
  video_duration: string;
  order: number;
  is_free: boolean;
  slug: string;
  section_id: 3;
  created_at: Date;
  updated_at: Date;
  attachments: [];
  additional_resources: [];
};
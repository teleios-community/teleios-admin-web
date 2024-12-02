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
  status: 'draft';
  created_at: Date;
  updated_at: Date;
  created_by: number;
  last_updated_by: number;
  slug: string;
};

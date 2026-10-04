/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabaseClient } from './client';
import { Course, CourseProgress } from '../../types';

/**
 * Saves student course progress to Supabase
 */
export async function persistCourseProgress(progress: CourseProgress): Promise<void> {
  if (!supabaseClient) return;

  const { error } = await supabaseClient.from('course_progress').upsert({
    id: `${progress.userId}_${progress.courseId}`,
    user_email: progress.userId,
    course_id: progress.courseId,
    completed_lesson_ids: progress.completedLessonIds,
    last_lesson_id: progress.lastLessonId,
    progress_percent: progress.progressPercent,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.warn('[BDIH Progress] Upsert error:', error.message);
  }
}

/**
 * Fetches user's saved course progress records
 */
export async function fetchUserCourseProgress(userEmail: string): Promise<Record<string, CourseProgress>> {
  if (!supabaseClient) return {};

  const { data, error } = await supabaseClient
    .from('course_progress')
    .select('*')
    .eq('user_email', userEmail);

  if (error || !data) return {};

  const map: Record<string, CourseProgress> = {};
  data.forEach((row: any) => {
    map[row.course_id] = {
      userId: row.user_email,
      courseId: row.course_id,
      completedLessonIds: row.completed_lesson_ids || [],
      lastLessonId: row.last_lesson_id || '',
      progressPercent: row.progress_percent || 0,
      updatedAt: row.updated_at,
    };
  });

  return map;
}

/**
 * Saves new course or edits existing course
 */
export async function saveCourseRecord(course: Course): Promise<boolean> {
  if (!supabaseClient) return false;

  const { error } = await supabaseClient.from('courses').upsert({
    id: course.id,
    slug: course.slug,
    title_en: course.title_en,
    title_bn: course.title_bn,
    short_desc_en: course.short_desc_en,
    short_desc_bn: course.short_desc_bn,
    full_desc_en: course.full_desc_en,
    full_desc_bn: course.full_desc_bn,
    price_usd: course.price_usd,
    price_bdt: course.price_bdt,
    discount_usd: course.discount_usd,
    discount_bdt: course.discount_bdt,
    level: course.level,
    thumbnail: course.thumbnail,
    promo_video_url: course.promo_video_url,
    duration_hours: course.duration_hours,
    total_lessons: course.total_lessons,
    instructor_name: course.instructor_name,
    instructor_role: course.instructor_role,
    instructor_bio: course.instructor_bio,
    is_published: course.is_published,
    is_featured: course.is_featured,
    tags: course.tags,
    learning_outcomes_en: course.learning_outcomes_en,
    learning_outcomes_bn: course.learning_outcomes_bn,
    prerequisites_en: course.prerequisites_en,
    prerequisites_bn: course.prerequisites_bn,
    updated_at: new Date().toISOString(),
  });

  return !error;
}

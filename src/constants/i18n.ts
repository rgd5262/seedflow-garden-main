export type Locale = 'en' | 'ko'

export const DEFAULT_LOCALE: Locale = 'ko'

// Month and weekday names
const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'] as const
const MONTHS_EN_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const
const WEEKDAYS_EN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] as const

const MONTHS_KO = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] as const
const MONTHS_KO_SHORT = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] as const
const WEEKDAYS_KO = ['일','월','화','수','목','금','토'] as const

export const MONTHS: Record<Locale, readonly string[]> = {
  en: MONTHS_EN,
  ko: MONTHS_KO,
}
export const MONTHS_SHORT: Record<Locale, readonly string[]> = {
  en: MONTHS_EN_SHORT,
  ko: MONTHS_KO_SHORT,
}
export const WEEKDAYS: Record<Locale, readonly string[]> = {
  en: WEEKDAYS_EN,
  ko: WEEKDAYS_KO,
}

// UI strings used across the app
export type UIStrings = typeof STRINGS['en']

export const STRINGS = {
  en: {
    app_title: 'Daily Garden',
    nav_year_view: 'Year View',
    nav_today: 'Today',
    year_overview_title: (year: number) => `${year} Garden Overview`,
    year_overview_subtitle: 'Click any month to tend your garden',
    year_summary_completed: 'Total Completed',
    year_summary_growing: 'Currently Growing',
    year_summary_progress: 'Year Progress',
    legend_less: 'Less',
    legend_more: 'More',

    monthly_header_subtitle: 'Plant your daily seeds and watch your garden grow',
    monthly_stats_planted: 'Seeds Planted',
    monthly_stats_grown: 'Plants Grown',
    monthly_stats_completion: 'Completion',

    seed_dialog_title: 'Plant Your Daily Seed',
    seed_dialog_desc: (dateLabel: string) => `What do you want to accomplish on ${dateLabel}?`,
    seed_label_title: 'Goal Title',
    seed_placeholder_title: 'Learn something new, exercise, write...',
    seed_label_description: 'Description (optional)',
    seed_placeholder_description: 'Add more details about your plan...',
    seed_btn_cancel: 'Cancel',
    seed_btn_submit: 'Plant Seed 🌱',

    actions_title: 'Edit Plan',
    actions_desc: 'Update title/description, toggle state, or delete this plan.',
    actions_label_title: 'Title',
    actions_label_description: 'Description',
    actions_btn_cancel: 'Cancel',
    actions_btn_save: 'Save',
    actions_btn_toggle_to_planted: 'Mark as Planted',
    actions_btn_toggle_to_completed: 'Mark as Completed',
    actions_btn_delete: 'Delete',

    toast_seed_planted_title: 'Seed Planted! 🌱',
    toast_seed_planted_desc: (title: string) => `Your plan for ${title} has been planted and is ready to grow.`,
    toast_already_planted_title: 'Already Planted',
    toast_already_planted_desc: 'You already have a plan for this day. Complete it first!',
    toast_completed_title: 'Plant Bloomed! 🌸',
    toast_completed_desc: (title?: string) => `Congratulations! You completed "${title ?? ''}". Your garden is growing beautifully.`,
    toast_updated_title: 'Plan Updated',
    toast_updated_desc: (title?: string) => `Saved changes${title ? ` to "${title}"` : ''}.`,
    toast_deleted_title: 'Plan Deleted',
    toast_deleted_desc: (title?: string) => title ? `Removed "${title}".` : 'Removed plan.',

    tooltip_empty_for_date: (date: string) => `Plant a seed for ${date}`,
    tooltip_plan: (title: string) => `Plan: ${title}`,
    tooltip_completed: (title: string) => `Completed: ${title}`,

    not_found_title: '404',
    not_found_message: 'Oops! Page not found',
    not_found_home: 'Return to Home',
  },
  ko: {
    app_title: 'Daily Garden',
    nav_year_view: 'Year View',
    nav_today: 'Today',
    year_overview_title: (year: number) => `${year} 정원 개요`,
    year_overview_subtitle: '월을 클릭해 정원을 가꿔보세요',
    year_summary_completed: '완료 합계',
    year_summary_growing: '성장 중',
    year_summary_progress: '연간 진행률',
    legend_less: '적음',
    legend_more: '많음',

    monthly_header_subtitle: '매일 씨앗을 심고 성장하는 정원을 만들어보세요',
    monthly_stats_planted: '심은 씨앗',
    monthly_stats_grown: '자란 식물',
    monthly_stats_completion: '완료율',

    seed_dialog_title: '오늘의 씨앗 심기',
    seed_dialog_desc: (dateLabel: string) => `${dateLabel}에 무엇을 이루고 싶나요?`,
    seed_label_title: '목표 제목',
    seed_placeholder_title: '새로운 것 배우기, 운동하기, 글쓰기...',
    seed_label_description: '설명 (선택)',
    seed_placeholder_description: '계획에 대해 더 자세히 적어주세요...',
    seed_btn_cancel: '취소',
    seed_btn_submit: '씨앗 심기 🌱',

    actions_title: '계획 수정',
    actions_desc: '제목/설명 수정, 상태 변경, 삭제가 가능합니다.',
    actions_label_title: '제목',
    actions_label_description: '설명',
    actions_btn_cancel: '취소',
    actions_btn_save: '저장',
    actions_btn_toggle_to_planted: '진행 중으로 표시',
    actions_btn_toggle_to_completed: '완료로 표시',
    actions_btn_delete: '삭제',

    toast_seed_planted_title: '씨앗을 심었어요! 🌱',
    toast_seed_planted_desc: (title: string) => `${title} 계획이 심어졌어요. 이제 자라날 거예요.`,
    toast_already_planted_title: '이미 심어졌어요',
    toast_already_planted_desc: '해당 날짜에는 이미 계획이 있어요. 먼저 완료해 주세요!',
    toast_completed_title: '꽃이 피었어요! 🌸',
    toast_completed_desc: (title?: string) => `축하합니다! "${title ?? ''}"을(를) 완료했어요. 정원이 아름답게 자라고 있어요.`,
    toast_updated_title: '계획이 업데이트되었어요',
    toast_updated_desc: (title?: string) => `${title ? `"${title}"` : '계획'} 변경 내용을 저장했어요.`,
    toast_deleted_title: '계획이 삭제되었어요',
    toast_deleted_desc: (title?: string) => title ? `"${title}"을(를) 삭제했어요.` : '계획을 삭제했어요.',

    tooltip_empty_for_date: (date: string) => `${date}에 씨앗 심기`,
    tooltip_plan: (title: string) => `계획: ${title}`,
    tooltip_completed: (title: string) => `완료: ${title}`,

    not_found_title: '404',
    not_found_message: '페이지를 찾을 수 없어요',
    not_found_home: '홈으로 돌아가기',
  },
} as const

// simple translator
export function t<K extends keyof UIStrings>(key: K, locale: Locale = DEFAULT_LOCALE): UIStrings[K] {
  return STRINGS[locale][key]
}

export function monthNames(locale: Locale = DEFAULT_LOCALE, short = false): readonly string[] {
  return short ? MONTHS_SHORT[locale] : MONTHS[locale]
}

export function weekdays(locale: Locale = DEFAULT_LOCALE): readonly string[] {
  return WEEKDAYS[locale]
}

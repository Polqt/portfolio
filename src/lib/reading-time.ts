import readingTime from 'reading-time';

export const getReadingTime = (body?: string): string => readingTime(body ?? '').text;

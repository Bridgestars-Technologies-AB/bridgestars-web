export type ChapterData = {
    public_id: string;
    name: string;
    chapter_nbr: number;
    paid: boolean;
};
export type CourseData = {
    public_id: string;
    name: string;
    course_nbr: number;
    description: string;
    color: string;
    chapters: Array<ChapterData>;
};

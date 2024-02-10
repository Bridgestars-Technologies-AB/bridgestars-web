export type GetCourseChapterData = {
    public_id: string;
    name: string;
    chapter_nbr: number;
    paid: boolean;
    next_problem_id: string;
    current_problem: number;
    total_problems: number;
};
export type GetCourseData = {
    public_id: string;
    name: string;
    course_nbr: number;
    description: string;
    color: string;
    chapters: Array<GetCourseChapterData>;
};
export type ListCoursesChapterData = {
    public_id: string;
    name: string;
    progress: number;
};
export type ListCoursesData = {
    public_id: string;
    name: string;
    course_nbr: number;
    description: string;
    color: string;
    chapters: Array<ListCoursesChapterData>;
};

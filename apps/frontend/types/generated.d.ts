export type Bid =
  | "PASS"
  | "1C"
  | "1D"
  | "1H"
  | "1S"
  | "2C"
  | "2D"
  | "2H"
  | "2S"
  | "3C"
  | "3D"
  | "3H"
  | "3S"
  | "4C"
  | "4D"
  | "4H"
  | "4S"
  | "5C"
  | "5D"
  | "5H"
  | "5S"
  | "6C"
  | "6D"
  | "6H"
  | "6S"
  | "7C"
  | "7D"
  | "7H"
  | "7S"
  | "1NT"
  | "2NT"
  | "3NT"
  | "4NT"
  | "5NT"
  | "6NT"
  | "7NT"
  | "DOUBLE"
  | "REDOUBLE";
export type BidAnalysisData = {
  correct: boolean;
  stars: number;
  next_problem_id: string;
  cards: Array<HandData>;
  solution: string;
  bidding: Array<BidData>;
  contract: Bid;
  finished: true;
};
export type BidData = {
  bid: Bid;
  explanation: string;
};
export type BiddingProblemData = {
  public_id: string;
  number: number;
  total: number;
  progress: number;
  presentation: string;
  hands_visible: number;
  cards: Array<HandData>;
  dealer: Direction;
  player: Direction;
  bidding: Array<BidData>;
};
export type CorrectBidData = {
  bid: string;
  explanation: string;
  bidding: Array<BidData>;
  correct: true;
  finished: false;
};
export type Direction = "N" | "E" | "W" | "S";
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
export type HandData = {
  player: Direction;
  S: string;
  H: string;
  D: string;
  C: string;
};
export type IncorrectBidData = {
  bid: Bid;
  explanation: string;
  correct: false;
  finished: false;
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
export type UserData = {
  public_id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
};

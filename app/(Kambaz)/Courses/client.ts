import axios from "axios";
import Course from "../Models/Course";
import Module from "../Models/Module";
import Assignment from "../Models/Assignment";
import Quiz from "../Models/Quiz";
import QuizSubmission from "../Models/QuizSubmission";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const SUBMISSIONS_API = `${HTTP_SERVER}/api/quiz-submissions`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: {name: string, course: string}) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
 const response = await axios.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
 return response.data;
};

export const updateModule = async (courseId: string, module: Module) => {
 const { data } = await axios.put(
   `${COURSES_API}/${courseId}/modules/${module._id}`,
   module
 );
 return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: {title: string, course: string}) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
 const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
 return response.data;
};

export const updateAssignment = async (_id: string, assignment: Assignment) => {
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

export const findAssignmentById = async (aid: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${aid}`);
  return response.data;
};

export const fetchAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(ENROLLMENTS_API);
  return data;
};

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(ENROLLMENTS_API, {
    courseId,
  });
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${ENROLLMENTS_API}/${courseId}`
  );
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
 const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
 return response.data;
};

// ---------------- Quizzes

export const findQuizzesForCourse = async (cid: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${cid}/quizzes`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: Quiz) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const updateQuiz = async (_id: string, quiz: Quiz) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const deleteQuiz = async (qid: string) => {
 const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${qid}`);
 return response.data;
};

export const findQuizById = async (cid: string, qid: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${cid}/quizzes/${qid}`
  );
  return response.data;
};

// ---------------- Quiz Submissions

export const createQuizSubmission = async (
  qid: string,
  submission: QuizSubmission
) => {
  const response = await axiosWithCredentials.post(
    `${SUBMISSIONS_API}/${qid}`,
    submission
  );
  return response.data;
};

export const findLatestQuizSubmissionsForCourseUser = async (uid: string) => {
  const response = await axiosWithCredentials.get(
    `${SUBMISSIONS_API}/user/${uid}`
  );
  return response.data;
};

export const findQuizSubmissionById = async (qsid: string) => {
  const response = await axiosWithCredentials.get(
    `${SUBMISSIONS_API}/${qsid}`
  );
  return response.data;
};

export const deleteQuizSubmission = async (qsid: string) => {
  const response = await axiosWithCredentials.delete(
    `${SUBMISSIONS_API}/${qsid}`
  );
  return response.data;
};

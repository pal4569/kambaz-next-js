"use client"
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import Course from "../Models/Course";
import { useDispatch } from "react-redux";
import { setCourses } from "../Courses/reducer";
import * as client from "../Courses/client";
import { useAppSelector } from "../hooks";
import { setEnrollments } from "../Enrollments/reducer";

export default function Dashboard() {
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { enrollments } = useAppSelector((state) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [displayMode, setDisplayMode] = useState<string>("published");
  const [course, setCourse] = useState<Course>({
    name: "New Course",
    description: "New Description",
  });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      if (!currentUser) {
        const courses = await client.fetchAllCourses();
        return dispatch(setCourses(courses));
      }
      const courses = displayMode === "published"
        ? await client.findMyCourses()
        : await client.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  }, [displayMode, dispatch, currentUser]);

  useEffect(() => {
    fetchCourses();
  }, [displayMode, currentUser]);

  const fetchEnrollments = async () => {
    if (currentUser) {
      const enrollments = await client.fetchAllEnrollments()
      dispatch(setEnrollments(enrollments));
    }
    else {
      dispatch(setEnrollments([]));
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [currentUser]);

  const onAddNewCourse = async () => {
    await client.createCourse(course);
    fetchCourses();
  };

  const onDeleteCourse = async (courseId: string) => {
    console.log(courseId)
    await client.deleteCourse(courseId);
    fetchCourses();
  };

  const onUpdateCourse = async (updated: Course) => {
    if (updated) {
      await client.updateCourse(updated);
      fetchCourses();
    }
  };

  function toggleEnrollments() {
    setDisplayMode(displayMode === "published" ? "all" : "published");
  }

  const toggleEnroll = async (isEnrolled: boolean, courseId: string) => {
    if (isEnrolled) {
      await client.unenrollFromCourse(courseId);
    }
    else {
      await client.enrollInCourse(courseId);
    }
    await fetchEnrollments();
    await fetchCourses();
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>Enrollments</h5>
         <button onClick={toggleEnrollments} className="btn btn-primary float-end" id="wd-add-new-course-click" >
           {displayMode === "published" ? "Enrollments" : "My Courses"}
         </button>
      <br />
      <hr />
      <h5>New Course
         <button onClick={onAddNewCourse} className="btn btn-primary float-end" id="wd-add-new-course-click" >
           Add
         </button>
      </h5>
      <br />
      <FormControl
        value={course?.name ?? ""}
        className="mb-2"
        onChange={(e) => {
          const updated = { ...course, name: e.target.value };
          setCourse(updated);
          console.log(updated);
        }}
      />
      <FormControl
        as="textarea"
        value={course?.description ?? ""}
        rows={3}
        onChange={(e) => {
          const updated = { ...course, description: e.target.value };
          setCourse(updated);
          console.log(updated);
        }}
      />
      <hr />
      <h2 id="wd-dashboard-published">
        {displayMode === "published" ? "Published Courses" : "All Courses"} ({courses.filter((course) => course && course._id).length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course) => course && course._id)
            .map((course: Course, index: number) => (
            <Col key={index} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                {editingCourse && editingCourse._id === course._id && (
                  <div>
                    <FormControl
                      value={editingCourse.name}
                      onChange={(e) =>
                        setEditingCourse({ 
                          ...editingCourse, 
                          name: e.target.value 
                        })
                      }
                    />

                    <FormControl
                      as="textarea"
                      value={editingCourse.description}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          description: e.target.value,
                        })
                      }
                    />

                    <button
                      className="btn btn-primary"
                      onClick={() => onUpdateCourse(editingCourse)}
                    >
                      Save
                    </button>
                  </div>
                )}
                <Link href={`/Courses/${course._id!}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </CardText>
                    <Button variant="primary"> Go </Button>
                    <button className="btn btn-danger"
                            onClick={(event) => {
                              event.preventDefault();
                              onDeleteCourse(course._id!);
                            }} >
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary float-end"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setEditingCourse({...course});
                      }}
                    >
                      Update
                    </button>
                  </CardBody>
                  {displayMode === "all" && (
                    <>
                      <br />
                      <br />
                      {(() => {
                        const isEnrolled = Array.isArray(enrollments) &&
                          enrollments.some(
                            (e) => e.user === currentUser?._id && e.course === course._id
                          );
                        return (
                          <button
                            className={`btn ${isEnrolled ? "btn-danger" : "btn-success"}`}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              toggleEnroll(isEnrolled, course._id!);
                            }}
                          >
                            {isEnrolled ? "Unenroll" : "Enroll"}
                          </button>
                        );
                      })()}
                    </>
                  )}
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);}
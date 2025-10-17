"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People/Table",
  ];

  return (
    <ul className="list-group">
      {links.map((link, key) => (
        <li key={key} className="list-group-item">
          <Link href={`/Courses/${cid}/${link}`}>{link}</Link>
        </li>
      ))}
    </ul>
  );
}

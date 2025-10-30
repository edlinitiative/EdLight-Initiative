"use client"
import HeroCourse from "@/app/courses/HeroCourse";
import CoursesList from "@/app/courses/CoursesList";
import CoursesCta from "@/app/courses/CoursesCta";
import "../styles/Courses.module.css";

export default function CoursesBody() {
    return (
        <>
            <HeroCourse />
            <CoursesList />
            <CoursesCta />
        </>
    );
}
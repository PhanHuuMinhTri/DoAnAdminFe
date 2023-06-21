import React from "react";

import PrivateLayout from "../layouts/public/PrivateLayout";
import { ProtectedRoutes } from "./requiredAuth";

const User = React.lazy(
  async () =>
    await import("../screens/privateScreens").then((module) => ({
      default: module.User,
    }))
);

const Course = React.lazy(
  async () =>
    await import("../screens/privateScreens").then((module) => ({
      default: module.Course,
    }))
);

const Test = React.lazy(
  async () =>
    await import("../screens/privateScreens").then((module) => ({
      default: module.Test,
    }))
);

const TestKanji = React.lazy(
  async () =>
    await import("../screens/privateScreens").then((module) => ({
      default: module.TestKanji,
    }))
);

const Teacher = React.lazy(
  async () =>
    await import("../screens/privateScreens").then((module) => ({
      default: module.Teacher,
    }))
);

const Lesson = React.lazy(
  async () =>
    await import("../screens/privateScreens").then((module) => ({
      default: module.Lesson,
    }))
);

const AddCourse = React.lazy(
  async () =>
    await import("../screens/privateScreens").then((module) => ({
      default: module.AddCourse,
    }))
);

const AddLesson = React.lazy(
  async () =>
    await import("../screens/privateScreens").then((module) => ({
      default: module.AddLesson,
    }))
);

const _privateRoutes = [
  {
    element: (
      <ProtectedRoutes>
        <PrivateLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        element: <User />,
        path: "/user",
      },
      {
        element: <Course />,
        path: "/course",
      },
      {
        element: <Test />,
        path: "/test",
      },
      {
        element: <TestKanji />,
        path: "/test-kanji",
      },
      {
        element: <Teacher />,
        path: "/teacher",
      },
      {
        element: <Lesson />,
        path: "course/:id/lesson",
      },

      {
        element: <AddLesson />,
        path: "course/:id/lesson/add",
      },
      {
        element: <AddCourse />,
        path: "course/add-course",
      },

      {
        element: <AddCourse />,
        path: "course/edit/:type",
      },
    ],
  },
];

export default _privateRoutes;

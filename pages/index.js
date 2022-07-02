import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8080/schools/overview");
  const data = await res.json();

  let graphState = [];
  if (data && data.stateData) {
    for (let sD of data.stateData) {
      let stateObj = {
        name: sD._id,
        value: sD.value,
      };
      graphState.push(stateObj);
    }
  }

  let graphCourse = [];
  if (data && data.courseData) {
    for (let cD of data.courseData) {
      let courseObj = {
        name: cD._id,
        value: cD.value,
      };
      graphCourse.push(courseObj);
    }
  }

  return {
    props: {
      graphState,
      graphCourse,
    },
  };
}

export default function Home({ graphState, graphCourse }) {
  const router = useRouter();

  const handleCourseClick = (_, index) => {
    router.push(`courseDetails/${_.name}`);
  };

  const handleStateClick = (_, index) => {
    router.push(`stateDetails/${_.name}`);
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <Head>
        <title>Education Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Welcome to Education Demo App</span>
            <span className="block text-sky-400">Explore Information</span>
          </h2>
          <div className="ml-3 mt-8 flex lg:mt-0 lg:flex-shrink-0"></div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <div className="flex">
            {graphState?.length !== 0 && (
              <div className="text-center">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={graphState}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    onClick={handleStateClick}
                    label
                  />
                  <Tooltip />
                </PieChart>
                State Wise Data
              </div>
            )}
            {graphCourse?.length !== 0 && (
              <div className="text-center">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={graphCourse}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    onClick={handleCourseClick}
                    label
                  />
                  <Tooltip />
                </PieChart>
                Course Wise Data
              </div>
            )}
          </div>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

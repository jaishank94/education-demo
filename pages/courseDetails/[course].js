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
import DataTable from "react-data-table-component";

export async function getServerSideProps(context) {
  const course = context.params.course;
  const res = await fetch("http://localhost:8080/schools/course/" + course);
  const data = await res.json();

  let graphCourse = [];
  if (data && data.graphData) {
    for (let cD of data.graphData) {
      let courseObj = {
        name: cD._id,
        value: cD.value,
      };
      graphCourse.push(courseObj);
    }
  }

  return {
    props: {
      data,
      graphCourse,
    },
  };
}

export default function CourseDetails({ data, graphCourse }) {
  const router = useRouter();
  const { course } = router.query;

  const columns = [
    {
      name: "School",
      selector: (row) => row.name,
    },
    {
      name: "State",
      selector: (row) => row.location.state,
    },
    {
      name: "Country",
      selector: (row) => row.location.country,
    },
    {
      name: "Pincode",
      selector: (row) => row.location.pincode,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="rounded-full"
          onClick={() => handleSchoolClick(row._id)}
          id={row._id}
        >
          View Details
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleSchoolClick = (id) => {
    router.push(`/schoolDetails/${id}`);
  };

  const handleCourseClick = (_, index) => {
    router.push(`/courseDetails/${_.name}`);
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
            <span className="block">Showing Details for</span>
            <span className="block text-indigo-600">{course}</span>
          </h2>
          <div className="ml-3 mt-8 flex lg:mt-0 lg:flex-shrink-0">
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <div className="flex">
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
          </div>
        </ResponsiveContainer>
      </div>
      <div>
        <DataTable columns={columns} data={data?.schools} pagination />
      </div>
    </div>
  );
}

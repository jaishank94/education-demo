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
import { schools, city, courses, state } from "../../data";
import DataTable from "react-data-table-component";

export async function getServerSideProps(context) {
  const school = context.params.school;
  const res = await fetch("http://localhost:8080/schools/" + school);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function SchoolDetails({ data }) {
  const router = useRouter();

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Batch",
      selector: (row) => row.batch,
    },
    {
      name: "Course",
      selector: (row) => row.course,
    },
  ];

  const handleStudentClick = ({ data }) => {
    return (
      <div className="text-center">
        <span className="block text-indigo-400">ID : {data.id}</span>
        <span className="block text-indigo-400">Name : {data.name}</span>
        <span className="block text-indigo-400">Roll Number : {data.roll_number}</span>
        <span className="block text-indigo-400">Batch : {data.batch}</span>
        <span className="block text-indigo-400">Course : {data.course}</span>
      </div>
    );
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <Head>
        <title>Education Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data && (
        <div>
          <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Showing Details for</span>
                <span className="block text-indigo-600">{data.name}</span>
              </h2>
              <div className="ml-3 mt-8 flex lg:mt-0 lg:flex-shrink-0"></div>
            </div>
            <div className="text-center">
              <span className="block text-sky-600">Founded: {data.name} </span>
              <span className="block text-sky-600">
                Location:{" "}
                {data.location.address +
                  ", " +
                  data.location.state +
                  ", " +
                  data.location.country}
              </span>
              <span className="block text-sky-600">
                Pincode: {data.location.pincode}
              </span>
              <span className="block m-4 text-sky-400">
                Courses Available: {data.courses}
              </span>
            </div>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={data?.students}
              expandableRows
              expandableRowsComponent={handleStudentClick}
              pagination
              paginationPerPage={5}
            />
          </div>
        </div>
      )}
    </div>
  );
}

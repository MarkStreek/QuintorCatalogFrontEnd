import React from "react";
import RootLayout from "../app/components/RootLayout";
import DummyDataTable from "../app/components/TableView";
export default function Home() {
  return (
    <RootLayout>
      <h1>Hello World!</h1>
      <h3>Here is a table of dummy data</h3>
      <DummyDataTable />
    </RootLayout>
      );
} 
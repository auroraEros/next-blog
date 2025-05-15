"use client";
import { Table, Button } from "flowbite-react";
import Link from "next/link";

export default function RecentTable({ title, data, columns, seeAllLink }) {
  return (
    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
      <div className="flex justify-between p-3 text-sm font-semibold">
        <h1 className="text-center p-2">{title}</h1>
        <Button outline gradientDuoTone="purpleToPink">
          <Link href={seeAllLink}>See all</Link>
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          {columns.map((col) => (
            <Table.HeadCell key={`head-${col.key}`}>{col.label}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row
              key={`row-${item._id || item.id || JSON.stringify(item)}`}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {columns.map((col) => (
                <Table.Cell
                  key={`cell-${col.key}-${item._id || item.id}`}
                  className={col.className}
                >
                  {col.render ? col.render(item) : item[col.key]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

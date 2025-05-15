"use client";
import { Table } from "flowbite-react";
import Link from "next/link";
import { BsTrash, BsPencil } from "react-icons/bs";

export default function PostsTable({ posts, onDeleteClick }) {
  return (
    <Table hoverable className="shadow-md">
      <Table.Head>
        <Table.HeadCell>Date updated</Table.HeadCell>
        <Table.HeadCell>Post image</Table.HeadCell>
        <Table.HeadCell>Post title</Table.HeadCell>
        <Table.HeadCell>Category</Table.HeadCell>
        <Table.HeadCell>Delete</Table.HeadCell>
        <Table.HeadCell>Edit</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {posts.map((post) => (
          <Table.Row
            key={post._id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell>
              {new Date(post.updatedAt).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell>
              <Link href={`/post/${post.slug}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-20 h-10 object-cover bg-gray-500"
                />
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link
                className="font-medium text-gray-900 dark:text-white"
                href={`/post/${post.slug}`}
              >
                {post.title}
              </Link>
            </Table.Cell>
            <Table.Cell>{post.category}</Table.Cell>
            <Table.Cell>
              <button
                onClick={() => onDeleteClick(post._id)}
                className="font-medium text-red-500 hover:underline"
              >
                <BsTrash />
              </button>
            </Table.Cell>
            <Table.Cell>
              <Link
                className="text-teal-500 hover:underline"
                href={`/dashboard/update-post/${post._id}`}
              >
                <BsPencil />
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

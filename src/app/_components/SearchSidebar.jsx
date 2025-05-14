"use client";
import { Button, Select, TextInput } from "flowbite-react";

export default function SearchSidebar({ sidebarData, handleChange, handleSubmit }) {
  return (
    <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <label className="whitespace-nowrap font-semibold">Search Term:</label>
          <TextInput
            placeholder="Search..."
            id="searchTerm"
            type="text"
            value={sidebarData.searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Sort:</label>
          <Select onChange={handleChange} id="sort" value={sidebarData.sort}>
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Category:</label>
          <Select onChange={handleChange} id="category" value={sidebarData.category}>
            <option value="uncategorized">Uncategorized</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
            <option value="javascript">JavaScript</option>
          </Select>
        </div>
        <Button type="submit" outline gradientDuoTone="purpleToPink">
          Apply Filters
        </Button>
      </form>
    </div>
  );
}
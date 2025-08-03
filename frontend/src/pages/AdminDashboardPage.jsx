import React, { useState } from "react";
import AdminDashboardSidebar from "../components/AdminDashboardComponents/AdminDashboardSidebar";
import AdminDashboardStats from "../components/AdminDashboardComponents/AdminDashboardStats";
import {} from "@heroicons/react/24/solid";
import { Search } from "lucide-react";
import AdminDashboardTable from "../components/AdminDashboardComponents/AdminDashboardTable";
const AdminDashboardPage = () => {
  const [allBlogsArray, setAllBlogsArray] = useState([]); // to store data of blogs
  const [isTableLoading, setIsTableLoading] = useState(false); // to display loading when Blog-Table is loading
  const [searchFilter, setSearchFilter] = useState("");
  const [isDateSearchFilterSelected, setIsDateSearchFilterSelected] =
    useState(false); // to check if filter based on date is applied or not
  const [dateSearchFilter, setDateSearchFilter] = useState(null); // to store date selected from calender
  const [numberOfBlogs, setNumberOfBlogs] = useState(0);

  return (
    <div className="">
      <AdminDashboardSidebar />
      <div role="main-div" className=" m-auto">
        <div role="stats">
          <AdminDashboardStats numberOfBlogs={numberOfBlogs}/>
        </div>
        <div role="table-div">
          <div role="search-and-export">
            {/* search bar, date selector and export to csv are implemented here */}
            {/* search bar */}
            <div role="searchbar" className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-gray-900 dark:text-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {/* date picker */}
            <div role="date-picker" className="flex gap-2">
              <label >Date Filter : </label>
              <input type="checkbox"
              checked={isDateSearchFilterSelected} 
              onChange={()=>setIsDateSearchFilterSelected(!isDateSearchFilterSelected)}/>
              <input
                type="date"
                value={dateSearchFilter}
                onChange={(e) => setDateSearchFilter(e.target.value)}
                className="disabled:opacity-50"
                disabled={!isDateSearchFilterSelected}
              />
            </div>
          </div>
          <div role="main-table" >
            {/* table is implemented here */}
            <AdminDashboardTable
              allBlogsArray={allBlogsArray}
              setAllBlogsArray={setAllBlogsArray}
              isTableLoading={isTableLoading}
              setIsTableLoading={setIsTableLoading}
              searchFilter={searchFilter}
              isDateSearchFilterSelected={isDateSearchFilterSelected}
              dateSearchFilter={dateSearchFilter}
              setNumberOfBlogs={setNumberOfBlogs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

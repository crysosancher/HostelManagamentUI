"use client";
import { useState, useRef } from "react";
import Styles from "./ViewStudent.module.css";
import { IoIosArrowDown } from "react-icons/io";
import useFetchUserData from "@/components/Api/fetchUserData";
import { useRouter } from "next/navigation"; // Import useRouter from next/router

export default function ViewStudentComponent() {
  const { userData } = useFetchUserData("user/getall", "GET");
  const router = useRouter(); // Initialize the router
  
  // Define the room type map
  const roomTypeMap = {
    "1": "Deluxe Room",
    "2": "Two Sharing Room",
    "3": "Three Sharing Room",
    "4": "Four Sharing Room",
    "5": "Five Sharing Room",
    "6": "Six Sharing Room",
  };

  // State for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25; // Number of items per page
  const paginationRef = useRef(null); // To trigger page change animations

  if (userData) {
    // Function to handle search input change
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1); // Reset to first page when search query changes
    };

    // Function to handle room type filter change
    const handleRoomFilterChange = (e) => {
      setRoomFilter(e.target.value);
      setCurrentPage(1); // Reset to first page when filter changes
    };

    // Filter data based on search and room type
    const filteredData = userData.customers.filter((item) => {
      const matchesSearchQuery =
        item.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.mobile).includes(searchQuery) || // Convert mobile to string
        String(item.adhaar).includes(searchQuery);
    
        const matchesRoomFilter =
        roomFilter === "" || roomTypeMap[item.room_type] === roomFilter;
    
      return matchesSearchQuery && matchesRoomFilter;
    });

    // Paginate filtered data
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / pageSize);

    // Function to handle page change with animation
    const handlePageChange = (pageNumber) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        // Trigger animation
        paginationRef.current.setAttribute(
          "data-to",
          pageNumber > currentPage ? "next" : "previous"
        );

        setCurrentPage(pageNumber);

        // Reset animation attribute after animation ends
        setTimeout(() => {
          paginationRef.current.removeAttribute("data-to");
        }, 300); // Time matching the animation duration
      }
    };

    // Function to navigate to the student details page
    const handleViewDetails = (userId) => {
      router.push(`/admin/dashboard/view-student/${userId}`);
    };

    return (
      <main>
        {/* Search Section */}
        <section className={Styles.search}>
          <label>Search</label>
          <div className={Styles.searchbox}>
            <input
              type="text"
              placeholder="Search by student name, room number, or contact details"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select
              id="rooms"
              name="rooms"
              value={roomFilter}
              onChange={handleRoomFilterChange}
            >
              <option value="">Select Room</option>
              {Object.entries(roomTypeMap).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <IoIosArrowDown className={Styles.dropDownIcon} />
          </div>
        </section>

        {/* Table Section */}
        <section>
          <table className={Styles.table}>
            <thead className={Styles.tableHeading}>
              <tr>
                <th>S. No.</th>
                <th>Name</th>
                <th>Phone No.</th>
                <th>Room Type</th>
                <th>Aadhar No.</th>
                {/* <th>Active</th> */}
                <th>Rm. No.</th>
                <th>Bed No.</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.user_id}>
                  <td>{item.user_id}</td>
                  <td>{item.user_name}</td>
                  <td>{item.mobile}</td>
                  <td>{roomTypeMap[item.room_type]}</td>
                  <td>{item.adhaar}</td>
                  {/* <td>{item.active}</td> */}
                  <td>{item.room_no}</td>
                  <td>{item.bed_no}</td>
                  <td>
                    <button
                      onClick={() => handleViewDetails(item.user_id)} // Add onClick to navigate
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        
        {/* Pagination Section */}
        <section className={Styles.paginationComponent}>
          <div className={Styles.paginationAnim} ref={paginationRef}>
            <button
              id="prev-page"
              aria-label="Previous Page"
              title="Go To Previous Page"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.29 5.707a1 1 0 0 0-1.415 0L7.988 10.6a2 2 0 0 0 0 2.828l4.89 4.89a1 1 0 0 0 1.415-1.414l-4.186-4.185a1 1 0 0 1 0-1.415l4.182-4.182a1 1 0 0 0 0-1.414Z"
                  fill="#000"
                />
              </svg>
            </button>
            <div>
              <span>Page</span>
              <ul>
                <li>{currentPage}</li>
              </ul>
              <span>of {totalPages}</span>
            </div>
            <button
              id="nxt-page"
              aria-label="Next Page"
              title="Go To Next Page"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.71 18.293a1 1 0 0 0 1.415 0l4.887-4.892a2 2 0 0 0 0-2.828l-4.89-4.89a1 1 0 0 0-1.415 1.414l4.186 4.185a1 1 0 0 1 0 1.415L9.71 16.879a1 1 0 0 0 0 1.414Z"
                  fill="#000"
                />
              </svg>
            </button>
          </div>
        </section>
      </main>
    );
  }

  return <div>Loading...</div>; // Add loading state if userData is not yet available
}

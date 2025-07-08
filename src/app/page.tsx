"use client";

import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "./pagination";
import {Advocate} from "@/app/api/advocates/models";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    console.log("fetching advocates...");
    const url = `/api/advocates?page=${currentPage}&pageSize=${searchTerm ? `&search=${searchTerm}` : ''}`;
    fetch(url).then((res) => res.json())
    .then((data) => {
      setAdvocates(data.data);
      setTotalPages(data.pagination.totalPages);
      setCurrentPage(data.pagination.page);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [currentPage, searchTerm]);

  const debouncedSetSearchTerm = useMemo(
    () => debounce(setSearchTerm, 300),
    []
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // Update input immediately
    debouncedSetSearchTerm(value); // Debounce the search
  }, [debouncedSetSearchTerm]);

  const onClick = useCallback(() => {
    setInputValue("");
    setSearchTerm("");
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, [])

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="text-3xl font-bold underline text-center">Hello, Next.js!</h1>
      <h1 className="text-center">Solace Advocates</h1> 
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <div className="flex items-center gap-2">
          <input className="border-2 border-gray-300 rounded-md p-2" onChange={onChange} value={inputValue}/>
          <button className="bg-[rgb(36,78,67)] text-white px-4 py-2 rounded-md" onClick={onClick}>Reset Search</button>
        </div>
      </div>
      <br />
      <br />
      <table className="min-w-full border border-gray-200">
        <thead className="bg-[rgb(36,78,67)]">
          <tr>
            <th className="px-4 py-2 border-b text-left text-white">First Name</th>
            <th className="px-4 py-2 border-b text-left text-white">Last Name</th>
            <th className="px-4 py-2 border-b text-left text-white">City</th>
            <th className="px-4 py-2 border-b text-left text-white">Degree</th>
            <th className="px-4 py-2 border-b text-left text-white">Specialties</th>
            <th className="px-4 py-2 border-b text-left text-white">Years of Experience</th>
            <th className="px-4 py-2 border-b text-left text-white">Phone Number</th>
          </tr>
        </thead>
        <tbody> 
          {error && (
            <tr>
              <td colSpan={7} className="text-center py-4">Error: {error}</td>
            </tr>
          )}
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            advocates.map((advocate, index) => (
              <tr key={`${advocate.firstName}-${advocate.lastName}-${index}`} className="even:bg-gray-50">
                <td className="px-4 py-2 border-b">{advocate.firstName}</td>
                <td className="px-4 py-2 border-b">{advocate.lastName}</td>
                <td className="px-4 py-2 border-b">{advocate.city}</td>
                <td className="px-4 py-2 border-b">{advocate.degree}</td>
                <td className="px-4 py-2 border-b">
                  {advocate.specialties.map((s, index) => (
                    <div key={`${s}-${index}`}>{s}</div>
                  ))}
                </td>
                <td className="px-4 py-2 border-b">{advocate.yearsOfExperience}</td>
                <td className="px-4 py-2 border-b">{advocate.phoneNumber}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

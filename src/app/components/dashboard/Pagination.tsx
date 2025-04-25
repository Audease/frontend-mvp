'use client'

import React from "react";
import { useState, useEffect } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className=" flex flex-row justify-between font-normal text-sm text-tgrey3 mx-2">
      <div className="">
        {startItem}-{endItem} of {totalItems} items
      </div>
      <div className="flex flex-row space-x-2">
        <div className="">
          {currentPage} of {totalPages} Pages
        </div>
        {/* Previous Button  */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
            className="cursor-pointer"
        >
          <MdNavigateBefore />
        </button>
        {/* Next Button  */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
            className="cursor-pointer"
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
}

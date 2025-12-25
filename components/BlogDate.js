"use client";
import React from "react";
import { FaUser, FaCalendarAlt, FaComments } from "react-icons/fa";

export default function BlogDate({ date }) {
	return (
		<span className="flex items-center space-x-1">
			<FaCalendarAlt />
			<span>{new Date(date).toLocaleDateString()}</span>
		</span>
	); 
}

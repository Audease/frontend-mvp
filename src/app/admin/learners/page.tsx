"use client";

import { useState } from "react";
import UserDetails from "./userDetails";
import LearnersDefault from "./learnersDefault";

export default function Learners() {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentLearnersComponent, setCurrentLearnersComponent] = useState("LearnersDefault");

    const learnersData = [
        {
            id: 1,
            name: "Nyekachi Wihioka",
            username: "nyekachi.eden.learner",
            email: "godswillclevin@gmail.com",
            loginTime: "10:34:05",
            funding: "SFC",
            payment: "adultcare",
        },
        {
            id: 2,
            name: "John Bull",
            username: "nyekachi.eden.learner",
            email: "godswillclevin@gmail.com",
            loginTime: "10:34:05",
            funding: "SFC",
            payment: "adultcare",
        },
        {
            id: 3,
            name: "Bakare Sagna",
            username: "nyekachi.eden.learner",
            email: "godswillclevin@gmail.com",
            loginTime: "10:34:05",
            funding: "SFC",
            payment: "adultcare",
        },
        {
            id: 4,
            name: "Paul Scholes",
            username: "nyekachi.eden.learner",
            email: "godswillclevin@gmail.com",
            loginTime: "10:34:05",
            funding: "SFC",
            payment: "adultcare",
        },
        {
            id: 5,
            name: "Didier Drogba",
            username: "nyekachi.eden.learner",
            email: "godswillclevin@gmail.com",
            loginTime: "10:34:05",
            funding: "SFC",
            payment: "adultcare",
        },
        {
            id: 6,
            name: "Eden Hazard",
            username: "nyekachi.eden.learner",
            email: "godswillclevin@gmail.com",
            loginTime: "10:34:05",
            funding: "SFC",
            payment: "adultcare",
        },
        {
            id: 7,
            name: "Cole Palmer",
            username: "nyekachi.eden.learner",
            email: "godswillclevin@gmail.com",
            loginTime: "10:34:05",
            funding: "SFC",
            payment: "adultcare",
        },
    ];

    const showUserDetailsPage = (e, userId) => {
        e.preventDefault();
        setSelectedUserId(userId);
        setCurrentLearnersComponent("UserDetails");
        console.log("User details shown for user ID:", userId);
    };

    const onBackClick = () => {
        setCurrentLearnersComponent("LearnersDefault");
        setSelectedUserId(null);
    };

    return (
        <div className="font-inter">
            {currentLearnersComponent === "LearnersDefault" && (
                <LearnersDefault
                    showUserDetailsPage={showUserDetailsPage}
                />
            )}
            {currentLearnersComponent === "UserDetails" && selectedUserId && (
                <UserDetails
                    userId={learnersData.find((user) => user.id === selectedUserId)}
                    onBackClick={onBackClick}
                />
            )}
        </div>
    );
}

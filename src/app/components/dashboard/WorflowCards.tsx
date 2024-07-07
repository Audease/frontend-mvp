'use client'

import { useState } from "react"
import WorkflowCard from "./WorkflowCard";

export default function WorkflowCards () {

    // Data should come from the api 
    const dummyData = [
        {
            id: 1,
            roleName:"Recruiter",
            rolePermission:"Recruiter",
            profilePics:"/dummy pics "
        }, 
        {
            id: 2,
            roleName:"Induction",
            rolePermission:"Induction",
            profilePics:"/dummy pics "
        }, 
        {
            id: 3,
            roleName:"BKSD",
            rolePermission:"BKSD",
            profilePics:"/dummy pics "
        }, 
        {
            id: 4,
            roleName:"Accessor",
            rolePermission:"Accessor",
            profilePics:"/dummy pics "
        }, 
        {
            id: 5,
            roleName:"Lazer",
            rolePermission:"Lazer",
            profilePics:"/dummy pics "
        }
    ]
    const [cardData, setCardData] = useState(dummyData);

    
    return (
        <div className="justify-between grid grid-cols-3 gap-4">
            {cardData.map((card) => (
                <WorkflowCard
                    key={card.id}
                    card={card}
                />
            ))}
        </div>
    )
}
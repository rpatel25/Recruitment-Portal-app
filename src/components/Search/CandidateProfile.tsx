import { Candidate } from '@/types/Candidate'
import React from 'react'

export default function CandidateProfile(props : Candidate) {
  return (
    <div>
        <div className="mr-6">
            <img src="/icon/search_author-avatar.svg"></img>
        </div>
        <div className="flex w-full h-[22px] ">
            <div className="flex items-center">
            <div>
                <p className="candidate-style">{props.fullName}</p>
            </div>
            <div>
                <p className="search-dot">•</p>
            </div>
            <div>
                <p className="candidate-style">{props.jobTitle}</p>
            </div>
            </div>
            <div></div>
            <div></div>
        </div>
      </div>
  )
}

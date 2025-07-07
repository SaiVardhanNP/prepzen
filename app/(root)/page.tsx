import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants/index'
import InterviewCard from "@/components/InterviewCard"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className="flex flex-col gap-6 max-w-lg ">
        <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>

        <p className="text-lg">Practice on real interview questions & get instant feedback</p>

        <Button  className='btn-primary w-full sm:w-50 '>
          <Link href={"/interview"}>Start an Interview</Link>        </Button>
      </div>

      <Image src={"/robot.png"} alt='robot' width={400} height={400} className='hidden sm:block'/>
    </section>

    <section className="flex flex-col gap-6 mt-8">
      <h2>Your Interviews</h2>
      <div className="interviews-section">
        {
          dummyInterviews.map((interview)=>(
            <InterviewCard key={interview.id} {...interview}/>
          ))
        }
      </div>
    </section>

    <section className="flex flex-col gap-6 mt-8">
      <h2>Take an Interview</h2>

      <div className="interviews-section">
        {
          dummyInterviews.map((interview)=>(
            <InterviewCard key={interview.id} {...interview}/>
          ))
        }

        {/* <p>You haven't taken any interviews yet</p> */}
      </div>
    </section>
    </>
  )
}

export default page

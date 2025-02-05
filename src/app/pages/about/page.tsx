"use client"
import React from 'react'
import Aboutus from './aboutus'
import TeamMember from './team'
import Testimonial1 from '@/app/components/testimonials'
import CommentSection from '@/app/components/comment'

const page = () => {
  return (
    <div>
      <Aboutus/>
  <TeamMember/>
  <Testimonial1/>
  
      <CommentSection/>
    </div>
  )
}

export default page
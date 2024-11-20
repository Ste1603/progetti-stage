"use client";
import React from 'react'

const SeparationLine = ({color}) => {
  return (
    <hr className={`w-2/3 h-[4px] rounded-full ${color}`} />
  )
}

export default SeparationLine
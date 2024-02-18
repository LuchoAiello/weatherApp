"use client";
import { useState } from "react";

const horizontalScroll = (ref) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [ scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - ref.current.offsetLeft)
    setScrollLeft(ref.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsMouseDown(false)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false);
  }

  const handleMouseMove = (e) => {;
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x-startX) //speed scroll
    ref.current.scrollLeft = scrollLeft - walk
  }

  return {
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove
  }
}

export default horizontalScroll;
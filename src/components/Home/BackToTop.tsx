"use client"

// import { FaArrowUp } from "react-icons/fa"

function BackToTop({ t }: { t: any }) {
  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className="flex items-center gap-1 text-center text-xs text-gray-500 mb-2 underline cursor-pointer"
      onClick={handleGoTop}
    >
      <span>{t.back_to_top.title}</span>
      {/* <FaArrowUp /> */}
    </button>
  )
}

export default BackToTop
'use client'

import { languagesOptions } from "@/app/i18n"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"
import { FaGlobe } from "react-icons/fa";

const LocaleSwitch = ({ lang }: { lang: string }) => {
  const router = useRouter()
  
  const handleLocaleSwitch = (e: any) => {
    const value = e.target.value
    router.push(`/${value}`)    
  }

  return (
    <motion.div
      className="px-3 flex items-center"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <FaGlobe className="mr-1" />
      <motion.select
        className="bg-transparent text-sm text-gray-950 dark:text-gray-200"
        defaultValue={lang}
        onChange={handleLocaleSwitch}
      >
        {languagesOptions.map((opt) => {
          return (
            <option
              key={opt.value}
              value={opt.value}
            >
              {opt.title}
            </option>
          )
        })}
      </motion.select>
    </motion.div>
    
  )
}

export default LocaleSwitch
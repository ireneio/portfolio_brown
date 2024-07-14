'use client'

import { useTheme } from "@/context/theme-context"
import { setSidebarOpen } from "@/lib/features/global/globalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { LinkData } from "@/lib/types"
import clsx from "clsx"
import { FaTimes } from "react-icons/fa"

const Sidebar = ({ links }: { links: LinkData[] }) => {
  const { theme } = useTheme()
  const globalSlice = useAppSelector(state => state.globalSlice)
  const dispatch = useAppDispatch()

  const handleSidebarClose = () => {
    dispatch(setSidebarOpen(false))
  }

  return (
    <>
      <div className={clsx("z-[1001] fixed inset-0 flex transition-all", globalSlice.sidebarOpen ? 'translate-x-0' : 'translate-x-[-100%]')}>
        <div className="flex grow flex-row overflow-y-auto pb-4">
          <nav className="flex flex-col basis-[50%]">
            <ul role="list" className={clsx("flex flex-1 flex-col gap-y-2 min-h-[100vh]", theme === 'light' ? 'bg-white' : 'bg-gray-900')}>
              <li className="flex items-center justify-start mt-5 px-4" onClick={handleSidebarClose}>
                <FaTimes className="text-lg" />
              </li>
              <li>
                <ul role="list" className="px-2 space-y-1">
                  {links.map((value, index) => {
                    return (
                      <li key={index} className="px-2 py-2" onClick={handleSidebarClose}>
                        <a href={value.hash}>{value.name}</a>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* background mask */}
      <div
        className={clsx(
          "z-[1000] fixed left-0 top-0 right-0 bottom-0 bg-opacity-[0.75]",
          globalSlice.sidebarOpen ? 'block' : 'hidden',
          theme === 'light' ? 'bg-white' : 'bg-gray-900',
        )}
        onClick={handleSidebarClose}
      ></div>
    </>
  )
}

export default Sidebar
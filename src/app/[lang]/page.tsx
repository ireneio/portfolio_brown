import { getDictionary } from '@/app/[lang]/dictionaries'
import Intro from "@/components/Home/Intro";
import SectionDivider from "@/components/SectionDivider";
import Projects from "@/components/Home/Projects";
import About from "@/components/Home/About";
import Skills from "@/components/Home/Skills";
import useData from "@/lib/useData";
import Experience from '@/components/Home/Experience';
import SoftSkills from '@/components/Home/SoftSkills';
import Contact from '@/components/Home/Contact';

export default async function Home({ params }: any) {
  const { lang } = params
  
  const t = await getDictionary(lang)
  const { projectsData, skillsData, experiencesData, softSkillsData } = await useData(lang)  

  return (
    <main className="flex flex-col items-center px-4">
      <Intro t={t} />
      <SectionDivider />
      <About t={t} />
      <Skills t={t} data={skillsData} />
      <SoftSkills t={t} data={softSkillsData} />
      <Projects t={t} data={projectsData} />
      <Experience t={t} data={experiencesData} />
      <Contact t={t} />
    </main>
  );
}

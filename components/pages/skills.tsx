import Image from "next/image";
import * as React from "react";
import startCase from "lodash.startcase";
import useTranslation from "next-translate/useTranslation";

const SKILLS = [
  "react",
  "redux",
  "reactNative",
  "next",
  "gatsby",
  "flutter",
  "vue",
  "webpack",
  "express",
  "nest",
  "typescript",
  "git",
  "docker",
  "circleCI",
  "jest",
  "sass",
  "tailwind",
  "bootstrap",
  "materialUI",
];

interface SkillBoxProps {
  skill: typeof SKILLS[number];
}

const SkillBox: React.FC<SkillBoxProps> = ({ skill }) => {
  return (
    <div className="flex flex-row items-center space-x-4 p-4 rounded-lg shadow-sm hover:shadow-lg cursor-pointer bg-slate-100 dark:bg-gray-600 w-[12rem]">
      <Image src={`/skills/${skill}.svg`} alt={skill} width={30} height={30} />
      <div className="text-lg flex-1">{startCase(skill)}</div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { t } = useTranslation("skills");
  return (
    <div id="skills" className="w-full h-auto flex justify-center py-20">
      <div className="w-full md:w-[85vw] max-w-[100rem] flex flex-col items-center h-full">
        <div className="text-5xl font-bold text-slate-500 dark:text-white text-center pb-10">
          {t("title")}
        </div>
        <div className="flex flex-row md:flex-wrap mt-10 max-w-[100vw] overflow-x-auto">
          {SKILLS.map((skill) => (
            <div
              key={skill}
              className="basis-2/3 ml-4 md:ml-0 md:basis-1/4 md:mb-12 flex justify-center"
            >
              <SkillBox skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;

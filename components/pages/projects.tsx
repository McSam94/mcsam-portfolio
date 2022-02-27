import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const PROJECTS = [
  {
    name: "Checkin",
    logo: "checkin",
    gitLink: "https://gitlab.com/mcsam1216/checkin",
    productionLink:
      "https://play.google.com/store/apps/details?id=com.mcsam.checkin",
  },
  {
    name: "Email Butcher",
    logo: "emailButcher",
    gitLink: "https://github.com/McSam94/email-butcher",
    productionLink: "https://www.emailbutcher.com/",
  },
];

const Projects = () => {
  const { t } = useTranslation("projects");

  return (
    <div id="projects" className="w-full flex justify-center bg-gray-100/50">
      <div className="w-full md:w-[85vw] max-w-[100rem] flex flex-col items-center h-full py-20">
        <div className="text-5xl font-bold text-slate-500 dark:text-white text-center pb-10">
          {t("title")}
        </div>
        <div className="flex flex-row max-w-[100vw] overflow-x-auto h-full">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="basis-2/3 ml-4 flex justify-center h-fit mb-2"
            >
              <div className="ml-4 shadow-lg rounded-lg cursor-pointer w-[20rem]">
                <Image
                  src={`/projects/${project.logo}.svg`}
                  width={318}
                  height={280}
                  objectFit="cover"
                  alt={project.name}
                />
                <div className="flex flex-col p-4">
                  <div className="text-2xl font-semibold">{project.name}</div>
                  <div className="flex flex-row justify-between mt-4">
                    <Link href={project.gitLink} passHref>
                      <div className="flex flex-row text-gray-700 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
                        <span className="material-icons">source</span>
                        <span className="text-base ml-2">
                          {t("sourceCode")}
                        </span>
                      </div>
                    </Link>
                    <Link href={project.productionLink} passHref>
                      <div className="flex flex-row text-orange-700 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
                        <span className="text-base">{t("visitSite")}</span>
                        <span className="material-icons ml-2">
                          arrow_forward
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;

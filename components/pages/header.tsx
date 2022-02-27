import * as React from "react";
import useTranslation from "next-translate/useTranslation";
import Dropdown, { Option } from "@/components/dropdown";
import { LANG } from "@/config/constants";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

interface OptionProps {
  option: Option;
}

const SelectedLang: React.FC<OptionProps> = ({ option }) => {
  return (
    <div className="flex flex-row">
      <span className="mr-2">{option.icon}</span>
      <span>{option.label}</span>
    </div>
  );
};

const LangOption: React.FC<OptionProps> = ({ option }) => {
  return (
    <div className="text-lg flex flex-row">
      <span>{option.icon}</span>
      <span className="ml-2">{option.label}</span>
    </div>
  );
};

interface MenuItemProps {
  menu: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ menu }) => {
  const { t } = useTranslation("header");

  return (
    <Link href={`#${menu}`} passHref>
      <span className="text-lg cursor-pointer hover:text-orange-300">
        {t(menu)}
      </span>
    </Link>
  );
};

const Header: React.FC = () => {
  const { push } = useRouter();
  const { theme, setTheme } = useTheme();

  const isDarkMode = React.useMemo(() => theme === "dark", [theme]);

  const onThemeToggle = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const onTranslate = React.useCallback(
    (lang) => push("/", "", { locale: lang }),
    [push]
  );

  return (
    <div className="w-full sticky top-0 flex flex-row justify-between px-8 py-6 bg-slate-100 dark:bg-slate-800 dark:text-white z-10 shadow-sm">
      <div className="basis-1/3">
        <Image
          src="/logo.png"
          className="hover:transition-transform hover:rotate-[360deg] cursor-pointer"
          width={55}
          height={55}
          alt="logo"
        />
      </div>
      <div className="flex-row items-center basis-1/3 justify-between hidden md:flex">
        <MenuItem menu="experiences" />
        <MenuItem menu="skills" />
        <MenuItem menu="projects" />
        <MenuItem menu="contact" />
      </div>
      <div className="flex flex-row items-center space-x-10 basis-1/3 justify-end">
        <div
          className="flex cursor-pointer bg-slate-200 dark:bg-slate-500 rounded-full p-2"
          onClick={onThemeToggle}
        >
          {isDarkMode ? (
            <span className="material-icons text-gray-100">dark_mode</span>
          ) : null}
          {!isDarkMode ? (
            <span className="material-icons text-yellow-500">light_mode</span>
          ) : null}
        </div>
        <Dropdown
          options={LANG}
          onSelect={onTranslate}
          renderSelected={(option) => <SelectedLang option={option} />}
          renderOption={(option) => <LangOption option={option} />}
        />
      </div>
    </div>
  );
};

export default Header;
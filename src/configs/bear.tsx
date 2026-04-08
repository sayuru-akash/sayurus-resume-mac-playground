import { FaPaw, FaVuejs } from "react-icons/fa";
import {
  GiNinjaHeroicStance,
  GiJumpingDog,
  GiEnergySword,
  GiCat,
  GiFishEscape
} from "react-icons/gi";
import { VscGithub } from "react-icons/vsc";
import { GoRepo, GoBrowser } from "react-icons/go";
import { RiGamepadLine, RiNewspaperFill } from "react-icons/ri";
import { HiFire } from "react-icons/hi";
import { CgFormatText } from "react-icons/cg";
import { BiCube, BiGame } from "react-icons/bi";
import { BsFillImageFill, BsGrid1X2 } from "react-icons/bs";
import { AiFillAudio } from "react-icons/ai";

import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: <FaPaw />,
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: <GiNinjaHeroicStance />,
        excerpt: "Hey there! I'm a cool ape nft lost in the human..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: <VscGithub />,
        excerpt: "Here are some status about my github account..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: <GoBrowser />,
        excerpt: "Something about this personal portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: <GoRepo />,
    md: [
      {
        id: "cca-lms",
        title: "CCA LMS",
        file: "https://github.com/sayuru-akash/cca-lms/raw/HEAD/README.md",
        icon: <RiGamepadLine />,
        excerpt:
          "Enterprise-grade LMS with terminal aesthetic using Next.js...",
        link: "https://github.com/sayuru-akash/cca-lms"
      },
      {
        id: "bioswarm-engine",
        title: "BioSwarm Engine",
        file: "https://github.com/sayuru-akash/bioswarm-engine/raw/HEAD/README.md",
        icon: <HiFire />,
        excerpt: "14-agent multi-source intelligence swarm built in Rust...",
        link: "https://github.com/sayuru-akash/bioswarm-engine"
      },
      {
        id: "bookmepro",
        title: "BookMePro Latest",
        file: "https://github.com/sayuru-akash/bookmepro-latest/raw/HEAD/README.md",
        icon: <FaVuejs />,
        excerpt: "Scheduling and booking platform for coaches using Next.js...",
        link: "https://github.com/sayuru-akash/bookmepro-latest"
      },
      {
        id: "wp-seo-blog-automater",
        title: "WP SEO Blog Automater Plugin",
        file: "https://github.com/sayuru-akash/wp-seo-blog-automater-plugin/raw/HEAD/README.md",
        icon: <GiEnergySword />,
        excerpt: "WordPress plugin to automate SEO-focused blog generation...",
        link: "https://github.com/sayuru-akash/wp-seo-blog-automater-plugin"
      },
      {
        id: "personal-brand-website",
        title: "Personal Brand Website",
        file: "https://github.com/sayuru-akash/personal-brand-website/raw/HEAD/README.md",
        icon: <RiNewspaperFill />,
        excerpt:
          "SEO-oriented personal branding website built with TypeScript...",
        link: "https://github.com/sayuru-akash/personal-brand-website"
      },
      {
        id: "priyanvada-ai",
        title: "Priyanvada AI",
        file: "https://github.com/sayuru-akash/priyanvada-ai/raw/HEAD/README.md",
        icon: <GiJumpingDog />,
        excerpt: "Character-based AI chat platform with modern architecture...",
        link: "https://github.com/sayuru-akash/priyanvada-ai"
      },
      {
        id: "sms-sender-textware",
        title: "SMS Sender TextWare",
        file: "https://github.com/sayuru-akash/sms-sender-python-textware/raw/HEAD/README.md",
        icon: <CgFormatText />,
        excerpt: "Bulk SMS sender with rate limiting, logging and reporting...",
        link: "https://github.com/sayuru-akash/sms-sender-python-textware"
      },
      {
        id: "sparks-blog",
        title: "Sparks Blog",
        file: "https://github.com/sayuru-akash/sparks-blog/raw/HEAD/README.md",
        icon: <AiFillAudio />,
        excerpt: "Ghost CMS-powered tech news and case-study blog frontend...",
        link: "https://github.com/sayuru-akash/sparks-blog"
      },
      {
        id: "image-gen-codezela",
        title: "Image Gen Codezela",
        file: "https://github.com/sayuru-akash/image-gen-codezela/raw/HEAD/README.md",
        icon: <BiGame />,
        excerpt: "Modern AI creativity suite focused on image generation...",
        link: "https://github.com/sayuru-akash/image-gen-codezela"
      },
      {
        id: "cubebycodezela",
        title: "CubeByCodezela",
        file: "https://github.com/sayuru-akash/CubeByCodezela/raw/HEAD/README.md",
        icon: <BiCube />,
        excerpt: "Modern product landing page with polished visual design...",
        link: "https://github.com/sayuru-akash/CubeByCodezela"
      }
    ]
  }
];

export default bear;

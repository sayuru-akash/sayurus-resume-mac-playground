import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              Hi! This is Sayuru Akash, now a Software Engineering Undergraduate
              at Plymouth University.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content:
          "MERN Stack, Web & Mobile Applications, Blockchain, Cryptocurrency, and more..."
      },
      // {
      //   id: "about-who-cares",
      //   title: "who-cares.txt",
      //   type: "file",
      //   content:
      //     "I'm open to opportunities lol."
      // },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:hi@sayuru.dev"
                target="_blank"
                rel="noreferrer"
              >
                hi@sayuru.dev
              </a>{" "}
              /{" "}
              <a
                className="text-blue-300"
                href="mailto:contact@sayuru.me"
                target="_blank"
                rel="noreferrer"
              >
                contact@sayuru.me
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/sayuru-akash"
                target="_blank"
                rel="noreferrer"
              >
                https://github.com/sayuru-akash
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/sayuruakash/"
                target="_blank"
                rel="noreferrer"
              >
                https://www.linkedin.com/in/sayuruakash
              </a>
            </li>
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">sleeping</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">money</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;

import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GiSettingsKnobs } from "react-icons/gi";
import { AiOutlineLink } from "react-icons/ai";
import { IoCloudOfflineOutline } from "react-icons/io5";
import bear from "~/configs/bear";
import { useAppSelector } from "~/redux/hooks";
import type { BearMdData } from "~/types";

interface ContentProps {
  contentID: string;
  contentURL: string;
}

interface MiddlebarProps {
  items: BearMdData[];
  cur: number;
  setContent: (id: string, url: string, index: number) => void;
}

interface SidebarProps {
  cur: number;
  setMidBar: (items: BearMdData[], index: number) => void;
}

interface BearState extends ContentProps {
  curSidebar: number;
  curMidbar: number;
  midbarList: BearMdData[];
}

const Highlighter = (dark: boolean): any => {
  interface codeProps {
    node: any;
    inline: boolean;
    className: string;
    children: any;
  }

  return {
    code({ node, inline, className, children, ...props }: codeProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={dark ? dracula : prism}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    }
  };
};

const Sidebar = ({ cur, setMidBar }: SidebarProps) => {
  return (
    <div className="w-full h-full bg-gray-700 text-white overflow-y-scroll">
      <div className="h-12 pr-3 flex-center-v justify-end">
        <IoCloudOfflineOutline className="mr-3" size={20} />
        <GiSettingsKnobs size={20} />
      </div>
      <ul>
        {bear.map((item, index) => (
          <li
            key={`bear-sidebar-${item.id}`}
            className={`pl-6 h-8 flex-center-v cursor-default ${
              cur === index ? "bg-red-500" : "bg-transparent"
            } ${cur === index ? "" : "hover:bg-gray-600"}`}
            onClick={() => setMidBar(item.md, index)}
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Middlebar = ({ items, cur, setContent }: MiddlebarProps) => {
  return (
    <div className="w-full h-full overflow-y-scroll bg-gray-50 dark:bg-gray-800 border-r border-gray-200/50 dark:border-gray-700/50">
      <ul>
        {items.map((item: BearMdData, index: number) => (
          <li
            key={`bear-midbar-${item.id}`}
            className={`h-24 flex flex-col cursor-default border-l-2 ${
              cur === index
                ? "border-red-500 bg-white dark:bg-gray-900"
                : "border-transparent bg-transparent"
            } hover:(bg-white dark:bg-gray-900)`}
            onClick={() => setContent(item.id, item.file, index)}
          >
            <div className="h-8 mt-3 flex-center-v flex-none">
              <div className="-mt-1 w-10 flex-center-h flex-none text-gray-500 dark:text-gray-400">
                {item.icon}
              </div>
              <span className="relative text-gray-900 dark:text-gray-100 flex-grow font-bold">
                {item.title}
                {item.link && (
                  <a
                    className="absolute top-1 right-4"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiOutlineLink className="text-gray-500 dark:text-gray-400" />
                  </a>
                )}
              </span>
            </div>
            <div className="h-16 ml-10 pb-2 pr-1 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200/50 dark:border-gray-700/50">
              {item.excerpt}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getContentBaseURL = (url: string) => {
  const fileIdx = url.lastIndexOf("/");
  return fileIdx === -1 ? url : url.slice(0, fileIdx + 1);
};

const normalizeMarkdown = (text: string): string => {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h1|h2|h3|h4|h5|h6)>/gi, "$&\n")
    .replace(/<[^>]+>/g, "");
};

const resolveMarkdownURL = (url: string, contentURL: string): string => {
  if (
    !url ||
    url.indexOf("http://") === 0 ||
    url.indexOf("https://") === 0 ||
    url.indexOf("mailto:") === 0 ||
    url.indexOf("tel:") === 0 ||
    url.indexOf("data:") === 0 ||
    url.indexOf("//") === 0 ||
    url.indexOf("#") === 0
  ) {
    return url;
  }

  if (contentURL.indexOf("raw.githubusercontent.com") !== -1) {
    return new URL(url, getContentBaseURL(contentURL)).toString();
  }

  return url;
};

const Content = ({ contentID, contentURL }: ContentProps) => {
  const [storeMd, setStoreMd] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const dark = useAppSelector((state) => state.system.dark);

  useEffect(() => {
    // Only fetch if we don't have the content and we're not already loading it
    if (!storeMd[contentID] && !loading[contentID]) {
      setLoading((prev) => ({ ...prev, [contentID]: true }));

      fetch(contentURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch markdown: ${response.status} ${response.statusText}`
            );
          }
          return response.text();
        })
        .then((text) => {
          setStoreMd((prev) => ({
            ...prev,
            [contentID]: normalizeMarkdown(text)
          }));
          setLoading((prev) => ({ ...prev, [contentID]: false }));
        })
        .catch((error) => {
          console.error(`Error fetching markdown for ${contentID}:`, error);
          setStoreMd((prev) => ({
            ...prev,
            [contentID]: `# Error Loading Content\n\nFailed to load content from: ${contentURL}\n\nError: ${error.message}`
          }));
          setLoading((prev) => ({ ...prev, [contentID]: false }));
        });
    }
  }, [contentID, contentURL, storeMd, loading]);

  return (
    <div className="markdown w-full h-full bg-gray-50 text-gray-700 dark:(bg-gray-800 text-gray-200) overflow-scroll py-6">
      <div className="w-full max-w-4xl px-6 mx-auto">
        {loading[contentID] ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500 dark:text-gray-400">
              Loading content...
            </div>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[gfm]}
            urlTransform={(url) => resolveMarkdownURL(url, contentURL)}
            components={{
              a: ({ ...props }) => (
                <a {...props} target="_blank" rel="noreferrer" />
              ),
              ...Highlighter(dark as boolean)
            }}
          >
            {storeMd[contentID] || ""}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

const Bear = () => {
  const [state, setState] = useState<BearState>({
    curSidebar: 0,
    curMidbar: 0,
    midbarList: bear[0].md,
    contentID: bear[0].md[0].id,
    contentURL: bear[0].md[0].file
  });

  const setMidBar = (items: BearMdData[], index: number) => {
    setState({
      curSidebar: index,
      curMidbar: 0,
      midbarList: items,
      contentID: items[0].id,
      contentURL: items[0].file
    });
  };

  const setContent = (id: string, url: string, index: number) => {
    setState({
      ...state,
      curMidbar: index,
      contentID: id,
      contentURL: url
    });
  };

  return (
    <div className="bear font-avenir flex w-full h-full">
      <div className="flex-none w-44">
        <Sidebar cur={state.curSidebar} setMidBar={setMidBar} />
      </div>
      <div className="flex-none w-60">
        <Middlebar
          items={state.midbarList}
          cur={state.curMidbar}
          setContent={setContent}
        />
      </div>
      <div className="flex-grow">
        <Content contentID={state.contentID} contentURL={state.contentURL} />
      </div>
    </div>
  );
};

export default Bear;

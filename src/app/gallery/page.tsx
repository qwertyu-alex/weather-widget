import { ThemeToggle } from "@/components/ui/themetoggle";

const GalleryPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5">
      <div className="h-[100px]"></div>
      <div className="fixed right-10 top-10 flex flex-col items-end gap-2">
        <ThemeToggle />
        <p className="w-[100px]">
          NB: Themes are bugging in Edge. Use chrome or firefox
        </p>
      </div>

      <iframe
        src="/"
        className="overflow-hidden&widget"
        scrolling="no"
        height={410}
        width={305}
      ></iframe>

      <iframe
        src="/?q=herlev&widget"
        className="overflow-hidden"
        scrolling="no"
        height={410}
        width={305}
      ></iframe>

      <iframe
        src="/?q=notrealcity&widget"
        className="overflow-hidden"
        scrolling="no"
        height={410}
        width={305}
      ></iframe>

      <div className="border rounded w-[500px] h-[100px] flex flex-col items-center justify-center">
        <p>Try disabling JS in your browser</p>
      </div>
      <div className="h-[1000px]"></div>
    </div>
  );
};

export default GalleryPage;

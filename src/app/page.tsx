import { ThemeWrapper } from "@/components/theme-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ClientWidget,
  ClientWidgetInternalError,
  ClientWidgetNotFound,
} from "@/components/widget";
import { weatherApi } from "@/lib/api";
import { Suspense } from "react";

const Home = (props: {
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
}) => {
  const searchParams = props?.searchParams;

  const Content = () => (
    <>
      <div className="script">
        <Suspense fallback={<SkeletonWidget />}>
          <DataWidget searchParams={searchParams} />
        </Suspense>
      </div>
      <noscript className="flex flex-col gap-2">
        <style>
          {`
          .script {
            display: none;
          }
          `}
        </style>
        <DataWidget searchParams={searchParams} />
        <div className="text-sm text-muted-foreground p-5 w-[300px] border rounded">
          <p>JavaScript is required to run this widget.</p>
          <p>Please enable JavaScript in your browser and try again.</p>
        </div>
      </noscript>
    </>
  );

  if (
    searchParams &&
    (searchParams["widget"] || searchParams["widget"] === "")
  ) {
    return <Content />;
  }

  return (
    <div className="flex p-5 w-screen h-screen flex-col items-center">
      <Content />
    </div>
  );
};

const SkeletonWidget = () => {
  return <Skeleton className="border w-[300px] rounded h-[400px]"></Skeleton>;
};

const DataWidget = async (props: { searchParams?: Record<string, string> }) => {
  const searchParams = props?.searchParams;
  const q = searchParams?.q || "Copenhagen";
  const { data, error } = await weatherApi({ q });

  return (
    <div className="border w-[300px] rounded overflow-hidden flex flex-col">
      <ThemeWrapper>
        <>
          {error && error.status.toString().startsWith("4") && (
            <ClientWidgetNotFound q={q} />
          )}
          {error && error.status.toString().startsWith("5") && (
            <ClientWidgetInternalError
              q={q}
              error={{
                status: error.status,
                message: error.message,
              }}
            />
          )}
          {data && (
            <ClientWidget
              cityName={data.name}
              temperature={data.main?.temp}
              humidity={data.main?.humidity}
              wind={data.wind?.speed}
            />
          )}
        </>
      </ThemeWrapper>
    </div>
  );
};

export default Home;

import Header from "./Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <div className="py-4">
          <section className="max-w-3xl m-auto">
            <Outlet />
          </section>
        </div>
      </main>
    </>
  );
};

export default RootLayout;

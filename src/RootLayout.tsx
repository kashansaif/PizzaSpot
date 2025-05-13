import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <div className="py-4">
          <section className="max-w-3xl mx-auto">
            <Outlet />
          </section>
        </div>
      </main>
    </>
  );
}

export default RootLayout;

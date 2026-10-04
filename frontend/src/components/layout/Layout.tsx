import { Outlet } from "react-router";
import HeaderRestaurante from "./HeaderRestaurante"
import Footer from "./Footer"

export default function Layout() {
  return (
    <>
    <div className="flex min-h-dvh flex-col bg-background">
      <HeaderRestaurante />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  );
}
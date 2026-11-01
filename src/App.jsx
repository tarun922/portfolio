import { lazy, Suspense } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
const Scene3D = lazy(() => import("./three/Scene3D.jsx"));

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

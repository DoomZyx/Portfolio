import { lazy, Suspense } from "react";

// Above-the-fold : chargement synchrone pour éviter le CLS du premier viewport
import Nav from "../components/nav/nav";
import Header from "../components/header/header";

const BackgroundABout = lazy(() =>
  import("../components/backgroundAbout/backgroundAbout")
);
const CatchPhrasesCards = lazy(
  () => import("../components/catchPhrasesCards/catchPhrasesCards"),
);
const Catchphrase1 = lazy(() =>
  import("../components/CatchPhrase/Catchphrase1/catchPhrase1")
);
const Catchphrase2 = lazy(() =>
  import("../components/CatchPhrase/Catchphrase2/catchPhrase2")
);
const MyPortfolio = lazy(() => import("../components/MyPortfolio/myPortfolio"));
const MyServices = lazy(() => import("../components/Services/services"));
const ContactMe = lazy(() => import("../components/Contact/contact"));
const Footer = lazy(() => import("../components/footer/footer.jsx"));
const ChatBot = lazy(() => import("../components/ChatBot/ChatBot"));

function SectionFallback({ minHeight }) {
  return (
    <div
      aria-hidden="true"
      style={{ minHeight, width: "100%" }}
    />
  );
}

function homepage() {
  return (
    <>
      <Nav />
      <Header />
      <main>
        <Suspense fallback={<SectionFallback minHeight="120px" />}>
          <CatchPhrasesCards />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="160px" />}>
          <Catchphrase1 />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="280px" />}>
          <Catchphrase2 />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="320px" />}>
          <BackgroundABout />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="400px" />}>
          <MyPortfolio />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="400px" />}>
          <MyServices />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="450px" />}>
          <ContactMe />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback minHeight="100px" />}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </>
  );
}

export default homepage;

import { lazy } from "react";

const Nav = lazy(() => import("../components/nav/nav"));
const Header = lazy(() => import("../components/header/header"));
const AboutMe = lazy(() => import("../components/AboutMe/aboutMe"));
const BackgroundABout = lazy(() =>
  import("../components/backgroundAbout/backgroundAbout")
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

function homepage() {
  return (
    <>
      <Nav />
      <Header />
      <main>
        <BackgroundABout />
        <AboutMe />
        <Catchphrase1 />
        <Catchphrase2 />
        <MyPortfolio />
        <MyServices />
        <ContactMe />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}

export default homepage;

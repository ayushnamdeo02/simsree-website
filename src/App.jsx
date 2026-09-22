import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import History from './pages/History';
import DirectorMessage from './pages/DirectorMessage';
import Rankings from './pages/Rankings';
import CampusLife from './pages/CampusLife';
import Alumni from './pages/Alumni';
import StudentSystem from './pages/StudentSystem';
import AlumniPortal from './pages/AlumniPortal';
import Simarthan from './pages/Simarthan';
import Placements from './pages/Placements';
import WhyRecruit from './pages/WhyRecruit';
import ReportsHub from './pages/ReportsHub';
import Partners from './pages/Partners';
import PlacementContact from './pages/PlacementContact';
import RecruiterEngagement from './pages/RecruiterEngagement';
import Academics from './pages/Academics';
import ProgrammeDetail from './pages/ProgrammeDetail';
import Faculty from './pages/Faculty';
import Admissions from './pages/Admissions';
import AdmissionDetail from './pages/AdmissionDetail';
import Downloads from './pages/Downloads';
import Students from './pages/Students';
import Achievements from './pages/Achievements';
import BatchProfile from './pages/BatchProfile';
import Leadership from './pages/Leadership';
import CommitteeDetail from './pages/CommitteeDetail';
import BodyStructure from './pages/BodyStructure';
import Life from './pages/Life';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Simerations from './pages/Simerations';
import Tedx from './pages/Tedx';
import Flagship from './pages/Flagship';
import DevProgrammes from './pages/DevProgrammes';
import News from './pages/News';
import PageStub from './pages/PageStub';
import { mainNav, utilityLinks } from './data/sitemap';

// Routes with a real, built-out page (not a stub).
const builtRoutes = new Set(['/', '/about', '/about/history', '/about/directors-message', '/about/rankings', '/about/campus-life', '/about/alumni', '/about/student-driven-system', '/alumni-portal', '/about/simarthan', '/placements', '/placements/why-recruit', '/placements/reports', '/placements/partners', '/placements/contact', '/placements/recruiter-engagement', '/academics', '/academics/mms', '/academics/msc-finance', '/academics/mfm', '/academics/mmm', '/academics/phd', '/academics/faculty', '/admissions', '/admissions/mms', '/admissions/msc-finance', '/admissions/mfm', '/admissions/mmm', '/admissions/phd', '/admissions/downloads', '/students', '/students/achievements', '/students/batch-profile', '/students/committees/placement', '/students/body-structure', '/students/life', '/contact', '/events', '/events/simerations', '/events/tedxsimsree', '/events/flagship', '/events/development-programmes', '/events/news']);

// Flatten every route (top-level + children + utility links) into a single list,
// skipping routes that already have a real page.
function collectRoutes() {
  const routes = [];
  for (const item of mainNav) {
    if (!builtRoutes.has(item.path)) routes.push({ path: item.path, label: item.label });
    if (item.children) {
      for (const child of item.children) {
        if (!builtRoutes.has(child.path)) routes.push({ path: child.path, label: child.label });
      }
    }
  }
  for (const link of utilityLinks) {
    if (!builtRoutes.has(link.path)) routes.push({ path: link.path, label: link.label });
  }
  // De-dupe (some paths like /events/tedxsimsree and /alumni-portal appear twice)
  const seen = new Set();
  return routes.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });
}

const stubRoutes = collectRoutes();

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/about/directors-message" element={<DirectorMessage />} />
          <Route path="/about/rankings" element={<Rankings />} />
          <Route path="/about/campus-life" element={<CampusLife />} />
          <Route path="/about/alumni" element={<Alumni />} />
          <Route path="/about/student-driven-system" element={<StudentSystem />} />
          <Route path="/alumni-portal" element={<AlumniPortal />} />
          <Route path="/about/simarthan" element={<Simarthan />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/placements/why-recruit" element={<WhyRecruit />} />
          <Route path="/placements/reports" element={<ReportsHub />} />
          <Route path="/placements/partners" element={<Partners />} />
          <Route path="/placements/contact" element={<PlacementContact />} />
          <Route path="/placements/recruiter-engagement" element={<RecruiterEngagement />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/academics/faculty" element={<Faculty />} />
          <Route path="/academics/:slug" element={<ProgrammeDetail />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/admissions/downloads" element={<Downloads />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/achievements" element={<Achievements />} />
          <Route path="/students/batch-profile" element={<BatchProfile />} />
          <Route path="/students/leadership" element={<Leadership />} />
          <Route path="/students/body-structure" element={<BodyStructure />} />
          <Route path="/students/life" element={<Life />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/simerations" element={<Simerations />} />
          <Route path="/events/tedxsimsree" element={<Tedx />} />
          <Route path="/events/flagship" element={<Flagship />} />
          <Route path="/events/development-programmes" element={<DevProgrammes />} />
          <Route path="/events/news" element={<News />} />
          <Route path="/students/committees/:slug" element={<CommitteeDetail />} />
          <Route path="/admissions/:slug" element={<AdmissionDetail />} />
          {stubRoutes.map((r) => (
            <Route key={r.path} path={r.path} element={<PageStub title={r.label} />} />
          ))}
          <Route path="*" element={<PageStub title="Page Not Found" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

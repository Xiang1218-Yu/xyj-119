import { useAppStore } from '@/store/useAppStore';
import Navigation from '@/components/common/Navigation';
import HotSpotPage from '@/pages/HotSpotPage';
import TopicPage from '@/pages/TopicPage';
import TitlePage from '@/pages/TitlePage';
import ScriptPage from '@/pages/ScriptPage';
import ProfilePage from '@/pages/ProfilePage';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const { currentPage } = useAppStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'hotspot':
        return <HotSpotPage />;
      case 'topic':
        return <TopicPage />;
      case 'title':
        return <TitlePage />;
      case 'script':
        return <ScriptPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HotSpotPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="ml-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

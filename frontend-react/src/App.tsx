import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { TabNav } from "@/components/layout/TabNav";
import { PageContainer } from "@/components/layout/PageContainer";
import { MapPage } from "@/pages/MapPage";
import { KpisPage } from "@/pages/KpisPage";
import { RoutesPage } from "@/pages/RoutesPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col bg-background text-foreground">
        <Header />
        <TabNav />
        <PageContainer>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/kpis" element={<KpisPage />} />
            <Route path="/rotas" element={<RoutesPage />} />
          </Routes>
        </PageContainer>
      </div>
    </BrowserRouter>
  );
}

export default App;

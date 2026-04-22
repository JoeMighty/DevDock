import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import HomePage from '@/pages/HomePage';
import JsonToTable from '@/pages/tools/JsonToTable';
import ApiTester from '@/pages/tools/ApiTester';
import ChangelogGenerator from '@/pages/tools/ChangelogGenerator';
import CssGenerator from '@/pages/tools/CssGenerator';
import SchemaDesigner from '@/pages/tools/SchemaDesigner';
import SitemapGenerator from '@/pages/tools/SitemapGenerator';
import UptimeMonitor from '@/pages/tools/UptimeMonitor';
import JwtDecoder from '@/pages/tools/JwtDecoder';
import RegexTester from '@/pages/tools/RegexTester';
import CronGenerator from '@/pages/tools/CronGenerator';
import EncoderDecoder from '@/pages/tools/EncoderDecoder';
import ColorChecker from '@/pages/tools/ColorChecker';
import MarkdownEditor from '@/pages/tools/MarkdownEditor';
import HashGenerator from '@/pages/tools/HashGenerator';
import HtmlToJsx from '@/pages/tools/HtmlToJsx';
import MockData from '@/pages/tools/MockData';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools/json-to-table" element={<JsonToTable />} />
          <Route path="/tools/api-tester" element={<ApiTester />} />
          <Route path="/tools/changelog" element={<ChangelogGenerator />} />
          <Route path="/tools/css-gen" element={<CssGenerator />} />
          <Route path="/tools/schema" element={<SchemaDesigner />} />
          <Route path="/tools/sitemap" element={<SitemapGenerator />} />
          <Route path="/tools/uptime" element={<UptimeMonitor />} />
          <Route path="/tools/jwt" element={<JwtDecoder />} />
          <Route path="/tools/regex" element={<RegexTester />} />
          <Route path="/tools/cron" element={<CronGenerator />} />
          <Route path="/tools/encoder" element={<EncoderDecoder />} />
          <Route path="/tools/color" element={<ColorChecker />} />
          <Route path="/tools/markdown" element={<MarkdownEditor />} />
          <Route path="/tools/hash" element={<HashGenerator />} />
          <Route path="/tools/html-to-jsx" element={<HtmlToJsx />} />
          <Route path="/tools/mock-data" element={<MockData />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;

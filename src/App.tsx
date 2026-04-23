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
import PasswordAnalyzer from '@/pages/tools/PasswordAnalyzer';
import CidrCalculator from '@/pages/tools/CidrCalculator';
import LogSanitizer from '@/pages/tools/LogSanitizer';
import PemDecoder from '@/pages/tools/PemDecoder';

// Architecture Expansion
import DockerBuilder from '@/pages/tools/DockerBuilder';
import ChmodCalculator from '@/pages/tools/ChmodCalculator';
import JsonDiff from '@/pages/tools/JsonDiff';
import Base64Encoder from '@/pages/tools/Base64Encoder';
import BcryptVerifier from '@/pages/tools/BcryptVerifier';

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
          <Route path="/tools/password" element={<PasswordAnalyzer />} />
          <Route path="/tools/cidr" element={<CidrCalculator />} />
          <Route path="/tools/sanitizer" element={<LogSanitizer />} />
          <Route path="/tools/pem" element={<PemDecoder />} />
          
          <Route path="/tools/docker" element={<DockerBuilder />} />
          <Route path="/tools/chmod" element={<ChmodCalculator />} />
          <Route path="/tools/json-diff" element={<JsonDiff />} />
          <Route path="/tools/base64" element={<Base64Encoder />} />
          <Route path="/tools/bcrypt" element={<BcryptVerifier />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;

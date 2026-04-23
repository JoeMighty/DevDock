import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Loader2 } from 'lucide-react';

// Core
const HomePage = lazy(() => import('@/pages/HomePage'));

// Tools
const JsonToTable        = lazy(() => import('@/pages/tools/JsonToTable'));
const ApiTester          = lazy(() => import('@/pages/tools/ApiTester'));
const ChangelogGenerator = lazy(() => import('@/pages/tools/ChangelogGenerator'));
const CssGenerator       = lazy(() => import('@/pages/tools/CssGenerator'));
const SchemaDesigner     = lazy(() => import('@/pages/tools/SchemaDesigner'));
const SitemapGenerator   = lazy(() => import('@/pages/tools/SitemapGenerator'));
const UptimeMonitor      = lazy(() => import('@/pages/tools/UptimeMonitor'));
const JwtDecoder         = lazy(() => import('@/pages/tools/JwtDecoder'));
const RegexTester        = lazy(() => import('@/pages/tools/RegexTester'));
const CronGenerator      = lazy(() => import('@/pages/tools/CronGenerator'));
const EncoderDecoder     = lazy(() => import('@/pages/tools/EncoderDecoder'));
const ColorChecker       = lazy(() => import('@/pages/tools/ColorChecker'));
const MarkdownEditor     = lazy(() => import('@/pages/tools/MarkdownEditor'));
const HashGenerator      = lazy(() => import('@/pages/tools/HashGenerator'));
const HtmlToJsx          = lazy(() => import('@/pages/tools/HtmlToJsx'));
const MockData           = lazy(() => import('@/pages/tools/MockData'));
const PasswordAnalyzer   = lazy(() => import('@/pages/tools/PasswordAnalyzer'));
const CidrCalculator     = lazy(() => import('@/pages/tools/CidrCalculator'));
const LogSanitizer       = lazy(() => import('@/pages/tools/LogSanitizer'));
const PemDecoder         = lazy(() => import('@/pages/tools/PemDecoder'));
const DockerBuilder      = lazy(() => import('@/pages/tools/DockerBuilder'));
const ChmodCalculator    = lazy(() => import('@/pages/tools/ChmodCalculator'));
const JsonDiff           = lazy(() => import('@/pages/tools/JsonDiff'));
const Base64Encoder      = lazy(() => import('@/pages/tools/Base64Encoder'));
const BcryptVerifier     = lazy(() => import('@/pages/tools/BcryptVerifier'));
const CsvJsonConverter   = lazy(() => import('@/pages/tools/CsvJsonConverter'));
const SqlFormatter       = lazy(() => import('@/pages/tools/SqlFormatter'));
const StringToolkit      = lazy(() => import('@/pages/tools/StringToolkit'));
const LoremIpsum         = lazy(() => import('@/pages/tools/LoremIpsum'));
const UrlParser          = lazy(() => import('@/pages/tools/UrlParser'));
const QrCodeGenerator    = lazy(() => import('@/pages/tools/QrCodeGenerator'));
const HttpStatusCodes    = lazy(() => import('@/pages/tools/HttpStatusCodes'));
const UuidGenerator      = lazy(() => import('@/pages/tools/UuidGenerator'));
const TimestampConverter = lazy(() => import('@/pages/tools/TimestampConverter'));
const NumberBaseConverter = lazy(() => import('@/pages/tools/NumberBaseConverter'));
const YamlJsonConverter  = lazy(() => import('@/pages/tools/YamlJsonConverter'));
const TextDiff           = lazy(() => import('@/pages/tools/TextDiff'));
const GitignoreGenerator = lazy(() => import('@/pages/tools/GitignoreGenerator'));
const CurlConverter      = lazy(() => import('@/pages/tools/CurlConverter'));
const CssUnitConverter   = lazy(() => import('@/pages/tools/CssUnitConverter'));
const ColorPaletteGenerator = lazy(() => import('@/pages/tools/ColorPaletteGenerator'));
const OtpGenerator       = lazy(() => import('@/pages/tools/OtpGenerator'));
const ConventionalCommits = lazy(() => import('@/pages/tools/ConventionalCommits'));
const SemverCalculator   = lazy(() => import('@/pages/tools/SemverCalculator'));
const EnvFormatter       = lazy(() => import('@/pages/tools/EnvFormatter'));
const XmlFormatter       = lazy(() => import('@/pages/tools/XmlFormatter'));
const PasswordGenerator  = lazy(() => import('@/pages/tools/PasswordGenerator'));
const GradientBuilder    = lazy(() => import('@/pages/tools/GradientBuilder'));
const JsonSchemaValidator = lazy(() => import('@/pages/tools/JsonSchemaValidator'));
const RobotsTxtGenerator = lazy(() => import('@/pages/tools/RobotsTxtGenerator'));
const HmacCalculator     = lazy(() => import('@/pages/tools/HmacCalculator'));

// v1.7.0 Tools
const GraphqlFormatter   = lazy(() => import('@/pages/tools/GraphqlFormatter'));
const JsonPathTester     = lazy(() => import('@/pages/tools/JsonPathTester'));
const TypographyScale    = lazy(() => import('@/pages/tools/TypographyScale'));
const SvgOptimiser       = lazy(() => import('@/pages/tools/SvgOptimiser'));
const FaviconGenerator   = lazy(() => import('@/pages/tools/FaviconGenerator'));

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center p-12">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">Initializing engine...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AppLayout>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/tools/csv-json" element={<CsvJsonConverter />} />
            <Route path="/tools/sql" element={<SqlFormatter />} />
            <Route path="/tools/strings" element={<StringToolkit />} />
            <Route path="/tools/lorem" element={<LoremIpsum />} />
            <Route path="/tools/url-parser" element={<UrlParser />} />
            <Route path="/tools/qr-code" element={<QrCodeGenerator />} />
            <Route path="/tools/http-status" element={<HttpStatusCodes />} />
            <Route path="/tools/uuid" element={<UuidGenerator />} />
            <Route path="/tools/timestamp" element={<TimestampConverter />} />
            <Route path="/tools/number-base" element={<NumberBaseConverter />} />
            <Route path="/tools/yaml" element={<YamlJsonConverter />} />
            <Route path="/tools/text-diff" element={<TextDiff />} />
            <Route path="/tools/gitignore" element={<GitignoreGenerator />} />
            <Route path="/tools/curl" element={<CurlConverter />} />
            <Route path="/tools/css-units" element={<CssUnitConverter />} />
            <Route path="/tools/palette" element={<ColorPaletteGenerator />} />
            <Route path="/tools/otp" element={<OtpGenerator />} />
            <Route path="/tools/commits" element={<ConventionalCommits />} />
            <Route path="/tools/semver" element={<SemverCalculator />} />
            <Route path="/tools/env" element={<EnvFormatter />} />
            <Route path="/tools/xml" element={<XmlFormatter />} />
            <Route path="/tools/password-gen" element={<PasswordGenerator />} />
            <Route path="/tools/gradient" element={<GradientBuilder />} />
            <Route path="/tools/json-schema" element={<JsonSchemaValidator />} />
            <Route path="/tools/robots" element={<RobotsTxtGenerator />} />
            <Route path="/tools/hmac" element={<HmacCalculator />} />

            {/* v1.7.0 */}
            <Route path="/tools/graphql" element={<GraphqlFormatter />} />
            <Route path="/tools/json-path" element={<JsonPathTester />} />
            <Route path="/tools/typography" element={<TypographyScale />} />
            <Route path="/tools/svg-optimiser" element={<SvgOptimiser />} />
            <Route path="/tools/favicon" element={<FaviconGenerator />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </Router>
  );
}

export default App;

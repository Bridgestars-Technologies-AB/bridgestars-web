import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: 'https://99a04c151a4821420a8a3fb7e0e8d897@o4505885777199104.ingest.sentry.io/4505885777330176',
  // Performance Monitoring
  tracesSampleRate: 1.0,
});

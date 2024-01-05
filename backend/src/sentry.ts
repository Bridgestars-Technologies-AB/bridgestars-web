import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: 'https://89b522314173f933f0aa5e93d2a8b7ba@o4506263752802304.ingest.sentry.io/4506263752998912',
  // Performance Monitoring
  tracesSampleRate: 1.0,
});

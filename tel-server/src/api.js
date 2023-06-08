const express = require('express');
const serverless = require ('serverless-http');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { createClient } = require('@supabase/supabase-js');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');


const app = express();
app.use(express.json());

// const port = 3000;

const supabase = createClient('https://jjollwlrhdrhaeaijdqo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqb2xsd2xyaGRyaGFlYWlqZHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0MjQ2OTgsImV4cCI6MjAwMTAwMDY5OH0.FI0RKAJ1PiwoOj71KPpuSZlIVCAd5wzYUj6B8OYFkw4');

const provider = new NodeTracerProvider();
const consoleExporter = new ConsoleSpanExporter();
const spanProcessor = new SimpleSpanProcessor(consoleExporter);
provider.addSpanProcessor(spanProcessor);
provider.register()

const router = express.Router();
app.use('/.netlify/functions/api', router);

router.get('/', (req, res) => res.sendStatus(200));

router.post('/install', async (req, res) => {
  try {
    const date = new Date();
    console.log(`Plugin installed on ${date} ${JSON.stringify(req.body)} ${req.ip}`);
    const { os, versions, time, pkg } = req.body;
    const { error, status } = await supabase.from('tel-data-HUip1VeYGW8Kyyq').insert([{
      os: JSON.stringify(os),
      versions: JSON.stringify(versions),
      time: JSON.stringify(time),
      pkg: JSON.stringify(pkg),
    }]);
    
    console.log("status:", status);
    
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/error', async (req, res) => {
  res.sendStatus(200);
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports.handler = serverless(app);

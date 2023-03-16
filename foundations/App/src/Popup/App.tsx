/*global chrome*/
import React, { useEffect, useState } from "react";
import "./App.css";
import API_KEY from './apikey';
import { getCurrentTabUrl } from "../injected";

import { Box, Button, Container, Grid, Paper, TextField } from "@mui/material";

// import AutorenewIcon from "@mui/icons-material/Autorenew";

import { Configuration, OpenAIApi } from "openai";
// import * as slack from "@slack/web-api";

// const client= new slack.WebClient("TOKEN");
// delete client["axios"].defaults.headers["User-Agent"];

export default function App() {
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const configuration = new Configuration({
    apiKey: API_KEY,
  });


  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    getCurrentTabUrl((url) => {
        setUrl(url || 'undefined');
    })
  }, []);

  useEffect(() => {
    try {
      chrome.storage.local.get(null, function (data) {
        if ("prompt" in data) {
          console.log(data.prompt);
          setPrompt(data.prompt);
        }
      });
    } catch (e) {
      console.log("Error due to local state");
    }
  }, []);

  async function handleSubmit() {
    setIsLoading(true);

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 100,
      });
      setResponse(completion.data.choices[0].text || '');
      setIsLoading(false);
    } catch (e) {
      alert("Error: " + e);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Box sx={{ width: "100%", mt: 4 }}>
      <p>URL: {url}</p>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoFocus
              label="Your text"
              variant="outlined"
              multiline
              rows={4}
              margin="normal"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                chrome.storage.local.set({ prompt: e.target.value });
              }}
            />
            <Button
              fullWidth
              disableElevation
              variant="contained"
              onClick={() => handleSubmit()}
              disabled={isLoading}
              // startIcon={
              //   isLoading && (
              //     <AutorenewIcon
              //       sx={{
              //         animation: "spin 2s linear infinite",
              //         "@keyframes spin": {
              //           "0%": {
              //             transform: "rotate(360deg)",
              //           },
              //           "100%": {
              //             transform: "rotate(0deg)",
              //           },
              //         },
              //       }}
              //     />
              //   )
              // }
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Paper sx={{ p: 3 }}>{response}</Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
import { addPost, getMediumArticles } from "medium-api-npm";
import cron from "node-cron";
import OpenAI from "openai";
import googleTrends from "google-trends-api";

const openai = new OpenAI({
  apiKey: "API-KEY",
});

async function generateContentFromOpenAI(searchQuery) {
  try {
    const word = searchQuery;
    const userMessageContent = `Write a 3 to 5 paragraph blog on ${word}.don't make steps make para with headings and make space between every para.`;
    console.log("search word", userMessageContent);

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessageContent },
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    throw error;
  }
}

async function postOnMedium(trendingSearchQuery) {
  try {
    const auth =
      "MEDIUM API KEY";

    const userData = await getMediumArticles({ auth });
    console.log("Fetched Medium articles:", userData);

    const generatedContent = await generateContentFromOpenAI(
      trendingSearchQuery
    );
    console.log("Generated content from OpenAI:", generatedContent);

    let title = trendingSearchQuery;

    const postData = {
      auth,
      title: `${title}`,
      html: `${generatedContent}`,
      canonicalUrl: `PROFILE URL`,
      tags: ["test"],
      publishStatus: "public",
    };

    const postResponse = await addPost(postData);
    console.log("Posted on Medium:", postResponse);

    console.log("Uploaded On Medium");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchTrendingSearches() {
  try {
    const results = await googleTrends.dailyTrends({
      trendDate: new Date(),
      geo: "IN",
    });

    const parsedResults = JSON.parse(results);
    const trendingSearchesDays =
      parsedResults.default.trendingSearchesDays[0].trendingSearches[0].title
        .query;
    console.log("Trending searches:", trendingSearchesDays);

    return trendingSearchesDays;
  } catch (error) {
    console.error("Error fetching trending searches:", error);
    throw error;
  }
}

async function main() {
  try {
    const trendingSearchQuery = await fetchTrendingSearches();
    await generateContentFromOpenAI(trendingSearchQuery);
    await postOnMedium(trendingSearchQuery);
  } catch (error) {
    console.error("Main function error:", error);
  }
}

cron.schedule("0 0 * * *", () => {
  console.log("running a task every 24 hrs");
  main();
});

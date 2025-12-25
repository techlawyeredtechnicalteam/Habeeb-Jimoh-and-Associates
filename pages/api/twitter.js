export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    console.error("❌ TWITTER_BEARER_TOKEN is missing!");
    return res.status(500).json({ error: "Twitter API token not configured" });
  }

  console.log("✅ Bearer token found, fetching user:", username);
  console.log("🔑 Token starts with:", bearerToken.substring(0, 20) + "...");

  try {
    // First get user ID from username
    const userUrl = `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`;
    console.log("📡 Fetching user from:", userUrl);

    const userResponse = await fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });

    console.log("👤 User API response status:", userResponse.status);

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error(
        "❌ Twitter API Error (user) - Status:",
        userResponse.status
      );
      console.error("❌ Response body:", errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { detail: errorText };
      }

      return res.status(userResponse.status).json({
        error: `Twitter API Error: ${errorData.detail || errorData.title || errorData.error || "Failed to fetch user"}`,
        details: errorData
      });
    }

    const userData = await userResponse.json();
    console.log("✅ User data received:", JSON.stringify(userData, null, 2));

    if (!userData.data || !userData.data.id) {
      console.error("❌ No user ID found in response");
      return res.status(404).json({
        error: "User not found",
        userData: userData
      });
    }

    const userId = userData.data.id;
    console.log("✅ User ID:", userId);

    // get user's tweets (min 5, we'll limit to 3 after fetching)
    const tweetsUrl = `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at,public_metrics,entities&expansions=author_id&user.fields=name,username,profile_image_url`;
    console.log("📡 Fetching tweets from:", tweetsUrl);

    const tweetsResponse = await fetch(tweetsUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });

    console.log("🐦 Tweets API response status:", tweetsResponse.status);

    if (!tweetsResponse.ok) {
      const errorText = await tweetsResponse.text();
      console.error(
        "❌ Twitter API Error (tweets) - Status:",
        tweetsResponse.status
      );
      console.error("❌ Response body:", errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { detail: errorText };
      }

      return res.status(tweetsResponse.status).json({
        error: `Twitter API Error: ${errorData.detail || errorData.title || errorData.error || "Failed to fetch tweets"}`,
        details: errorData
      });
    }

    const tweetsData = await tweetsResponse.json();
    console.log(
      "✅ Tweets data received:",
      JSON.stringify(tweetsData, null, 2)
    );

    if (!tweetsData.data || tweetsData.data.length === 0) {
      console.log("⚠️ No tweets found for user");
      return res.status(200).json({ tweets: [] });
    }

    // Format the response and limit to 3 tweets
    const author = tweetsData.includes?.users?.[0] || userData.data;

    const formattedTweets = tweetsData.data.slice(0, 3).map((tweet) => ({
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at,
      public_metrics: tweet.public_metrics,
      entities: tweet.entities,
      author: {
        name: author.name,
        username: author.username,
        profile_image_url: author.profile_image_url
      }
    }));

    console.log("✅ Returning", formattedTweets.length, "tweets");
    res.status(200).json({ tweets: formattedTweets });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: "Failed to fetch tweets",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function TwitterFeed({ username = "amasandrhodlaw" }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTweets();
  }, [username]);

  const fetchTweets = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/twitter?username=${username}`);

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to fetch tweets");
      }

      const data = await response.json();
      console.log("Tweets recieved:", data);

      setTweets(data.tweets || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching tweets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const renderTweetText = (text, entities) => {
    if (!entities) return text;

    let processedText = text;

    // Handle hastags
    if (entities.hashtags) {
      entities.hashtags.forEach((hashtag) => {
        const tag = `#${hashtag.tag}`;
        processedText = processedText.replace(
          tag,
          `<span class="text-blue-400">${tag}</span>`
        );
      });
    }

    return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
  };

  if (loading) {
    return (
      <section className="bg-red-800 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl mb-6">Latest Feed</h2>
          <div className="text-center text-white mt-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4">Loading tweets...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-red-800 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center font-sans tracking-wider">
            LATEST FEED
          </h2>
          <div className="bg-red-900/50 rounded-lg p-8 text-center text-white mt-12 max-w-2xl mx-auto">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-lg mb-2">Unable to load posts</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl mb-4 font-bold">Latest Feed</h2>

        <div className="space-y-6">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="bg-red-800 border-white/20 pb-6">
              {/* Tweet Header */}
              <div className="flex items-start space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={tweet.author.profile_image_url}
                    alt={tweet.author.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-bold text-lg">
                        {tweet.author.name}
                      </h3>
                      <span className="text-blue-400 text-sm">
                        @{tweet.author.username}
                      </span>
                    </div>

                    {/* Twitter X logo */}
                    <a
                      href={`https://twitter.com/${tweet.author.username}/status/${tweet.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>

                  {/* Tweet Text */}
                  <div className="mt-3 text-white text-base leading-relaxed">
                    {renderTweetText(tweet.text, tweet.entities)}
                  </div>

                  {/* Tweet Stats */}
                  <div className="mt-4 flex items-center space-x-6 text-gray-300 text-sm">
                    <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </button>

                    <button className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>

                    <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {tweet.public_metrics?.like_count > 0 && (
                        <span>{tweet.public_metrics.like_count}</span>
                      )}
                    </button>

                    <a
                      href={`https://twitter.com/${tweet.author.username}/status/${tweet.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline ml-auto"
                    >
                      Twitter
                    </a>
                  </div>

                  {/* Date */}
                  <div className="mt-2 text-gray-400 text-sm">
                    {formatDate(tweet.created_at)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button
            onClick={fetchTweets}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}
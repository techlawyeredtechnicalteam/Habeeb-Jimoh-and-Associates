// // pages/api/linkedin.js
// export default async function handler(req, res) {
//   const { companyId } = req.query;
//   const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

//   if (!accessToken) {
//     return res.status(500).json({ error: "Missing LinkedIn access token" });
//   }

//   try {
//     // Step 1: Get the organization's numeric ID from vanity name
//     console.log("Fetching org ID for:", companyId);

//     const orgResponse = await fetch(
//       `https://api.linkedin.com/v2/organizations?q=vanityName&vanityName=${companyId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "LinkedIn-Version": "202405"
//         }
//       }
//     );

//     if (!orgResponse.ok) {
//       const errorText = await orgResponse.text();
//       console.error("Organization lookup error:", errorText);
//       return res.status(orgResponse.status).json({
//         error: `Failed to find organization: ${errorText}`
//       });
//     }

//     const orgData = await orgResponse.json();

//     if (!orgData.elements || orgData.elements.length === 0) {
//       return res.status(404).json({
//         error: "Organization not found. Check your company vanity name."
//       });
//     }

//     const orgId = orgData.elements[0].id;
//     console.log("Organization ID:", orgId);

//     // Step 2: Fetch organization posts using the numeric ID
//     const postsResponse = await fetch(
//       `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(urn%3Ali%3Aorganization%3A${orgId})&count=10&sortBy=LAST_MODIFIED`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "LinkedIn-Version": "202405"
//         }
//       }
//     );

//     if (!postsResponse.ok) {
//       const errorText = await postsResponse.text();
//       console.error("Posts fetch error:", errorText);
//       return res.status(postsResponse.status).json({
//         error: `Failed to fetch posts: ${errorText}`
//       });
//     }

//     const postsData = await postsResponse.json();
//     console.log("Posts fetched:", postsData.elements?.length || 0);

//     // Step 3: Transform the data to match your component's expected format
//     const transformedPosts = (postsData.elements || []).map((post) => {
//       // Extract text from post
//       const text =
//         post.specificContent?.["com.linkedin.ugc.ShareContent"]?.shareCommentary
//           ?.text || "";

//       // Extract image if exists
//       const media =
//         post.specificContent?.["com.linkedin.ugc.ShareContent"]?.media?.[0];
//       const image = media?.thumbnails?.[0]?.url || null;

//       // Extract post URL
//       const postId = post.id;
//       const url = `https://www.linkedin.com/feed/update/${postId}`;

//       return {
//         id: post.id,
//         text: text,
//         image: image,
//         url: url,
//         created_at: new Date(post.created.time).toISOString(),
//         author: {
//           name: orgData.elements[0].localizedName || "Company",
//           image: orgData.elements[0].logoV2?.original || null
//         },
//         likes: post.statistics?.numLikes || 0,
//         comments: post.statistics?.numComments || 0,
//         shares: post.statistics?.numShares || 0
//       };
//     });

//     return res.status(200).json({
//       posts: transformedPosts,
//       total: transformedPosts.length
//     });
//   } catch (error) {
//     console.error("LinkedIn API error:", error);
//     return res.status(500).json({
//       error: error.message || "Internal server error"
//     });
//   }
// }

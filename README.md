
  # Editable WordPress Website

  This is a code bundle for Editable WordPress Website. The original project is available at https://www.figma.com/design/n4RayALuMaSQ5v5yJKEXjc/Editable-WordPress-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Instagram feed

The Instagram section reads from a static `public/instagram-feed.json` file and local cached images in `public/instagram-cache`.

The refresh script now uses Apify's Instagram scraper, so you need an `APIFY_TOKEN` available locally and in GitHub Actions secrets.

Refresh the feed locally with:

`npm run instagram:refresh`

Optional values for local refreshes:

`APIFY_TOKEN=your_apify_token`

`APIFY_INSTAGRAM_ACTOR_ID=apify/instagram-api-scraper`

`INSTAGRAM_USERNAME=verkeersschoolbeckers`

If omitted, the refresh script already defaults to `verkeersschoolbeckers`.

A GitHub Action refreshes the static feed every 24 hours and commits the updated JSON and cached images back into the repo.

If Apify is temporarily unavailable, the workflow keeps the existing cached feed instead of failing the deployment pipeline.
  

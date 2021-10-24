import requestHttp from "./network";

export const API_OMDB = requestHttp(
  "http://www.omdbapi.com/",
  "other",
  "apikey",
)

export const API_GOOGLEMAP = requestHttp(
  "https://maps.googleapis.com/maps/api/",
  "other",
  "apikey",
);

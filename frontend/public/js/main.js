import { getPlaces, renderPlaces } from "./places.js"
import { openSearchWindow } from "./search.js";

window.onload = async () => {
  // Get the user's current location
  navigator.geolocation.getCurrentPosition((position) => {
    // Get the places near the user's location
    getPlaces(position.coords, 10).then(renderPlaces)
  })

  // add event listener to the search button
  document.getElementById("search").addEventListener("click", () => {
    openSearchWindow()
  })
};

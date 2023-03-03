import { getPlaces, renderPlaces } from "./places.js"

let window_open = false
let last_range = 10
let last_results = 10

export function openSearchWindow() {
  //change the search button to a close button
  if (!window_open) {
    console.log("Window is not open, opening window")
    window_open = true
    document.getElementById("search").innerHTML = "&#x274C;"

    //creating the search window
    const searchWindow = document.createElement('div')
    searchWindow.setAttribute('id', 'search_window')

    //creating the search title
    const searchTitle = document.createElement('div')
    searchTitle.setAttribute('id', 'search_title')
    searchTitle.innerText = "Filter"
    
    //creating the range slider
    const rangeSlider = document.createElement('input')
    rangeSlider.setAttribute('id', 'range_slider')
    rangeSlider.setAttribute('type', 'range')
    rangeSlider.setAttribute('min', '1')
    rangeSlider.setAttribute('max', '50')
    rangeSlider.setAttribute('value', last_range)
    rangeSlider.setAttribute('class', 'slider')

    //creating the range text
    const rangeText = document.createElement('div')
    rangeText.setAttribute('id', 'range_text')
    rangeText.innerText = `Suchradius: ${rangeSlider.value} km`
    //add event listener to the range slider
    rangeSlider.addEventListener('input', () => {
      rangeText.innerText = `Suchradius: ${rangeSlider.value} km`
      last_range = rangeSlider.value
    })

    //creating number of results slider
    const resultsSlider = document.createElement('input')
    resultsSlider.setAttribute('id', 'results_slider')
    resultsSlider.setAttribute('type', 'range')
    resultsSlider.setAttribute('min', '1')
    resultsSlider.setAttribute('max', '50')
    resultsSlider.setAttribute('value', last_results)
    resultsSlider.setAttribute('class', 'slider')

    //creating the number of result text
    const resultsText = document.createElement('div')
    resultsText.setAttribute('id', 'results_text')
    resultsText.innerText = `Anzahl der Sehenswürdigkeiten: ${resultsSlider.value}`
    //add event listener to the number of results slider
    resultsSlider.addEventListener('input', () => {
      resultsText.innerText = `Anzahl der Sehenswürdigkeiten: ${resultsSlider.value}`
      last_results = resultsSlider.value
    })

    //create select for categories
    const categorySelect = document.createElement('select')
    categorySelect.setAttribute('id', 'category_select')
    categorySelect.setAttribute('name', 'category')
    categorySelect.setAttribute('multiple', 'multiple')
    categorySelect.setAttribute('size', '13')
    //add options to the select
    const categories = ['wissenschaft-technik', 'karl-friedrich-schinkel', 'ns-bauten', 'ddr-bauten', 'literatur', 'regierungsbauten', 'religion-glauben', 'mauer', 'schloesser-burgen-herrenhaeuser', 'juedisches-berlin', 'industriedenkmaeler', 'gedenkstaetten', 'architektur']
    const categoriesName = ['Wissenschaft & Technik', 'Karl Friedrich Schinkel', 'NS Bauten', 'DDR Bauten', 'Literatur', 'Regierungsbauten', 'Religion & Glauben', 'Mauer', 'Schloesser, Burgen & Herrenhäuser', 'Jüdisches Berlin', 'Industriedenkmäler', 'Gedenkstätten', 'Architektur']
    for (let i = 0; i < categories.length; i++) {
      const option = document.createElement('option')
      option.setAttribute('value', categories[i])
      option.innerText = categoriesName[i]
      categorySelect.appendChild(option)
    }

    //create select text
    const categoryText = document.createElement('div')
    categoryText.setAttribute('id', 'category_text')
    categoryText.innerText = "Kategorien:"

    //create apply button
    const applyButton = document.createElement('button')
    applyButton.setAttribute('id', 'apply_button')
    applyButton.innerText = "Anwenden"
    //add event listener to the apply button
    applyButton.addEventListener('click', () => {
      console.log("apply button clicked")
      //get the selected categories
      const selectedCategories = []
      for (let i = 0; i < categorySelect.options.length; i++) {
        if (categorySelect.options[i].selected) {
          selectedCategories.push(categorySelect.options[i].value)
        }
      }
      //get the range
      const range = rangeSlider.value
      //get the number of results
      const results = resultsSlider.value
      //get the user's current location
      console.log("range: " + range)
      console.log("results: " + results)
      console.log("selected categories: " + selectedCategories)

      document.getElementById("search").innerHTML = "&#x1F50D;"
      const searchWindow = document.getElementById('search_window')

      navigator.geolocation.getCurrentPosition((position) => {
        //get the places near the user's location
        window_open = false
        searchWindow.remove()
        getPlaces(position.coords, results, selectedCategories, range).then(renderPlaces)
      }, (error) => {
        console.log("Error getting location")
        console.log(error)
        alert("Fehler beim Abrufen der aktuellen Position")
        window_open = false
        searchWindow.remove()
      })
    })

    //fill window
    searchWindow.appendChild(searchTitle)
    searchWindow.appendChild(rangeText)
    searchWindow.appendChild(rangeSlider)
    searchWindow.appendChild(resultsText)
    searchWindow.appendChild(resultsSlider)
    searchWindow.appendChild(categoryText)
    searchWindow.appendChild(categorySelect)
    searchWindow.appendChild(applyButton)

    //get search container
    const searchContainer = document.getElementById('search_container')
    searchContainer.appendChild(searchWindow)

  } else {
    console.log("Window is open, closing window")
    window_open = false
    document.getElementById("search").innerHTML = "&#x1F50D;"
    const searchWindow = document.getElementById('search_window')
    searchWindow.remove()
  }
}
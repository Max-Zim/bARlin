export function getPlaces(location, number, categories, range) {
  //create endpoint string
  let endpoint = `/api/sights/search?`
  if (location) {
    endpoint += `location={"lat":"${location.latitude}","lon":"${location.longitude}"}&closest=true`
  }
  if (number) {
    endpoint += `&number=${number}`
  }
  if (categories && categories.length > 0) {
    endpoint += `&category=${JSON.stringify(categories)}`
  }
  if (range) {
    endpoint += `&distance=${range}`
  }
  console.log(endpoint)

  return fetch(endpoint)
    .then((res) => {
      return res.json()
        .then((resp) => {
          console.log(resp)
          return resp;
        })
    })
    .catch((err) => {
      console.error('Error with sights API', err);
    })
}

export function renderPlaces(places) {
  const scene = document.querySelector('a-scene');
  //remove all places
  const oldPlaces = document.querySelectorAll('a-image');
  oldPlaces.forEach((place) => {
    place.remove();
  })

  //show how many sights are found in info box
  const infoBox = document.querySelector('#info');
  infoBox.innerText = `${places.length} 🏛️ gefunden`

  places.forEach((place) => {
    let latitude = place.location.lat;
    let longitude = place.location.lon;

    // add place icon
    const icon = document.createElement('a-image');
    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
    icon.setAttribute('name', place.name);
    icon.setAttribute('url', place.link);
    icon.setAttribute('teaser', place.teaser);

    icon.setAttribute('scale', '40 40 40')
    icon.setAttribute('src', '#marker-asset');
    icon.setAttribute('look-at', "[gps-camera]");
    icon.setAttribute('emitevents', 'true');

    icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));
    const clickListener = function (ev) {
      ev.stopPropagation();
      ev.preventDefault();

      const name = ev.target.getAttribute('name');
      const url = ev.target.getAttribute('url');
      const teaserText = ev.target.getAttribute('teaser');

      const el = ev.detail.intersection && ev.detail.intersection.object.el;

      if (el && el === ev.target) {
        console.log("CLICKED!!!! ", name);
        //window.open(url)
        const title = document.createElement('div');
        const teaser = document.createElement('div');
        const close = document.createElement('div');
        const link = document.createElement('a');
        const urlButton = document.createElement('button');
        const container = document.createElement('div');

        container.setAttribute('id', 'ar_container')
        //Close Button
        close.innerText = `×`
        close.setAttribute('id', 'ar_x')
        close.addEventListener('click', () => { container.remove() })

        //Teaser
        teaser.innerText = teaserText;
        teaser.setAttribute('id', 'ar_teaser')
        //URL Button
        urlButton.innerText = "Mehr Informationen";
        urlButton.setAttribute('class','ar_button')
        link.setAttribute("href", url);
        link.setAttribute("target", "_blank");
        link.setAttribute('id', 'ar_url')
        link.appendChild(urlButton);

        //Title
        title.innerText = name;
        title.setAttribute('id', 'ar_title')

        //fill container
        container.appendChild(close)
        container.appendChild(title);
        container.appendChild(teaser);
        container.appendChild(link)

        document.body.appendChild(container);
      }
    };

    icon.addEventListener('click', clickListener);

    scene.appendChild(icon);
  });
}

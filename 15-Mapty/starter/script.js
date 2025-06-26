'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coordinates, distance, duration) {
    this.coordinates = coordinates; // Array of Latitude and Longitude [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Running extends Workout {
  constructor(coordinates, distance, duration, cadence) {
    super(coordinates, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  constructor(coordinates, distance, duration, elevationGain) {
    super(coordinates, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    // km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -23], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -23], 27, 95, 523);
// console.log(run1, cycling1);

///////////////////////////////////////
// APPLICATION ARCHITECTURE
class App {
  workouts = [];
  #map;
  #mapEvent;
  constructor() {
    this.#getPosition();
    inputType.addEventListener('change', this.#toggleElevationFields);

    form.addEventListener('submit', this.#newWorkout.bind(this));
  }
  #getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.#loadMap.bind(this),
        function () {
          alert(`Couldn't get your position`);
        }
      );
  }
  #loadMap(p) {
    const { latitude } = p.coords;
    const { longitude } = p.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);
    // console.log(this.#map);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling Clicks on Map
    this.#map.on('click', this.#showForm.bind(this));
  }
  #showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  #toggleElevationFields(e) {
    e.preventDefault();
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  #newWorkout(e) {
    e.preventDefault();

    const distance = +inputDistance.value,
      duration = +inputDuration.value,
      type = inputType.value,
      { lat, lng } = this.#mapEvent.latlng;

    const isValidInput = (a, b, c) =>
      !Number.isFinite(a) ||
      a <= 0 ||
      !Number.isFinite(b) ||
      b <= 0 ||
      !Number.isFinite(c) ||
      c <= 0;

    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (isValidInput(distance, duration, cadence)) {
        alert('Enter a positive number');
        return;
      }
      this.workouts.push(new Running([lat, lng], distance, duration, cadence));
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (isValidInput(distance, duration, elevation)) {
        alert('Enter a positive number');
        return;
      }
      this.workouts.push(
        new Cycling([lat, lng], distance, duration, elevation)
      );
    }
    // Clear Input Fields
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';
    this.#renderWorkoutMarker(lat, lng, type);
  }

  #renderWorkoutMarker(lat, lng, type) {
    // Display Marker
    const options = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `${type}-popup`,
    };
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(L.popup(options))
      .setPopupContent(
        `${
          `${type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ` +
          type[0].toUpperCase() +
          type.slice(1)
        } on ${new Intl.DateTimeFormat(navigator.language).format(
          this.workouts.at(-1).date
        )}`
      )
      .openPopup();
  }
}

const app = new App();

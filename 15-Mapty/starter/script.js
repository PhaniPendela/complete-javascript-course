'use strict';

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
  clicks = 0;

  constructor(coordinates, distance, duration) {
    this.coordinates = coordinates; // Array of Latitude and Longitude [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks += 1;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coordinates, distance, duration, cadence) {
    super(coordinates, distance, duration);
    this.cadence = cadence;
    this.setDescription();
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coordinates, distance, duration, elevationGain) {
    super(coordinates, distance, duration);
    this.elevationGain = elevationGain;
    this.setDescription();
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
  #workouts = [];
  #mapZoomLevel = 13;
  #map;
  #mapEvent;
  constructor() {
    // Get User's Positions
    this.#getPosition();

    // Get Data from Local Storage
    this.#getLocaleStorage();

    // Attach Event Handlers
    inputType.addEventListener('change', this.#toggleElevationFields);
    form.addEventListener('submit', this.#newWorkout.bind(this));
    containerWorkouts.addEventListener('click', this.#moveToPopUp.bind(this));
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

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    // console.log(this.#map);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling Clicks on Map
    this.#map.on('click', this.#showForm.bind(this));

    this.#workouts.forEach(work => {
      this.#renderWorkoutMarker(work);
    });
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

    let workout;
    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (isValidInput(distance, duration, cadence)) {
        alert('Enter a positive number');
        return;
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (isValidInput(distance, duration, elevation)) {
        alert('Enter a positive number');
        return;
      }
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workouts
    this.#workouts.push(workout);

    // Render workout on map as marker
    this.#renderWorkoutMarker(workout);

    // Render Workout on list
    this.#renderWorkout(workout);

    // Clear input fields + hide form
    this.#hideForm();

    // Set Local Storage to all workouts
    this.#setLocaleStorage();
  }
  #renderWorkoutMarker({ coordinates, type, description }) {
    // Display Marker
    const options = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `${type}-popup`,
    };
    L.marker(coordinates)
      .addTo(this.#map)
      .bindPopup(L.popup(options))
      .setPopupContent(
        `${
          `${type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ` +
          type[0].toUpperCase() +
          type.slice(1)
        } on ${description}`
      )
      .openPopup();
  }
  #renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id=${workout.id}>
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>`;
    if (workout.type === 'running') {
      html += `<div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">MIN/KM</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">SPM</span>
        </div>
      </li>`;
    }
    if (workout.type === 'cycling') {
      html += `<div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">KM/H</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">M</span>
        </div>
      </li>`;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  #hideForm() {
    // Clear Input Fields
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  #moveToPopUp(e) {
    // console.log(e);
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(w => w.id === workoutEl.dataset.id);
    // console.log(workout);

    this.#map.setView(workout.coordinates, this.#mapZoomLevel, {
      animation: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // console.log(workout);
    // workout.click();
  }
  #setLocaleStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  #getLocaleStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data);

    if (!data) return;
    this.#workouts = data;

    this.#workouts.forEach(work => {
      this.#renderWorkout(work);
      // this.#renderWorkoutMarker(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

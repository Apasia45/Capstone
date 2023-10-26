import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
      ${Header(state)}
      ${Nav(store.Links)}
      ${Main(state)}
      ${Footer()}
    `;
  afterRender(state);
  router.updatePageLinks();
}

function afterRender(state) {
  if (state.view === "Mainrestaurant") {
    document.getElementById("nobtn").addEventListener("click", function() {
      if (state.currentIndex === state.restaurants.length - 1) {
        store.Mainrestaurant.currentIndex = 0;
        console.log(state.restaurants.length);
      } else {
        store.Mainrestaurant.currentIndex++;
      }
      console.log(store.Mainrestaurant.currentIndex);
      store.Mainrestaurant.currentRestaurant =
        state.restaurants[store.Mainrestaurant.currentIndex];

      router.navigate("/Mainrestaurant");
    });
  }

  //Set the img selector from main restaurant in here somehow and also maybe use a query selector here
  //for the on click function

  if (state.view === "Review") {
    // Add an event handler for the submit button on the form
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      // Get the form element
      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      const requestData = {
        ReviewTextBox: inputList.ReviewTextBox,
        ReviewStars: inputList.ReviewStars
      };

      console.log("request Body", requestData);

      axios
        // Make a POST request to the API to create a new pizza
        .post(`${process.env.REVIEW_API_URL}/reviews`, requestData)
        .then(response => {
          //  Then push the new pizza onto the Pizza state pizzas attribute, so it can be displayed in the pizza list
          store.Review.reviews.push(response.data);
          router.navigate("/Review");
        })
        // If there is an error log it to the console
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }
}
router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "home";

    switch (view) {
      case "Home":
        axios
          // Get request to retrieve the current weather data using the API key and providing a city name
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
          )
          .then(response => {
            // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            // Create an object to be stored in the Home state from the response
            store.Home.weather = {
              city: response.data.name,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main
            };

            // An alternate method would be to store the values independently
            /*
      store.Home.weather.city = response.data.name;
      store.Home.weather.temp = kelvinToFahrenheit(response.data.main.temp);
      store.Home.weather.feelsLike = kelvinToFahrenheit(response.data.main.feels_like);
      store.Home.weather.description = response.data.weather[0].main;
      */
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        break;
      // case "Mainrestaurant":
      //   axios
      //     .get(
      //       `https://api.yelp.com/v3/businesses/search?accessToken=${process.env.YELP_API_KEY}`
      //     )

      //     .then(response => {
      //       console.log("response", response);
      //       store.Mainrestaurant.restaurants = response.data;
      //       done();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //       done();
      //     });
      //   break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      if (view in store) {
        render(store[view]);
      } else {
        render(store.Viewnotfound);
        console.log(`View ${view} not defined`);
      }
    }
  })
  .resolve();

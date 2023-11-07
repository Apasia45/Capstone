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

//no button functionality
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

  if (state.view === "Review") {
    // Add an event handler for the submit button on the form
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      // Get the form element
      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      const requestData = {
        reviewTextBox: inputList.reviewTextBox.value,
        reviewStars: inputList.stars.value
      };

      console.log("request Body", requestData);

      axios
        // Make a POST request to the API to create a new review
        .post(`${process.env.EATR_API_URL}/reviews`, requestData)
        .then(response => {
          //  Then push the new review onto the Review state reviews attribute, so it can be displayed in the review list
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

    // let latitude = 38.5592791;
    // let longitude = -90.6155662;

    let latitude = 37.7749;
    let longitude = -122.4194;

    switch (view) {
      case "Review":
        // Add a case for each view that needs data from an API

        // New Axios get request utilizing already made environment variable
        axios
          .get(`${process.env.EATR_API_URL}/reviews`)
          .then(response => {
            // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
            console.log("response", response);
            store.Review.reviews = response.data;
            done();
          })
          // eslint-disable-next-line prettier/prettier
            .catch((error) => {
            console.log("It puked", error);
            done();
          });
        break;

      case "Mainrestaurant":
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log(position);
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            axios
              .get(
                `${process.env.EATR_API_URL}/yelp?latitude=${latitude}&longitude=${longitude}&term=restaurants`
              )
              .then(response => {
                console.log("response", response);
                store.Mainrestaurant.restaurants = response.data;
                store.Mainrestaurant.currentRestaurant = response.data[0];
                done();
              })
              .catch(err => {
                console.log(err);
                done();
              });
          },
          error => {
            console.error(error);
            done();
          }
        );

        break;
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

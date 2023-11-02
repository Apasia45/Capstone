import html from "html-literal";
import * as store from "../../store/index";
export default state => html`
  <a href="Mainrestaurant" data-navigo id="backToRestaurants"
    >Back to restaurants</a
  >
  <section id="review">
    <form id="review" method="POST" action="">
      <fieldset>
        <div id="Stars">
          <legend>Select your rating</legend>
          <input type="radio" name="stars" id="1Star" value="1" />
          <label for="1Star">1 star</label>
          <input type="radio" name="stars" id="2Star" value="2" />
          <label for="2Star">2 stars</label>
          <input type="radio" name="stars" id="3Star" value="3" />
          <label for="3Star">3 Stars</label>
          <input type="radio" name="stars" id="4Star" value="4" />
          <label for="4Star">4 Stars</label>
          <input type="radio" name="stars" id="5Star" value="5" />
          <label for="5Star">5 Stars</label>
        </div>
      </fieldset>
      <div id="textBox">
        <label for="reviewTextBox">Write Your Review Here:</label>
        <input
          type="text"
          name="reviewTextBox"
          id="reviewTextBox"
          placeholder="Enter Review"
          required
        />

        <input type="submit" name="submit" value="Submit Review" />
      </div>
    </form>
  </section>

  <section id="reviewList">
    <table id="reviewTable">
      <tr>
        <th>Star rating</th>
        <th>Review</th>
      </tr>
      ${state.reviews
        .map(review => {
          return `<tr><td>${review.reviewStars}</td><td>${review.reviewTextBox}</td>`;
        })
        .join("")}
    </table>
  </section>
  <img
    class="restaurantimg"
    src="${store.Mainrestaurant.restaurants[store.Mainrestaurant.currentIndex]
      .image_url}"
  />
`;

//Text box for user feed back maybe a star rating system, show other users feed back wont be
//available for current project make background the img of current restaurant

//Could use yelp API display requirements here using the "yelp-branded stars"

//The following Yelp-branded stars sprite must be used when representing a Yelp rating. Generic or unbranded stars are not permitted.

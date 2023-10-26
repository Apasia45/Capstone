import html from "html-literal";

export default () => html`
  <a href="Mainrestaurant" data-navigo id="backToRestaurants"
    >Back to restaurants</a
  >
  <section id="review">
    <form id="review" method="POST" action="">
      <h2>Leave a review on INSERT RESTAURANT HERE</h2>
      <fieldset>
        <div id="Stars">
          <label for="reviewStars">Select your rating</label>
          <input type="radio" name="stars" id="1_star" value="1" />
          <label for="1Star">1 star</label>
          <input type="radio" name="stars" id="2_star" value="2" />
          <label for="2Star">2 star</label>
          <input type="radio" name="stars" id="3_star" value="3" />
          <label for="3Star">3 Star</label>
          <input type="radio" name="stars" id="4_star" value="4" />
          <label for="4Star">4 Star</label>
          <input type="radio" name="stars" id="5_star" value="5" />
          <label for="5Star">5 Star</label>
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
`;

//Text box for user feed back maybe a star rating system, show other users feed back wont be
//available for current project make background the img of current restaurant

//Could use yelp API display requirements here using the "yelp-branded stars"

//The following Yelp-branded stars sprite must be used when representing a Yelp rating. Generic or unbranded stars are not permitted.

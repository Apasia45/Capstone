import html from "html-literal";

export default state => {
  return html`
    <section>
      <a id="backtopref" href="Preferences" data-navigo>Back to Preferences</a>
      <a id="leavereview" href="Review" data-navigo>Leave a review</a>
      <div id="mainRestaurantBody">
        <h3>${state.currentRestaurant.name}</h3>
      </div>
      <div>
        <a id="yesbtn" href="Yesbutton" data-navigo>
          <h2>Yes</h2>
        </a>
      </div>
      <div>
        <a id="nobtn">
          <h2>No</h2>
        </a>
      </div>

      <img class="restaurantimg" src="${state.currentRestaurant.image_url}" />
    </section>
  `;
};
//Put in big letters fixed up and maybe left if possible to pull the first image of the restaurant
//as the back ground with the letters over and then bottom 1/3 or so have yes no buttons and
//top of screen have a go back to home and from home user can access the contact button, top right
//of screen have button to leave a review adding a swipe left or right for phones is kinda the whole
//idea but doubt ill be able to do that anytime soon

//Add a top 5 restaurants that saves and you can select from the top 5-10 options

//Under is_closed if "false" display if "true" display next restaurant in array

//display "catagories.titles"

//change yes button to a "more info button"

//show the rating

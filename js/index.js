document.addEventListener('DOMContentLoaded', () => {
  const allList = document.querySelectorAll('ul li a');

  class Game {
    constructor() {
      this.initialize();
      this.options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'b50c83fc4cmsh619db77576f83abp1343dcjsn8bdf735820e6',
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };
      this.getAllGamesHere('mmorpg');
    }

    initialize() {
      allList.forEach(element => {
        element.addEventListener('click', () => {
          this.removeActiveClasses();
          this.addActiveClasses(element);
        });
      });
    }

    removeActiveClasses() {
      allList.forEach(element => {
        element.classList.remove('active');
      });
    }

    addActiveClasses(element) {
      element.classList.add('active');
      let giveText = element.textContent.toLowerCase();
      this.getAllGamesHere(giveText);
    }

    async getAllGamesHere(giveText) {
      try {
        let fetch_Url = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${giveText}`, this.options);
        let fetch_Json = await fetch_Url.json();
        this.displyGameInBody(fetch_Json);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    }

    displyGameInBody(fetch_Json) {
      let cartona = '';
      fetch_Json.forEach((element) => {
        cartona += `
          <div class="col-md-4">
            <div class="card p-3 h-100">
              <div class="image w-100">
                <img src="${element.thumbnail}" class="w-100 h-100" alt="">
              </div>
              <div class="hstack d-flex justify-content-between align-items-center mt-4">
                <h6 class="small text-white fw-bold">
                  ${element.title}
                </h6>
                <span class="badge text-bg-primary p-2">Free</span>
              </div>
              <p class="card-text small text-center text-white">
                ${element.short_description.split('').splice(2, 50).join('')}
              </p>
              <div class="footer d-flex justify-content-between align-items-center">
                <span class="badge badge-color">${element.platform}</span>
                <span class="badge badge-color">${element.publisher}</span>
              </div>
            </div>
          </div>
        `;
      });
      document.querySelector('.row').innerHTML = cartona;
      this.getClickCard(fetch_Json);
      document.querySelector('.lds-roller').style.display = 'none'; // إخفاء الرمز التحميلي بعد تحميل البيانات
    }

    getClickCard(fetch_Json) {
      const cards = document.querySelectorAll('.card');
      cards.forEach((element, index) => {
        element.addEventListener('click', () => {
          let indexOfData = fetch_Json[index];
          localStorage.setItem('p', JSON.stringify(indexOfData));
          window.location.href = 'detials.html';
        });
      });
    }
  }

  const game = new Game();
});


let getData = JSON.parse(localStorage.getItem('p'));
const closes = document.querySelector('.btn-close');
class Ul {
	constructor() {
		this.opation = {
			method: 'GET',
			headers: {
				'x-rapidapi-key': 'b50c83fc4cmsh619db77576f83abp1343dcjsn8bdf735820e6',
				'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
			}
		};
		this.getDetials();
		this.clickCloseFunc();
	}
	async getDetials() {
		let fetchs = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${getData.id}`, this.opation);
		let converJson = await fetchs.json();
		this.displayDetilas(converJson);
	}
	displayDetilas(converJson) {
		let cartona = '';
		cartona +=
			`<div class="col-md-4">
<img src="${converJson.thumbnail}" class="w-100" alt="">
</div>
<div class="col-md-8">
<h3 class="title text-white fs-3">Title: ${converJson.title}</h3>
<p class="category text-light">
  Category:
  <span class="badge text-bg-info">${converJson.genre}</span>
</p>
<p class="platform text-light">
  Platform:
  <span class="badge text-bg-info">${converJson.platform}</span>
</p>
<p class="status text-light">
  Status:
  <span class="badge text-bg-info">${converJson.status}</span>
</p>
<p class="small text-light">
  ${converJson.description}
</p>
<a href="${converJson.game_url}" target="_blank" class="btn btn-outline-warning sh">Show Game</a>
</div>
`;
document.querySelector('.row').innerHTML = cartona;
	}
	clickCloseFunc() {
		closes.addEventListener('click', ()=> {
			window.location.href = 'index.html'
		})
	}
}

const detials = new Ul();
// достопримечательности
class Attraction {
  constructor(id, name, photos, city, popularity, description) {
      this.id = id;
      this.name = name;
      this.photos = photos;
      this.city = city;
      this.popularity = popularity;
      this.description = description;
  }
}

// галерея
class Gallery {
  constructor(containerId, attractionsData) {
      this.container = document.getElementById(containerId);
      this.attractionsData = attractionsData;
      this.urlParams = new URLSearchParams(window.location.search);
      this.attractionId = this.urlParams.get("id");
      this.currentIndex = 0;
      this.init();
  }

  init() {
      const attraction = this.findAttraction();
      if (attraction) {
          this.renderGallery(attraction);
          this.initGallery();
      }
  }
// поиск по айди
  findAttraction() {
      return this.attractionsData.find(item => item.id === this.attractionId);
  }
// создание галереи
  renderGallery(attraction) {
      const galleryHTML = `
          <h1 class="main__title">${attraction.name}</h1>
          <div class="gallery">
              <div class="gallery-image">
                  <img src="${attraction.photos[0]}" alt="${attraction.name}" id="fullImage">
              </div>
              <div class="gallery-thumbnails">
                  ${attraction.photos.map((photo, index) => `
                      <img src="${photo}" alt="${attraction.name}" data-index="${index}">
                  `).join("")}
              </div>
          </div>
          <p class="main__text"><strong>Город:</strong> ${attraction.city}</p>
          <p class="main__text"><strong>Посещаемость:</strong> ${attraction.popularity}</p>
          <p class="main__text"><strong>Описание:</strong> ${attraction.description}</p>
      `;
      this.container.innerHTML = galleryHTML;
  }

  initGallery() {
      this.fullImage = document.getElementById("fullImage");
      this.thumbnails = document.querySelectorAll(".gallery-thumbnails img");
      this.attachThumbnailListeners();
      this.updateFullImage();
  }
// миниатюра клик
  attachThumbnailListeners() {
      this.thumbnails.forEach((thumb, index) => {
          thumb.addEventListener("click", () => {
              this.currentIndex = index;
              this.updateFullImage();
          });
      });
  }
//полный размер картинки
  updateFullImage() {
      const attraction = this.findAttraction();
      if (attraction) {
          this.fullImage.src = attraction.photos[this.currentIndex];
          this.thumbnails.forEach((thumb, index) => {
              thumb.style.border = index === this.currentIndex ? "2px solid rgb(46, 62, 58)" : "none";
          });
      }
  }
}

// бд
const attractionsData = [
  new Attraction(
      "1",
      "Аул-призрак Гамсутль",
      ["./assets/img/img1.jpg", "./assets/img/img1-1.webp", "./assets/img/img1-2.webp"],
      "Дагестан",
      777,
      "Аул-призрак Гамсутль — это заброшенный аул в Дагестане, который стал популярным туристическим местом благодаря своему мистическому очарованию."
  ),
  new Attraction(
      "2",
      "Гейзеровое озеро",
      ["./assets/img/img2.jpg", "./assets/img/img2-1.webp", "./assets/img/img2-2.webp"],
      "Алтай",
      950,
      "Гейзеровое озеро — это уникальное природное явление в Алтайских горах, где вода кипит и бурлит, как в настоящем гейзере."
  ),
  new Attraction(
      "3",
      "Розовое озеро Сасык-Сиваш",
      ["./assets/img/img3.jpg"],
      "Крым",
      900,
      "Розовое озеро Сасык-Сиваш — это удивительное озеро в Крыму, вода которого приобретает розовый оттенок из-за микроорганизмов."
  ),
  new Attraction(
      "4",
      "Болгар",
      ["./assets/img/img4.jpg"],
      "Татарстан",
      850,
      "Болгар — это древний город в Татарстане, который является одним из первых столиц Волжской Булгарии."
  ),
  new Attraction(
      "5",
      "Город мёртвых",
      ["./assets/img/img5.jpg"],
      "Северная Осетия",
      800,
      "Город мёртвых — это уникальное кладбище в Северной Осетии, где гробницы высечены в скалах."
  )
];

const gallery = new Gallery("attractionDetails", attractionsData);
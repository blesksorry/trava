"use strict";

// управление данных о достопримечательностях
class AttractionsDataManager {
    constructor() {
        this.itemsPerPage = 3;
        this.currentPage = 1;
        this.attractionsData = [];
    }

    async loadData() {
        try {
            const response = await fetch("https://672ca4801600dda5a9f949f2.mockapi.io/attractions");
            this.attractionsData = await response.json();
        } catch (error) {
            console.log(
                {
                    
                }
            )
            console.error(error);
        }
    }

    getFilteredData(filters) {
        let filteredAttractions = [...this.attractionsData];

        // Поиск по названию
        if (filters.searchQuery) {
            filteredAttractions = filteredAttractions.filter(attraction =>
                attraction.name.toLowerCase().includes(filters.searchQuery)
            );
        }

        // Фильтр по посещаемости
        if (filters.popularityFilter === "highest") {
            filteredAttractions.sort((a, b) => b.popularity - a.popularity);
        } else if (filters.popularityFilter === "lowest") {
            filteredAttractions.sort((a, b) => a.popularity - b.popularity);
        }

        return filteredAttractions;
    }

    getPaginatedData(filteredData) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    }
}

// отображение достопримечательостей
class AttractionsRenderer {
    constructor(container) {
        this.container = container;
    }

    render(attractions) {
        this.container.innerHTML = "";
        attractions.forEach(attraction => {
            const attractionElement = document.createElement("div");
            attractionElement.classList.add("attraction");
            attractionElement.innerHTML = `
                <h2 class="product__title__text">${attraction.name}</h2>
                <img src="${attraction.photos}" alt="${attraction.name}" class="product__img">
                <p class="product__text__card">Город: ${attraction.city}</p>
                <p class="product__text__card">Посещаемость: ${attraction.popularity}</p>
            `;
            attractionElement.addEventListener("click", () => {
                window.location.href = `attraction.html?id=${attraction.id}`;
            });
            this.container.appendChild(attractionElement);
        });
    }
}

// пагинация
class Pagination {
    constructor(container, itemsPerPage) {
        this.container = container;
        this.itemsPerPage = itemsPerPage;
    }

    render(totalItems, onPageChange) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        this.container.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.addEventListener("click", () => {
                onPageChange(i);
            });
            this.container.appendChild(button);
        }
    }
}
// управление фильтрами
class FiltersManager {
    constructor(searchInput, popularityFilterSelect) {
        this.searchInput = searchInput;
        this.popularityFilterSelect = popularityFilterSelect;
    }

    getFilters() {
        return {
            searchQuery: this.searchInput.value.toLowerCase().trim(),
            popularityFilter: this.popularityFilterSelect.value
        };
    }

    init(onFilterChange) {
        this.searchInput.addEventListener("input", onFilterChange);
        this.popularityFilterSelect.addEventListener("change", onFilterChange);
    }
}

// управление фулл
class AttractionsApp {
    constructor() {
        this.dataManager = new AttractionsDataManager();
        this.renderer = new AttractionsRenderer(document.getElementById("attractions"));
        this.pagination = new Pagination(document.querySelector(".pagination"), this.dataManager.itemsPerPage);
        this.filtersManager = new FiltersManager(
            document.getElementById("searchInput"),
            document.getElementById("popularityFilter")
        );
    }

    async init() {
        await this.dataManager.loadData();
        this.filtersManager.init(() => this.applyFilters());
        this.applyFilters();
    }

    applyFilters() {
        const filters = this.filtersManager.getFilters();
        const filteredData = this.dataManager.getFilteredData(filters);
        const paginatedData = this.dataManager.getPaginatedData(filteredData);

        this.renderer.render(paginatedData);
        this.pagination.render(filteredData.length, (page) => {
            this.dataManager.currentPage = page;
            this.applyFilters();
        });
    }
}

const app = new AttractionsApp();
app.init();
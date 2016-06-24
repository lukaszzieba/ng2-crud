export class CategoryData {
    createDb() {
        let categories = [
            {
                "id": 11,
                "parent_id": null,
                "is_visible": true,
                "name": "ROOT",
                "description": "",
                "ordering": 0
            },
            {
                "id": 16,
                "parent_id": 11,
                "is_visible": true,
                "name": "Odzież",
                "description": "Odzież condzienna",
                "ordering": 0
            },
            {
                "id": 21,
                "parent_id": 16,
                "is_visible": false,
                "name": "Bluzki",
                "description": "",
                "ordering": 0
            },
            {
                "id": 38,
                "parent_id": 16,
                "is_visible": true,
                "name": "Sukienki",
                "description": "",
                "ordering": 1
            },
            {
                "id": 19,
                "parent_id": 16,
                "is_visible": true,
                "name": "Spódnice",
                "description": "",
                "ordering": 2
            },
            {
                "id": 39,
                "parent_id": 16,
                "is_visible": false,
                "name": "Spodnie",
                "description": "",
                "ordering": 3
            },
            {
                "id": 64,
                "parent_id": 39,
                "is_visible": false,
                "name": "nowa",
                "description": " ",
                "ordering": 0
            },
            {
                "id": 58,
                "parent_id": 11,
                "is_visible": true,
                "name": "Akcesoria",
                "description": "Wspaniałe akcesoria do ubioru",
                "ordering": 1
            },
            {
                "id": 53,
                "parent_id": 58,
                "is_visible": true,
                "name": "Torebki",
                "description": "",
                "ordering": 0
            },
            {
                "id": 59,
                "parent_id": 58,
                "is_visible": true,
                "name": "Rajstopy",
                "description": "",
                "ordering": 1
            },
            {
                "id": 26,
                "parent_id": 59,
                "is_visible": true,
                "name": "Styl Gotycki",
                "description": "",
                "ordering": 0
            },
            {
                "id": 17,
                "parent_id": 11,
                "is_visible": true,
                "name": "Trendy",
                "description": "Najnowsze kolekcje",
                "ordering": 2
            },
            {
                "id": 27,
                "parent_id": 17,
                "is_visible": true,
                "name": "Militarne Manewry",
                "description": "",
                "ordering": 0
            },
            {
                "id": 65,
                "parent_id": 11,
                "is_visible": false,
                "name": "Z IMPORTU",
                "description": "Chinskie ciuszki",
                "ordering": 3
            }
        ];

        return { categories };
    }
}
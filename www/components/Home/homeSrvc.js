var homeSrvc;

homeSrvc = (function($log, $http, $q) {

    

    var homeSrvc =  {
    "category_id": 1,
    "parent_id": 0,
    "name": "Root Catalog",
    "position": 9,
    "level": 0,
    "children": [
        {
            "category_id": 2,
            "parent_id": 1,
            "name": "Default Category",
            "is_active": 1,
            "position": 9,
            "level": 1,
            "children": [
                {
                    "category_id": 5,
                    "parent_id": 2,
                    "name": "Accessories",
                    "is_active": 1,
                    "position": 0,
                    "level": 2,
                    "children": []
                },
                {
                    "category_id": 6,
                    "parent_id": 2,
                    "name": "Footwear",
                    "is_active": 1,
                    "position": 1,
                    "level": 2,
                    "children": [
                        {
                            "category_id": 7,
                            "parent_id": 6,
                            "name": "Kids 123",
                            "is_active": 1,
                            "position": 1,
                            "level": 3,
                            "children": [
                                {
                                    "category_id": 50,
                                    "parent_id": 7,
                                    "name": "Lorem ipsum ",
                                    "is_active": 1,
                                    "position": 1,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 51,
                                    "parent_id": 7,
                                    "name": "Dolor sit amet ",
                                    "is_active": 1,
                                    "position": 2,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 52,
                                    "parent_id": 7,
                                    "name": "Conse ctetur adipisicing ",
                                    "is_active": 1,
                                    "position": 3,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 53,
                                    "parent_id": 7,
                                    "name": "Do eiusmod tempor",
                                    "is_active": 1,
                                    "position": 4,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 54,
                                    "parent_id": 7,
                                    "name": "Incididunt ut labore",
                                    "is_active": 1,
                                    "position": 5,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 55,
                                    "parent_id": 7,
                                    "name": "Et dolore magna ",
                                    "is_active": 1,
                                    "position": 6,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 56,
                                    "parent_id": 7,
                                    "name": "Enim ad minim veniam",
                                    "is_active": 1,
                                    "position": 7,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 57,
                                    "parent_id": 7,
                                    "name": "Quis nostrud",
                                    "is_active": 1,
                                    "position": 8,
                                    "level": 4,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "category_id": 10,
                            "parent_id": 6,
                            "name": "Man",
                            "is_active": 1,
                            "position": 2,
                            "level": 3,
                            "children": [
                                {
                                    "category_id": 58,
                                    "parent_id": 10,
                                    "name": "Nisi ut aliquip",
                                    "is_active": 1,
                                    "position": 1,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 59,
                                    "parent_id": 10,
                                    "name": "Ex ea commodo",
                                    "is_active": 1,
                                    "position": 2,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 60,
                                    "parent_id": 10,
                                    "name": "Duis aute",
                                    "is_active": 1,
                                    "position": 3,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 61,
                                    "parent_id": 10,
                                    "name": "Excepteur sint",
                                    "is_active": 1,
                                    "position": 4,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 62,
                                    "parent_id": 10,
                                    "name": "Sunt in culpa",
                                    "is_active": 1,
                                    "position": 5,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 63,
                                    "parent_id": 10,
                                    "name": "Id est laborum",
                                    "is_active": 1,
                                    "position": 6,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 64,
                                    "parent_id": 10,
                                    "name": "Sed ut perspiciatis",
                                    "is_active": 1,
                                    "position": 7,
                                    "level": 4,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "category_id": 8,
                            "parent_id": 6,
                            "name": "Woman",
                            "is_active": 1,
                            "position": 3,
                            "level": 3,
                            "children": [
                                {
                                    "category_id": 65,
                                    "parent_id": 8,
                                    "name": "Adipisci velit",
                                    "is_active": 1,
                                    "position": 1,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 66,
                                    "parent_id": 8,
                                    "name": "Sed quia",
                                    "is_active": 1,
                                    "position": 2,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 67,
                                    "parent_id": 8,
                                    "name": "Eius modi",
                                    "is_active": 1,
                                    "position": 3,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 68,
                                    "parent_id": 8,
                                    "name": "Esse quam nihil",
                                    "is_active": 1,
                                    "position": 4,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 69,
                                    "parent_id": 8,
                                    "name": "At vero eos",
                                    "is_active": 1,
                                    "position": 5,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 70,
                                    "parent_id": 8,
                                    "name": "Odio dignissimos",
                                    "is_active": 1,
                                    "position": 6,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 71,
                                    "parent_id": 8,
                                    "name": "Eius modi tempora",
                                    "is_active": 1,
                                    "position": 7,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 72,
                                    "parent_id": 8,
                                    "name": "Et dolore",
                                    "is_active": 1,
                                    "position": 8,
                                    "level": 4,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "category_id": 47,
                            "parent_id": 6,
                            "name": "Do eiusmod tempor",
                            "is_active": 1,
                            "position": 4,
                            "level": 3,
                            "children": [
                                {
                                    "category_id": 73,
                                    "parent_id": 47,
                                    "name": "Lorem ipsum dolor",
                                    "is_active": 1,
                                    "position": 1,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 74,
                                    "parent_id": 47,
                                    "name": "Consectetur adipiscing elit",
                                    "is_active": 1,
                                    "position": 2,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 75,
                                    "parent_id": 47,
                                    "name": "Et dolore magna ",
                                    "is_active": 1,
                                    "position": 3,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 76,
                                    "parent_id": 47,
                                    "name": "Eiusmod tempor incididunt",
                                    "is_active": 1,
                                    "position": 4,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 77,
                                    "parent_id": 47,
                                    "name": "Labore et dolore",
                                    "is_active": 1,
                                    "position": 5,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 78,
                                    "parent_id": 47,
                                    "name": "Duis aute irure",
                                    "is_active": 1,
                                    "position": 6,
                                    "level": 4,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "category_id": 48,
                            "parent_id": 6,
                            "name": "Et dolore magna ",
                            "is_active": 1,
                            "position": 5,
                            "level": 3,
                            "children": [
                                {
                                    "category_id": 79,
                                    "parent_id": 48,
                                    "name": "Lorem ipsum ",
                                    "is_active": 1,
                                    "position": 1,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 80,
                                    "parent_id": 48,
                                    "name": "Dolor sit amet",
                                    "is_active": 1,
                                    "position": 2,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 81,
                                    "parent_id": 48,
                                    "name": "Conse ctetur adipisicing",
                                    "is_active": 1,
                                    "position": 3,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 82,
                                    "parent_id": 48,
                                    "name": "Do eiusmod tempor",
                                    "is_active": 1,
                                    "position": 4,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 83,
                                    "parent_id": 48,
                                    "name": "Incididunt ut labore",
                                    "is_active": 1,
                                    "position": 5,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 84,
                                    "parent_id": 48,
                                    "name": "Et dolore magna ",
                                    "is_active": 1,
                                    "position": 6,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 85,
                                    "parent_id": 48,
                                    "name": "Enim ad minim veniam",
                                    "is_active": 1,
                                    "position": 7,
                                    "level": 4,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "category_id": 49,
                            "parent_id": 6,
                            "name": "Et dolore magna ",
                            "is_active": 1,
                            "position": 6,
                            "level": 3,
                            "children": [
                                {
                                    "category_id": 86,
                                    "parent_id": 49,
                                    "name": "Et dolore magna  ",
                                    "is_active": 1,
                                    "position": 1,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 87,
                                    "parent_id": 49,
                                    "name": "Dolor sit amet",
                                    "is_active": 1,
                                    "position": 2,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 88,
                                    "parent_id": 49,
                                    "name": "Incididunt ut labore ",
                                    "is_active": 1,
                                    "position": 3,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 89,
                                    "parent_id": 49,
                                    "name": "Do eiusmod tempor",
                                    "is_active": 1,
                                    "position": 4,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 90,
                                    "parent_id": 49,
                                    "name": "Incididunt ut labore",
                                    "is_active": 1,
                                    "position": 5,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 91,
                                    "parent_id": 49,
                                    "name": "Conse ctetur  ",
                                    "is_active": 1,
                                    "position": 6,
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "category_id": 92,
                                    "parent_id": 49,
                                    "name": "Enim ad minim veniam",
                                    "is_active": 1,
                                    "position": 7,
                                    "level": 4,
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "category_id": 9,
                    "parent_id": 2,
                    "name": "Handbags",
                    "is_active": 1,
                    "position": 2,
                    "level": 2,
                    "children": [
                        {
                            "category_id": 93,
                            "parent_id": 9,
                            "name": "Test Category",
                            "is_active": 1,
                            "position": 1,
                            "level": 3,
                            "children": []
                        }
                    ]
                },
                {
                    "category_id": 19,
                    "parent_id": 2,
                    "name": "Kids",
                    "is_active": 1,
                    "position": 3,
                    "level": 2,
                    "children": [
                        {
                            "category_id": 94,
                            "parent_id": 19,
                            "name": "Test Category2",
                            "is_active": 1,
                            "position": 1,
                            "level": 3,
                            "children": []
                        }
                    ]
                },
                {
                    "category_id": 14,
                    "parent_id": 2,
                    "name": "Men",
                    "is_active": 1,
                    "position": 4,
                    "level": 2,
                    "children": []
                },
                {
                    "category_id": 15,
                    "parent_id": 2,
                    "name": "Women",
                    "is_active": 1,
                    "position": 5,
                    "level": 2,
                    "children": []
                },
                {
                    "category_id": 11,
                    "parent_id": 2,
                    "name": "Lingerie",
                    "is_active": 0,
                    "position": 6,
                    "level": 2,
                    "children": []
                },
                {
                    "category_id": 20,
                    "parent_id": 2,
                    "name": "men",
                    "is_active": 0,
                    "position": 7,
                    "level": 2,
                    "children": []
                },
                {
                    "category_id": 21,
                    "parent_id": 2,
                    "name": "women",
                    "is_active": 0,
                    "position": 8,
                    "level": 2,
                    "children": []
                },
                {
                    "category_id": 12,
                    "parent_id": 2,
                    "name": "Workwear",
                    "is_active": 0,
                    "position": 9,
                    "level": 2,
                    "children": []
                },
                {
                    "category_id": 13,
                    "parent_id": 2,
                    "name": "New Products",
                    "is_active": 0,
                    "position": 10,
                    "level": 2,
                    "children": []
                }
            ]
        }
    ]
}

    

    return homeSrvc;
});

homeModule.factory('homeSrvc', homeSrvc);
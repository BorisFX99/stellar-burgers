export const userOrdersMock = [
        {
            "_id": "69792522a64177001b328e72",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Био-марсианский флюоресцентный бургер",
            "createdAt": "2026-01-27T20:50:42.324Z",
            "updatedAt": "2026-01-27T20:50:42.619Z",
            "number": 99726
        },
        {
            "_id": "6979b5d0a64177001b328f00",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0948",
                "643d69a5c3f7b9001cfa0940",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Альфа-сахаридный метеоритный флюоресцентный space бургер",
            "createdAt": "2026-01-28T07:08:00.286Z",
            "updatedAt": "2026-01-28T07:08:00.512Z",
            "number": 99747
        },
        {
            "_id": "6979b616a64177001b328f02",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa0946",
                "643d69a5c3f7b9001cfa0942",
                "643d69a5c3f7b9001cfa094a",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Spicy био-марсианский астероидный минеральный флюоресцентный бургер",
            "createdAt": "2026-01-28T07:09:10.179Z",
            "updatedAt": "2026-01-28T07:09:10.488Z",
            "number": 99748
        }
  ];

  export const userNewOrderMock = {
    "success": true,
    "name": "Экзо-плантаго метеоритный флюоресцентный бессмертный бургер",
    "order": {
        "ingredients": [
            {
                "_id": "643d69a5c3f7b9001cfa093d",
                "name": "Флюоресцентная булка R2-D3",
                "type": "bun",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0940",
                "name": "Говяжий метеорит (отбивная)",
                "type": "main",
                "proteins": 800,
                "fat": 800,
                "carbohydrates": 300,
                "calories": 2674,
                "price": 3000,
                "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa093f",
                "name": "Мясо бессмертных моллюсков Protostomia",
                "type": "main",
                "proteins": 433,
                "fat": 244,
                "carbohydrates": 33,
                "calories": 420,
                "price": 1337,
                "image": "https://code.s3.yandex.net/react/code/meat-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0949",
                "name": "Мини-салат Экзо-Плантаго",
                "type": "main",
                "proteins": 1,
                "fat": 2,
                "carbohydrates": 3,
                "calories": 6,
                "price": 4400,
                "image": "https://code.s3.yandex.net/react/code/salad.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa093d",
                "name": "Флюоресцентная булка R2-D3",
                "type": "bun",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                "__v": 0
            }
        ],
        "_id": "6979bbdfa64177001b328f16",
        "owner": {
            "name": "John Dowader",
            "email": "test999999@mail.ru",
            "createdAt": "2026-01-27T19:28:46.223Z",
            "updatedAt": "2026-01-28T06:56:45.206Z"
        },
        "status": "done",
        "name": "Экзо-плантаго метеоритный флюоресцентный бессмертный бургер",
        "createdAt": "2026-01-28T07:33:51.643Z",
        "updatedAt": "2026-01-28T07:33:51.905Z",
        "number": 99754,
        "price": 10713
    }
}

export const userOrdersRejectMock = {
      message: "Ошибка ответа сервера"
  }

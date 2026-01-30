export const feedsMock = {
  success: true,
  orders: [
        {
            "_id": "69789ae9a64177001b328d34",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Флюоресцентный бургер",
            "createdAt": "2026-01-27T11:00:57.219Z",
            "updatedAt": "2026-01-27T11:00:57.514Z",
            "number": 99694
        },
        {
            "_id": "69789ac9a64177001b328d33",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Флюоресцентный бургер",
            "createdAt": "2026-01-27T11:00:25.488Z",
            "updatedAt": "2026-01-27T11:00:25.836Z",
            "number": 99693
        },
        {
            "_id": "69789a77a64177001b328d32",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Флюоресцентный бургер",
            "createdAt": "2026-01-27T10:59:03.879Z",
            "updatedAt": "2026-01-27T10:59:04.098Z",
            "number": 99692
        }
    ],
  total: 23688,
  totalToday: 64
}

export const orderByNumberMock = {
 success: true,
 orders: [
  {
     "_id": "69789ac9a64177001b328d33",
     "ingredients": [
         "643d69a5c3f7b9001cfa093d",
         "643d69a5c3f7b9001cfa093d"
     ],
     "owner": "69723f58a64177001b328423",
     "status": "done",
     "name": "Флюоресцентный бургер",
     "createdAt": "2026-01-27T11:00:25.488Z",
     "updatedAt": "2026-01-27T11:00:25.836Z",
     "number": 99693,
    }
  ]
}

export const feedsRejectMock = {
      message: "Ошибка ответа сервера"
  }

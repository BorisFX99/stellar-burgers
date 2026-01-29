import { IUserState } from "@slice/user/userSlice"
import { TrequestStatus } from "@utils-types"

export const getUserSuccessMock =
  {
    "success": true,
    "user": {
        "email": "test@mail.ru",
        "name": "Сумасшедший Тестировщик Вася"
    }
  }

  export const userRejectMock = {
      message: "Ошибка ответа сервера"
  }

export const userMock:IUserState = {
  user:{
   email: "222test@mail.ru",
   name: "Сумасшедший Тестировщик Петя"
  },
  requestStatus:TrequestStatus.SUCCESS,
  isAuthChecked:true,
  userErrorMessage:null,
  error:null,
}

export const loginMock = {
    "success": true,
    "accessToken": "Bearer kasdlkas;dlkasd",
    "refreshToken": "asdasdzcasdasdasdda",
    "user": {
        "email": "email777@mail.ru",
        "name": "Сумасшедший Тестировщик Леша"
    }
  }

export const registerUserMock = {
    "success": true,
    "user": {
        "email": "dasd2a@dasdas.ru",
        "name": "Сумасшедший Тестировщик Дима"
    },
    "accessToken": "Bearer Dhx0Xc",
    "refreshToken": "41f07e"
}

export const updateUserMock ={
    "success": true,
    "user": {
        "email": "test123@mail.ru",
        "name": "Сумасшедший Тестировщик Епифан"
    }
}

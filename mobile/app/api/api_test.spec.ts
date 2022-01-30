/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as api from "./api"
import { Configuration } from "./configuration"

const config: Configuration = {}

describe("BasicErrorControllerApi", () => {
  let instance: api.BasicErrorControllerApi
  beforeEach(function() {
    instance = new api.BasicErrorControllerApi(config)
  });

  test("errorUsingDELETE", () => {
    return expect(instance.errorUsingDELETE({})).resolves.toBe(null)
  })
  test("errorUsingGET", () => {
    return expect(instance.errorUsingGET({})).resolves.toBe(null)
  })
  test("errorUsingHEAD", () => {
    return expect(instance.errorUsingHEAD({})).resolves.toBe(null)
  })
  test("errorUsingOPTIONS", () => {
    return expect(instance.errorUsingOPTIONS({})).resolves.toBe(null)
  })
  test("errorUsingPATCH", () => {
    return expect(instance.errorUsingPATCH({})).resolves.toBe(null)
  })
  test("errorUsingPOST", () => {
    return expect(instance.errorUsingPOST({})).resolves.toBe(null)
  })
  test("errorUsingPUT", () => {
    return expect(instance.errorUsingPUT({})).resolves.toBe(null)
  })
})

describe("BookingsControllerApi", () => {
  let instance: api.BookingsControllerApi
  beforeEach(function() {
    instance = new api.BookingsControllerApi(config)
  });

  test("addBookingUsingPOST", () => {
    const body: api.AddBookingDto = undefined
    return expect(instance.addBookingUsingPOST(body, {})).resolves.toBe(null)
  })
  test("deleteBookingUsingDELETE", () => {
    const bookingId: number = 789
    return expect(instance.deleteBookingUsingDELETE(bookingId, {})).resolves.toBe(null)
  })
  test("getBookingUsingGET", () => {
    const bookingId: number = 789
    return expect(instance.getBookingUsingGET(bookingId, {})).resolves.toBe(null)
  })
  test("getUserBookingsUsingGET", () => {
    const filter: string = "filter_example"
    const page: number = 56
    const size: number = 56
    const sort: string = "sort_example"
    return expect(instance.getUserBookingsUsingGET(filter, page, size, sort, {})).resolves.toBe(null)
  })
  test("updateBookingUsingPUT", () => {
    const body: api.UpdateBookingDto = undefined
    const bookingId: number = 789
    return expect(instance.updateBookingUsingPUT(body, bookingId, {})).resolves.toBe(null)
  })
})

describe("ItemsControllerApi", () => {
  let instance: api.ItemsControllerApi
  beforeEach(function() {
    instance = new api.ItemsControllerApi(config)
  });

  test("getCarItemsUsingGET", () => {
    const page: number = 56
    const pageSize: number = 56
    const dateSort: string = "dateSort_example"
    const location: string = "location_example"
    const model: string = "model_example"
    const priceSort: string = "priceSort_example"
    const text: string = "text_example"
    return expect(instance.getCarItemsUsingGET(page, pageSize, dateSort, location, model, priceSort, text, {})).resolves.toBe(null)
  })
  test("getFlatItemsUsingGET", () => {
    const page: number = 56
    const city: string = "city_example"
    const sorted: boolean = true
    const street: string = "street_example"
    const text: string = "text_example"
    return expect(instance.getFlatItemsUsingGET(page, city, sorted, street, text, {})).resolves.toBe(null)
  })
  test("getParkingItemsUsingGET", () => {
    const page: number = 56
    const pageSize: number = 56
    const active: boolean = true
    return expect(instance.getParkingItemsUsingGET(page, pageSize, active, {})).resolves.toBe(null)
  })
})

describe("JwtAuthenticationControllerApi", () => {
  let instance: api.JwtAuthenticationControllerApi
  beforeEach(function() {
    instance = new api.JwtAuthenticationControllerApi(config)
  });

  test("createAuthenticationTokenUsingPOST", () => {
    const body: api.JwtRequest = undefined
    return expect(instance.createAuthenticationTokenUsingPOST(body, {})).resolves.toBe(null)
  })
})

describe("JwtUserControllerApi", () => {
  let instance: api.JwtUserControllerApi
  beforeEach(function() {
    instance = new api.JwtUserControllerApi(config)
  });

  test("createUserUsingPOST", () => {
    const body: api.User = undefined
    return expect(instance.createUserUsingPOST(body, {})).resolves.toBe(null)
  })
})

describe("OperationHandlerApi", () => {
  let instance: api.OperationHandlerApi
  beforeEach(function() {
    instance = new api.OperationHandlerApi(config)
  });

  test("handleUsingGET", () => {
    const body: { [key: string]: string; } = undefined
    return expect(instance.handleUsingGET(body, {})).resolves.toBe(null)
  })
  test("handleUsingGET1", () => {
    const body: { [key: string]: string; } = undefined
    return expect(instance.handleUsingGET1(body, {})).resolves.toBe(null)
  })
  test("handleUsingGET2", () => {
    const body: { [key: string]: string; } = undefined
    return expect(instance.handleUsingGET2(body, {})).resolves.toBe(null)
  })
  test("handleUsingGET3", () => {
    const body: { [key: string]: string; } = undefined
    return expect(instance.handleUsingGET3(body, {})).resolves.toBe(null)
  })
  test("handleUsingGET4", () => {
    const body: { [key: string]: string; } = undefined
    return expect(instance.handleUsingGET4(body, {})).resolves.toBe(null)
  })
  test("handleUsingPOST", () => {
    const body: { [key: string]: string; } = undefined
    return expect(instance.handleUsingPOST(body, {})).resolves.toBe(null)
  })
})

describe("WebMvcLinksHandlerApi", () => {
  let instance: api.WebMvcLinksHandlerApi
  beforeEach(function() {
    instance = new api.WebMvcLinksHandlerApi(config)
  });

  test("linksUsingGET", () => {
    return expect(instance.linksUsingGET({})).resolves.toBe(null)
  })
})


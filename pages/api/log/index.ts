import { createHandler, Body, Post } from "next-api-decorators"

class Log {
  @Post()
  createLog(@Body() body) {
    console.log(body)
    return { message: "Log created" }
  }
}

export default createHandler(Log)

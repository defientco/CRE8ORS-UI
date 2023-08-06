import { createHandler, Post, Body } from "next-api-decorators"

class Log {
  @Post()
  async log(@Body() body: any) {
    console.log(body)
    return body
  }
}

export default createHandler(Log)

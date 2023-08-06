import { createHandler, Post, Body } from "next-api-decorators"

class CreateMerkle {
  @Post("/")
  async createMerkle(@Body() body: { addresses: string[] }) {
    return body
  }
}

export default createHandler(CreateMerkle)

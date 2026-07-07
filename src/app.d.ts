import type { NinjaClient } from "ninja-api"

declare global {
  namespace App {
    interface Locals {
      ninja: NinjaClient
    }
  }
}

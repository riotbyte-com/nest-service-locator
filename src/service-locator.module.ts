import { Global, Module } from '@nestjs/common'
import { DiscoveryModule, Reflector } from '@nestjs/core'
import { ServiceLocator } from './service.locator'

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [Reflector, ServiceLocator],
  exports: [ServiceLocator],
})
export class ServiceLocatorModule {}

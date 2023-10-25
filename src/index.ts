import { type AtomicNebulaInterface, createNebula, DependencyInjectionMiddleware } from '@atomicdesign/atomic-singularity'
import { container } from 'tsyringe';

export const useTSyringe: AtomicNebulaInterface = createNebula({
  name: "atomic-singularity-tsyringe-wrapper"
})
  .addPreactivation(() => {
    DependencyInjectionMiddleware.instance.setProviderFunction((provider, token, type, config) => {
      container.register(token as any, provider, config);
    });

    DependencyInjectionMiddleware.instance.setInjectionFunction((token) => {
      container.resolve(token);
    });
  })
  .build();
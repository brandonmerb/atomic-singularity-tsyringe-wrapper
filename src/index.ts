import { DIToken } from '@atomicdesign/atomic-singularity';
import { DIProviderTypes } from '@atomicdesign/atomic-singularity';
import { type AtomicNebulaInterface, createNebula, DependencyInjectionMiddleware } from '@atomicdesign/atomic-singularity'
import { container } from 'tsyringe';

export const useTSyringe = createNebula({
  name: "atomic-singularity-tsyringe-wrapper"
})
  .addPreactivation(() => {
    DependencyInjectionMiddleware.instance.setProviderFunction((provider: any, token?: DIToken, type?: DIProviderTypes, config?: any) => {
      // container.register(token as any, provider, config);
      const tokenToUse = token ?? provider;
      if (type) {
        switch (type) {
          case 'class':
            container.register(tokenToUse, {useClass: provider});
          case 'factory':
            container.register(tokenToUse, {useFactory: provider});
          case 'value':
            container.register(tokenToUse, {useValue: provider});
        }
      } else {
        if (typeof provider === "function") {
          container.register(tokenToUse, {useClass: provider});
        } else {
          container.register(tokenToUse, {useValue: provider});
        }
      }
    });

    DependencyInjectionMiddleware.instance.setInjectionFunction((token: DIToken) => {
      return container.resolve(token);
    });
  })
  .build();
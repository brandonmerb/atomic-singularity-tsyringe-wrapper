import { type AtomicNebulaInterface, createNebula } from '@atomicdesign/atomic-singularity'

export const TSyringeWrapper: AtomicNebulaInterface = createNebula({
  name: "atomic-singularity-tsyringe-wrapper"
})
  .addPreactivation(() => {
    // Wrap
  })
  .build();
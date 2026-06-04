import type { VattsConfig, VattsConfigFunction } from 'vatts';

const hightConfig: VattsConfigFunction = (phase, { defaultConfig }) => {
    return defaultConfig;
};

export default hightConfig;

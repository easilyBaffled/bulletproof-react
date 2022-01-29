import { featureConfig } from './plopGenerators/feature/index.js';
import { sliceConfig } from './plopGenerators/slice/index.js';
import { connectedComponent } from './plopGenerators/connectedComponent/index.js';

export default function (plop) {
    // create your generators here
    plop.setGenerator('feature', featureConfig);
    plop.setGenerator('slice', sliceConfig);
    plop.setGenerator('component', connectedComponent);
}

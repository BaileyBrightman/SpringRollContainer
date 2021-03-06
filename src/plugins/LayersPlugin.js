import { SliderPlugin } from '../base-plugins';

/**
 * @export
 * @class LayersPlugin
 * @extends {SliderPlugin}
 */
export class LayersPlugin extends SliderPlugin {
  /**
   *
   * @param {Object} options
   * @param {number} [options.defaultValue=0]
   * @param {string | HTMLInputElement} layersSliders selector string or HTML Element for the input(s)
   */
  constructor(layersSliders, { defaultValue = 0 } = {}) {
    super(layersSliders, 'Layer-Plugin', { defaultValue: defaultValue, featureName: LayersPlugin.layersSliderKey });

    for (let i = 0; i < this.slidersLength; i++) {
      this.sliders[i].enableSliderEvents(this.onLayerValueChange.bind(this));
    }
  }

  /**
   * @memberof LayersPlugin
   * @param {Event} e
   */
  onLayerValueChange(e) {
    this.currentValue = e.target.value;
    this.sendProperty(LayersPlugin.layersSliderKey, this.currentValue);
  }

  /**
   * @readonly
   * @static
   * @memberof LayersPlugin
   */
  static get layersSliderKey() {
    return 'removableLayers';
  }
}

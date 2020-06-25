import { Container, ButtonSizePlugin } from '../index';
import { Bellhop } from 'bellhop-iframe';

const initEvent = eventName => {
  const event = document.createEvent('Event');
  event.initEvent(eventName, false, true);
  return event;
};

describe('ButtonSizePlugin', () => {
  let bsp;

  before(() => {
    document.body.innerHTML = '';

    const buttonSliderOne = document.createElement('input');
    buttonSliderOne.type = 'range';
    buttonSliderOne.id = 'bsOne';
    document.body.appendChild(buttonSliderOne);
    const buttonSliderTwo = document.createElement('input');
    buttonSliderTwo.type = 'range';
    buttonSliderTwo.id = 'bsTwo';
    document.body.appendChild(buttonSliderTwo);

    bsp = new ButtonSizePlugin({
      buttonSliders: '#bsOne, #bsTwo' //worlds worst console name
    });
    bsp.preload({ client: new Bellhop() });
  });

  it('construct', () => {
    const iframe = document.createElement('iframe');
    iframe.id = 'buttonsize-plugin-iframe';
    document.body.appendChild(iframe);
    new Container({ iframeSelector: '#buttonsize-plugin-iframe' }).client.trigger(
      'features'
    );
  });

  it('.onButtonSizeChange()', () => {
    bsp.buttonSliders[0].value = 1;
    bsp.buttonSliders[0].dispatchEvent(initEvent('change'));

    expect(bsp.buttonSliders[0].value).to.equal('1');
    expect(bsp.buttonSliders[1].value).to.equal('1');
    expect(bsp.buttonSize).to.equal(1);

    bsp.buttonSliders[0].value = 0;
    bsp.buttonSliders[0].dispatchEvent(initEvent('change'));

    expect(bsp.buttonSliders[0].value).to.equal('0');
    expect(bsp.buttonSliders[1].value).to.equal('0');
    expect(bsp.buttonSize).to.equal(0);

    bsp.buttonSliders[1].value = 1.1;
    bsp.buttonSliders[1].dispatchEvent(initEvent('change'));

    expect(bsp.buttonSliders[0].value).to.equal('1');
    expect(bsp.buttonSliders[1].value).to.equal('1');
    expect(bsp.buttonSize).to.equal(1);

    bsp.buttonSliders[1].value = -1;
    bsp.buttonSliders[1].dispatchEvent(initEvent('change'));

    expect(bsp.buttonSliders[0].value).to.equal('0');
    expect(bsp.buttonSliders[1].value).to.equal('0');
    expect(bsp.buttonSize).to.equal(0);
  });

  it('should work without any controls', () => {
    //set bsp empty plugin
    bsp = new ButtonSizePlugin();
    bsp.preload({ client: new Bellhop() });
    bsp.init();
    bsp.client.trigger('features', {});
  });

  it('should work with HTML Elements as paramters', () => {

    //plugin set bsp

    const buttonSliderOne = document.createElement('input');
    buttonSliderOne.type = 'range';
    buttonSliderOne.id = 'bsOne';
    document.body.appendChild(buttonSliderOne);

    bsp = new ButtonSizePlugin({
      buttonSliders: buttonSliderOne
    });
    bsp.preload({ client: new Bellhop() });

    const iframe = document.createElement('iframe');
    iframe.id = 'buttonsize-plugin-iframe';
    document.body.appendChild(iframe);
    new Container({ iframeSelector: '#buttonsize-plugin-iframe' }).client.trigger(
      'features'
    );

    expect(bsp.buttonSliders[0].slider).to.be.instanceof(HTMLInputElement);
    expect(bsp.buttonSliders[0].value).to.equal('0.5');

    bsp.buttonSliders[0].value = 1;
    bsp.buttonSliders[0].dispatchEvent(initEvent('change'));

    expect(bsp.buttonSliders[0].value).to.equal('1');
  });
});
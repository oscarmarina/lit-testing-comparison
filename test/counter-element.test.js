import { html, fixture, assert, expect, fixtureCleanup } from '@open-wc/testing';
import sinon from 'sinon';
import '../define/counter-element.js';

suite('CounterElement', () => {
  /**
   * @type {import('../index').CounterElement}
   */
  let el;

  suite('Default', () => {
    suiteTeardown(() => fixtureCleanup());

    setup(async () => {
      el = await fixture(html`<counter-element>light-dom</counter-element>`);
      await el.updateComplete;
    });

    test('has a default heading "Hey there" and counter 5', () => {
      assert.equal(el.heading, 'Hey there');
      assert.equal(el.counter, 5);
    });

    suite('Semantic Dom and a11y', () => {
      test('SHADOW DOM - Structure test', async () => {
        await expect(el).shadowDom.to.equalSnapshot();
      });

      test('LIGHT DOM - Structure test', async () => {
        await expect(el).lightDom.to.equalSnapshot();
      });

      test('a11y', async () => {
        await assert.isAccessible(el);
      });
    });
  });

  suite('Events ', () => {
    suiteTeardown(() => fixtureCleanup());

    setup(async () => {
      el = await fixture(html`<counter-element></counter-element>`);
      await el.updateComplete;
    });

    test('increases the counter on button click', () => {
      el.shadowRoot?.querySelector('button')?.click();
      assert.equal(el.counter, 6);
    });

    test('counterchange event is dispatched', () => {
      const spy = sinon.spy(el, 'dispatchEvent');
      el.shadowRoot?.querySelector('button')?.click();
      const calledWith = spy.calledWith(sinon.match.has('type', 'counterchange'));
      assert.isTrue(calledWith);
    });
  });

  suite('Override ', () => {
    suiteTeardown(() => fixtureCleanup());

    setup(async () => {
      el = await fixture(html`<counter-element heading="attribute heading"></counter-element>`);
      await el.updateComplete;
    });

    test('can override the heading via attribute', () => {
      assert.equal(el.heading, 'attribute heading');
    });
  });
});

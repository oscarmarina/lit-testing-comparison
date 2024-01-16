/* eslint-disable import/no-extraneous-dependencies */
// import * as EC from 'wdio-wait-for';
// import { waitFor } from '@testing-library/dom';
import { html, render } from 'lit';
import { $, expect, browser } from '@wdio/globals';
// import AxeBuilder from '@axe-core/webdriverio';
import { assert } from '@open-wc/testing';
import sinon from 'sinon';
import '../define/counter-element.js';

suite('Lit Component testing', () => {
  let el;

  suite('Default', () => {
    suiteTeardown(async () => {
      await browser.execute(node => {
        node.remove();
      }, el);
    });

    setup(async () => {
      render(html`<counter-element>light-dom</counter-element>`, document.body);
      el = await $('counter-element');
    });

    test('has a default heading "Hey there" and counter 5', async () => {
      await expect(el).toHaveElementProperty('heading', 'Hey there');
      await expect(el).toHaveElementProperty('counter', 5);
    });

    /* test('SHADOW DOM - Structure test', () => {
      const elElement = document.body.querySelector(el.selector);
      assert.shadowDom.equalSnapshot(elElement, { ignoreAttributes: ['id'] });
    });

    test('LIGHT DOM - Structure test', () => {
      const elElement = document.body.querySelector(el.selector);
      assert.lightDom.equalSnapshot(elElement, { ignoreAttributes: ['id'] });
    }); */

    test('a11y', async () => {
      const elElement = document.body.querySelector(el.selector);
      await assert.isAccessible(elElement);
    });
  });

  suite('Events ', () => {
    suiteTeardown(async () => {
      await browser.execute(node => {
        node.remove();
      }, el);
    });

    setup(async () => {
      render(html`<counter-element>light-dom</counter-element>`, document.body);
      el = await $('counter-element');
    });

    test('should increment value on click', async () => {
      await expect(el).toHaveElementProperty('counter', 5);
      const button = await el.$('>>>button');
      await button.click();
      await expect(el).toHaveElementProperty('counter', 6);
    });

    test('counterchange event is dispatched', async () => {
      const elElement = document.body.querySelector(el.selector);
      const spy = sinon.spy(elElement, 'dispatchEvent');
      const button = await el.$('>>>button');
      await button.click();
      const calledWith = spy.calledWith(sinon.match.has('type', 'counterchange'));
      await expect(calledWith).toEqual(true);
    });
  });

  suite('Override ', () => {
    suiteTeardown(async () => {
      await browser.execute(node => {
        node.remove();
      }, el);
    });

    setup(async () => {
      render(html`<counter-element heading="attribute heading"></counter-element>`, document.body);
      el = await $('counter-element');
    });

    test('can override the heading via attribute', async () => {
      await expect(el).toHaveElementProperty('heading', 'attribute heading');
    });
  });
});

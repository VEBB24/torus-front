import { TorusFrontPage } from './app.po';

describe('torus-front App', () => {
  let page: TorusFrontPage;

  beforeEach(() => {
    page = new TorusFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

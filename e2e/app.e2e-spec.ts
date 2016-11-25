import { FileSharePage } from './app.po';

describe('file-share App', function() {
  let page: FileSharePage;

  beforeEach(() => {
    page = new FileSharePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

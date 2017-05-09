import { CourseClientPage } from './app.po';

describe('course-client App', function() {
  let page: CourseClientPage;

  beforeEach(() => {
    page = new CourseClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

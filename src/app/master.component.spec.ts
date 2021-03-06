import { TestBed, async } from '@angular/core/testing';
import { MasterComponent } from './master.component';
describe('MasterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MasterComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MasterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'sobremesa-app'`, async(() => {
    const fixture = TestBed.createComponent(MasterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('sobremesa-app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(MasterComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to sobremesa-app!');
  }));
});
